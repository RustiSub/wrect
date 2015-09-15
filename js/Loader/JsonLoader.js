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
   */
  var JsonLoader = function (options) {

    /**
     * URL of the file to load
     * @property url
     * @type {String}
     */
    this.url = options.url;


    this.eventManager = options.eventManager;

    /**
     * [read-only] The base url
     *
     * @property baseUrl
     * @type String
     * @readOnly
     */
    this.baseUrl = this.url.replace(/[^\/]*$/, '');

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
  JsonLoader.prototype.load = function (onLoadCallback) {

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
  JsonLoader.prototype.onJSONLoaded = function() {
    if (this.ajaxRequest.responseText) {
      this.json = JSON.parse(this.ajaxRequest.responseText);
      this.loaded = true;

      this.eventManager.trigger('JsonLoader.done', this.ajaxRequest);
    }
  };

  module.exports = JsonLoader;
}());
