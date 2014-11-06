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

  wrect.ECS.System.Mover.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Mover.prototype.perform = function(entity) {

    if (entity.components.RigidBody && !entity.components.RigidBody.frozen && (entity.components.RigidBody.move.x !== 0 || entity.components.RigidBody.move.y !== 0)) {
      var rigidBody = entity.components.RigidBody;
      var newPosition = entity.components.RigidBody.move;

      rigidBody.dimensions.previousOrigin = rigidBody.dimensions.origin;
      rigidBody.dimensions.move(newPosition);

      if (entity.components.Visual) {
        var visual = entity.components.Visual;

        var graphicPositionVector = rigidBody.dimensions.origin;//new Vector(visual.graphics.position.x, visual.graphics.position.y).add(newPosition);
        visual.graphics.position.x = graphicPositionVector.x;
        visual.graphics.position.y = graphicPositionVector.y;
      }

      entity.components.RigidBody.move = new Vector(0, 0);
    }
  };
}());
