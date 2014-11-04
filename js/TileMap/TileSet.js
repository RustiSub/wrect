(function() {
  'use strict';

  var wrect = window.wrect;
  wrect.TileMap = wrect.TileMap || {};

  wrect.TileMap.TileSet = function() {
    this.image = null;
    this.name = '';
    this.imageHeight = 0;
    this.imageWidth = 0;
    this.tileHeight = 0;
    this.tileWidth = 0;
    this.imagePixelWidth = 0;
    this.imagePixelHeight = 0;
  };
}());