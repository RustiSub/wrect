(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Control = wrect.ECS.System.Control || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Control.BaseControl = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
  };

  wrect.ECS.System.Control.BaseControl.prototype = Object.create(wrect.ECS.System.BaseSystem.prototype);
  wrect.ECS.System.Control.BaseControl.prototype.constructor = wrect.ECS.System.Input;

  wrect.ECS.System.Control.BaseControl.prototype.name = '';

  wrect.ECS.System.Control.BaseControl.prototype.checkDependencies = function(entity) {
    return entity.components.ControlScheme && entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Control.BaseControl.prototype.perform = function(entity) {
    var scheme = entity.components.ControlScheme;
    var rigidBody = entity.components.RigidBody;

    //rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(scheme.movement);

    rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(scheme.movement);

    scheme.movement = new Vector(0, 0);
  };
}());
