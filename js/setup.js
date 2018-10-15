'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  window.setup = {
    picturesList: document.querySelector('.pictures'),

    // Возвращает случайное число от min до max
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // возвращает фрагмент из массива elements;
    getFragment: function (elements) {
      var fragment = document.createDocumentFragment();

      elements.forEach(function (element) {
        fragment.appendChild(element);
      });

      return fragment;
    },

    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    },

    showError: function () {
      window.inputForm.main.appendChild(document.querySelector('#error').content.querySelector('.error').cloneNode(true));
      var errorWindowPopUp = document.querySelector('.error');

      var closeErrorWindow = function () {
        window.inputForm.resetPictureEdition();
        window.inputForm.main.removeChild(errorWindowPopUp);
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
    }
  };
})();
