'use strict';

(function () {
  var NEW_PICTURES_AMOUNT = 10;

  var imgFilters = document.querySelector('.img-filters');

  var popularButton = document.querySelector('#filter-popular');
  var newButton = document.querySelector('#filter-new');
  var discussedButton = document.querySelector('#filter-discussed');

  var loadedImages;
  var filtredImages;

  var getCards = function (inputData) {
    var pictures = [];
    for (var i = 0; i < inputData.length; i++) {
      pictures.push({
        url: inputData[i].url,
        likes: inputData[i].likes,
        comments: inputData[i].comments,
        description: window.descriptions[window.getRandonNumber(0, window.descriptions.length - 1)]
      });
    }

    window.otherUsersPictures = pictures;
  };

  // При удачной загрузке данных отрисовываем галлерею

  var successLoadHandler = function (data) {
    loadedImages = data;
    imgFilters.classList.remove('img-filters--inactive');
    getCards(data);
    window.initOtherUsersPictures();
    var picturesListElements = window.picturesList.querySelectorAll('a');

    window.getId(picturesListElements);
    setOpenBigPictureListener();
  };

  var errorLoadHandler = function () {
    window.showError();
  };

  // Хэндлера нажатия на фильтры

  var filtersClickHandler = function (evt) {
    var pics = window.picturesList.querySelectorAll('.picture');
    if (evt.target.type !== 'button') {
      return;
    }
    for (var i = 0; i < pics.length; i++) {
      window.picturesList.removeChild(pics[i]);
    }

    switch (evt.target.id) {
      case 'filter-popular': getPopularPictures();
        break;
      case 'filter-new': getNewPictures();
        break;
      case 'filter-discussed': getDiscussedPictures();
    }

    var changeFiltre = function () {
      getCards(filtredImages);
      window.initOtherUsersPictures();
      var picturesListElements = window.picturesList.querySelectorAll('a');
      window.getId(picturesListElements);
    };

    window.debounce(changeFiltre);
  };

  // При нажатии на "популярные"

  var getPopularPictures = function () {
    popularButton.classList.add('img-filters__button--active');
    newButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');

    filtredImages = [];
    filtredImages = loadedImages.slice();

  };

  // При нажатии на "новые"

  var getNewPictures = function () {
    newButton.classList.add('img-filters__button--active');
    popularButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');

    filtredImages = [];
    var newImages = loadedImages.slice();
    var randomImages = [];
    var getRandomPictures = function (pictures) {
      for (var i = 0; i < newImages.length; i++) {
        var index = window.getRandonNumber(0, pictures.length - 1);
        randomImages[i] = pictures[index];
        pictures.splice(index, 1);
      }
    };
    getRandomPictures(newImages);

    for (var i = 0; i < NEW_PICTURES_AMOUNT; i++) {
      filtredImages[i] = randomImages[i];
    }
  };

  // при нажатии на "Обсуждаемые"

  var getDiscussedPictures = function () {
    discussedButton.classList.add('img-filters__button--active');
    newButton.classList.remove('img-filters__button--active');
    popularButton.classList.remove('img-filters__button--active');

    filtredImages = [];

    var sortPicsByComments = function (picA, picB) {

      if (picA.comments.length < picB.comments.length) {
        return 1;
      } else if (picA.comments.length > picB.comments.length) {
        return -1;
      }
      return 0;

    };

    filtredImages = loadedImages.slice();
    filtredImages.sort(sortPicsByComments);
  };

  // Установка листенера. Нажатие на фотографию приводит к показу фотографии в полноэкранном режиме

  var setOpenBigPictureListener = function () {
    var pictureSection = document.querySelector('.pictures');
    pictureSection.addEventListener('click', function (evt) {
      var target = evt.target;
      while (!target.classList.contains('picture')) {
        target = target.parentNode;
        if (target.classList.contains('pictures')) {
          evt.stopPropagation();
          return;
        }
      }
      evt.stopPropagation();
      var id = target.getAttribute('data-id');
      window.initBigPicture(window.otherUsersPictures[id]);

    });
  };

  //  Загружаем данные с сервера и инициируем отрисовку фотографии других пользователей.

  window.backend.load(successLoadHandler, errorLoadHandler);

  imgFilters.addEventListener('click', filtersClickHandler);
})();
