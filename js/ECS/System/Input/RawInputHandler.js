(function() {
  "use strict";

  var BaseSystem = require('../BaseSystem');

  var RawInputHandler = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};

    this.eventManager = options.eventManager;

    this.keys = [];
    this.pressedKeys = [];
    this.pressedKeyEvents = {};
    this.releasedKeys = [];
    this.watchedTypes = [];
    this.types = [];

    var self = this;

    this.captureElement = document.getElementById(this.options.elementId);    
    this.captureElement.addEventListener('keydown', function(event) {self.keyDown.call(self, event);});
    this.captureElement.addEventListener('keyup', function(event) {self.keyUp.call(self, event);});
    this.captureElement.addEventListener('mousemove', function(event) {self.mouseMove.call(self, event);});
    this.captureElement.addEventListener('mousedown', function(event) {self.mouseDown.call(self, event);});
  };

  RawInputHandler.prototype = Object.create( BaseSystem.prototype );
  RawInputHandler.prototype.constructor = RawInputHandler;
  RawInputHandler.prototype.name = 'RawInputHandler';

  RawInputHandler.prototype.checkDependencies = function(entity) {
    return entity.components.RawInputMap && entity.components.ContextMap ? true : false;
  };

  RawInputHandler.prototype.addEntity = function(data) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
      this.registerRawKeys(data.entity);
    }
  };

  RawInputHandler.prototype.registerRawKeys = function(entity) {
    var newKeys = entity.components.RawInputMap.keys;

    for (var newKeyIndex in newKeys) if (newKeys.hasOwnProperty(newKeyIndex)) {
      var keyCode = newKeys[newKeyIndex];
      if (this.keys.indexOf(keyCode) === -1) {
        this.keys.push(keyCode);
        this.pressedKeyEvents[keyCode] = false;
      }
    }

    this.watchedTypes = entity.components.RawInputMap.types;
  };

  RawInputHandler.prototype.perform = function(entity) {
    this.eventManager.trigger('raw_input_handler.context.perform', {
      entity: entity,
      pressedKeys: this.pressedKeys,
      releasedKeys: this.releasedKeys,
      types: this.types
    });

    this.releasedKeys = [];
    this.types = {};
  };

  RawInputHandler.prototype.keyDown = function(event) {
    if (this.shouldWatchKey.call(this, event.keyCode) && !this.watchedKey.call(this, event.keyCode)) {
      this.pressedKeys.push(event.keyCode);
      this.releasedKeys.splice(this.releasedKeys.indexOf(event.keyCode), 1);
      this.pressedKeyEvents[event.keyCode] = event;
    }
  };

  RawInputHandler.prototype.keyUp = function(event) {
    if (this.shouldWatchKey.call(this, event.keyCode) && this.watchedKey.call(this, event.keyCode)) {
      this.pressedKeys.splice(this.pressedKeys.indexOf(event.keyCode), 1);
      this.releasedKeys.push(event.keyCode);
      this.pressedKeyEvents[event.keyCode] = false;
    }
  };

  RawInputHandler.prototype.mouseMove = function(event) {
    if (this.watchedTypes.indexOf(wrect.Core.Constants.Input.CURSOR) !== -1) {
      this.types[wrect.Core.Constants.Input.CURSOR] = {
        x: event.x,
        y: event.y
      };
    }
  };

  RawInputHandler.prototype.mouseDown = function(event) {
    if (this.watchedTypes.indexOf(wrect.Core.Constants.Input.LEFT_CLICK) !== -1 && event.button === 0) {
      this.types[wrect.Core.Constants.Input.LEFT_CLICK] = {
        x: event.x,
        y: event.y
      };
    }

    if (this.watchedTypes.indexOf(wrect.Core.Constants.Input.RIGHT_CLICK) !== -1 && event.button === 2) {
      this.types[wrect.Core.Constants.Input.RIGHT_CLICK] = {
        x: event.x,
        y: event.y
      };
    }
  };

  RawInputHandler.prototype.shouldWatchKey = function(keyCode) {
    return this.keys.indexOf(keyCode) !== -1;
  };

  RawInputHandler.prototype.watchedKey = function(keyCode) {
    return this.pressedKeys.indexOf(keyCode) !== -1;
  };
  
  module.exports = RawInputHandler;
}());
