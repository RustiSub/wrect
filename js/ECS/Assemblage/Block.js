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

    var blockGraphics = new PIXI.Graphics();

    blockGraphics.beginFill(options.color || 0x000000, options.alpha || 1);
    blockGraphics.drawRect(0, 0, options.w, options.h);
    blockGraphics.endFill();

    var visualOptions = {
      graphics: blockGraphics
    };

    if (options.light) {
      var theLight = new PIXI.Graphics();

      visualOptions.lightGraphics = theLight;

      game.getEntityManager().cameraContainer.mask = theLight;
    }

    var visualComponent = new wrect.ECS.Component.Visual(visualOptions);

    blockGraphics.position = rigidBody.dimensions.origin;

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);
    //entity.addComponent( new ECS.Components.Position());
    //entity.addComponent( new ECS.Components.Collision());

    return this.entity;
  };
}());
