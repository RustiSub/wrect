(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.Transformer = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

  };

  wrect.ECS.System.Transformer.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Transformer.prototype.constructor = wrect.ECS.System.Transformer;

  wrect.ECS.System.Transformer.prototype.name = 'Transformer';

  wrect.ECS.System.Transformer.prototype.checkDependencies = function(entity) {
    return entity.components.RigidBody && entity.components.ControlScheme ? true : false;
  };

  wrect.ECS.System.Transformer.prototype.perform = function(entity) {
    if (entity.components.RigidBody && !entity.components.RigidBody.frozen) {
      var rigidBody = entity.components.RigidBody;
      var offset = rigidBody.physicsBody.v.multiply(3);
      //console.log(rigidBody.physicsBody.v.x);
      //var decay = rigidBody.physicsBody.v;
      //var scheme = entity.components.ControlScheme;
      //var offset = scheme.transform.multiply(3);

      rigidBody.dimensions.vertices[1].x -= rigidBody.dimensions.offsetVertices[1].x;
      rigidBody.dimensions.vertices[0].x -= rigidBody.dimensions.offsetVertices[0].x;

      rigidBody.dimensions.offsetVertices[1].x = offset.x;
      rigidBody.dimensions.offsetVertices[0].x = offset.x;

      rigidBody.dimensions.vertices[1] = rigidBody.dimensions.vertices[1].add(rigidBody.dimensions.offsetVertices[1]);
      rigidBody.dimensions.vertices[0] = rigidBody.dimensions.vertices[0].add(rigidBody.dimensions.offsetVertices[0]);

      var visual = entity.components.Visual;
      visual.reDraw(rigidBody.dimensions.origin, rigidBody.dimensions.vertices);
    }
  };
}());
