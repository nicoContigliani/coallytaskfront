import { toast } from 'react-toastify';

export const showSnackbar = (message, type = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message); 
    }
  };