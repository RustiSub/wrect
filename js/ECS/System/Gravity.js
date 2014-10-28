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

  wrect.ECS.System.BaseSystem.prototype.checkDependencies = function(entity) {
    return false; // entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Gravity.prototype.perform = function(entity) {
    if (entity.components.RigidBody) {
      var rigidBody = entity.components.RigidBody;
      //@TODO: BDA: Gravity?
      //rigidBody.physicsBody.a = rigidBody.physicsBody.a.multiply(new Vector(0, 0.9));
      //rigidBody.physicsBody.a = rigidBody.physicsBody.a.add(0,1);

    }
  }
}());
