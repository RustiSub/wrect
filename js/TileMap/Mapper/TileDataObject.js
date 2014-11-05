(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap.Mapper = wrect.TileMap.Mapper || {};

  wrect.TileMap.Mapper.TileDataObject = function() {
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
