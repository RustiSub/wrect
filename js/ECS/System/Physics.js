(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Physics = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};

  };

  wrect.ECS.System.Physics.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Physics.prototype.constructor = wrect.ECS.System.Physics;

  wrect.ECS.System.Physics.prototype.name = 'Physics';

  wrect.ECS.System.Physics.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Physics.prototype.perform = function(entity) {
    var dt = 1 / 6 ;//game.getDelta() / 100;
    var rigidBody = entity.components.RigidBody;

    if (!entity.components.RigidBody.frozen) {
      var physicsBody = rigidBody.physicsBody;

      //physicsBody.f = physicsBody.f.add(physicsBody.a);

      // Symplectic Euler
      physicsBody.v.x += ((1 / physicsBody.m) * physicsBody.a.x) * dt;
      physicsBody.v.y += ((1 / physicsBody.m) * physicsBody.a.y) * dt;

      if (physicsBody.f.x !== 0 || physicsBody.f.y !== 0) {
        physicsBody.v = physicsBody.v.add(physicsBody.f.multiply((1 / physicsBody.m)));
      }

      //TODO: FRICTION PLS
      //physicsBody.v = physicsBody.v.multiply(0.99);

      var x = physicsBody.v.x * dt;
      var y = physicsBody.v.y * dt;
      var move = new Vector(x, y);

      if (move.x !== 0 || move.y !== 0) {
        rigidBody.dimensions.move(move);
        //game.getEventManager().trigger('physics.move', {entity: entity, move: move});
      }
    }

    rigidBody.physicsBody.f = new Vector(0, 0);
    rigidBody.physicsBody.a = new Vector(0, 0);
  };
}());