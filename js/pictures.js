'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var PICTURES_AMOUNT = 25;
var LIKES_MIN_AMOUNT = 15;
var LIKES_MAX_AMOUNT = 200;

var picturesList = document.querySelector('.pictures');

// Возвращает случайное число от min до max

var getRandonNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// возвращает фрагмент из массива elements;

var getFragment = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }
  return fragment;
};

// Возвращает массив "комментариев", с количеством элементов commentAmount.

var getComments = function (commentAmount) {
  var commentsList = [];
  for (var i = 0; i < commentAmount; i++) {
    commentsList[i] = COMMENTS[getRandonNumber(0, COMMENTS.length - 1)];
  }
  return commentsList;
};

// Возвращает массив картинок случайных пользователей

var getCards = function () {
  var pictures = [];
  for (var i = 1; i <= PICTURES_AMOUNT; i++) {
    pictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandonNumber(LIKES_MIN_AMOUNT, LIKES_MAX_AMOUNT),
      comments: getComments(getRandonNumber(1, 6)),
      description: DESCRIPTIONS[getRandonNumber(0, DESCRIPTIONS.length - 1)]
    });
  }
  return pictures;
};

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

// инициирование фотографии др. пользователей

var initOtherUsersPictures = function () {
  picturesList.appendChild(getFragment(renderCards(otherUsersPictures)));
};

var initBigPicture = function () {
  // Показываем элемент .big-picture
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  // Закрываем элемент .big-picture по клику на крестик
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  // Заполняем данными
  bigPicture.querySelector('img').src = otherUsersPictures[0].url;
  bigPicture.querySelector('.likes-count').textContent = otherUsersPictures[0].likes;
  bigPicture.querySelector('.comments-count').textContent = otherUsersPictures[0].comments.length;
  bigPicture.querySelector('.social__caption').textContent = otherUsersPictures[0].description;

  // генерирует элементы с комментариями
  var getBigPictureComment = function (comments) {

    var socialComments = [];

    for (var i = 0; i < comments.length; i++) {
      var socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');
      var picture = document.createElement('img');
      picture.classList.add('social__picture');
      picture.src = 'img/avatar-' + getRandonNumber(1, 6) + '.svg';
      picture.alt = 'Аватар комментатора фотографии';
      socialComment.appendChild(picture);
      var socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = comments[i];
      socialComment.appendChild(socialText);
      socialComments.push(socialComment);
    }
    return getFragment(socialComments);
  };

  document.querySelector('.social__comments').appendChild(getBigPictureComment(otherUsersPictures[0].comments));
};

// Получаем данные картинок др. пользователей, записываем в глобальную переменную "otherUsersPictures"

var otherUsersPictures = getCards();

initOtherUsersPictures();

// убираем блоки счётчика комментариев
document.querySelector('.social__comment-count').classList.add('visually-hidden');
// убираем блоки загрузки новых комментариев
document.querySelector('.comments-loader').classList.add('visually-hidden');

// объявление переменных

var ESC_KEYCODE = 27;

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');

// После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.

uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
});

// Закрытие формы редактирования изображения по клику на кнопку .upload-cancel

imgUploadCancel.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

// Закрытие формы редактирования изображения по нажатию на кнопку ESC

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlay.classList.add('hidden');
  }
});

// Нажатие на фотографию приводит к показу фотографии в полноэкранном режиме

var picturesListElements = picturesList.querySelectorAll('a');

for (var i = 0; i < picturesListElements.length; i++) {
  picturesListElements[i].addEventListener('click', function () {
    initBigPicture();
  });
}

// Сброс настроек фильтров при переключении

var resetEffects = function () {
  imgUploadPreview.removeAttribute('style');
};

// Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin

var EFFECT_LEVEL_LINE = 453;
var effectIntensionLevel = 100;
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.img-upload__effect-level');

effectLevelLine.classList.add('hidden');

effectLevelPin.addEventListener('mouseup', function () {
  var pinPosition = (getComputedStyle(effectLevelPin));
  effectIntensionLevel = Math.round((parseInt(pinPosition.left, 10) * 100) / EFFECT_LEVEL_LINE);

  switch (imgUploadPreviewCurentClass) {
    case 'effects__preview--chrome': imgUploadPreview.style.filter = 'grayscale(' + (effectIntensionLevel / 100) + ')';
      break;
    case 'effects__preview--sepia': imgUploadPreview.style.filter = 'sepia(' + (effectIntensionLevel / 100) + ')';
      break;
    case 'effects__preview--marvin': imgUploadPreview.style.filter = 'invert(' + effectIntensionLevel + '%)';
      break;
    case 'effects__preview--phobos': imgUploadPreview.style.filter = 'blur(' + Math.round(effectIntensionLevel / 30) + 'px)';
      break;
    case 'effects__preview--heat': imgUploadPreview.style.filter = 'brightness(' + Math.ceil(effectIntensionLevel / 30) + ')';
      break;
  }

});

// Применение эффекта для изображения

var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
var imgUploadPreviewCurentClass = 'effects__preview--none';

var effectsList = document.querySelector('.effects__list').querySelectorAll('li');

var effectChangeHandler = function () {
  var currentValue = this.value;

  if (currentValue === 'none') {
    effectLevelLine.classList.add('hidden');
  } else {
    effectLevelLine.classList.remove('hidden');
  }

  resetEffects();
  effectIntensionLevel = 100;
  imgUploadPreview.classList.remove(imgUploadPreviewCurentClass);

  switch (currentValue) {
    case 'none': imgUploadPreviewCurentClass = 'effects__preview--none';
      break;
    case 'chrome': imgUploadPreviewCurentClass = 'effects__preview--chrome';
      break;
    case 'sepia': imgUploadPreviewCurentClass = 'effects__preview--sepia';
      break;
    case 'marvin': imgUploadPreviewCurentClass = 'effects__preview--marvin';
      break;
    case 'phobos': imgUploadPreviewCurentClass = 'effects__preview--phobos';
      break;
    case 'heat': imgUploadPreviewCurentClass = 'effects__preview--heat';
      break;
  }

  imgUploadPreview.classList.add(imgUploadPreviewCurentClass);
};

var createEffectsListener = function () {
  for (var j = 0; j < effectsList.length; j++) {
    effectsList[j].querySelector('input').addEventListener('change', effectChangeHandler);
  }
};

createEffectsListener();

