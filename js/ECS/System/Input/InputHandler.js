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
    var controlMap = entity.components.ControlMap;
    var pressedKeys = event.pressedKeys;
    var releasedKeys = event.releasedKeys;

    for (var releasedKeysIndex in releasedKeys) if (releasedKeys.hasOwnProperty(releasedKeysIndex)) {
      var releasedKey = releasedKeys[releasedKeysIndex];

      this.refreshAction(releasedKey, contextMap, controlMap);
    }

    for (var pressedKeysIndex in pressedKeys) if (pressedKeys.hasOwnProperty(pressedKeysIndex)) {
      var pressedKey = pressedKeys[pressedKeysIndex];

      this.handleAction(pressedKey, contextMap, controlMap);

      if (pressedKey in contextMap.states) {
        //this.handleState(contextMap, pressedKey);
        //continue;
      }

      if (pressedKey in contextMap.ranges) {
        //this.handleRange(contextMap, pressedKey);
        //continue;
      }
    }
  };

  wrect.ECS.System.InputHandler.prototype.refreshAction = function(releasedKey, contextMap) {
    //console.log(releasedKey);
    if (releasedKey in contextMap.actions) {
      var action = contextMap.actions[releasedKey];

      action.state = 0;
    }
  };

  wrect.ECS.System.InputHandler.prototype.handleAction = function(pressedKey, contextMap, controlMap) {
    if (pressedKey in contextMap.actions) {
      var action = contextMap.actions[pressedKey];

      if (action.state === 0) {
        controlMap.actions.push(action);
        action.state = 1;
      }
    }
  }
}());
