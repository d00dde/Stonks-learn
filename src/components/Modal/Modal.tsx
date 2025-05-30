import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import './Modal.css';

type TProps = {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal ({ children, onClose }: TProps) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-data" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
