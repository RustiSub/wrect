(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Player = wrect.ECS.Assemblage.Player || {};
  wrect.Bundles.ProtoTitan.Player = wrect.Bundles.ProtoTitan.Player || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;
  var Vector = wrect.Physics.Vector;
  var Rectangle = wrect.Geometry.Rectangle;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Player.Titan = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

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

    //rigidBody.dimensions.origin = new Vector3(0, 0, 25);
    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);

    options.eventManager.addListener('titan_control.tile_changed', function(entityData) {
      if (this.entity.components.RigidBody.dimensions.origin.x !== entityData.coord.x ||
        this.entity.components.RigidBody.dimensions.origin.y !== entityData.coord.y) {
        this.move(entityData.coord);
      } else {
        this.rotate();
      }
    }, this);
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.move = function(coord) {
    this.entity.components.RigidBody.dimensions.origin.x = coord.x;
    this.entity.components.RigidBody.dimensions.origin.y = coord.y;
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.rotate = function() {
    this.entity.components.Visual.getGraphics().rotation.z += 30 * (Math.PI /180);
  };
}());
