'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var STEP = 25;
  var EFFECT_LEVEL_LINE = 453;

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var effectLevelLine = document.querySelector('.img-upload__effect-level');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var scaleInput = document.querySelector('.scale__control--value');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var scaleLevel = 100;

  effectLevelValue.value = 100;

  effectLevelLine.classList.add('hidden');
  var imgUploadPreviewCurrentClass = 'effects__preview--none';
  var currentValue = 'none';

  window.inputForm = {
    main: document.querySelector('main'),

    // функция сброса формы загрузки
    resetPictureEdition: function () {
      scaleLevel = 100;
      imgUploadInput.value = '';
      textHashtags.value = '';
      textDescription.value = '';
      imgUploadPreviewCurrentClass = 'effects__preview--' + currentValue;
      imgUploadPreview.classList.remove(imgUploadPreviewCurrentClass);
      imgUploadPreviewCurrentClass = 'effects__preview--none';
      effectLevelLine.classList.add('hidden');
      resetEffects();
    }
  };

  // После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
  var imgUploadInput = document.querySelector('.img-upload__input');

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    scaleInput.value = scaleLevel + '%';
    changeScale(scaleLevel);
    document.addEventListener('keydown', closeImgUploadOverlayHandler);
  });

  // функция закрытия формы редактирования изображения
  var closePictureEdition = function () {
    imgUploadOverlay.classList.add('hidden');
    window.inputForm.resetPictureEdition();
    document.removeEventListener('keydown', closeImgUploadOverlayHandler);
  };

  // Закрытие формы редактирования изображения по нажатию на кнопку ESC
  var closeImgUploadOverlayHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== textHashtags && evt.target !== textDescription) {
      closePictureEdition();
    }
  };

  // Закрытие формы редактирования изображения по клику на кнопку .upload-cancel
  imgUploadCancel.addEventListener('click', function () {
    closePictureEdition();
  });

  // Сброс настроек фильтров при переключении
  var resetEffects = function () {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    effectLevelValue.value = 100;
    imgUploadPreview.removeAttribute('style');
  };

  // Применение эффекта для изображения
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  var effectChangeHandler = function (evt) {
    currentValue = evt.target.value;

    var changeEffect = function () {
      if (currentValue === 'none') {
        effectLevelLine.classList.add('hidden');
      } else {
        effectLevelLine.classList.remove('hidden');
      }
      resetEffects();
      effectIntensionLevel = 100;
      imgUploadPreview.classList.remove(imgUploadPreviewCurrentClass);
      imgUploadPreviewCurrentClass = 'effects__preview--' + currentValue;
      imgUploadPreview.classList.add(imgUploadPreviewCurrentClass);
    };
    window.setup.debounce(changeEffect);
  };

  document.querySelectorAll('input[name="effect"]').forEach(function (input) {
    input.addEventListener('change', effectChangeHandler);
  });

  // Проверка Хэш-тегов
  var hashtagInput = document.querySelector('.text__hashtags');

  hashtagInput.addEventListener('change', function () {
    hashtagInput.setCustomValidity('');
    var value = hashtagInput.value;
    value = value.replace(/\s+/g, ' ');
    value = value.trim();
    var hashtags = value.split(' ');
    var obj = {};

    hashtags.forEach(function (item) {
      item = item.toLowerCase();
      obj[item] = true;
    });

    var uniqueHashtagsAmount = Object.keys(obj).length;

    if (uniqueHashtagsAmount !== hashtags.length) {
      hashtagInput.style.color = 'red';
      hashtagInput.setCustomValidity('Одинаковые хэштеги!!!!');
    } else {
      hashtagInput.removeAttribute('style');
    }
  });


  // Открытие сообщения об отправке
  var successWindowTemplate = document.querySelector('#success').content.querySelector('.success');

  var successHandler = function () {
    var closeSuccessWindow = function () {
      window.inputForm.main.removeChild(successWindow);
    };

    var successButtonClickHandler = function (evt) {
      var popUp = document.querySelector('.success');

      if (evt.target === popUp || evt.target === successButton) {
        closeSuccessWindow();
        document.removeEventListener('click', successButtonClickHandler);
      }
    };

    var successButtonEscPressHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeSuccessWindow();
        document.removeEventListener('keydown', successButtonEscPressHandler);
      }
    };

    document.addEventListener('keydown', successButtonEscPressHandler);

    var successWindow = successWindowTemplate.cloneNode(true);
    window.inputForm.main.appendChild(successWindow);
    imgUploadOverlay.classList.add('hidden');
    imgUploadInput.value = '';
    window.inputForm.resetPictureEdition();

    var successButton = document.querySelector('.success__button');
    document.addEventListener('click', successButtonClickHandler);
  };

  var errorHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    window.setup.showError();
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    var inputs = evt.target.querySelectorAll('input');
    inputs.forEach(function (element) {
      element.removeAttribute('style');
    });
    var array = Array.from(inputs);
    var currentInput;

    var isInvalid = function (element) {
      currentInput = element;
      return element.validity.valid === false;
    };

    if (array.some(isInvalid)) {
      currentInput.setCustomValidity('Ошибочка!!!');
      currentInput.style.color = 'red';
      return;
    }

    window.backend.save(new FormData(imgUploadSubmit), successHandler, errorHandler);
  };

  var imgUploadSubmit = document.querySelector('.img-upload__form');

  imgUploadSubmit.addEventListener('submit', submitHandler);

  // Изменение маштаб изображения
  var minusButton = document.querySelector('.scale__control--smaller');
  var plusButton = document.querySelector('.scale__control--bigger');

  var changeScale = function (scaleValue) {
    scaleInput.value = scaleValue + '%';
    imgUploadPreview.parentNode.style.transform = 'scale(' + scaleValue / 100 + ')';
  };

  var minusClickHandler = function () {
    scaleLevel = scaleLevel - STEP;
    if (scaleLevel <= 25) {
      scaleLevel = 25;
    }
    changeScale(scaleLevel);
  };

  var plusClickHandler = function () {
    scaleLevel = scaleLevel + STEP;
    if (scaleLevel >= 100) {
      scaleLevel = 100;
    }
    changeScale(scaleLevel);
  };

  minusButton.addEventListener('click', minusClickHandler);
  plusButton.addEventListener('click', plusClickHandler);

  // Работа слайдера, задает глубину эффекта
  var effectIntensionLevel = 100;
  var effectLevelPin = document.querySelector('.effect-level__pin');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinateX = evt.clientX;

    var levelPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoordinateX - moveEvt.clientX;
      startCoordinateX = moveEvt.clientX;
      var currentCoordinate = effectLevelPin.offsetLeft - shift;

      if (currentCoordinate >= 0 && currentCoordinate <= EFFECT_LEVEL_LINE) {
        effectLevelPin.style.left = currentCoordinate + 'px';
      }

      var pinPosition = getComputedStyle(effectLevelPin);
      effectIntensionLevel = Math.round((parseInt(pinPosition.left, 10) * 100) / EFFECT_LEVEL_LINE);
      effectLevelDepth.style.width = effectIntensionLevel + '%';
      effectLevelValue.value = effectIntensionLevel;

      var setEffect = function () {
        switch (imgUploadPreviewCurrentClass) {
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
      setEffect();
    };

    var levelPinMouseUpHandler = function (moveUpEvt) {
      moveUpEvt.preventDefault();
      document.removeEventListener('mousemove', levelPinMouseMoveHandler);
      document.removeEventListener('mouseup', levelPinMouseUpHandler);
    };

    document.addEventListener('mousemove', levelPinMouseMoveHandler);
    document.addEventListener('mouseup', levelPinMouseUpHandler);
  });
})();
