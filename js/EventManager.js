(function() {
  /**
   * Wrapper class for Minivents
   * @type {Events}
   * @class window.EventManager
   * @constructor
   */
  window.EventManager = function() {
    window.Events.call(this);
  };

  /**
   * Inheritance logic
   */
  window.EventManager.prototype = Object.create( Events.prototype );
  window.EventManager.prototype.constructor = window.EventManager;
  
  /**
   * Triggers an event
   * @param type
   */
  window.EventManager.prototype.trigger = function(type) {
    this.emit(type);
  };

  /**
   * Subscribes a listener to an event
   * @param type
   * @param func
   * @param ctx
   */
  window.EventManager.prototype.addListener = function(type, func, ctx) {
    this.on(type, func, ctx);
  };

  /**
   * Removes a listener to an event
   * @param type
   * @param func
   */
  window.EventManager.prototype.removeListener = function(type, func) {
    this.off(type, func);
  };
}());
