import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Modal() {
  const { showModal, modalContent, dispatch } = useApp();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  if (!showModal || !modalContent) return null;

  const handleClose = () => {
    dispatch({ type: 'HIDE_MODAL' });
    if (modalContent.onClose) {
      modalContent.onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-bg-card rounded-custom p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-lg animate-slide-up">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">{modalContent.title}</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-bg-main rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          {modalContent.body}
        </div>
        
        <div className="flex gap-3 justify-end">
          {modalContent.actions || (
            <button onClick={handleClose} className="btn btn-primary">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;