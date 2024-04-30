import { createContext, useReducer } from 'react';

const cartContext = createContext();

function cartReducer(state, action) {
  if (action.type === 'ADD-MEAL') {
    let updatingMeals = [...state.meals];
    let existingIndex = updatingMeals.findIndex(
      (meal) => meal.id === action.meal.id
    );

    if (existingIndex === -1) {
      updatingMeals.push({ ...action.meal, quantity: 1 });
    } else {
      updatingMeals[existingIndex] = {
        ...updatingMeals[existingIndex],
        quantity: updatingMeals[existingIndex].quantity + 1,
      };
    }

    return { ...state, meals: updatingMeals };
  }

  if ((action.type = 'REMOVE-MEAL')) {
    let updatingMeals = [...state.meals];
    let targetIndex = updatingMeals.findIndex((meal) => meal.id === action.id);

    if (updatingMeals[targetIndex].quantity > 1) {
      const targetMeal = { ...updatingMeals[targetIndex] };
      targetMeal.quantity -= 1;

      updatingMeals[targetIndex] = targetMeal;
    } else {
      updatingMeals.splice(targetIndex, 1);
    }

    return { ...state, meals: updatingMeals };
  }
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { meals: [] });

  const addToCart = (meal) => {
    dispatch({ type: 'ADD-MEAL', meal });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE-MEAL', id });
  };

  const ctx = { meals: state.meals, addToCart, removeItem };

  console.log(ctx);

  return <cartContext.Provider value={ctx}>{children}</cartContext.Provider>;
}

export default cartContext;
