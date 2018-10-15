'use strict';

(function () {
  // Генерирует карточку с фотографией пользователя
  var renderCard = function (cards) {
    var element = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
    element.querySelector('.picture__img').src = cards.url;
    element.querySelector('.picture__likes').textContent = cards.likes;
    element.querySelector('.picture__comments').textContent = String(cards.comments.length);
    return element;
  };

  // создает набор карточек с фотографиями случайнных пользователей
  var renderCards = function (pictures) {
    var pictureCards = [];
    pictures.forEach(function (element) {
      pictureCards.push(renderCard(element));
    });
    return pictureCards;
  };

  window.gallery = {
    // Назначение ID елементам галереии
    getId: function (elements) {
      elements.forEach(function (element, i) {
        element.setAttribute('data-id', i);
      });
    },

    // инициирование фотографии др. пользователей
    initOtherUsersPictures: function () {
      window.setup.picturesList.appendChild(window.setup.getFragment(renderCards(window.otherUsersPictures)));
    }
  };
})();
