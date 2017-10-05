(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.SquareMap = wrect.Bundles.ProtoTitan.SquareMap || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;

  var SquareMap = wrect.Bundles.ProtoTitan.SquareMap;
  var Rectangle = wrect.Geometry.Rectangle;
  var Hexagon = wrect.Geometry.Hexagon;

  SquareMap.Constants = SquareMap.Constants || {};
  SquareMap.Constants = {
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.SquareMap = function (options) {
    var grid = new wrect.ECS.Component.Map.Grid(
      {
        tileSize: options.tileSize
      }
    );

    var coords = this.generateMapCoords(options.mapSize);
    var size = options.tileSize + 1;

    for(var c = 0; c < coords.length; c++) {

      var coord = coords[c];

      var getTileCoord = function(coord, tileSize) {
        return new Vector3(
            coord.x * tileSize,
            coord.y * tileSize,
            5
        );
      };

      var pos = getTileCoord(coord, size);

      var tile = new wrect.ECS.Assemblage.SquareTile({
        eventManager: game.getEventManager(),
        renderer:  game.getRenderer(),
        origin: new Vector3(pos.x, pos.y, 5),
        size: options.tileSize,
        material: new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 0.5}),
        coord: new Vector3(coord.x, coord.y, coord.z),
        grid: grid
      });

      grid.addTileEntity(coord, tile.entity);
      game.getEntityManager().addEntity(tile.entity);
    }

    this.entity = new Entity({
      eventManager: game.getEventManager(),
      entityManager: game.getEntityManager()
    });

    this.entity.addComponent(grid);
  };

  wrect.ECS.Assemblage.SquareMap.prototype.generateMapCoords = function(size) {
    var coords = [];

    for (var x = -size.x; x <= size.x; x++) {
      for (var y = -size.y; y <= size.y; y++) {
          coords.push(new Vector3(x, y, 0));
      }
    }

    return coords;
  };
}());
