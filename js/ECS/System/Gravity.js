(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Gravity = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
  };

  wrect.ECS.System.Gravity.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Gravity.prototype.constructor = wrect.ECS.System.Gravity;

  wrect.ECS.System.Gravity.prototype.name = 'Gravity';

  wrect.ECS.System.Gravity.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Gravity.prototype.perform = function(entity) {
    if (entity.components.RigidBody && entity.components.RigidBody.gravity) {
      var rigidBody = entity.components.RigidBody;

      var gravity = new wrect.Physics.Vector(0, 9.81 / 4).multiply(rigidBody.physicsBody.m);
      rigidBody.physicsBody.f = rigidBody.physicsBody.f.add(gravity);
    }
  }
}());
