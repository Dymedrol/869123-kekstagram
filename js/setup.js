'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  window.picturesList = document.querySelector('.pictures');

  // Возвращает случайное число от min до max
  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // возвращает фрагмент из массива elements;
  window.getFragment = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(elements[i]);
    }
    return fragment;
  };

  window.showError = function () {
    window.main.appendChild(document.querySelector('#error').content.querySelector('.error').cloneNode(true));
    var errorWindowPopUp = document.querySelector('.error');

    var closeErrorWindow = function () {
      window.resetPictureEdition();
      window.main.removeChild(errorWindowPopUp);
    };

    var errorButtonClickHandler = function (evt) {
      if (evt.target === errorWindowPopUp || evt.target.className === 'error__button') {
        closeErrorWindow();
        document.removeEventListener('click', errorButtonClickHandler);
      }
    };

    var errorButtonEscPressHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeErrorWindow();
        document.removeEventListener('keydown', errorButtonEscPressHandler);
      }
    };

    document.addEventListener('keydown', errorButtonEscPressHandler);
    document.addEventListener('click', errorButtonClickHandler);
  };

  var lastTimeout;

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
