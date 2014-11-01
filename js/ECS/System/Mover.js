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

  wrect.ECS.System.BaseSystem.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Mover.prototype.perform = function(entity) {
    var dt = 1 / 6 ;//game.getDelta() / 100;

    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;
      var physicsBody = rigidBody.physicsBody;

      physicsBody.f = physicsBody.f.add(physicsBody.a);

      // Symplectic Euler
      physicsBody.v.x += (1 / physicsBody.m * physicsBody.f.x) * dt;
      physicsBody.v.y += (1 / physicsBody.m * physicsBody.f.y) * dt;
      var x = physicsBody.v.x * dt;
      var y = physicsBody.v.y * dt;
      var newPosition = new Vector(x, y);

      rigidBody.dimensions.previousOrigin = rigidBody.dimensions.origin;
      rigidBody.dimensions.move(newPosition);

      if (entity.components.Visual) {
        var visual = entity.components.Visual;

        var graphicPositionVector = rigidBody.dimensions.origin;//new Vector(visual.graphics.position.x, visual.graphics.position.y).add(newPosition);
        visual.graphics.position.x = graphicPositionVector.x;
        visual.graphics.position.y = graphicPositionVector.y;

        visual.graphics.position.x = Math.ceil(visual.graphics.position.x);
        visual.graphics.position.y = Math.ceil(visual.graphics.position.y);
      }

      rigidBody.physicsBody.f = new Vector(0, 0);
      //rigidBody.physicsBody.a = new Vector(0, 0);
    }
  }
}());
