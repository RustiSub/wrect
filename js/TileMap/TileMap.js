(function() {
  'use strict';

  var Vector = require('Physics/Vector');
  var PIXI = require('lib/pixi');

  var TileSprite = require('TileMap/TileSprite');

  /**
   * A TileMap. Contains layers and tiles.
   * @constructor
   * @class TileMap
   */
  var TileMap = function() {
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
    this.visibleTiles = [];
    this.tileIds = [];
    this._debugContainer = null;
    this._debugContainerText = null;
    this.built = false;
  };

  /**
   * Initialise the TileMap. Call before building.
   */
  TileMap.prototype.init = function() {
    this.buildBaseTextures();
    //if (wrect.getGame().debugTilemap) {
    //  this._debugContainer = new PIXI.DisplayObjectContainer();
    //  this._debugContainerText = new PIXI.DisplayObjectContainer();
    //}
  };

  /**
   * Add a layer
   * @param {TileLayer} layer
   */
  TileMap.prototype.addLayer = function(layer) {
    this.layers.push(layer);
  };

  /**
   * Create base textures for all layers
   */
  TileMap.prototype.buildBaseTextures = function() {
    for (var x in this.tileSets) {
      var ts = this.tileSets[x];
      this.baseTextures[ts.name] = PIXI.BaseTexture.fromImage(ts.imagePath);
    }
  };

  /**
   * Builds the sprites and rigid bodies and adds them to the game.
   */
  TileMap.prototype.build = function(dimensions, displayContainer) {
    for (var i = 0; i < this.layers.length; i++) {
      var layer = this.layers[i];
      var pixiLayerContainer = new PIXI.DisplayObjectContainer();
      displayContainer.addChildAt(pixiLayerContainer, i);

      if (!layer.isCollisionLayer) {
        this.buildTileSprites(layer, dimensions, pixiLayerContainer);
      }
      else {
        this.buildCollisionBodies(layer);
      }
    }
    this.updateTiles(dimensions);
    this.built = true;
  };

  /**
   * Updates the tiles for the current position
   * @param dimensions
   */
  TileMap.prototype.updateTiles = function(dimensions) {
    // Build the tiles within the dimensions once, then on update check which ones need to be moved and swapped.
    for (var i = 0; i < 1/*this.layers.length*/; i++) {
      var layer = this.layers[i];
      if (!layer.isCollisionLayer) {
        this.updateTileSprites(layer, dimensions);
      }
    }
  };

  /**
   * Builds sprites of the tiles in the given layer and adds them to the passed displayContainer
   * @param {TileLayer} layer
   * @param {wrect.Geometry.Rectangle} dimensions
   * @param {PIXI.DisplayObjectContainer} displayContainer
   */
  TileMap.prototype.buildTileSprites = function(layer, dimensions, displayContainer) {
    var indexesToFill = this.getIndexesToFill(dimensions, 2, 2);
    var i;

    for (i = 0; i < indexesToFill.length; i++) {
      var tilePosition = indexesToFill[i];
      var tile = layer.tiles[tilePosition];
      if (!tile || tile.id === 0) {
        continue;
      }

      var baseTexture = this.baseTextures[tile.tileSetName];
      var frame = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, tile.width, tile.height));

      tile.sprite = new TileSprite(frame);
      tile.sprite.tileIndex = 0;
      this.visibleTiles.push(tile);
      displayContainer.addChild(tile.sprite);

      if (wrect.getGame().debugTilemap === true) {
        this.debug(tile, tilePosition, displayContainer, false);
      }
    }

    if (wrect.getGame().debugTilemap) {
      displayContainer.addChild(this._debugContainerText);
      displayContainer.addChild(this._debugContainer);
    }
  };

  /**
   * Returns the tilemap positions that need to be filled based on the given dimensions.
   * @param dimensions
   * @param [extraColumns]
   * @param [extraRows]
   * @returns {Array}
   */
  TileMap.prototype.getIndexesToFill = function(dimensions, extraColumns, extraRows) {
    var bounds = dimensions.getBounds();
    var tileHelper = TileHelper;

    extraColumns = 0; //extraColumns || 0;
    extraRows = 0; //extraRows || 0;
    extraRows *= this.tileHeight;
    extraColumns *= this.tileWidth;
    bounds.topLeft = bounds.topLeft.add(new Vector(-extraColumns, -extraRows));
    bounds.topRight = bounds.topRight.add(new Vector(extraColumns, -extraRows));
    bounds.bottomRight = bounds.bottomRight.add(new Vector(extraColumns, extraRows));

    var startIndex = tileHelper.toTileIndex(bounds.topLeft, this.tileWidth, this.tileHeight, this.width);
    var topRightIndex = tileHelper.toTileIndex(bounds.topRight, this.tileWidth, this.tileHeight, this.width);
    var stopIndex = tileHelper.toTileIndex(bounds.bottomRight, this.tileWidth, this.tileHeight, this.width);
    var xRange = topRightIndex - startIndex;
    var indexesToFill = [];
    var counter = 0;

    for (var i = startIndex; i <= stopIndex; i++) {
      counter++;
      indexesToFill.push(i);
      if (counter && counter % (xRange+1) === 0) {
        i += this.width - (xRange+1);
      }
    }

    return indexesToFill;
  };

  /**
   * Builds sprites of the tiles in the given layer and adds them to the passed displayContainer
   * @param {TileLayer} layer
   * @param {wrect.Geometry.Rectangle} dimensions
   */
  TileMap.prototype.updateTileSprites = function(layer, dimensions) {
    var indexesToFill = this.getIndexesToFill(dimensions, 1, 1);
    var changeableTiles = [];
    var tile;
    var i;

    if (this.built) {
      // Check where we need to draw and where we can clip.
      for (i = 0; i < this.visibleTiles.length; i++) {
        tile = this.visibleTiles[i];
        if (!tile) {
          continue;
        }
        var indexToFill = indexesToFill.indexOf(tile.sprite.tileIndex);

        if (indexToFill !== -1) {
          indexesToFill.splice(indexToFill, 1);
        }
        else {
          changeableTiles.push(tile);
        }
      }
    }
    else {
      changeableTiles = this.visibleTiles.slice();
    }

    /*if (indexesToFill.length > changeableTiles.length) {
      console.warn('short', indexesToFill.length - i, ' tiles to change! Aborting loop!');
      return;
    }*/
    // Fill new indexes with offscreen tiles.
    for (i = 0; i < indexesToFill.length; i++) {
      var tilePosition = indexesToFill[i];
      var newTileData = layer.tiles[tilePosition];
      if (!newTileData) {
        continue;
      }
      tile = changeableTiles.splice(0, 1)[0];

      if (!tile) {
        continue;
      }

      var xPosition = (tilePosition % this.width) * tile.width;
      var yPosition = Math.floor(tilePosition / this.width) * tile.height;

      if (newTileData.id === 0) {
        tile.sprite.visible = false;
        tile.sprite.position.x = xPosition;
        tile.sprite.position.y = yPosition;
        continue;
      }

      var tileSet = this.tileSets[newTileData.tileSetName];
      var x = 0;
      var y = 0;

      tile.id = newTileData.id;

      x = (tile.id - tileSet.firstGid) % (tileSet.columns);
      y = Math.floor((tile.id - tileSet.firstGid) / tileSet.columns);

      // Reset necessary properties
      tile.sprite.visible = true;
      tile.sprite.scale.x = Math.abs(tile.sprite.scale.x);
      tile.sprite.scale.y = Math.abs(tile.sprite.scale.y);

      tile.width = newTileData.width;
      tile.height = newTileData.height;
      tile.rotation = newTileData.rotation;
      tile.flipped.horizontal = newTileData.flipped.horizontal;
      tile.flipped.vertical = newTileData.flipped.vertical;
      tile.tileSetName = newTileData.tileSetName;
      tile.sprite.alpha = layer.opacity;

      var frame = new PIXI.Texture(this.baseTextures[tile.tileSetName], new PIXI.Rectangle(x * tile.width, y * tile.height, tile.width, tile.height));
      tile.sprite.setTexture(frame);
      //tile.sprite.texture.frame.x = x * tile.width;
      //tile.sprite.texture.frame.y = y * tile.height;
      tile.sprite.position.x = xPosition;
      tile.sprite.position.y = yPosition;
      //tile.sprite.pivot.x = tile.width / 2;
      //tile.sprite.pivot.y = tile.height / 2;
      tile.sprite.rotation = tile.rotation;
      tile.sprite.scale.x = tile.flipped.horizontal ? -tile.sprite.scale.x : tile.sprite.scale.x;
      tile.sprite.scale.y = tile.flipped.vertical ? -tile.sprite.scale.y : tile.sprite.scale.y;
      tile.sprite.tileIndex = tilePosition;
    }

    for (i = 0; i < changeableTiles.length; i++) {
      var changeableTile = changeableTiles[i];
      changeableTile.sprite.visible = false;
      changeableTile.sprite.tileIndex = 0;
    }
  };

  /**
   * Debug the tilemap. Draws a grid and text ids.
   * @param {Tile} tile
   * @param {int} index
   * @param {PIXI.DisplayObjectContainer} displayContainer
   * @param {Boolean} once
   */
  TileMap.prototype.debug = function(tile, index, displayContainer, once) {

    if (once === undefined || once) {
      // Only debug the first layer so the browser doesn't blow up.
      wrect.getGame().debugTilemap = false;
    }

    var border = new PIXI.Graphics();
    border.beginFill(0xFFFFFF, 0);
    border.lineStyle(1, 0xFF0000);
    border.drawRect(tile.sprite.position.x, tile.sprite.position.y, tile.width, tile.height);
    border.endFill();
    var text = new PIXI.Text(index, { font: "bold 12px Arial", fill: "#AAAAAA", align: "center", stroke: "#000000", strokeThickness: 3 });
    text.position = tile.sprite.position;
    this._debugContainer.addChild(border);
    this._debugContainerText.addChild(text);
  };

  /**
   * @returns {Array}
   */
  TileMap.prototype.getAssets = function() {
    if (this.assets === null) {
      this.assets = [];
      for (var i in this.tileSets) {
        this.assets.push(this.tileSets[i].imagePath);
      }
    }

    return this.assets;
  };

  /**
   * Build the collision bodies
   * @param {TileLayer} layer
   */
  TileMap.prototype.buildCollisionBodies = function(layer) {
    for (var i = 0; i < layer.objects.length; i++) {
      var object = layer.objects[i];

      if (object.id === 0) {
        continue;
      }

      var polygon = new wrect.ECS.Assemblage.LineShape({
        origin: object.dimensions.origin,
        vertices: object.dimensions.vertices,
        color: 0x00FFFF,
        alpha: 0.25
      });

      polygon.addComponent(new wrect.ECS.Component.BaseMaterial({absorb: new wrect.Physics.Vector(0.001, 0.1)}));

      game.getEntityManager().addEntity(polygon);

      //var x = (i % this.width) * tile.width;
      //var y = Math.floor(i / this.height) * tile.height;
      //
      //x -= tile.width / 2;
      //y -= tile.height / 2;
      //
      //var dimensions = new wrect.Geometry.Rectangle({
      //  origin: new wrect.Physics.Vector(x, y),
      //  width: tile.width,
      //  height: tile.height
      //});
      //
      //var body = new wrect.ECS.Component.TileBody({
      //  dimensions: dimensions
      //});
      //
      //if (wrect.getGame().debug) {
      //  var border = new PIXI.Graphics();
      //  border.beginFill(0xFFFFFF, 0);
      //  border.lineStyle(1, 0xFF0000);
      //  border.drawRect(x, y, tile.width, tile.height);
      //  border.endFill();
      //  wrect.getGame()._cameraContainer.addChild(border);
      //}
      //
      //var physicsEngine;
      //if (physicsEngine = wrect.getGame().physicsEngine) {
      //  tile.components.RigidBody = tile.components.TileBody = body;
      //  physicsEngine.systems.QuadTree.system.addEntity({entity: tile});
      //}
    }
  };

  module.exports = TileMap;
}());
