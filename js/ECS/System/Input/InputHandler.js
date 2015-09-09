(function() {
  "use strict";

  var BaseSystem = require('../BaseSystem');

  /**
   * @constructor
   */
  var InputHandler = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};

    this.eventManager = options.eventManager;

    this.eventManager.addListener('raw_input_handler.context.perform', this.handleInput, this);
  };

  InputHandler.prototype = Object.create( BaseSystem.prototype );
  InputHandler.prototype.constructor = InputHandler;
  InputHandler.prototype.name = 'InputHandler';

  InputHandler.prototype.checkDependencies = function(entity) {
    return false;
  };

  InputHandler.prototype.perform = function(entity) {};

  /**
   * @param event
   */
  InputHandler.prototype.handleInput = function(event) {
    var entity = event.entity;
    var contextMap = entity.components.ContextMap;
    var controlMap = entity.components.ControlMap;
    var pressedKeys = event.pressedKeys;
    var releasedKeys = event.releasedKeys;
    var types = event.types;

    for (var releasedKeysIndex in releasedKeys) if (releasedKeys.hasOwnProperty(releasedKeysIndex)) {
      var releasedKey = releasedKeys[releasedKeysIndex];

      this.refreshAction(releasedKey, contextMap, controlMap);
    }

    for (var pressedKeysIndex in pressedKeys) if (pressedKeys.hasOwnProperty(pressedKeysIndex)) {
      var pressedKey = pressedKeys[pressedKeysIndex];

      this.handleAction(pressedKey, contextMap, controlMap);
      this.handleState(pressedKey, contextMap, controlMap);
    }

    for (var typesIndex in types) if (types.hasOwnProperty(typesIndex)) {
      var type = types[typesIndex];
      this.handleRange(type, typesIndex, contextMap, controlMap);
    }
  };

  InputHandler.prototype.refreshAction = function(releasedKey, contextMap) {
    if (releasedKey in contextMap.actions) {
      var action = contextMap.actions[releasedKey];

      action.state = wrect.ECS.Component.Input.Constants.STATES.OFF;
    }
  };

  InputHandler.prototype.handleAction = function(pressedKey, contextMap, controlMap) {
    if (pressedKey in contextMap.actions) {
      var action = contextMap.actions[pressedKey];

      if (action.state === wrect.ECS.Component.Input.Constants.STATES.OFF) {
        controlMap.actions.push(action);
        action.state = wrect.ECS.Component.Input.Constants.STATES.ON;
      }
    }
  };

  InputHandler.prototype.handleState = function(pressedKey, contextMap, controlMap) {
    if (pressedKey in contextMap.states) {
      var action = contextMap.states[pressedKey];

      controlMap.actions.push(action);
    }
  };

  InputHandler.prototype.handleRange = function(type, typesIndex, contextMap, controlMap) {
    if (typesIndex in contextMap.ranges) {
      var range = contextMap.ranges[typesIndex];

      if (!(range in controlMap.actions)) {
        range.values = type;
        controlMap.actions.push(range);
      }
    }
  };

  module.exports = InputHandler;
}());
