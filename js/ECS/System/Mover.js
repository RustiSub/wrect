(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Mover = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};

    this.timeChunk = 1000;
  };

  wrect.ECS.System.Mover.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Mover.prototype.constructor = wrect.ECS.System.Mover;

  wrect.ECS.System.Mover.prototype.name = 'Mover';

  wrect.ECS.System.BaseSystem.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Mover.prototype.perform = function(entity) {
    var delta = game.getDelta();
if (delta > 20) {return;}
    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;

      //var dr = rigidBody.physicsBody.a.multiply(delta / 100);

      var last_acceleration = rigidBody.physicsBody.a;
      var modifier = Math.pow(delta, 2) * 0.5;
      var newPosition = rigidBody.physicsBody.v.multiply(delta).add(last_acceleration.multiply(modifier));
      var new_acceleration = rigidBody.physicsBody.a;//force / mass
      var avg_acceleration = ( last_acceleration.add(new_acceleration)).divide(2);
      rigidBody.physicsBody.v = rigidBody.physicsBody.v.add(avg_acceleration.multiply(delta));

      rigidBody.dimensions.move(newPosition);

      //rigidBody.physicsBody.a = new Vector(0, 0);

      if (entity.components.Visual) {
        var visual = entity.components.Visual;

        var graphicPositionVector = new Vector(visual.graphics.position.x, visual.graphics.position.y).add(newPosition);
        visual.graphics.position.x = graphicPositionVector.x;
        visual.graphics.position.y = graphicPositionVector.y;
      }
    }
  }
}());
