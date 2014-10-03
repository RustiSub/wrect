(function() {
  /**
   * @class EventManager
   * @constructor
   */
  window.EventManager = function() {
    this.events = [];
    this.listeners = {};
  };

  /**
   * Creates an event
   * @param name
   */
  window.EventManager.prototype.createEvent = function(name) {
    if (this.events.indexOf(name) !== -1) {
      this.events.push(name);
      this.listeners[name] = [];
    }
    else {
      console.warn('The event you are trying to create already exists', name);
    }
  };

  /**
   * Add a listener to an existing event
   * @param eventName
   * @param listenerFunction
   * @param data
   * @returns {*}
   */
  window.EventManager.prototype.addListener = function(eventName, listenerFunction, data) {
    if (this.events.indexOf(eventName) === -1) {
      return console.warn('The event ' + eventName + ' does not yet exist. Add it with EventManager.createEvent');
    }
    this.listeners[eventName].push({
      callback: listenerFunction,
      data: data,
      name: listenerFunction.name
    });
  };

  /**
   * Remove a listener from an existing event
   * @param eventName
   * @param listenerFunctionName
   * @returns {*}
   */
  window.EventManager.prototype.removeListener = function(eventName, listenerFunctionName) {
    if (this.events.indexOf(eventName) === -1) {
      return console.warn('The event ' + eventName + ' does not yet exist. Add it with EventManager.createEvent');
    }
    for (var i = 0, length = this.events.length; i < length; i++) {
      var event = this.listeners[i];
      for (var x in event) {
        var listener = event[x];
        if (listener.name === listenerFunctionName) {
          this.listeners[i][x] = null;
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Fire an existing event
   * @param eventName
   * @returns {*}
   */
  window.EventManager.prototype.fire = function(eventName) {
    if (this.events.indexOf(eventName) === -1) {
      return console.warn('The event ' + eventName + ' does not yet exist. Add it with EventManager.createEvent');
    }
    var listeners = this.listeners[eventName];
    for (var x in listeners) {
      var listener = listeners[x];
      listener.callback(listener.data);
    }
  }
}());
