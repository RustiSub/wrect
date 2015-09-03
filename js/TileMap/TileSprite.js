(function() {
  'use strict';
  var wrect = window.wrect;
  var PIXI = window.PIXI;

  wrect.TileMap = wrect.TileMap || {};

  /**
   * @Class wrect.TileMap.TileSprite
   * @param {PIXI.Texture} texture
   * @constructor
   * @augments PIXI.Sprite
   */
  wrect.TileMap.TileSprite = function (texture) {
    PIXI.Sprite.call(this, texture);
    this.tilePosition = new wrect.Physics.Vector(0, 0);
    this.tileIndex = 0;
  };

  wrect.TileMap.TileSprite.prototype = Object.create(PIXI.Sprite.prototype);
  wrect.TileMap.TileSprite.prototype.constructor = wrect.TileMap.TileSprite;
}());
