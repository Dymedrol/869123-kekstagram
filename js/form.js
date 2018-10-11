'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var effectLevelLine = document.querySelector('.img-upload__effect-level');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');

  // После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
  var imgUploadInput = document.querySelector('.img-upload__input');

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', closeImgUploadOverlayHandler);
  });

  // Закрытие формы редактирования изображения по нажатию на кнопку ESC
  var textHashtags = document.querySelector('.text__hashtags');

  var closeImgUploadOverlayHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== textHashtags) {
      imgUploadOverlay.classList.add('hidden');
      imgUploadInput.value = '';
      document.removeEventListener('keydown', closeImgUploadOverlayHandler);
    }
  };

  // Закрытие формы редактирования изображения по клику на кнопку .upload-cancel

  imgUploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadInput.value = '';
    document.removeEventListener('keydown', closeImgUploadOverlayHandler);
  });

  // Сброс настроек фильтров при переключении

  var resetEffects = function () {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    effectLevelValue.value = 100;
    imgUploadPreview.removeAttribute('style');
  };


  effectLevelLine.classList.add('hidden');

  // Применение эффекта для изображения

  var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var imgUploadPreviewCurentClass = 'effects__preview--none';
  var lastTimeout;

  var effectChangeHandler = function (evt) {
    var currentValue = evt.target.value;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      if (currentValue === 'none') {
        effectLevelLine.classList.add('hidden');
      } else {
        effectLevelLine.classList.remove('hidden');
      }

      resetEffects();
      effectIntensionLevel = 100;
      imgUploadPreview.classList.remove(imgUploadPreviewCurentClass);
      imgUploadPreviewCurentClass = 'effects__preview--' + currentValue;
      imgUploadPreview.classList.add(imgUploadPreviewCurentClass);
    }, 500);
  };

  document.querySelectorAll('input[name="effect"]').forEach(function (input) {
    input.addEventListener('change', effectChangeHandler);
  });

  // Открытие сообщения об отправке

  var main = document.querySelector('main');

  var successWindowTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');

  var successHandler = function () {
    var successWindow = successWindowTemplate.cloneNode(true);
    main.appendChild(successWindow);
    imgUploadOverlay.classList.add('hidden');
    imgUploadInput.value = '';
  };

  var errorHandler = function () {
    var errorWindow = errorWindowTemplate.cloneNode(true);
    main.appendChild(errorWindow);
  };

  var submitHandler = function (evt) {
    var inputs = evt.target.querySelectorAll('input');

    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].validity.valid) {
        main.appendChild(errorWindowTemplate);
      } else {
        window.backend.save(new FormData(imgUploadSubmit), successHandler, errorHandler);
      }
    }
  };

  var imgUploadSubmit = document.querySelector('.img-upload__form');

  imgUploadSubmit.addEventListener('submit', submitHandler);

  // Работа слайдера, задает глубину эффекта

  var EFFECT_LEVEL_LINE = 453;
  var effectIntensionLevel = 100;
  var effectLevelPin = document.querySelector('.effect-level__pin');


  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var LevelPinMouseMoveHandler = function (moveEvt) {

      moveEvt.preventDefault();
      var shift = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;
      var curentCoords = (effectLevelPin.offsetLeft - shift);

      if (curentCoords <= 0) {
        effectLevelPin.style.left = 0;
      } else if (curentCoords >= EFFECT_LEVEL_LINE) {
        effectLevelPin.style.left = EFFECT_LEVEL_LINE;
      } else {
        effectLevelPin.style.left = curentCoords + 'px';
      }

      var pinPosition = (getComputedStyle(effectLevelPin));

      effectIntensionLevel = Math.round((parseInt(pinPosition.left, 10) * 100) / EFFECT_LEVEL_LINE);

      effectLevelDepth.style.width = effectIntensionLevel + '%';
      effectLevelValue.value = effectIntensionLevel;

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
    };

    var levelPinMouseUpHandler = function (moveUpEvt) {
      moveUpEvt.preventDefault();

      document.removeEventListener('mousemove', LevelPinMouseMoveHandler);
      document.removeEventListener('mouseup', levelPinMouseUpHandler);
    };

    document.addEventListener('mousemove', LevelPinMouseMoveHandler);
    document.addEventListener('mouseup', levelPinMouseUpHandler);
  });

})();
