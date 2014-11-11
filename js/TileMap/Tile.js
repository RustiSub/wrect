(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap = wrect.TileMap || {};

  /**
   * @constructor
   * @class wrect.TileMap.Tile
   */
  wrect.TileMap.Tile = function() {
    this.id = 0;
    this.height = 0;
    this.width = 0;
    this.rotation = 0;
    this.tileSetName = '';
    this.position = new wrect.Physics.Vector(0, 0);
    this.flipped = {
      horizontal: false,
      vertical: false
    };
    this.sprite = {};

    // Mock an entity for collisions
    this.components = {};
  };
}());
