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
    var delta = game.getDelta() / 100;

    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;

      var last_acceleration = rigidBody.physicsBody.a;
      var modifier = Math.pow(delta, 2) * 0.5;
      var newPosition = rigidBody.physicsBody.v.multiply(delta).add(last_acceleration.multiply(modifier));
      var new_acceleration = rigidBody.physicsBody.a;//force / mass
      var avg_acceleration = ( last_acceleration.add(new_acceleration)).divide(2);

      rigidBody.physicsBody.v = rigidBody.physicsBody.v.add(avg_acceleration.multiply(delta));
      //console.log(rigidBody.physicsBody.v.x, newPosition.x);
      //if (newPosition.x > 0 && newPosition.x > this.maxChunk && newPosition.x < 2) {
      //  this.maxChunk = newPosition.x;
      //
      //  console.log(this.minChunk, this.maxChunk);
      //}
      //
      //if (newPosition.x < 0 && newPosition.x < this.minChunk && newPosition.x > -2) {
      //  this.minChunk = newPosition.x;
      //
      //  console.log(this.minChunk, this.maxChunk);
      //}

      newPosition = new Vector(Math.ceil(newPosition.x), Math.ceil(newPosition.y));
      rigidBody.dimensions.move(newPosition);

      if (entity.components.Visual) {
        var visual = entity.components.Visual;

        var graphicPositionVector = new Vector(visual.graphics.position.x, visual.graphics.position.y).add(newPosition);
        visual.graphics.position.x = graphicPositionVector.x;
        visual.graphics.position.y = graphicPositionVector.y;
      }
    }
  }
}());
