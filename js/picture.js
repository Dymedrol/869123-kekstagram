'use strict';

(function () {

  var successLoadHandler = function (data) {
    window.getCards(data);
    window.initOtherUsersPictures();
    var picturesListElements = window.picturesList.querySelectorAll('a');
    window.getId(picturesListElements);
    setOpenBigPictureListener();
  };

  var errorLoadHandler = function () {

  };

  // Установка листенера. Нажатие на фотографию приводит к показу фотографии в полноэкранном режиме

  var setOpenBigPictureListener = function () {
    var pictureSection = document.querySelector('.pictures');
    pictureSection.addEventListener('click', function (evt) {
      var target = evt.target;
      while (!target.classList.contains('picture')) {
        target = target.parentNode;
      }
      var id = target.id;
      window.initBigPicture(window.otherUsersPictures[id]);
      event.stopPropagation();
    });
  };

  //  Загружаем данные с сервера и инициируем отрисовку фотографии других пользователей.

  window.backend.load(successLoadHandler, errorLoadHandler);

})();
