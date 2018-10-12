'use strict';

(function () {
  var LOADING_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVING_URL = 'https://js.dump.academy/kekstagram';
  var REQUEST_STATUS_OK = 200;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === REQUEST_STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.open('GET', LOADING_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === REQUEST_STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.open('post', SAVING_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
