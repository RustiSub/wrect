(function() {
  'use strict';

  var TileMapDataObject = function() {
    this.layers = [];
    this.tileSets = [];
    this.height = 0;
    this.width = 0;
    this.pixelHeight = 0;
    this.pixelWidth = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
  };

  module.exports = TileMapDataObject;
}());
