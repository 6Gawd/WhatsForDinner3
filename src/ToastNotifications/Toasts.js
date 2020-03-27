import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addIngredientToast = () => {
  toast.success('Added to list', {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const deleteIngredientToast = () => {
  toast.error('Removed from list', {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const clearListToast = () => {
  toast.error('Cleared your list', {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const addToFavoritesToast = () => {
  toast.success('Added to favorite recipes', {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const removeFromFavoritesToast = () => {
  toast.error('Removed from favorite recipes', {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
