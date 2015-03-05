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

      if (physicsBody.f.x !== 0 || physicsBody.f.y !== 0) {
        physicsBody.v = physicsBody.v.add(physicsBody.f);
      }

      var oldV = physicsBody.v;
      physicsBody.a = physicsBody.a.divide(physicsBody.m);
      physicsBody.v.x = physicsBody.v.x + physicsBody.a.x * dt;
      physicsBody.v.y = physicsBody.v.y + physicsBody.a.y * dt;
      var move = new Vector(
          (oldV.x + physicsBody.v.x) * 0.5 * dt,
          (oldV.y + physicsBody.v.y) * 0.5 * dt
      );

      //var maxSpeed = 100;
      //if (physicsBody.v.x > maxSpeed) {
      //  physicsBody.v.x = maxSpeed;
      //} else if (physicsBody.v.x < -maxSpeed) {
      //  physicsBody.v.x = -maxSpeed;
      //}
      //
      //if (physicsBody.v.y > maxSpeed) {
      //  physicsBody.v.y = maxSpeed;
      //} else if (physicsBody.v.y < -maxSpeed) {
      //  physicsBody.v.y = -maxSpeed;
      //}

      if (move.x !== 0 || move.y !== 0) {
        rigidBody.dimensions.move(move);
        //game.getEventManager().trigger('physics.move', {entity: entity, move: move});
      }
    }

    rigidBody.physicsBody.f = new Vector(0, 0);
    rigidBody.physicsBody.a = new Vector(0, 0);
  };
}());
