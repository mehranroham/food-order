import React from 'react';

export default function Button({ children, textButton, className, ...props }) {
  const cssClass = `text-yellow-500  rounded-xl py-1.5 px-3 mb-5 transition-colors duration-300 ${className} ${
    textButton ? '' : 'bg-[#312c1d] hover:bg-[#1d1a16]'
  }`;

  return (
    <button className={cssClass} {...props}>
      {children}
    </button>
  );
}
