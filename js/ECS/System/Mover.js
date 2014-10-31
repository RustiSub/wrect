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

      var acceleration = rigidBody.physicsBody.a.x / 1;
      rigidBody.physicsBody.v.x += acceleration * dt;
      var position = rigidBody.physicsBody.v.x * dt;

      var newPosition = new Vector(position, 0);

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
