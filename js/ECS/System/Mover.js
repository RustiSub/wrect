(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Mover = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};

    this.minChunk = 0;
    this.maxChunk = 0;
  };

  wrect.ECS.System.Mover.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Mover.prototype.constructor = wrect.ECS.System.Mover;

  wrect.ECS.System.Mover.prototype.name = 'Mover';

  wrect.ECS.System.BaseSystem.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Mover.prototype.perform = function(entity) {
    var dt = game.getDelta() / 100;
    var delta2 = game.getDeltaDelta();


    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;

      var fy = 0;
      var newPosition = new Vector(0, 0);

      /* Verlet integration for the y-direction */
      var dy = rigidBody.physicsBody.v.y * dt + (0.5 * rigidBody.physicsBody.a.y * dt * dt);

      newPosition.y += dy;
      var new_ay = fy;
      var avg_ay = 0.5 * (new_ay + rigidBody.physicsBody.a.y);
      rigidBody.physicsBody.v.y += avg_ay * dt;

      console.log(rigidBody.physicsBody.v.y);

      //xi+1 = xi + (xi - xi-1) * (dti / dti-1) + a * dti * dti
      //var pi_0 = rigidBody.dimensions.previousOrigin || rigidBody.dimensions.origin;
      //var xi_0 = pi_0.x;
      //var xi = rigidBody.dimensions.origin.x;
      //var xi_1 = xi + (xi - xi_0) * (delta2) + rigidBody.physicsBody.a.x * delta * delta;
      //
      //console.log(xi_1);

      //var last_acceleration = rigidBody.physicsBody.a;
      //var modifier = Math.pow(delta, 2) * 0.5;
      //var newPosition = rigidBody.physicsBody.v.multiply(delta).add(last_acceleration.multiply(modifier));
      //var new_acceleration = rigidBody.physicsBody.a;//force / mass
      //var avg_acceleration = ( last_acceleration.add(new_acceleration)).divide(2);

      //rigidBody.physicsBody.v = rigidBody.physicsBody.v.add(avg_acceleration.multiply(delta));

      rigidBody.dimensions.move(rigidBody.physicsBody.v);

      //rigidBody.dimensions.previousOrigin = rigidBody.dimensions.origin;

      if (entity.components.Visual) {
        var visual = entity.components.Visual;

        var ceilNewPosition = new Vector(Math.ceil(rigidBody.physicsBody.x), Math.ceil(rigidBody.physicsBody.y));

        var graphicPositionVector = new Vector(visual.graphics.position.x, visual.graphics.position.y).add(ceilNewPosition);
        visual.graphics.position.x = graphicPositionVector.x;
        visual.graphics.position.y = graphicPositionVector.y;
      }
    }
  }
}());
