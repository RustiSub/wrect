(function() {
  'use strict';

  /** @type Vector */
  var Vector = require('Physics/Vector');
  /** @type {TileDataObject} */
  var TileDataObject = require('TileMap/Mapper/TileDataObject');
  /** @type {TileMapDataObject} */
  var TileMapDataObject = require('TileMap/Mapper/TileMapDataObject');
  /** @type {TileSetDataObject} */
  var TileSetDataObject = require('TileMap/Mapper/TileSetDataObject');
  /** @type {TileLayerDataObject} */
  var TileLayerDataObject = require('TileMap/Mapper/TileLayerDataObject');
  /** @type {Polygon} */
  var Polygon = require('Geometry/Shape/Polygon');

  /**
   * Mapper to map the Tiled editor's .json format to common DataObjects.
   * @constructor
   */
  var Tiled = function() {};

  Tiled.prototype.horizontalFlipFlag = 0x80000000;

  Tiled.prototype.verticalFlipFlag = 0x40000000;

  Tiled.prototype.diagonalFlipFlag = 0x20000000;

  Tiled.prototype.horizontalFlipDrawFlag = 1;
  Tiled.prototype.verticalFlipDrawFlag = 2;
  Tiled.prototype.diagonalFlipDrawFlag = 4;

  /**
   * @returns {TileMapDataObject}
   */
  Tiled.prototype.mapMap = function(json) {
    var data = JSON.parse(json);
    var tileMapDataObject = new TileMapDataObject();

    for (i = 0; i < data.tilesets.length; i++) {
      tileMapDataObject.tileSets.push(this.mapTileSet(data.tilesets[i]));
    }

    for (var i = 0; i < data.layers.length; i++) {
      tileMapDataObject.layers.push(this.mapLayer(data.layers[i], data.tileheight, data.tilewidth, tileMapDataObject.tileSets));
    }


    tileMapDataObject.height = data.height;
    tileMapDataObject.width = data.width;
    tileMapDataObject.tileHeight = data.tileheight;
    tileMapDataObject.tileWidth = data.tilewidth;
    tileMapDataObject.pixelHeight = data.height * data.tileheight;
    tileMapDataObject.pixelWidth = data.width * data.tilewidth;

    return tileMapDataObject;
  };

  /**
   * @param layerData
   * @param tileHeight
   * @param tileWidth
   * @param tileSets
   * @returns {TileLayerDataObject}
   */
  Tiled.prototype.mapLayer = function(layerData, tileHeight, tileWidth, tileSets) {
    var layer = new TileLayerDataObject();

    layer.type = layerData.type;
    layer.height = layerData.height;
    layer.width = layerData.width;
    layer.pixelHeight = layerData.height * tileHeight;
    layer.pixelWidth = layerData.width * tileWidth;
    layer.name = layerData.name;
    layer.opacity = layerData.opacity;
    layer.visible = layerData.visible;
    layer.position.x = layerData.x;
    layer.position.y = layerData.y;

    if (layerData.type && layerData.type === 'objectgroup') {
      layer.objects = [];
      for (var o = 0; o < layerData.objects.length; o++) {
        layer.objects.push(this.mapObject(layerData.objects[o]));
      }
    }

    if (layerData.data) {
      for (var i = 0; i < layerData.data.length; i++) {
        layer.tiles.push(this.mapTile(layerData.data[i], tileHeight, tileWidth, tileSets));
      }
    }

    return layer;
  };

  /**
   * @param tileData
   * @param tileHeight
   * @param tileWidth
   * @param tileSets
   * @returns {TileDataObject}
   */
  Tiled.prototype.mapTile = function(tileData, tileHeight, tileWidth, tileSets) {
    var tile = new TileDataObject();
    var flipAndRotateFlags = 0;

    // Flipping/rotation of sprites is done with flipping bits.
    if ((tileData & this.horizontalFlipFlag) !== 0) {
      flipAndRotateFlags |= this.horizontalFlipDrawFlag;
    }
    if ((tileData & this.verticalFlipFlag) !== 0) {
      flipAndRotateFlags |= this.verticalFlipDrawFlag;
    }
    if ((tileData & this.diagonalFlipFlag) !== 0) {
      flipAndRotateFlags |= this.diagonalFlipDrawFlag;
    }

    // Set the original tile ID
    tileData &= ~(this.horizontalFlipFlag | this.verticalFlipFlag | this.diagonalFlipFlag);
    tile.id = tileData;

    // Set the flip flags
    if ( (flipAndRotateFlags & this.horizontalFlipDrawFlag) !== 0 ) {
      tile.flipped.horizontal = true;
    }
    if ( (flipAndRotateFlags & this.verticalFlipDrawFlag) !== 0 ) {
      tile.flipped.vertical = true;
    }
    if ((flipAndRotateFlags & this.diagonalFlipDrawFlag) !== 0 ) {
      if ((flipAndRotateFlags & this.horizontalFlipDrawFlag) !== 0 &&
        (flipAndRotateFlags & this.verticalFlipDrawFlag) !== 0 ) {
        tile.rotation = Math.PI / 2;
        tile.flipped.vertical = true;
      } else if ( (flipAndRotateFlags & this.horizontalFlipDrawFlag) !== 0 ) {
        tile.rotation = -Math.PI / 2;
        tile.flipped.vertical = true;
      } else if ( (flipAndRotateFlags & this.verticalFlipDrawFlag) !== 0 ) {
        tile.rotation = Math.PI / 2;
        tile.flipped.horizontal = true;
      } else {
        tile.rotation = -Math.PI / 2;
        tile.flipped.horizontal = true;
      }
    }

    // Dimensions
    tile.height = tileHeight;
    tile.width = tileWidth;

    // Tileset
    var highestMatchingGid = 0;
    var tileSet;

    for (var i = 0; i < tileSets.length; i++) {
      tileSet = tileSets[i];
      if (tile.id >= tileSet.firstGid && tile.id > highestMatchingGid) {
        highestMatchingGid = tileSet.firstGid;
      }
    }

    for (i = 0; i < tileSets.length; i++) {
      tileSet = tileSets[i];
      if (tileSet.firstGid === highestMatchingGid) {
        tile.tileSetName = tileSet.name;
        break;
      }
    }

    return tile;
  };

  /**
   * @param tileSetData
   * @returns {TileSetDataObject}
   */
  Tiled.prototype.mapTileSet = function(tileSetData) {
    var tileSet = new TileSetDataObject();

    tileSet.imagePath = 'resources/levels/tilemap/' + tileSetData.name + '.png';
    tileSet.imageHeight = tileSetData.imageheight / tileSetData.tileheight;
    tileSet.imageWidth = tileSetData.imagewidth / tileSetData.tilewidth;
    tileSet.imagePixelHeight = tileSetData.imageheight;
    tileSet.imagePixelWidth = tileSetData.imagewidth;
    tileSet.tileHeight = tileSetData.tileheight;
    tileSet.tileWidth = tileSetData.tilewidth;
    tileSet.name = tileSetData.name;
    tileSet.rows = tileSetData.imageheight / tileSetData.tileheight;
    tileSet.columns = tileSetData.imagewidth / tileSetData.tilewidth;
    tileSet.firstGid = tileSetData.firstgid;

    return tileSet;
  };

  /**
   * @param tileSetData
   * @returns {TileDataObject}
   */
  Tiled.prototype.mapObject = function(tileSetData) {
    var object = new TileDataObject();

    object.id = tileSetData.id;
    object.name = tileSetData.name;

    if (tileSetData.polygon) {
      object.dimensions = new Polygon({
        origin: new Vector(tileSetData.x, tileSetData.y)
      });
      for (var p = 0; p < tileSetData.polygon.length; p++) {
        var point = new Vector(tileSetData.polygon[p].x, tileSetData.polygon[p].y);
        object.dimensions.vertices.push(point);
      }
    }

    return object;
  };

  module.exports = Tiled;
}());
