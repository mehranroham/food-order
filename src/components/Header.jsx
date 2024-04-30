import { useContext } from 'react';
import imgLogo from '../assets/logo.jpg';
import cartContext from '../store/CartContext';
import progressContext from '../store/ProgressContext';
import Button from '../UI/Button';

export default function Header() {
  const { openCart } = useContext(progressContext);

  const { meals } = useContext(cartContext);

  const numberOfQuantities = meals.reduce(
    (current, prev) => current + prev.quantity,
    0
  );

  return (
    <header className='w-full h-[100px] flex justify-between md:px-32 px-5 items-center'>
      <Button onClick={openCart} className='text-xl' textButton>
        سبد خرید ({numberOfQuantities})
      </Button>
      <div className='flex items-center gap-2'>
        <p className='text-yellow-500 text-xl sm:block hidden'>Ordering Food</p>
        <img
          className='rounded-full border-2 border-yellow-500 w-16 cursor-pointer'
          src={imgLogo}
          alt='food app logo'
        />
      </div>
    </header>
  );
}
