(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.SquareTile = wrect.Bundles.ProtoTitan.SquareTile || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;

  var SquareTile = wrect.Bundles.ProtoTitan.SquareTile;
  var Rectangle = wrect.Geometry.Rectangle;
  var Hexagon = wrect.Geometry.Hexagon;

  SquareTile.Constants = SquareTile.Constants || {};
  SquareTile.Constants = {
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.SquareTile = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    var tile = new wrect.ECS.Component.Map.Coord({
      coord: options.coord,
      size: options.size
    });

    var material = options.material || new THREE.MeshLambertMaterial({color: 0xD0D0DF, side: THREE.DoubleSide, transparent: true, opacity: 0.5});

    var visualComponent = new wrect.ECS.Component.Visual({
      shape: new Rectangle({
        origin: options.origin || new Vector3(0, 0, 0),
        dimension: {
          x: tile.size,
          y: tile.size,
          z: 0
        },
        material: material
      }),
      renderer: options.renderer
    });

    this.entity.addComponent(tile);
    this.entity.addComponent(options.coord);
    this.entity.addComponent(visualComponent);

    this.entity.addComponent(new wrect.ECS.Component.Selectable({
      selectCallback: function(entity) {
        entity.components.Visual.graphics.material.color.setHex(0xEBEB05);
      },
      deselectCallback: function(entity) {
        entity.components.Visual.graphics.material.color.setHex(0xFFFFFF);
      }
    }));

    this.entity.addComponent(options.grid);
  };
}());
