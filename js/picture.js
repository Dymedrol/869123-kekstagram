'use strict';

(function () {

  var getCards = function (inputData) {
    var pictures = [];
    for (var i = 0; i < inputData.length; i++) {
      pictures.push({
        url: inputData[i].url,
        likes: inputData[i].likes,
        comments: inputData[i].comments,
        description: window.DESCRIPTIONS[window.getRandonNumber(0, window.DESCRIPTIONS.length - 1)]
      });
    }

    window.otherUsersPictures = pictures;
  };

  var successLoadHandler = function (data) {
    getCards(data);
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
        if (target.classList.contains('pictures')) {
          event.stopPropagation();
          return;
        }
      }
      event.stopPropagation();
      var id = target.getAttribute('data-id');
      window.initBigPicture(window.otherUsersPictures[id]);

    });
  };

  //  Загружаем данные с сервера и инициируем отрисовку фотографии других пользователей.

  window.backend.load(successLoadHandler, errorLoadHandler);

})();
