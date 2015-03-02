(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var Vector = wrect.Physics.Vector;
  var Circle = wrect.Geometry.Circle;

  wrect.ECS.Assemblage.Ball = function (options) {
    this.entity = new Entity();

    var circle = new Circle({
      origin: new Vector(options.x, options.y),
      radius: options.radius
        });
    var rigidBody = new wrect.ECS.Component.RigidBody({
      dimensions: circle
    });

    var visualComponent = new wrect.ECS.Component.Visual({
      color: options.color,
      alpha: options.alpha,
      graphics: new PIXI.Graphics(),
      origin: rigidBody.dimensions.origin,
      radius: rigidBody.dimensions.radius,
      useSprite: options.useSprite,
      shape: circle
    });

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);

    visualComponent.draw(visualComponent.graphics, visualComponent.options);

    return this.entity;
  };
}());
