(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var Vector = wrect.Physics.Vector;
  var Rectangle = wrect.Geometry.Rectangle;

  wrect.ECS.Assemblage.Block = function (options) {
    this.entity = new Entity();

    var rigidBody = new wrect.ECS.Component.RigidBody({
      dimensions: new Rectangle({
        origin: new Vector(options.x, options.y),
        width: options.w,
        height: options.h
      })
    });
    this.entity.addComponent(rigidBody);
    this.entity.addComponent(options.Visual || new wrect.ECS.Component.Visual());
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());

    return this.entity;
  };
}());
