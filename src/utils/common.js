const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const ERROR_SHOW_TIME = 5000;

const showErrorLoadMessage = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '15px 10px';
  errorContainer.style.fontSize = '40px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'tomato';
  errorContainer.textContent = message;
  document.body.append(errorContainer);
  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

export { isEscapeKey, showErrorLoadMessage };
