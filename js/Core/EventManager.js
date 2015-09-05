(function() {
  "use strict";

  /**
   * Wrapper class for Minivents
   * @type {Events}
   * @class EventManager
   * @constructor
   */
  var EventManager = function() {
    window.Event.call(this);
  };

  /**
   * Inheritance logic
   */
  EventManager.prototype = Object.create( Event.prototype );
  EventManager.prototype.constructor = window.EventManager;
  
  /**
   * Triggers an event
   * @param type
   * @param [data]
   */
  EventManager.prototype.trigger = function(type, data) {
    this.emit(type, data);
  };

  /**
   * Subscribes a listener to an event
   * @param type
   * @param func
   * @param [ctx]
   */
  EventManager.prototype.addListener = function(type, func, ctx) {
    this.on(type, func, ctx);
  };

  /**
   * Removes a listener to an event
   * @param type
   * @param func
   */
  EventManager.prototype.removeListener = function(type, func) {
    this.off(type, func);
  };

  module.exports = EventManager;
}());
