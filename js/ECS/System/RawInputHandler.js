(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.RawInputHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    this.keys = [];
    this.pressedKeys = [];
    this.pressedKeyEvents = {};
    var self = this;

    this.captureElement = document.getElementById(this.options.elementId);
    this.captureElement.addEventListener('keydown', function(event) {self.keyDown.call(self, event);});
    this.captureElement.addEventListener('keyup', function(event) {self.keyUp.call(self, event);});
  };

  wrect.ECS.System.RawInputHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.RawInputHandler.prototype.constructor = wrect.ECS.System.RawInputHandler;

  wrect.ECS.System.RawInputHandler.prototype.name = 'RawInputHandler';

  wrect.ECS.System.RawInputHandler.prototype.checkDependencies = function(entity) {
    return entity.components.RawInputMap ? true : false;
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

  wrect.ECS.System.RawInputHandler.prototype.run = function() {

  };

  wrect.ECS.System.RawInputHandler.prototype.keyDown = function(event) {
    if (this.shouldWatchKey.call(this, event.keyCode) && !this.watchedKey.call(this, event.keyCode)) {
      this.pressedKeys.push(event.keyCode);
      this.pressedKeyEvents[event.keyCode] = event;
    }
  };

  wrect.ECS.System.RawInputHandler.prototype.keyUp = function(event) {
    if (this.shouldWatchKey.call(this, event.keyCode) && this.watchedKey.call(this, event.keyCode)) {
      this.pressedKeys.splice(this.pressedKeys.indexOf(event.keyCode), 1);
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
