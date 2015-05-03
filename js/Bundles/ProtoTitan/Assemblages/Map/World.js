(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.World = wrect.Bundles.ProtoTitan.World || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;

  var World = wrect.Bundles.ProtoTitan.World;
  var Rectangle = wrect.Geometry.Rectangle;
  var Hexagon = wrect.Geometry.Hexagon;

  World.Constants = World.Constants || {};
  World.Constants = {
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.World = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    var shape = new Hexagon({
      origin: new Vector3(0, 0, 0),
      size: 100,
      dimension: new Vector3(500, 500, 5),
      material: new THREE.MeshLambertMaterial({color: 0xD0D0D0, side:THREE.DoubleSide })
    });

    var visualComponent = new wrect.ECS.Component.Visual({
      shape: shape,
      renderer: options.renderer
    });

    this.entity.addComponent(visualComponent);

    game.getEntityManager().addEntity(this.entity);
  };
}());
