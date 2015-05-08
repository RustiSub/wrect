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
    var coords = [
      new Vector3(0, 0, 0),

      //x
      new Vector3(-3, 0, 3),
      new Vector3(-2, 0, 2),
      new Vector3(-1, 0, 1),
      new Vector3(1, 0, -1),
      new Vector3(2, 0, -2),
      new Vector3(3, 0, -3),

      ////y
      new Vector3(0, 3, -3),
      new Vector3(0, 2, -2),
      new Vector3(0, 1, -1),
      new Vector3(0, -1, 1),
      new Vector3(0, -2, 2),
      new Vector3(0, -3, 3),

      //z
      new Vector3(3, -3, 0),
      new Vector3(2, -2, 0),
      new Vector3(1, -1, 0),
      new Vector3(-1, 1, 0),
      new Vector3(-2, 2, 0),
      new Vector3(-3, 3, 0),
    ];

    //this.entity = new Entity({eventManager: options.eventManager});
    var rows = 5;
    var cols = 10;
    var size = 50;

    for(var c = 0; c < coords.length; c++) {
      var coord = coords[c];
      var pos = new Vector3(
        coord.x * (size * 1.5),
        coord.z * (size * -1) + coord.y * (size),
        5
      );

      var tileEntity = new wrect.ECS.Assemblage.HexTile({
        eventManager: game.getEventManager(),
        renderer:  game.getRenderer(),
        origin: new Vector3(pos.x, pos.y, 5),
        size: size
      });

      game.getEntityManager().addEntity(tileEntity.entity);
    }
  };
}());
