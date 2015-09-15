(function() {
  'use strict';

  /** @type {Vector} */
  var Vector = require('Physics/Vector');

  /**
   * @constructor
   * @class wrect.TileMap.TileLayer
   */
  var TileLayer = function() {
    this.height = 0;
    this.width = 0;
    this.pixelHeight = 0;
    this.pixelWidth = 0;
    this.name = '';
    this.opacity = 1;
    this.visible = true;
    this.position = new Vector(0, 0);
    this.tiles = [];
    this.isCollisionLayer = false;
  };

  module.exports = TileLayer;
}());
