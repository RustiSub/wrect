(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap.Mapper = wrect.TileMap.Mapper || {};

  /**
   * Mapper to map the Tiled editor's .json format to common DataObjects.
   * @constructor
   */
  wrect.TileMap.Mapper.Tiled = function() {};

  /**
   * @returns {wrect.TileMap.Mapper.TileMapDataObject}
   */
  wrect.TileMap.Mapper.Tiled.prototype.mapMap = function(json) {
    var data = JSON.parse(json);
    var tileMapDataObject = new wrect.TileMap.Mapper.TileMapDataObject();

    for (var i = 0; i < data.layers.length; i++) {
      tileMapDataObject.layers.push(this.mapLayer(data.layers[i], data.tileheight, data.tilewidth));
    }

    for (i = 0; i < data.tilesets.length; i++) {
      tileMapDataObject.tileSets.push(this.mapTileSet(data.tilesets[i]));
    }

    tileMapDataObject.height = data.height;
    tileMapDataObject.width = data.width;
    tileMapDataObject.tileHeight = data.tileheight;
    tileMapDataObject.tileWidth = data.tilewidth;
    tileMapDataObject.pixelHeight = data.height * data.tileHeight;
    tileMapDataObject.pixelWidth = data.width * data.tileWidth;

    return tileMapDataObject;
  };

  /**
   * @param layerData
   * @param tileHeight
   * @param tileWidth
   * @returns {wrect.TileMap.Mapper.TileLayerDataObject}
   */
  wrect.TileMap.Mapper.Tiled.prototype.mapLayer = function(layerData, tileHeight, tileWidth) {
    var layer = new wrect.TileMap.Mapper.TileLayerDataObject();

    layer.height = layerData.height;
    layer.width = layerData.width;
    layer.pixelHeight = layerData.height * tileHeight;
    layer.pixelWidth = layerData.width * tileWidth;
    layer.name = layerData.name;
    layer.opacity = layerData.opacity;
    layer.visible = layerData.visible;
    layer.position.x = layerData.x;
    layer.position.y = layerData.y;

    for (var i = 0; i < layerData.data.length; i++) {
      layer.tiles.push(this.mapTile(layerData.data[i]));
    }

    return layer;
  };

  /**
   * @param tileData
   * @returns {wrect.TileMap.Mapper.TileDataObject}
   */
  wrect.TileMap.Mapper.Tiled.prototype.mapTile = function(tileData) {
    var tile = new wrect.TileMap.Mapper.TileDataObject();
    tile.id = tileData;
    return tile;
  };

  wrect.TileMap.Mapper.Tiled.prototype.mapTileSet = function(tileSetData) {
    var tileSet = new wrect.TileMap.Mapper.TileSetDataObject();

    tileSet.imagePath = tileSetData.image;
    tileSet.imageHeight = tileSetData.imageheight;
    tileSet.imageWidth = tileSetData.imagewidth;
    tileSet.imagePixelHeight = tileSetData.imageheight * tileSetData.tileheight;
    tileSet.imagePixelWidth = tileSetData.imagewidth * tileSetData.tilewidth;
    tileSet.tileHeight = tileSetData.tileheight;
    tileSet.tileWidth = tileSetData.tilewidth;
    tileSet.name = tileSetData.name;

    return tileSet;
  };
}());
