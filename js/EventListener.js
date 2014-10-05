(function() {
  /**
   * @Class EventListener
   * @param callback
   * @constructor
   */
  window.EventListener = function (callback) {
    this.callback = callback;
    this.name = this.callback.name;
  };
}());
