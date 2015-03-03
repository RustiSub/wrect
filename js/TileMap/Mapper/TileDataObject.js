(function() {
  'use strict';

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  var Vector = wrect.Physics.Vector;

  wrect.TileMap.Mapper = wrect.TileMap.Mapper || {};

  wrect.TileMap.Mapper.TileDataObject = function() {
    this.id = 0;
    this.name = '';
    this.height = 0;
    this.width = 0;
    this.rotation = 0;
    this.tileSetName = '';
    this.flipped = {
      horizontal: false,
      vertical: false
    };
  };
}());
