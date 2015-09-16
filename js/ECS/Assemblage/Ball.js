(function() {
  "use strict";

  /** @type {Entity} */
  var Entity = require('ECS/Entity');
  /** @type {Vector} */
  var Vector = require('Physics/Vector');
  /** @type {Circle} */
  var Circle = require('Geometry/Shape/Circle');
  /** @type {RigidBody} */
  var RigidBody = require('ECS/Component/RigidBody');
  /** @type {Visual} */
  var Visual = require('ECS/Component/Visual');

  wrect.ECS.Assemblage.Ball = function (options) {
    this.entity = new Entity();

    var circle = new Circle({
      origin: new Vector(options.x, options.y),
      radius: options.radius
        });
    var rigidBody = new RigidBody({
      dimensions: circle
    });

    var visualComponent = new Visual({
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
