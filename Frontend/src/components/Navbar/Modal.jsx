import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, closeModal }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="z-[1000] fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
      onClick={(e) => e.target.className.includes("bg-opacity-80") && closeModal()}
    >
      <div className="bg-white p-6 rounded relative w-full max-w-3xl h-full max-h-[40rem]">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={closeModal}
        >
          ×
        </button>
        <div className="text-center h-full flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
