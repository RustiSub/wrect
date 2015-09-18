(function() {
  "use strict";

  /** @type {Vector} */
  var Vector = require('Physics/Vector');

  var TileHelper = {
    toTileIndex: function(position, tileWidth, tileHeight, tilesPerRow) {
      var axisIndexes = this.toTilePosition(position, tileWidth, tileHeight);
      return Math.floor(axisIndexes.y) * tilesPerRow + Math.floor(axisIndexes.x);
    },
    toTileIndexCeil: function(position, tileWidth, tileHeight, tilesPerRow) {
      var axisIndexes = this.toTilePosition(position, tileWidth, tileHeight);
      return Math.ceil(axisIndexes.y) * tilesPerRow + Math.ceil(axisIndexes.x);
    },
    toTilePosition: function(position, tileWidth, tileHeight) {
      return position.multiply(new Vector(1 / tileWidth, 1 / tileHeight));
    }
  };

  module.exports = TileHelper;
}());
