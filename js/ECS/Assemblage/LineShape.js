(function() {
  "use strict";

  /** @type {Entity} */
  var Entity = require('ECS/Entity');
  /** @type {Vector} */
  var Vector = require('Physics/Vector');
  /** @type {Polygon} */
  var Polygon = require('Geometry/Shape/Polygon');
  /** @type {Visual} */
  var Visual = require('ECS/Component/Visual');
  /** @type {RigidBody} */
  var RigidBody = require('ECS/Component/RigidBody');

  var LineShape = function (options) {
    this.entity = new Entity({
      eventManager: options.eventManager
    });

    var polygon = options.shape || new Polygon({vertices: options.vertices});
    var rigidBody = new RigidBody({
      dimensions: polygon
    });

    var visualComponent = new Visual({
      renderer: options.renderer,
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

  module.exports = LineShape;
}());
