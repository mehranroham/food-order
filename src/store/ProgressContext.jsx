import { createContext, useState } from 'react';

const progressContext = createContext();

export function ProgressProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openCart = () => {
    setOpen('modal');
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openCheckout = () => {
    setOpen('checkout');
  };

  const ctx = { open, openCart, closeModal, openCheckout };

  return (
    <progressContext.Provider value={ctx}>{children}</progressContext.Provider>
  );
}

export default progressContext;
