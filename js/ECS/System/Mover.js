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
    if (entity.components.RigidBody) {
      var rigidBody = entity.components.RigidBody;
      rigidBody.physicsBody.v = new Vector(0, 0);

      var dr = rigidBody.physicsBody.a;
      //console.log(rigidBody.physicsBody.a.x);
      rigidBody.dimensions.move(dr);

      if (entity.components.Visual) {
        var visual = entity.components.Visual;

        var graphicPositionVector = new Vector(visual.graphics.position.x, visual.graphics.position.y).add(dr);
        visual.graphics.position.x = graphicPositionVector.x;
        visual.graphics.position.y = graphicPositionVector.y;
      }
    }
  }
}());
