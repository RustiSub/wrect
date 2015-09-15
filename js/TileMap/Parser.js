(function() {
  'use strict';

  var JsonLoader = require('Loader/JsonLoader');

  /** @type TileMap */
  var TileMap = require('TileMap/TileMap');
  /** @type Tiled */
  var Tiled = require('TileMap/Mapper/Tiled');
  /** @type {TileLayer} */
  var TileLayer = require('TileMap/TileLayer');
  /** @type {Tile} */
  var Tile = require('TileMap/Tile');
  /** @type {TileDataObject} */
  var TileDataObject = require('TileMap/Mapper/TileDataObject');
  /** @type {TileSet} */
  var TileSet = require('TileMap/TileSet');


  /**
   * @class Parser
   * @param options
   * @module js/TileMap/Parser
   * @constructor
   */
  var Parser = function(options) {
    this.eventManager = options.eventManager;
  };

  /**
   * @param path
   * @param callback
   * @param context
   * @param [mapper]
   */
  Parser.prototype.loadTilemap = function(path, callback, context, mapper) {
    var loader = new JsonLoader({
      eventManager: this.eventManager,
      url: path
    });
    var self = this;
    loader.load(function(xhr) {
      var tilemap = self.parseTilemap(xhr.responseText, mapper);
      wrect.Loader.AssetLoader(tilemap.getAssets(), function() {
        if (typeof callback === 'function') {
          callback.call(context, tilemap);
        }
      });
    });
  };

  /**
   *
   * @param json
   * @param mapper
   */
  Parser.prototype.parseTilemap = function(json, mapper) {
    var i;
    var tileMap = new TileMap();
    if (!mapper) {
      mapper = new Tiled();
    }

    var tileMapDataObject = mapper.mapMap(json);

    for (i = 0; i < tileMapDataObject.layers.length; i++) {
      tileMap.addLayer(this.parseLayer(tileMapDataObject.layers[i]));
    }

    for (i = 0; i < tileMapDataObject.tileSets.length; i++) {
      var tileSet = this.parseTileSet(tileMapDataObject.tileSets[i]);
      tileMap.tileSets[tileSet.name] = tileSet;
    }

    tileMap.pixelHeight = tileMapDataObject.pixelHeight;
    tileMap.pixelWidth = tileMapDataObject.pixelWidth;
    tileMap.width = tileMapDataObject.width;
    tileMap.height = tileMapDataObject.height;
    tileMap.tileWidth = tileMapDataObject.tileWidth;
    tileMap.tileHeight = tileMapDataObject.tileHeight;

    return tileMap;
  };

  /**
   *
   * @param layerData
   * @returns {TileLayer}
   */
  Parser.prototype.parseLayer = function(layerData) {
    var layer = new TileLayer();
    var i;

    layer.height = layerData.height;
    layer.width = layerData.width;
    layer.pixelHeight = layerData.pixelHeight;
    layer.pixelWidth = layerData.pixelWidth;
    layer.name = layerData.name;
    layer.opacity = layerData.opacity;
    layer.visible = true;
    if (layerData.name === 'collision') {
      layer.isCollisionLayer = true;
    }

    if (layerData.type && layerData.name === 'collision') {
      layer.objects = [];
      for (var o = 0; o < layerData.objects.length; o++) {
        layer.objects.push(this.parseObject(layerData.objects[o]));
      }
    }

    for (i = 0; i < layerData.tiles.length; i++) {
      layer.tiles.push(this.parseTile(layerData.tiles[i]));
    }

    return layer;
  };

  /**
   *
   * @param tileSetData
   * @returns {TileSet}
   */
  Parser.prototype.parseTileSet = function(tileSetData) {
    var tileSet = new TileSet();
    tileSet.name = tileSetData.name;
    tileSet.imageHeight = tileSetData.imageHeight;
    tileSet.imageWidth = tileSetData.imageWidth;
    tileSet.tileHeight = tileSetData.tileHeight;
    tileSet.tileWidth = tileSetData.tileWidth;
    tileSet.imagePixelWidth = tileSetData.imagePixelWidth;
    tileSet.imagePixelHeight = tileSetData.imagePixelHeight;
    tileSet.imagePath = tileSetData.imagePath;
    tileSet.rows = tileSetData.rows;
    tileSet.columns = tileSetData.columns;
    tileSet.firstGid = tileSetData.firstGid;

    return tileSet;
  };

  /**
   *
   * @param tileData
   * @returns {Tile}
   */
  Parser.prototype.parseTile = function(tileData) {
    var tile = new Tile();

    tile.id = tileData.id;
    tile.rotation = tileData.rotation;
    tile.flipped = tileData.flipped;
    tile.height = tileData.height;
    tile.width = tileData.width;
    tile.tileSetName = tileData.tileSetName;

    return tile;
  };

  /**
   * @param tileSetData
   * @returns {Mapper.TileDataObject}
   */
  Parser.prototype.parseObject = function(tileSetData) {
    var object = new TileDataObject();

    object.id = tileSetData.id;
    object.name = tileSetData.name;
    object.dimensions = tileSetData.dimensions;



    return object;
  };

  module.exports = Parser;
}());
