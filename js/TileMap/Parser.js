(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap = wrect.TileMap || {};
  wrect.TileMap.Parser = function() {};

  /**
   * @param path
   * @param callback
   * @param context
   * @param [mapper]
   */
  wrect.TileMap.Parser.prototype.loadTilemap = function(path, callback, context, mapper) {
    var loader = new wrect.Loader.JsonLoader(path);
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
  wrect.TileMap.Parser.prototype.parseTilemap = function(json, mapper) {
    var i;
    var tileMap = new wrect.TileMap.TileMap();
    if (!mapper) {
      mapper = new wrect.TileMap.Mapper.Tiled();
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
   * @returns {wrect.TileMap.TileLayer}
   */
  wrect.TileMap.Parser.prototype.parseLayer = function(layerData) {
    var layer = new wrect.TileMap.TileLayer();
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

    for (i = 0; i < layerData.tiles.length; i++) {
      layer.tiles.push(this.parseTile(layerData.tiles[i]));
    }

    return layer;
  };

  /**
   *
   * @param tileSetData
   * @returns {wrect.TileMap.TileSet}
   */
  wrect.TileMap.Parser.prototype.parseTileSet = function(tileSetData) {
    var tileSet = new wrect.TileMap.TileSet();
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
   * @returns {wrect.TileMap.Tile}
   */
  wrect.TileMap.Parser.prototype.parseTile = function(tileData) {
    var tile = new wrect.TileMap.Tile();

    tile.id = tileData.id;
    tile.rotation = tileData.rotation;
    tile.flipped = tileData.flipped;
    tile.height = tileData.height;
    tile.width = tileData.width;
    tile.tileSetName = tileData.tileSetName;

    return tile;
  };
}());
