'use strict';

(function () {

  // инициируем фотографии других пользователей

  window.initOtherUsersPictures();

  // Нажатие на фотографию приводит к показу фотографии в полноэкранном режиме

  var picturesListElements = window.picturesList.querySelectorAll('a');

  var setOpenBigPictureListener = function () {
    for (var i = 0; i < picturesListElements.length; i++) {
      picturesListElements[i].addEventListener('click', function () {
        window.initBigPicture();
      });
    }
  };

  setOpenBigPictureListener();

})();
