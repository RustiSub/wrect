(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Control = wrect.ECS.System.Control || {};

  wrect.ECS.System.Control.Attack = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
  };

  wrect.ECS.System.Control.Attack.prototype = Object.create(wrect.ECS.System.BaseSystem.prototype);
  wrect.ECS.System.Control.Attack.prototype.constructor = wrect.ECS.System.Input;

  wrect.ECS.System.Control.Attack.prototype.name = '';

  wrect.ECS.System.Control.Attack.prototype.checkDependencies = function(entity) {
    return entity.components.Sword && entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Control.Attack.prototype.perform = function(entity) {
  };
}());
