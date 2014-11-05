(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap = wrect.TileMap || {};

  wrect.TileMap.Tile = function() {
    this.id = 0;
    this.height = 0;
    this.width = 0;
    this.rotation = 0;
    this.tileSetName = '';
    this.flipped = {
      horizontal: false,
      vertical: false
    }
  };
}());
