(function(){
  'use strict';

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
  var AssetLoader = function (urls, callback) {

    //var loader = new PIXI.AssetLoader(urls);
    //loader.load();
    //loader.addEventListener('onComplete', callback);
    var loader = PIXI.loader;

    loader.add(urls);
    loader.on('complete', callback);
    loader.load();
  };

  module.exports = AssetLoader;
}());
