(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap = wrect.TileMap || {};

  wrect.TileMap.TileMap = function() {
    this.layers = [];
    this.tileSets = [];
    this.height = 0;
    this.width = 0;
    this.pixelWidth = 0;
    this.pixelHeight = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
  };
  
  wrect.TileMap.TileMap.prototype.addLayer = function(layer) {
    this.layers.push(this.parseLayer(layer));
    if (layer.height > this.height) {
      this.height = layer.height;
      this.pixelHeight = layer.pixelHeight;
    }
    if (layer.width > this.width) {
      this.width = layer.width;
      this.pixelWidth = layer.pixelWidth;
    }
  }
}());
