(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap = wrect.TileMap || {};

  /**
   * @constructor
   * @class wrect.TileMap.TileLayer
   */
  wrect.TileMap.TileLayer = function() {
    this.height = 0;
    this.width = 0;
    this.pixelHeight = 0;
    this.pixelWidth = 0;
    this.name = '';
    this.opacity = 1;
    this.visible = true;
    this.position = new wrect.Physics.Vector(0, 0);
    this.tiles = [];
    this.isCollisionLayer = false;
  };
}());
