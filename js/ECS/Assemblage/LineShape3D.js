(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var Vector = wrect.Physics.Vector;
  var Polyhedron = wrect.Geometry.Polyhedron;

  wrect.ECS.Assemblage.LineShape3D = function (options) {
    this.entity = new Entity();

    var polyhedron = options.shape || new Polyhedron({vertices: options.vertices});
    var rigidBody = new wrect.ECS.Component.RigidBody({
      dimensions: polyhedron
    });

    var visualComponent = new wrect.ECS.Component.Visual3D({
      color: options.color,
      alpha: options.alpha,
      useSprite: options.useSprite,
      shape: rigidBody.dimensions
    });

    visualComponent.draw();

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());

    rigidBody.dimensions.move(options.origin || new Vector(0, 0));

    return this.entity;
  };
}());
