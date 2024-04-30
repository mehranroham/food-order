import { useEffect, useRef } from 'react';

export default function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return (
    <dialog
      className='rounded-lg min-w-[300px] bg-stone-300 px-8 pt-8 pb-4 backdrop:bg-black/70'
      ref={dialog}
    >
      {children}
    </dialog>
  );
}
