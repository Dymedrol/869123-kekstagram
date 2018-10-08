'use strict';

(function () {

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

  // Возвращает массив "комментариев", с количеством элементов commentAmount.

  var getComments = function (commentAmount) {
    var commentsList = [];
    for (var i = 0; i < commentAmount; i++) {
      commentsList[i] = COMMENTS[window.getRandonNumber(0, COMMENTS.length - 1)];
    }
    return commentsList;
  };

  // Возвращает массив картинок случайных пользователей

  window.getCards = function () {
    var pictures = [];
    for (var i = 1; i <= PICTURES_AMOUNT; i++) {
      pictures.push({
        url: 'photos/' + i + '.jpg',
        likes: window.getRandonNumber(LIKES_MIN_AMOUNT, LIKES_MAX_AMOUNT),
        comments: getComments(window.getRandonNumber(1, 6)),
        description: DESCRIPTIONS[window.getRandonNumber(0, DESCRIPTIONS.length - 1)]
      });
    }
    return pictures;
  };

})();
