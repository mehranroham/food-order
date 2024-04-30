import { useContext } from 'react';
import Modal from '../UI/Modal';
import progressContext from '../store/ProgressContext';
import cartContext from '../store/CartContext';
import { formattingCurrency } from '../utils/formatting';
import Button from '../UI/Button';

export default function Cart() {
  const { open, closeModal, openCheckout } = useContext(progressContext);
  const { meals, addToCart, removeItem } = useContext(cartContext);

  const totalPrice = meals.reduce((current, prev) => {
    return current + prev.quantity * prev.price;
  }, 0);

  const formattedPrice = formattingCurrency.format(totalPrice);

  return (
    <Modal open={open === 'modal'}>
      <div className='flex flex-col gap-8 justify-between h-full'>
        <ul dir='ltr' className='flex flex-col gap-3'>
          {meals.map((meal, index) => {
            return (
              <li key={meal.id} className='text-lg flex items-center gap-1'>
                <span className='w-[25px]'>{index + 1} -</span>
                <span className='w-[200px] inline-block'>{meal.name}</span>
                <span className='w-[150px] inline-block text-center font-IRANSans-Medium'>
                  {formattingCurrency.format(meal.price * meal.quantity)}
                </span>
                <div className='w-[120px] text-center'>
                  <button onClick={() => addToCart(meal)}>+</button>
                  <span className='w-[40px] inline-block text-center'>
                    {meal.quantity}
                  </span>
                  <button onClick={() => removeItem(meal.id)}>-</button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className='font-IRANSans-Medium text-lg'>
          قیمت کل : {formattedPrice}
        </p>
        <div className='flex items-center gap-5'>
          {meals.length > 0 && (
            <Button onClick={openCheckout}>تسویه حساب</Button>
          )}
          <Button textButton onClick={closeModal}>
            بستن
          </Button>
        </div>
      </div>
    </Modal>
  );
}
