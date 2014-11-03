(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap.Mapper = wrect.TileMap.Mapper || {};

  wrect.TileMap.Mapper.TileDataObject = function() {
    this.id = 0;
    this.flipped = {x: false, y: false};
    this.rotation = 0;
  };
}());
