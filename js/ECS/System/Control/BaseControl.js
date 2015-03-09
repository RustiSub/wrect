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
    var speedSign = rigidBody.physicsBody.v.x > 0 ? 1 : -1;
    var maxPlayerSpeed = 25 * speedSign;

    //Do not add movement force if it would cause the Velocity + Force + Movement > Maximum Speed

    //if ((rigidBody.physicsBody.v.x * scheme.movement.x) > 0) {
    var forceIncrease = rigidBody.physicsBody.f.add(scheme.movement);
    if ((maxPlayerSpeed > 0)) {
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

    //} else {
    //  //Brake
    //  //rigidBody.physicsBody.f = new Vector(0, 0);
    //}



    scheme.movement = new Vector(0, 0);
  };
}());
