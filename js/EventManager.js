(function() {
  /**
   * @class EventManager
   * @constructor
   */
  window.EventManager = function() {
    this.events = {};
  };

  /**
   * Creates an event
   * @param name
   */
  window.EventManager.prototype.createEvent = function(name) {
    this.events[name] = new window.TriggerableEvent(name);
  };

  /**
   * Add a listener to an existing event
   * @param eventName
   * @param listenerFunction
   * @returns {*}
   */
  window.EventManager.prototype.addListener = function(eventName, listenerFunction) {
    if (this.events[eventName] !== undefined) {
      this.listeners[eventName].push(new window.EventListener(listenerFunction));
    }
  };

  /**
   * Remove a listener from an existing event
   * @param eventName
   * @param listenerFunctionName
   * @returns {*}
   */
  window.EventManager.prototype.removeListener = function(eventName, listenerFunctionName) {
    this.events[eventName].removeListener(listenerFunctionName);
  };

  /**
   * Fire an existing event
   * @param eventName
   * @returns {*}
   */
  window.EventManager.prototype.fire = function(eventName) {
    this.events[eventName].trigger();
  };
}());
