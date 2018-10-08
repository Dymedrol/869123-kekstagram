'use strict';

(function () {

  // Генерирует карточку с фотографией случайноного пользователя

  var renderCard = function (cards) {
    var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var element = picturesTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = cards.url;
    element.querySelector('.picture__likes').textContent = cards.likes;
    element.querySelector('.picture__comments').textContent = cards.comments.length;
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

  // Получаем данные картинок др. пользователей, записываем в глобальную переменную "otherUsersPictures"

  window.otherUsersPictures = window.getCards();

  // инициирование фотографии др. пользователей

  window.initOtherUsersPictures = function () {
    window.picturesList.appendChild(window.getFragment(renderCards(window.otherUsersPictures)));
  };

})();
