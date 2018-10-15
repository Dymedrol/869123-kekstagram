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
    window.otherUsersPictures = inputData.map(function (element) {
      return {
        url: element.url,
        likes: element.likes,
        comments: element.comments,
        description: window.descriptions[window.setup.getRandomNumber(0, window.descriptions.length - 1)]
      };
    });
  };

  // При удачной загрузке данных отрисовываем галлерею
  var successLoadHandler = function (data) {
    loadedImages = data;
    imgFilters.classList.remove('img-filters--inactive');
    getCards(data);
    window.gallery.initOtherUsersPictures();
    var picturesListElements = window.setup.picturesList.querySelectorAll('a');
    window.gallery.getId(picturesListElements);
    setOpenBigPictureListener();
  };

  var errorLoadHandler = function () {
    window.setup.showError();
  };

  // Хэндлера нажатия на фильтры
  var filtersClickHandler = function (evt) {
    var pics = window.setup.picturesList.querySelectorAll('.picture');
    if (evt.target.type !== 'button') {
      return;
    }

    pics.forEach(function (element) {
      window.setup.picturesList.removeChild(element);
    });

    switch (evt.target.id) {
      case 'filter-popular': getPopularPictures();
        break;
      case 'filter-new': getNewPictures();
        break;
      case 'filter-discussed': getDiscussedPictures();
    }

    var changeFilter = function () {
      getCards(filtredImages);
      window.gallery.initOtherUsersPictures();
      var picturesListElements = window.setup.picturesList.querySelectorAll('a');
      window.gallery.getId(picturesListElements);
    };
    window.setup.debounce(changeFilter);
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
      newImages.forEach(function (element, i) {
        var index = window.setup.getRandomNumber(0, pictures.length - 1);
        randomImages[i] = pictures[index];
        pictures.splice(index, 1);
      });
    };

    getRandomPictures(newImages);

    filtredImages = randomImages.slice(0, NEW_PICTURES_AMOUNT);
  };

  // при нажатии на "Обсуждаемые"
  var getDiscussedPictures = function () {
    discussedButton.classList.add('img-filters__button--active');
    newButton.classList.remove('img-filters__button--active');
    popularButton.classList.remove('img-filters__button--active');
    filtredImages = [];

    var sortPicsByComments = function (picA, picB) {
      return picB.comments.length - picA.comments.length;
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
