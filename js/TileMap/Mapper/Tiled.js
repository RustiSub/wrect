(function() {
  'use strict';
  var wrect = window.wrect;

  wrect.TileMap.Mapper = wrect.TileMap.Mapper || {};

  /**
   * Mapper to map the Tiled editor's .json format to common DataObjects.
   * @constructor
   */
  wrect.TileMap.Mapper.Tiled = function() {};

  wrect.TileMap.Mapper.Tiled.prototype.horizontalFlipFlag = 0x80000000;

  wrect.TileMap.Mapper.Tiled.prototype.verticalFlipFlag = 0x40000000;

  wrect.TileMap.Mapper.Tiled.prototype.diagonalFlipFlag = 0x20000000;

  wrect.TileMap.Mapper.Tiled.prototype.horizontalFlipDrawFlag = 1;
  wrect.TileMap.Mapper.Tiled.prototype.verticalFlipDrawFlag = 2;
  wrect.TileMap.Mapper.Tiled.prototype.diagonalFlipDrawFlag = 4;

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
    tileMapDataObject.pixelHeight = data.height * data.tileheight;
    tileMapDataObject.pixelWidth = data.width * data.tilewidth;

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


    var realData = [];

    for (var i = 0; i < tileData.length; i++) {
      var flipAndRotateFlags = 0;
      var t = tileData[i];
      if ( (t & this.horizontalFlipFlag) !== 0 ) {
        flipAndRotateFlags |= this.horizontalFlipDrawFlag;
      }
      if ( (t & this.verticalFlipFlag) !== 0 ) {
        flipAndRotateFlags |= this.verticalFlipDrawFlag;
      }
      if ( (t & this.diagonalFlipFlag) !== 0 ) {
        flipAndRotateFlags |= this.diagonalFlipDrawFlag;
      }

      t &= ~(this.horizontalFlipFlag |
      this.verticalFlipFlag |
      this.diagonalFlipFlag);
      realData.push(t);
      console.log(i, t, flipAndRotateFlags);

      if ( (flipAndRotateFlags & this.horizontalFlipDrawFlag) !== 0 ) {
        // Flip horizontal
      }
      if ( (flipAndRotateFlags & this.verticalFlipDrawFlag) !== 0 ) {
        // Flip vertically
      }
      if ( (flipAndRotateFlags & this.diagonalFlipDrawFlag) !== 0 ) {
        if ( (flipAndRotateFlags & this.horizontalFlipDrawFlag) !== 0 &&
          (flipAndRotateFlags & this.verticalFlipDrawFlag) !== 0 ) {
          // Rotate 90°
          // Flip vertically
        } else if ( (flipAndRotateFlags & this.horizontalFlipDrawFlag) !== 0 ) {
          // Rotate -90°
          // Flip vertically
        } else if ( (flipAndRotateFlags & this.verticalFlipDrawFlag) !== 0 ) {
          // Rotate 90°
          // Flip horizontally
        } else {
          // Rotate -90°
          // Flip horizontally
        }
      }
    }


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
