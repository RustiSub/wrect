(function() {
  'use strict';
  var wrect = window.wrect;
  wrect.TileMap = wrect.TileMap || {};

  wrect.TileMap.Parser = function() {};

  wrect.TileMap.Parser.prototype.loadTilemap = function(path, mapper) {
    var loader = new wrect.Loader.JsonLoader(path);
    var self = this;
    loader.load(function(xhr) {
      self.parseTilemap(xhr.responseText, mapper);
    });
  };

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
      tileMap.tileSets.push(this.parseTileSet(tileMapDataObject.tileSets[i]));
    }
    
    tileMap.pixelHeight = tileMapDataObject.pixelHeight;
    tileMap.pixelWidth = tileMapDataObject.pixelWidth;
    tileMap.width = tileMapDataObject.width;
    tileMap.height = tileMapDataObject.height;
    tileMap.tileWidth = tileMapDataObject.tileWidth;
    tileMap.tileHeight = tileMapDataObject.tileHeight;

    console.log(tileMap);
  };

  wrect.TileMap.Parser.prototype.parseLayer = function(layerData) {
    var layer = new wrect.TileMap.TileLayer();
    var i;

    layer.height = layerData.height;
    layer.width = layerData.width;
    layer.name = layerData.name;
    layer.opacity = layerData.opacity;
    layer.visible = true;

    for (i = 0; i < layerData.tiles.length; i++) {
      layer.tiles.push(this.parseTile(layerData.tiles[i]));
    }

    return layer;
  };

  wrect.TileMap.Parser.prototype.parseTileSet = function(tileSetData) {
    var tileSet = new wrect.TileMap.TileSet();
    tileSet.name = tileSetData.name;
    tileSet.imageHeight = tileSetData.imageHeight;
    tileSet.imageWidth = tileSetData.imageWidth;
    tileSet.tileHeight = tileSetData.tileHeight;
    tileSet.tileWidth = tileSetData.tileWidth;
    tileSet.imagePixelWidth = tileSetData.imagePixelWidth;
    tileSet.imagePixelHeight = tileSetData.imagePixelHeight;

    return tileSet;
  };

  wrect.TileMap.Parser.prototype.parseTile = function(tileData) {
    var tile = new wrect.TileMap.Tile();
    return tile;
  };
}());
