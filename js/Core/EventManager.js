(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  /**
   * Wrapper class for Minivents
   * @type {Events}
   * @class wrect.Core.EventManager
   * @constructor
   */
  wrect.Core.EventManager = function() {
    window.Events.call(this);
  };

  /**
   * Inheritance logic
   */
  wrect.Core.EventManager.prototype = Object.create( Events.prototype );
  wrect.Core.EventManager.prototype.constructor = window.EventManager;
  
  /**
   * Triggers an event
   * @param type
   * @param [data]
   */
  wrect.Core.EventManager.prototype.trigger = function(type, data) {
    this.emit(type, data);
  };

  /**
   * Subscribes a listener to an event
   * @param type
   * @param func
   * @param [ctx]
   */
  wrect.Core.EventManager.prototype.addListener = function(type, func, ctx) {
    this.on(type, func, ctx);
  };

  /**
   * Removes a listener to an event
   * @param type
   * @param func
   */
  wrect.Core.EventManager.prototype.removeListener = function(type, func) {
    this.off(type, func);
  };
}());
