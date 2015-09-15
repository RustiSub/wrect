(function() {
  'use strict';

  var TileSetDataObject = function() {
    this.imagePath = '';
    this.name = '';
    this.imageHeight = 0;
    this.imageWidth = 0;
    this.tileHeight = 0;
    this.tileWidth = 0;
    this.imagePixelWidth = 0;
    this.imagePixelHeight = 0;
    this.firstGid = 0;
  };

  module.exports = TileSetDataObject;
}());
