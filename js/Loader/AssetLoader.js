(function(){
  'use strict';
  var wrect = window.wrect;

  wrect.Loader = wrect.Loader || {};

  /**
   * The json file loader is used to load in JSON data and parse it
   * When loaded this class will dispatch a 'loaded' event
   * If loading fails this class will dispatch an 'error' event
   *
   * @class JsonLoader
   * @uses EventTarget
   * @constructor
   * @param urls {Array} Array of urls to resources
   * @param callback
   */
  wrect.Loader.AssetLoader = function (urls, callback) {

  };
}());
