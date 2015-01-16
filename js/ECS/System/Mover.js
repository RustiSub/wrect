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
    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;

      if (entity.components.Visual) {
        var visual = entity.components.Visual;

        visual.graphics.position.x = rigidBody.dimensions.origin.x;
        visual.graphics.position.y = rigidBody.dimensions.origin.y;

        if (visual.sprite) {
          visual.sprite.position.x = rigidBody.dimensions.origin.x;
          visual.sprite.position.y = rigidBody.dimensions.origin.y;
        }
      }

      if (entity.components.Visual.sprite) {
        //console.log(Math.abs(Math.round(rigidBody.physicsBody.v.x)));
        entity.components.Visual.sprite.animationSpeed = Math.abs(Math.round(rigidBody.physicsBody.v.x)) / 75;//Math.abs(rigidBody.physicsBody.v.x) / 5;

        if (rigidBody.physicsBody.v.x < 0) {
          entity.components.Visual.sprite.scale.x = -0.30;
        } else {
          entity.components.Visual.sprite.scale.x = 0.30;
        }

        if (entity.components.Visual.sprite.animationSpeed < 0.01) {
          entity.components.Visual.sprite.gotoAndPlay(0);
        }
      }

      entity.components.RigidBody.move = new Vector(0, 0);
    }
  };
}());
