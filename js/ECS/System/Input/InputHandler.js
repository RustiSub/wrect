(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  /**
   * @constructor
   */
  wrect.ECS.System.InputHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    this.eventManager = options.eventManager;

    this.eventManager.addListener('raw_input_handler.context.perform', this.handleInput, this);
  };

  wrect.ECS.System.InputHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.InputHandler.prototype.constructor = wrect.ECS.System.InputHandler;
  wrect.ECS.System.InputHandler.prototype.name = 'InputHandler';

  wrect.ECS.System.InputHandler.prototype.checkDependencies = function(entity) {
    return false;
  };

  wrect.ECS.System.InputHandler.prototype.perform = function(entity) {};

  /**
   * @param event
   */
  wrect.ECS.System.InputHandler.prototype.handleInput = function(event) {
    var entity = event.entity;

    var contextMap = entity.components.ContextMap;
    var pressedKeys = event.pressedKeys;
    var releasedKeys = event.releasedKeys;
    var types = event.types;

    for (var releasedKeysIndex in releasedKeys) if (releasedKeys.hasOwnProperty(releasedKeysIndex)) {
      var releasedKey = releasedKeys[releasedKeysIndex];

      this.refreshAction(releasedKey, contextMap);
    }

    for (var pressedKeysIndex in pressedKeys) if (pressedKeys.hasOwnProperty(pressedKeysIndex)) {
      var pressedKey = pressedKeys[pressedKeysIndex];

      this.handleAction(pressedKey, contextMap);
      this.handleState(pressedKey, contextMap);
    }

    for (var typesIndex in types) if (types.hasOwnProperty(typesIndex)) {
      var type = types[typesIndex];
      this.handleRange(type, typesIndex, contextMap);
    }
  };

  wrect.ECS.System.InputHandler.prototype.refreshAction = function(releasedKey, contextMap) {
    if (releasedKey in contextMap.actions) {
      var action = contextMap.actions[releasedKey];

      action.state = wrect.ECS.Component.Input.Constants.STATES.OFF;
    }
  };

  wrect.ECS.System.InputHandler.prototype.handleAction = function(pressedKey, contextMap) {
    if (pressedKey in contextMap.actions) {
      var action = contextMap.actions[pressedKey];

      if (action.state === wrect.ECS.Component.Input.Constants.STATES.OFF) {
        this.eventManager.trigger('input_handler.control.perform', {
          action: action
        });
        action.state = wrect.ECS.Component.Input.Constants.STATES.ON;
      }
    }
  };

  wrect.ECS.System.InputHandler.prototype.handleState = function(pressedKey, contextMap) {
    if (pressedKey in contextMap.states) {
      var action = contextMap.states[pressedKey];

      // controlMap.actions.push(action);
      this.eventManager.trigger('input_handler.control.perform', {
        action: action
      });
    }
  };

  wrect.ECS.System.InputHandler.prototype.handleRange = function(type, typesIndex, contextMap) {
    if (typesIndex in contextMap.ranges) {
      var range = contextMap.ranges[typesIndex];

      this.eventManager.trigger('input_handler.control.perform', {
        action: range
      });
    }
  };
}());
