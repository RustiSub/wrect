(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap.Mapper = wrect.TileMap.Mapper || {};

  wrect.TileMap.Mapper.TileLayerDataObject = function() {
    this.tiles = [];
    this.height = 0;
    this.width = 0;
    this.name = '';
    this.opacity = 1;
    this.visible = true;
    this.position = new wrect.Physics.Vector(0, 0);
  };
}());
