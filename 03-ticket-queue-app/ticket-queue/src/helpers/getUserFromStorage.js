export const getUserFromStorage = () => {
  return {
    name: localStorage.getItem('name'),
    desktop: localStorage.getItem('desktop'),
  };
};
