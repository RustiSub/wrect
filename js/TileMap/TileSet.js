(function() {
  'use strict';

  var wrect = window.wrect;
  wrect.TileMap = wrect.TileMap || {};

  /**
   * @constructor
   * @class wrect.TileMap.TileSet
   */
  wrect.TileMap.TileSet = function() {
    this.imagePath = '';
    this.name = '';
    this.imageHeight = 0;
    this.imageWidth = 0;
    this.tileHeight = 0;
    this.tileWidth = 0;
    this.columns = 0;
    this.rows = 0;
    this.imagePixelWidth = 0;
    this.imagePixelHeight = 0;
  };
}());
