'use strict';

(function () {

  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  window.otherUsersPictures = [];

  window.getCards = function (inputData) {
    var pictures = [];
    for (var i = 0; i < inputData.length; i++) {
      pictures.push({
        url: inputData[i].url,
        likes: inputData[i].likes,
        comments: inputData[i].comments,
        description: DESCRIPTIONS[window.getRandonNumber(0, DESCRIPTIONS.length - 1)]
      });
    }

    window.otherUsersPictures = pictures;
  };

})();
