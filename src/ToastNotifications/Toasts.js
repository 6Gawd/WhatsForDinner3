import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const initTrevorToast = () => {
  toast.info(
    'Test out these commands: To activate our assistant say, "Hey Trevor!"',
    {
      position: 'bottom-left',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );
};

export const instructionsToast = () => {
  toast.info(
    'You can add any food item you like to your list. "Say add Cheese"',
    {
      position: 'bottom-left',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );
  toast.info(
    'You can also delete any food item off of your list. Say "delete Cheese"',
    {
      position: 'bottom-left',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );
};

export const deleteInstructionsToast = () => {
  toast.info(
    'If you want to clear your current shopping list, say "clear my list"',
    {
      position: 'bottom-left',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );
};

export const getRecipesToast = () => {
  toast.info(
    'If you want to get some recipes using your current shopping list, say "get recipes"',
    {
      position: 'bottom-left',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );
  toast.info(
    'If you want to go to your favorite recipes, say "get favorite recipes"',
    {
      position: 'bottom-left',
      autoClose: false,
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
  toast.info(
    'You can make Trevor repeat current step - " repeat current step"',
    {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    }
  );
};

export const nextStepsToast = () => {
  toast.info('You can make Trevor say the next step - "go to next step"', {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true
  });
};

export const previousStepsToast = () => {
  toast.success(
    'You can make Trevor say the previous step - "go to previous step"',
    {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
    }
  );
};
