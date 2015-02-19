(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Transformer = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};

  };

  wrect.ECS.System.Transformer.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Transformer.prototype.constructor = wrect.ECS.System.Transformer;

  wrect.ECS.System.Transformer.prototype.name = 'Transformer';

  wrect.ECS.System.Transformer.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody ? true : false;
  };

  wrect.ECS.System.Transformer.prototype.perform = function(entity) {
    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;

      //rigidBody.dimensions.vertices[1].x -= rigidBody.dimensions.offsetVertices[1].x;
      //rigidBody.dimensions.offsetVertices[1].x = rigidBody.physicsBody.v.x;

      //rigidBody.dimensions.vertices[1].x += rigidBody.dimensions.offsetVertices[1].x;

      var visual = entity.components.Visual;
      //visual.reDraw(rigidBody.dimensions.origin, rigidBody.dimensions.vertices);
    }
  };
}());
