(function() {
  'use strict';

  /** @type {Vector} */
  var Vector = require('Physics/Vector');

  /**
   * @constructor
   * @class wrect.TileMap.Tile
   */
  var Tile = function() {
    this.id = 0;
    this.height = 0;
    this.width = 0;
    this.rotation = 0;
    this.tileSetName = '';
    this.position = new Vector(0, 0);
    this.flipped = {
      horizontal: false,
      vertical: false
    };
    this.sprite = {};

    // Mock an entity for collisions
    this.components = {};
  };

  module.exports = Tile;
}());
