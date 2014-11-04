(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap = wrect.TileMap || {};

  wrect.TileMap.TileMap = function() {
    this.layers = [];
    this.tileSets = [];
    this.height = 0;
    this.width = 0;
    this.pixelWidth = 0;
    this.pixelHeight = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
  };
  
  wrect.TileMap.TileMap.prototype.addLayer = function(layer) {
    this.layers.push(layer);
  };
  
  wrect.TileMap.TileMap.prototype.buildSprites = function() {
    var tileset = this.tileSets[0];
    var self = this;
    var srcImg = tileset.image;
    
    if (srcImg.width === 0) {
      srcImg.onload = buildSpriteTiles;
    }
    else {
      buildSpriteTiles();
    }
    
    function buildSpriteTiles() {
      var i;
      var j;
      
      var baseTexture = new PIXI.BaseTexture(srcImg.src);
      baseTexture.width = 512;
      baseTexture.height = 512;
      
      for (i = 0; i < self.layers.length; i++) {
        var layer = self.layers[i];
        for (j = 0; j < layer.tiles.length; j++) {
          var tile = layer.tiles[i];
          if (tile.id > 0) {
            var xcoord = (tile.id - 1) * ((baseTexture.width / tile.width) % 16);
            var ycoord = Math.floor((tile.id - 1) / 16);
          }
          
          var frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(xcoord * 32, ycoord * 32, 32, 32));
          frame.height = 32;
          frame.width = 32;
          var tileSprite = new PIXI.Sprite(frame);
          tileSprite.height = 32;
          tileSprite.width = 32;
          tileSprite._bounds.x = 0;
          tileSprite._bounds.y = 0;
          tileSprite._bounds.height = 32;
          tileSprite._bounds.width = 32;
          
          wrect.getGame()._cameraContainer.addChild(tileSprite);
          tileSprite.position.x = (j % 50) * 32;
          tileSprite.position.y = Math.floor(j / 50) * 32;
          tileSprite.valid = true;
          //var tile = layer.tiles[i];
          //
          //var tileSprite = new PIXI.Sprite()
        }
      }
    }
  }
}());