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
   * @returns {wrect.TileMap.Mapper.TileLayerDataObject}
   */
  wrect.TileMap.Mapper.Tiled.prototype.mapLayer = function(layerData, tileHeight, tileWidth, tileSets) {
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
      layer.tiles.push(this.mapTile(layerData.data[i], tileHeight, tileWidth, tileSets));
    }

    return layer;
  };

  /**
   * @param tileData
   * @param tileHeight
   * @param tileWidth
   * @param tileSets
   * @returns {wrect.TileMap.Mapper.TileDataObject}
   */
  wrect.TileMap.Mapper.Tiled.prototype.mapTile = function(tileData, tileHeight, tileWidth, tileSets) {
    var tile = new wrect.TileMap.Mapper.TileDataObject();
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
   * @returns {wrect.TileMap.Mapper.TileSetDataObject}
   */
  wrect.TileMap.Mapper.Tiled.prototype.mapTileSet = function(tileSetData) {
    var tileSet = new wrect.TileMap.Mapper.TileSetDataObject();

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

}());
