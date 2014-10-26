(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Mover = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
  };

  wrect.ECS.System.Mover.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Mover.prototype.constructor = wrect.ECS.System.Mover;

  wrect.ECS.System.Mover.prototype.name = 'Mover';

  wrect.ECS.System.Mover.prototype.perform = function(entity) {
    if (entity.components.RigidBody) {
      var rigidBody = entity.components.RigidBody;
      rigidBody.physicsBody.v = new Vector(0, 0);

      var dr = rigidBody.physicsBody.a;
      rigidBody.dimensions.move(dr);
    }
  }
}());
