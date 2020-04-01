import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const initAlexToast = () => {
  toast.info(
    'For assistance, you can say "help" at any time. Or click the help button.',
    {
      position: 'bottom-left',
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );
};

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

export const readyToBeginToast = () => {
  toast.info('say "Yes I am" to begin!', {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true
  });
};

export const repeatCurrentStepsToast = () => {
  toast.info('You can make Alex repeat current step - " repeat current step"', {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true
  });
};

export const nextStepsToast = () => {
  toast.info('You can make Alex say the next step - "go to next step"', {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true
  });
};

export const previousStepsToast = () => {
  toast.success(
    'You can make Alex say the previous step - "go to previous step"',
    {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    }
  );
};
