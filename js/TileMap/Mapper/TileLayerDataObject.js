(function() {
  'use strict';

  var Vector = require('Physics/Vector');

  wrect.TileMap.Mapper.TileLayerDataObject = function() {
    this.tiles = [];
    this.height = 0;
    this.width = 0;
    this.name = '';
    this.opacity = 1;
    this.visible = true;
    this.position = new Vector(0, 0);
    this.pixelHeight = 0;
    this.pixelWidth = 0;
    this.tileSet = null;
  };
}());
