'use strict';
var ESC_KEYCODE = 27;

window.picturesList = document.querySelector('.pictures');

// Возвращает случайное число от min до max

window.getRandonNumber = function (min, max) {
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
  var errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorWindow = errorWindowTemplate.cloneNode(true);
  var errorWindowPopUp = document.querySelector('.error');
  window.main.appendChild(errorWindow);

  var closeErrorWindow = function () {
    window.main.removeChild(errorWindowPopUp);
  };

  var errorButtonClickHandler = function (evt) {
    if (evt.target === errorWindowPopUp || evt.target === errorButton) {
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
  var errorButton = document.querySelector('.error__button');
  document.addEventListener('click', errorButtonClickHandler);
};

var DEBOUNCE_INTERVAL = 500; // ms
var lastTimeout;

window.debounce = function (fun) {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
};

