(function() {
  "use strict";
  var wrect = window.wrect;

  wrect.TileMap.TileHelper = {
    toTilePosition: function(position, tileWidth, tileHeight) {
      var x = Math.floor(position.x / tileWidth);
      var y = Math.floor(position.y / tileHeight);

      return new wrect.Physics.Vector(x, y);
    }
  };
}());
