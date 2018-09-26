'use strict';

var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DISCRIPTIONS = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var PICTURES_AMOUNT = 25;
var LIKES_MIN_AMOUNT = 15;
var LIKES_MAX_AMOUNT = 200;

var picturesList = document.querySelector('.pictures');
var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandonNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getComments = function (commentAmount) {
  var commentsList = [];
  for (var i = 0; i < commentAmount; i++) {
    commentsList[i] = COMMENTS[getRandonNumber(0, COMMENTS.length - 1)];
  }
  return commentsList;
};

var getCards = function () {
  var pictures = [];
  for (var i = 0; i <= PICTURES_AMOUNT - 1; i++) {
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandonNumber(LIKES_MIN_AMOUNT, LIKES_MAX_AMOUNT),
      comments: getComments(getRandonNumber(1, 6)),
      description: DISCRIPTIONS[getRandonNumber(0, DISCRIPTIONS.length - 1)]
    };
  }
  return pictures;
};

var renderCard = function (cards) {
  var element = picturesTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = cards.url;
  element.querySelector('.picture__likes').textContent = cards.likes;
  element.querySelector('.picture__comments').textContent = cards.comments.length;
  return element;
};

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureCards.length; i++) {
    fragment.appendChild(renderCard(pictureCards[i]));
  }
  return fragment;
};

var pictureCards = getCards();

picturesList.appendChild(getFragment());

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('img').src = pictureCards[0].url;
bigPicture.querySelector('.likes-count').textContent = pictureCards[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictureCards[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = pictureCards[0].description;

var getBigPictureComment = function (comments) {
  var socialComments = document.createDocumentFragment();
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
    socialComments.appendChild(socialComment);
  }
  return socialComments;
};

document.querySelector('.social__comments').appendChild(getBigPictureComment(pictureCards[0].comments));

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
