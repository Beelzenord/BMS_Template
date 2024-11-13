import React, { useEffect, useCallback } from 'react';
import './modal.styles.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    onClose();
  }, [onClose]);
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);

      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose, handleClickOutside]);


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;