import { formattingCurrency } from '../utils/formatting.js';
import cartContext from '../store/CartContext.jsx';
import { useContext } from 'react';
import Button from '../UI/Button';

export default function Meal({ meal }) {
  const { addToCart } = useContext(cartContext);

  const formattedCurrency = formattingCurrency.format(meal.price);

  return (
    <li className='flex flex-col gap-5 items-center rounded-lg overflow-hidden bg-[#0b0a0a]'>
      <img
        className='w-full h-[350px] object-cover'
        src={`http://localhost:3000/${meal.image}`}
        alt={meal.name}
      />
      <h3 className='text-xl'>{meal.name}</h3>
      <p className='font-IRANSans-Medium'>{formattedCurrency}</p>
      <p dir='ltr' className='px-6 text-center line-clamp-2'>
        {meal.description}
      </p>
      <Button onClick={() => addToCart(meal)}>افزودن به سبد</Button>
    </li>
  );
}
