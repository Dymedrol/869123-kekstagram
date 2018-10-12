'use strict';

(function () {
  var MAX_COMMENT_AMOUNT = 5;

  window.bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');

  window.initBigPicture = function (card) {
    // Показываем элемент .big-picture
    window.bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    var closeBigPicture = function () {
      window.bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      document.querySelector('.social__comments').innerHTML = '';
      document.removeEventListener('keydown', closeBigPicture);
    };

    // Закрываем элемент .big-picture по клику на крестик
    var bigPictureCancel = document.querySelector('.big-picture__cancel');
    bigPictureCancel.addEventListener('click', function () {
      closeBigPicture();
    });

    // Закрываем элемент .big-picture по нажатию ESC

    var bigPictureEscPressHandlrer = function () {
      closeBigPicture();
    };

    document.addEventListener('keydown', bigPictureEscPressHandlrer);


    // Заполняем данными
    window.bigPicture.querySelector('img').src = card.url;
    window.bigPicture.querySelector('.likes-count').textContent = card.likes;
    window.bigPicture.querySelector('.comments-count').textContent = card.comments.length;
    window.bigPicture.querySelector('.social__caption').textContent = card.description;

    // генерирует элементы с комментариями
    var getBigPictureComment = function (comments) {

      var socialComments = [];
      var commentAmount = comments.length;
      if (commentAmount > MAX_COMMENT_AMOUNT) {
        commentAmount = MAX_COMMENT_AMOUNT;
      }

      for (var i = 0; i < commentAmount; i++) {
        var socialComment = document.createElement('li');
        socialComment.classList.add('social__comment');
        var picture = document.createElement('img');
        picture.classList.add('social__picture');
        picture.src = 'img/avatar-' + window.getRandonNumber(1, 6) + '.svg';
        picture.alt = 'Аватар комментатора фотографии';
        socialComment.appendChild(picture);
        var socialText = document.createElement('p');
        socialText.classList.add('social__text');
        socialText.textContent = comments[i];
        socialComment.appendChild(socialText);
        socialComments.push(socialComment);
      }
      return window.getFragment(socialComments);
    };

    document.querySelector('.social__comments').appendChild(getBigPictureComment(card.comments));
  };

  // убираем блоки счётчика комментариев
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  // убираем блоки загрузки новых комментариев
  document.querySelector('.comments-loader').classList.add('visually-hidden');

})();
