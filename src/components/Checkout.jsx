import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { useContext } from 'react';
import progressContext from '../store/ProgressContext';
import cartContext from '../store/CartContext';
import { formattingCurrency } from '../utils/formatting';
import useHttp from '../hooks/useHttp';

const initConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const { data, error, isLoading, resetData, sendRequest } = useHttp(
    'http://localhost:3000/orders',
    initConfig
  );

  const { open, closeModal } = useContext(progressContext);
  const { meals, clearMeals } = useContext(cartContext);

  const totalPrice = meals.reduce((current, prev) => {
    return current + prev.quantity * prev.price;
  }, 0);

  const submitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest({ order: { items: meals, customer: customerData } });
  };

  const finishHandler = () => {
    clearMeals();
    closeModal();
    resetData();
  };

  let actions = (
    <>
      <Button>ثبت</Button>
      <Button textButton type='button' onClick={closeModal}>
        انصراف
      </Button>
    </>
  );

  if (isLoading) {
    actions = (
      <>
        <p className='text-yellow-600'>
          درخواست شما در حال اجرا شدن می باشد ...
        </p>
      </>
    );
  }

  if (data && !error) {
    return (
      <Modal open={open === 'checkout'}>
        <div className='flex flex-col gap-4'>
          <p>درخواست شما با موفقیت انجام شد</p>
          <p>به زودی با شما تماس خواهیم گرفت...</p>
          <Button textButton type='button' onClick={finishHandler}>
            باشه
          </Button>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal open={open === 'checkout'}>
        <div className='flex flex-col gap-4'>
          <p>درخواست شما قابل اجرا نمی باشد</p>
          <p className='text-yellow-600'>{error}</p>
          <Button textButton type='button' onClick={finishHandler}>
            انصراف
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open === 'checkout'}>
      <form onSubmit={submitHandler} className='flex flex-col gap-10'>
        <h3 className='text-xl text-center font-semibold'>تسویه حساب</h3>
        <p className='font-IRANSans-Medium text-lg'>
          قیمت کل: {formattingCurrency.format(totalPrice)}
        </p>
        <div className='flex flex-col gap-4'>
          <Input id='name'>نام و نام خانوادگی</Input>
          <Input id='email'>ایمیل</Input>
          <Input id='city'>شهر</Input>
          <Input id='street'>آدرس</Input>
          <Input id='postal-code'>کدپستی</Input>
        </div>
        <div className='flex gap-3 items-center'>{actions}</div>
      </form>
    </Modal>
  );
}
