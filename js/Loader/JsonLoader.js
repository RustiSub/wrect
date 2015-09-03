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
   * @param url {String} The url of the JSON file
   */
  wrect.Loader.JsonLoader = function (url) {

    /**
     * URL of the file to load
     * @property url
     * @type {String}
     */
    this.url = url;

    /**
     * [read-only] The base url
     *
     * @property baseUrl
     * @type String
     * @readOnly
     */
    this.baseUrl = url.replace(/[^\/]*$/, '');

    /**
     * [read-only] Whether the data has loaded yet
     *
     * @property loaded
     * @type Boolean
     * @readOnly
     */
    this.loaded = false;

  };

  /**
   * Loads the JSON data
   * @method load
   * @param {Function} [onLoadCallback]
   */
  wrect.Loader.JsonLoader.prototype.load = function (onLoadCallback) {

    var self = this;

    if (window.XMLHttpRequest)
    {
        this.ajaxRequest = new window.XMLHttpRequest();
    }
    else
    {
      this.ajaxRequest = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    this.ajaxRequest.onload = function(){
      self.onJSONLoaded();
      if (onLoadCallback) {
        onLoadCallback(self.ajaxRequest);
      }
    };

    this.ajaxRequest.open('GET',this.url,true);

    this.ajaxRequest.send();
  };

  /**
   * Parse the response and fire the loaded event.
   */
  wrect.Loader.JsonLoader.prototype.onJSONLoaded = function() {
    if (this.ajaxRequest.responseText) {
      this.json = JSON.parse(this.ajaxRequest.responseText);
      this.loaded = true;

      game.getEventManager().trigger('JsonLoader.done', this.ajaxRequest);
    }
  };
}());
