(function() {
  'use strict';

  var Vector = require('Physics/Vector');

  var TileDataObject = function() {
    this.id = 0;
    this.name = '';
    this.height = 0;
    this.width = 0;
    this.rotation = 0;
    this.tileSetName = '';
    this.flipped = {
      horizontal: false,
      vertical: false
    };
  };

  module.exports = TileDataObject;
}());
