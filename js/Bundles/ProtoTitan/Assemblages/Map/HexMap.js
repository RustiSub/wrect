(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.HexMap = wrect.Bundles.ProtoTitan.HexMap || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;

  var HexMap = wrect.Bundles.ProtoTitan.HexMap;
  var Rectangle = wrect.Geometry.Rectangle;
  var Hexagon = wrect.Geometry.Hexagon;

  HexMap.Constants = HexMap.Constants || {};
  HexMap.Constants = {
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.HexMap = function (options) {
    var grid = new wrect.ECS.Component.Map.Grid(
      {
        tileSize: options.tileSize
      }
    );

    var coords = this.generateMapCoords(options.mapSize);
    var size = options.tileSize + 1;

    for(var c = 0; c < coords.length; c++) {

      var coord = coords[c];
      var pos = grid.getTileCoord(coord, size);

      var tile = new wrect.ECS.Assemblage.HexTile({
        eventManager: game.getEventManager(),
        renderer:  game.getRenderer(),
        origin: new Vector3(pos.x, pos.y, 5),
        size: options.tileSize,
        material: new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 0.5}),
        coord: new Vector3(coord.x, coord.y, coord.z),
        grid: grid
      });

      grid.tiles.push(tile.entity.components.Coord.coord);
      game.getEntityManager().addEntity(tile.entity);
    }

    this.entity = new Entity({
      eventManager: game.getEventManager(),
      entityManager: game.getEntityManager()
    });

    this.entity.addComponent(grid);
  };

  wrect.ECS.Assemblage.HexMap.prototype.generateMapCoords = function(size) {
    var coords = [];

    for (var x = -size.x; x <= size.x; x++) {
      for (var y = -size.y; y <= size.y; y++) {
        for (var z = -size.z; z <= size.z; z++) {
          if (x + y + z === 0) {
            coords.push(new Vector3(x, y, -y -x));
          }
        }
      }
    }

    return coords;
  };
}());
