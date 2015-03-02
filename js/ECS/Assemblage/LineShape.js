(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var Vector = wrect.Physics.Vector;
  var Polygon = wrect.Geometry.Polygon;

  wrect.ECS.Assemblage.LineShape = function (options) {
    this.entity = new Entity();

    var polygon = options.shape || new Polygon({vertices: options.vertices});
    var rigidBody = new wrect.ECS.Component.RigidBody({
      dimensions: polygon
    });

    var visualComponent = new wrect.ECS.Component.Visual({
      color: options.color,
      alpha: options.alpha,
      graphics: new PIXI.Graphics(),
      useSprite: options.useSprite,
      shape: rigidBody.dimensions
    });

    visualComponent.draw(visualComponent.graphics, visualComponent.options);

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());

    rigidBody.dimensions.move(options.origin || new Vector(0, 0));

    return this.entity;
  };
}());
