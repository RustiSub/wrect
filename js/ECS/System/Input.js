(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Input = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
    this.inputHandler = Container.getComponent('InputHandler');
  };

  wrect.ECS.System.Input.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Input.prototype.constructor = wrect.ECS.System.Input;

  wrect.ECS.System.Input.prototype.name = 'Input';

  wrect.ECS.System.Input.prototype.checkDependencies = function(entity) {
    return entity.components.ControlScheme ? true : false;
  };

  wrect.ECS.System.Input.prototype.perform = function(entity) {
    var controlScheme = entity.components.ControlScheme;
    var keysDown = this.inputHandler._pressed;
    if (keysDown.length) {
      for (var i = 0, l = keysDown.length; i < l; i++) {
        var funcName = 'key' + keysDown[i];
        if (typeof controlScheme[funcName] === 'function') {
          controlScheme[funcName](entity);
        }
      }
    }
    else if(controlScheme.idle !== undefined) {
      controlScheme.idle(entity);
    }
 /*   if (this.inputHandler.key('left') && controlScheme.left) {
      console.log('left', entity);
    }
    if (this.inputHandler.key('right') && controlScheme.right) {
      controlScheme.right(entity);
    }
    if (this.inputHandler.key('up') && controlScheme.up) {
      console.log('up', entity);
    }
    if (this.inputHandler.key('down') && controlScheme.down) {
      console.log('down', entity);
    }*/
  };
}());
