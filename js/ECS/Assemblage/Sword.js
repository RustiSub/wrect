(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};

  var Entity = wrect.ECS.Entity;
  var Vector = wrect.Physics.Vector;
  var Rectangle = wrect.Geometry.Rectangle;

  wrect.ECS.Assemblage.Sword = function (options) {
    this.entity = new Entity();

    options = {
      x: 0,
      y: 0,
      w: 100,
      h: 5,
      color: 0xFF0000
    };

    var rigidBody = new wrect.ECS.Component.RigidBody({
      dimensions: new Rectangle({
        origin: new Vector(options.x, options.y),
        width: options.w,
        height: options.h
      }),
      frozen: false
    });

    rigidBody.solid = false;

    var SwordGraphics = new PIXI.Graphics();

    SwordGraphics.beginFill(options.color || 0x000000, options.alpha || 1);

    SwordGraphics.drawRect(0, 0, options.w, options.h);
    SwordGraphics.endFill();
    var visualComponent = new wrect.ECS.Component.Visual({
      graphics: SwordGraphics
    });

    SwordGraphics.position = rigidBody.dimensions.origin;

    var sword = new wrect.ECS.Component.ControlScheme.Sword();

    sword.animation = function(entity) {

    };

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);
    this.entity.addComponent(sword);

    return this.entity;
  };
}());
