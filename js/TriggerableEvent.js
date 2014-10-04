(function() {
  /**
   * @Class TriggerableEvent
   * @param name
   * @constructor
   */
  window.TriggerableEvent = function (name) {
    this.name = name;
    this.listeners = [];
  };

  /**
   * Add an event listener
   * @param {EventListener} listener
   */
  window.TriggerableEvent.prototype.addListener = function(listener) {
    this.listeners.push(listener);
  };

  /**
   * Remove an event listener
   * @param listenerFunction
   * @returns {boolean}
   */
  window.TriggerableEvent.prototype.removeListener = function(listenerFunction) {
    if (typeof listenerFunction === 'function') {
      listenerFunction = listenerFunction.name;
    }
    for (var i = 0, length = this.listeners.length; i < length; i++) {
        var listener = this.listeners[i];
        if (listener.name === listenerFunction) {
          this.listeners.splice(i, 1);
          return true;
        }
    }
    return false;
  };

  /**
   * Trigger an event, executing all the listeners
   */
  window.TriggerableEvent.prototype.trigger = function() {
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i].callback();
    }
  };
}());
