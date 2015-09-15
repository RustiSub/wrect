(function() {
  'use strict';
  var PIXI = require('lib/pixi');

  /**
   * @Class TileSprite
   * @param {PIXI.Texture} texture
   * @constructor
   * @augments PIXI.Sprite
   */
  var TileSprite = function (texture) {
    PIXI.Sprite.call(this, texture);
    this.tilePosition = new wrect.Physics.Vector(0, 0);
    this.tileIndex = 0;
  };

  TileSprite.prototype = Object.create(PIXI.Sprite.prototype);
  TileSprite.prototype.constructor = TileSprite;

  module.exports = TileSprite;
}());
