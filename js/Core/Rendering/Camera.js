(function() {
  "use strict";

  var Rectangle = require('Geometry/Shape/Rectangle');
  var Vector = require('Physics/Vector');

  var Camera = function(options) {
    this.options = options || {};
    this.options.width = this.options.width || 1280;
    this.options.height = this.options.height || 720;

    this.dimensions = new Rectangle({
      dimension: new Vector(this.options.width, this.options.height),
      origin: new Vector(0, 0)
    });
  };

  Camera.prototype.getDimensions = function() {
    return this.dimensions;
  };

  module.exports = Camera;
}());
