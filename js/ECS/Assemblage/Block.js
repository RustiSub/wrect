(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;
  var Rectangle = wrect.Geometry.Rectangle;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|*}
   * @constructor
   */
  wrect.ECS.Assemblage.Block = function (options) {
    this.entity = new Entity({
      eventManager: options.eventManager
    });

    var rigidBody = new wrect.ECS.Component.RigidBody({
      dimensions: new Rectangle({
        origin: options.position,
        dimension: options.dimension,
        material: options.material
      }),
      frozen: options.frozen
    });
    var visualComponent = new wrect.ECS.Component.Visual({
      color: options.color,
      alpha: options.alpha,
      useSprite: options.useSprite,
      shape: rigidBody.dimensions,
      renderer: options.renderer
    });

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);
  };
}());
