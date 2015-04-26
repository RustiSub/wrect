(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.RawInputHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    this.captureElement = document.getElementById(this.options.elementId);
    this.captureElement.addEventListener('keydown', this.keyDown);
    this.captureElement.addEventListener('keyup', this.keyUp);
  };

  wrect.ECS.System.RawInputHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.RawInputHandler.prototype.constructor = wrect.ECS.System.RawInputHandler;

  wrect.ECS.System.RawInputHandler.prototype.name = 'RawInputHandler';
  
  wrect.ECS.System.BaseSystem.prototype.run = function() {

  };

  wrect.ECS.System.BaseSystem.prototype.keyDown= function(event) {
    //console.log(event);
  };

  wrect.ECS.System.BaseSystem.prototype.keyUp= function(event) {
    console.log(event);
  };
}());
