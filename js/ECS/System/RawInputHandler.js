(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.RawInputHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    this.keys = [];

    this.captureElement = document.getElementById(this.options.elementId);
    this.captureElement.addEventListener('keydown', this.keyDown);
    this.captureElement.addEventListener('keyup', this.keyUp);
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
      if (this.keys.indexOf(newKeys[newKeyIndex]) === -1) {
        this.keys.push(newKeys[newKeyIndex]);
      }
    }
  };

  wrect.ECS.System.RawInputHandler.prototype.run = function() {

  };

  wrect.ECS.System.RawInputHandler.prototype.keyDown= function(event) {
    //this.keys[event.keyCode];
  };

  wrect.ECS.System.RawInputHandler.prototype.keyUp= function(event) {
    //this.keys.slice(this.keys.indexOf());
    console.log(event);
  };
}());
