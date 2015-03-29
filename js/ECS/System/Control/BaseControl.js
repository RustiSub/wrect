(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Control = wrect.ECS.System.Control || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Control.BaseControl = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.maxPlayerSpeed = this.options.maxPlayerSpeed || 50;
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
    var forceIncrease = rigidBody.physicsBody.f.add(scheme.movement);
    var speedSign = rigidBody.physicsBody.v.add(forceIncrease).x >= 0 ? 1 : -1;
    var maxPlayerSpeed = this.maxPlayerSpeed * speedSign;

    if ((maxPlayerSpeed >= 0)) {
      if (rigidBody.physicsBody.v.add(forceIncrease).x < maxPlayerSpeed) {
        rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(scheme.movement);
      } else if (rigidBody.physicsBody.v.x < maxPlayerSpeed) {
        rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(new Vector(maxPlayerSpeed - rigidBody.physicsBody.v.x, scheme.movement.y));
      }
    }

    if ((maxPlayerSpeed < 0)) {
      if (rigidBody.physicsBody.v.add(forceIncrease).x > maxPlayerSpeed) {
        rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(scheme.movement);
      } else if (rigidBody.physicsBody.v.x > maxPlayerSpeed) {
        rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(new Vector(maxPlayerSpeed - rigidBody.physicsBody.v.x, scheme.movement.y));
      }
    }

    scheme.movement = new Vector(0, 0);
  };
}());
