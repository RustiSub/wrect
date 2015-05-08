(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.HexTile = wrect.Bundles.ProtoTitan.HexTile || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;

  var HexTile = wrect.Bundles.ProtoTitan.HexTile;
  var Rectangle = wrect.Geometry.Rectangle;
  var Hexagon = wrect.Geometry.Hexagon;

  HexTile.Constants = HexTile.Constants || {};
  HexTile.Constants = {
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.HexTile = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    var material = options.material || new THREE.MeshLambertMaterial({color: 0xD0D0DF, side: THREE.DoubleSide});

      var visualComponent = new wrect.ECS.Component.Visual({
      shape: new Hexagon({
        origin: options.origin || new Vector3(0, 0, 0),
        size: options.size || 100,
        material: material
      }),
      renderer: options.renderer
    });

    this.entity.addComponent(visualComponent);
  };
}());
