import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { useContext } from 'react';
import progressContext from '../store/ProgressContext';
import cartContext from '../store/CartContext';
import { formattingCurrency } from '../utils/formatting';

export default function Checkout() {
  const { open, closeModal } = useContext(progressContext);
  const { meals } = useContext(cartContext);

  const totalPrice = meals.reduce((current, prev) => {
    return current + prev.quantity * prev.price;
  }, 0);

  const submitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const dataObject = Object.fromEntries(fd.entries());
    console.log(dataObject);
  };

  return (
    <Modal open={open === 'checkout'}>
      <form onSubmit={submitHandler} className='flex flex-col gap-10'>
        <h3 className='text-xl text-center font-semibold'>تسویه حساب</h3>
        <p className='font-IRANSans-Medium text-lg'>
          قیمت کل: {formattingCurrency.format(totalPrice)}
        </p>
        <div className='flex flex-col gap-4'>
          <Input id='fullName'>نام و نام خانوادگی</Input>
          <Input id='city'>شهر</Input>
          <Input id='address'>آدرس</Input>
          <Input id='postalCode'>کدپستی</Input>
        </div>
        <div className='flex gap-3 items-center'>
          <Button>ثبت</Button>
          <Button textButton type='button' onClick={closeModal}>
            انصراف
          </Button>
        </div>
      </form>
    </Modal>
  );
}
