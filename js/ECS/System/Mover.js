(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Mover = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

  };

  wrect.ECS.System.Mover.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Mover.prototype.constructor = wrect.ECS.System.Mover;

  wrect.ECS.System.Mover.prototype.name = 'Mover';

  wrect.ECS.System.Mover.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Mover.prototype.perform = function(entity) {
    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;

      if (entity.components.Visual) {
        var visual = entity.components.Visual;
        visual.setPosition(rigidBody.dimensions.origin.x, rigidBody.dimensions.origin.y);

        //visual.graphics.rotation.x += 0.01;
        //visual.graphics.rotation.y += 0.01;

        //visual.graphics.position.y -= 1;
      }

      entity.components.RigidBody.move = new Vector(0, 0);
    }
  };
}());
