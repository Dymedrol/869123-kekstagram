'use strict';

(function () {
  var LOADING_URL = 'https://js.dump.academy/kekstagram/data';
  var SAVING_URL = 'https://js.dump.academy/kekstagram';
  var REQUEST_STATUS_OK = 200;
  var xhr;

  var createRequest = function (onLoad, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === REQUEST_STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
  };

  var load = function (onLoad, onError) {
    createRequest(onLoad, onError);
    xhr.open('GET', LOADING_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    createRequest(onLoad, onError);
    xhr.open('post', SAVING_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
