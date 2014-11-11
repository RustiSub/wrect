(function() {
  'use strict';
  var PIXI = window.PIXI;
  var wrect = window.wrect;
  wrect.TileMap = wrect.TileMap || {};

  /**
   * A TileMap. Contains layers and tiles.
   * @constructor
   * @class wrect.TileMap.TileMap
   */
  wrect.TileMap.TileMap = function() {
    this.layers = [];
    this.tileSets = {};
    this.baseTextures = {};
    this.height = 0;
    this.width = 0;
    this.pixelWidth = 0;
    this.pixelHeight = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.assets = null;
    this.visibleSprites = [];
    this.tileIds = [];
  };

  /**
   * Initialise the TileMap. Call before building.
   */
  wrect.TileMap.TileMap.prototype.init = function() {
    this.buildBaseTextures();
  };

  /**
   * Add a layer
   * @param {wrect.TileMap.TileLayer} layer
   */
  wrect.TileMap.TileMap.prototype.addLayer = function(layer) {
    this.layers.push(layer);
  };

  /**
   * Create base textures for all layers
   */
  wrect.TileMap.TileMap.prototype.buildBaseTextures = function() {
    for (var x in this.tileSets) {
      var ts = this.tileSets[x];
      this.baseTextures[ts.name] = PIXI.BaseTexture.fromImage(ts.imagePath);
    }
  };

  /**
   * Builds the sprites and rigid bodies and adds them to the game.
   */
  wrect.TileMap.TileMap.prototype.build = function(dimensions) {
    for (var i = 0; i < this.layers.length; i++) {
      var layer = this.layers[i];
      var pixiLayerContainer = new PIXI.DisplayObjectContainer();
      wrect.getGame().getCamera().displayContainer.addChildAt(pixiLayerContainer, i);

      if (!layer.isCollisionLayer) {
        this.buildTileSprites(layer, dimensions, pixiLayerContainer);
      }
      else {
        //this.buildCollisionBodies(layer);
      }
    }
  };

  wrect.TileMap.TileMap.prototype.updateTiles = function(dimensions) {
    // Build the tiles within the dimensions once, then on update check which ones need to be moved and swapped.
    for (var i = 0; i < this.layers.length; i++) {
      var layer = this.layers[i];
      if (!layer.isCollisionLayer) {
        this.updateTileSprites(layer, dimensions);
      }
    }
  };

  /**
   * Build the collision bodies
   * @param {wrect.TileMap.TileLayer} layer
   */
  wrect.TileMap.TileMap.prototype.buildCollisionBodies = function(layer) {
    for (var i = 0; i < layer.tiles.length; i++) {
      var tile = layer.tiles[i];

      if (tile.id === 0) {
        continue;
      }

      var x = (i % this.width) * tile.width;
      var y = Math.floor(i / this.height) * tile.height;

      x -= tile.width / 2;
      y -= tile.height / 2;

      var dimensions = new wrect.Geometry.Rectangle({
        origin: new wrect.Physics.Vector(x, y),
        width: tile.width,
        height: tile.height
      });

      var body = new wrect.ECS.Component.TileBody({
        dimensions: dimensions
      });

      if (wrect.getGame().debug) {
        var border = new PIXI.Graphics();
        border.beginFill(0xFFFFFF, 0);
        border.lineStyle(1, 0xFF0000);
        border.drawRect(x, y, tile.width, tile.height);
        border.endFill();
        wrect.getGame()._cameraContainer.addChild(border);
      }

      var physicsEngine;
      if (physicsEngine = wrect.getGame().physicsEngine) {
        tile.components.RigidBody = tile.components.TileBody = body;
        physicsEngine.systems.QuadTree.system.addEntity({entity: tile});
      }
    }
  };

  /**
   * Builds sprites of the tiles in the given layer and adds them to the passed displayContainer
   * @param {wrect.TileMap.TileLayer} layer
   * @param {wrect.Geometry.Rectangle} dimensions
   * @param {PIXI.DisplayObjectContainer} displayContainer
   */
  wrect.TileMap.TileMap.prototype.buildTileSprites = function(layer, dimensions, displayContainer) {
    var bounds = dimensions.getBounds();
    var tileHelper = wrect.TileMap.TileHelper;

    var i = tileHelper.toTileIndex(bounds.topLeft, this.tileWidth, this.tileHeight, this.width);
    var length = tileHelper.toTileIndex(bounds.bottomRight, this.tileWidth, this.tileHeight, this.width);

    for (; i < length; i++) {
      var tile = layer.tiles[i];
      if (!tile || tile.id === 0) {
        continue;
      }

      tile.position.x = (i % this.width) * tile.width;
      tile.position.y = Math.floor(i / this.height) * tile.height;

      var baseTexture = this.baseTextures[tile.tileSetName];
      var tileSet = this.tileSets[tile.tileSetName];

      var x = (tile.id - tileSet.firstGid) % (tileSet.columns);
      var y = Math.floor((tile.id - tileSet.firstGid) / tileSet.columns);

      var frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x * tile.width, y * tile.height, tile.width, tile.height));
      frame.height = tile.height;
      frame.width = tile.width;

      var tileSprite = new wrect.TileMap.TileSprite(frame);
      tileSprite.height = tile.height;
      tileSprite.width = tile.width;
      tileSprite.pivot.x = tile.width / 2;
      tileSprite.pivot.y = tile.height / 2;
      tileSprite.position.x = tile.position.x;
      tileSprite.position.y = tile.position.y;
      tileSprite.rotation = tile.rotation;
      tileSprite.scale.x = tile.flipped.horizontal ? -tileSprite.scale.x : tileSprite.scale.x;
      tileSprite.scale.y = tile.flipped.vertical ? -tileSprite.scale.y : tileSprite.scale.y;
      tileSprite.alpha = layer.opacity;
      tileSprite.tilePosition.x = (i % this.width);
      tileSprite.tilePosition.y = Math.floor(i / this.height);
      tileSprite.tileIndex = tileHelper.toTileIndex(tile.position, tile.width, tile.height, this.width);
      tile.sprite = tileSprite;

      if (wrect.getGame().debugTilemap === true) {
        this.debug(tile, i, displayContainer, false);
      }

      this.visibleSprites.push(tile.sprite);
      displayContainer.addChild(tile.sprite);
    }
  };

  /**
   * Builds sprites of the tiles in the given layer and adds them to the passed displayContainer
   * @param {wrect.TileMap.TileLayer} layer
   * @param {wrect.Geometry.Rectangle} dimensions
   */
  wrect.TileMap.TileMap.prototype.updateTileSprites = function(layer, dimensions) {
    var bounds = dimensions.getBounds();
    var tileHelper = wrect.TileMap.TileHelper;

    var startIndex = tileHelper.toTileIndex(bounds.topLeft, this.tileWidth, this.tileHeight, this.width);
    var stopIndex = tileHelper.toTileIndex(bounds.bottomRight, this.tileWidth, this.tileHeight, this.width);

    var changeableSprites = [];
    var positionsToFill = [];

    for (i = startIndex; i < stopIndex; i++) {
      positionsToFill.push(i);
    }

    for (var i = 0; i < this.visibleSprites.length; i++) {
      var sprite = this.visibleSprites[i];
      if (!sprite) {
        continue;
      }

      var indexToFill = positionsToFill.indexOf(sprite.tileIndex);

      if (indexToFill !== -1) {
        positionsToFill.splice(indexToFill, 1);
      }
      else {
        changeableSprites.push(sprite);
      }
    }

    for (i = 0; i < positionsToFill.length; i++) {
      var tile = changeableSprites.splice(0, 1)[0];
      var newTileData = layer.tiles[i];

      // Refactor so that layer contains set
      var tileSet = this.tileSets[newTileData.tileSetName];

    }

      //// change sprite.texture.frame.x & .y
      //// change sprite.position.x & .y
      //
      //var baseTexture = this.baseTextures[tile.tileSetName];
      //var tileSet = this.tileSets[tile.tileSetName];
      //
      //var x = (tile.id - tileSet.firstGid) % (tileSet.columns);
      //var y = Math.floor((tile.id - tileSet.firstGid) / tileSet.columns);
      //
      //var frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x * tile.width, y * tile.height, tile.width, tile.height));
      //frame.height = tile.height;
      //frame.width = tile.width;
      //
      //var tileSprite = new PIXI.Sprite(frame);
      //tileSprite.height = tile.height;
      //tileSprite.width = tile.width;
      //tileSprite.pivot.x = tile.width / 2;
      //tileSprite.pivot.y = tile.height / 2;
      //tileSprite.position.x = (i % this.width) * tile.width;
      //tileSprite.position.y = Math.floor(i / this.height) * tile.height;
      //tileSprite.rotation = tile.rotation;
      //tileSprite.scale.x = tile.flipped.horizontal ? -tileSprite.scale.x : tileSprite.scale.x;
      //tileSprite.scale.y = tile.flipped.vertical ? -tileSprite.scale.y : tileSprite.scale.y;
      //tileSprite.alpha = layer.opacity;
      //tile.sprite = tileSprite;
      //
      //if (wrect.getGame().debugTilemap === true) {
      //  this.debug(tile, i, displayContainer, false);
      //}
      //
      //displayContainer.addChild(tile.sprite);
  };

  /**
   * Debug the tilemap. Draws a grid and text ids.
   * @param {wrect.TileMap.Tile} tile
   * @param {int} index
   * @param {PIXI.DisplayObjectContainer} displayContainer
   * @param {Boolean} once
   */
  wrect.TileMap.TileMap.prototype.debug = function(tile, index, displayContainer, once) {
    if (once === undefined || once) {
      // Only debug the first layer so the browser doesn't blow up.
      wrect.getGame().debugTilemap = false;
    }
    var border = new PIXI.Graphics();
    border.beginFill(0xFFFFFF, 0);
    border.lineStyle(1, 0xFF0000);
    border.drawRect(tile.sprite.position.x, tile.sprite.position.y, tile.width, tile.height);
    border.endFill();
    var text = new PIXI.Text(index + "\n" + tile.id, { font: "bold 12px Arial", fill: "#AAAAAA", align: "center", stroke: "#000000", strokeThickness: 3 });
    text.position = tile.sprite.position;
    //displayContainer.addChild(border);
    displayContainer.addChild(text);
  };

  /**
   * @returns {Array}
   */
  wrect.TileMap.TileMap.prototype.getAssets = function() {
    if (this.assets === null) {
      this.assets = [];
      for (var i in this.tileSets) {
        this.assets.push(this.tileSets[i].imagePath);
      }
    }

    return this.assets;
  };
}());
