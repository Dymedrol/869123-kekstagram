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
    for (var i = 0; i < pictures.length; i++) {
      pictureCards.push(renderCard(pictures[i]));
    }
    return pictureCards;
  };

  // Назначение ID елементам галереии
  window.getId = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('data-id', i);
    }
  };

  // инициирование фотографии др. пользователей
  window.initOtherUsersPictures = function () {
    window.picturesList.appendChild(window.getFragment(renderCards(window.otherUsersPictures)));
  };
})();
