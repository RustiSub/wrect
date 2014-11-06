(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap = wrect.TileMap || {};

  wrect.TileMap.TileMap = function() {
    this.layers = [];
    this.tileSets = {};
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
    var self = this;
    var baseTextures = {};
    for (var x in this.tileSets) {
      var ts = this.tileSets[x];
      baseTextures[ts.name] = PIXI.BaseTexture.fromImage(ts.imagePath);
    }

    buildSpriteTiles();

    function buildSpriteTiles() {
      var i;
      var j;

      for (i = 0; i < self.layers.length; i++) {
        var layer = self.layers[i];
        wrect.getGame().getCamera().displayContainer.addChildAt(new PIXI.DisplayObjectContainer(), i);
        for (j = 0; j < layer.tiles.length; j++) {
          var tile = layer.tiles[j];
          if (tile.id === 0) {
            continue;
          }
          var baseTexture = baseTextures[tile.tileSetName];
          var tileSet = self.tileSets[tile.tileSetName];

          var xcoord = (tile.id - 1) % (tileSet.columns);
          var ycoord = Math.floor((tile.id - 1) / tileSet.rows);

          var frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(xcoord * tile.width, ycoord * tile.height, tile.width, tile.height));
          frame.height = tile.height;
          frame.width = tile.width;

          var tileSprite = new PIXI.Sprite(frame);
          tileSprite.height = tile.height;
          tileSprite.width = tile.width;
          tileSprite.pivot.x = tile.width / 2;
          tileSprite.pivot.y = tile.height / 2;
          tileSprite.position.x = (j % self.width) * tile.width;
          tileSprite.position.y = Math.floor(j / self.height) * tile.height;
          tileSprite.rotation = tile.rotation;
          tileSprite.scale.x = tile.flipped.horizontal ? -tileSprite.scale.x : tileSprite.scale.x;
          tileSprite.scale.y = tile.flipped.vertical ? -tileSprite.scale.y : tileSprite.scale.y;


          if (wrect.getGame().debugTilemap && i === 0) {
            var border = new PIXI.Graphics();
            border.beginFill(0xFFFFFF, 0);
            border.lineStyle(1, 0xFF0000);
            border.drawRect(tileSprite.position.x, tileSprite.position.y, tile.width, tile.height);
            border.endFill();
            var text = new PIXI.Text(j + "\n" + tile.id, { font: "bold 12px Arial", fill: "#AAAAAA", align: "center", stroke: "#000000", strokeThickness: 3 });
            text.position = tileSprite.position;
            wrect.getGame()._cameraContainer.addChild(border);
            wrect.getGame()._cameraContainer.addChild(text);

          }

          wrect.getGame()._cameraContainer.children[i].addChild(tileSprite);
        }
      }
    }
  };
}());
