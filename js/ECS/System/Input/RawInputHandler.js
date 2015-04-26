(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.RawInputHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    this.eventManager = options.eventManager;

    this.keys = [];
    this.pressedKeys = [];
    this.pressedKeyEvents = {};
    this.releasedKeys = [];
    var self = this;

    this.captureElement = document.getElementById(this.options.elementId);
    this.captureElement.addEventListener('keydown', function(event) {self.keyDown.call(self, event);});
    this.captureElement.addEventListener('keyup', function(event) {self.keyUp.call(self, event);});

    this.inputHandler = new wrect.ECS.System.InputHandler(options);
  };

  wrect.ECS.System.RawInputHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.RawInputHandler.prototype.constructor = wrect.ECS.System.RawInputHandler;
  wrect.ECS.System.RawInputHandler.prototype.name = 'RawInputHandler';

  wrect.ECS.System.RawInputHandler.prototype.checkDependencies = function(entity) {
    return entity.components.RawInputMap && entity.components.ContextMap ? true : false;
  };

  wrect.ECS.System.RawInputHandler.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
      this.registerRawKeys(data.entity);
    }
  };

  wrect.ECS.System.RawInputHandler.prototype.registerRawKeys = function(entity) {
    var newKeys = entity.components.RawInputMap.keys;

    for (var newKeyIndex in newKeys) if (newKeys.hasOwnProperty(newKeyIndex)) {
      var keyCode = newKeys[newKeyIndex];
      if (this.keys.indexOf(keyCode) === -1) {
        this.keys.push(keyCode);
        this.pressedKeyEvents[keyCode] = false;
      }
    }
  };

  wrect.ECS.System.RawInputHandler.prototype.perform = function(entity) {
    this.eventManager.trigger('raw_input_handler.context.perform', {
      entity: entity,
      pressedKeys: this.pressedKeys,
      releasedKeys: this.releasedKeys
    });

    this.releasedKeys = [];
  };

  wrect.ECS.System.RawInputHandler.prototype.keyDown = function(event) {
    if (this.shouldWatchKey.call(this, event.keyCode) && !this.watchedKey.call(this, event.keyCode)) {
      this.pressedKeys.push(event.keyCode);
      this.releasedKeys.splice(this.releasedKeys.indexOf(event.keyCode), 1);
      this.pressedKeyEvents[event.keyCode] = event;
    }
  };

  wrect.ECS.System.RawInputHandler.prototype.keyUp = function(event) {
    if (this.shouldWatchKey.call(this, event.keyCode) && this.watchedKey.call(this, event.keyCode)) {
      this.pressedKeys.splice(this.pressedKeys.indexOf(event.keyCode), 1);
      this.releasedKeys.push(event.keyCode);
      this.pressedKeyEvents[event.keyCode] = false;
    }
  };

  wrect.ECS.System.RawInputHandler.prototype.shouldWatchKey = function(keyCode) {
    return this.keys.indexOf(keyCode) !== -1;
  };

  wrect.ECS.System.RawInputHandler.prototype.watchedKey = function(keyCode) {
    return this.pressedKeys.indexOf(keyCode) !== -1;
  };
}());
