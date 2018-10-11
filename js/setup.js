'use strict';

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
  window.main.appendChild(errorWindow);
};

