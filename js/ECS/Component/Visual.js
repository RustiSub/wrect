(function() {
  "use strict";

  var BaseComponent = require('./BaseComponent');
  
  var Vector = require('../../Physics/Vector');

  var Visual = function (options) {
    BaseComponent.call(this);

    this.options = options || {};
    this.shape = options.shape;

    if (this.options.alpha == undefined) {
      this.options.alpha = 1;
    }

    this.graphics = this.options.renderer.draw(this.shape);
  };

  Visual.prototype = Object.create( BaseComponent.prototype );
  Visual.prototype.constructor = Visual;
  Visual.prototype.name = 'Visual';

  Visual.prototype.getGraphics = function() {
    return this.graphics;
  };

  Visual.prototype.setPosition = function(x, y) {
    console.log('SetPosition needs to be implemented');
  };
  
  module.exports = Visual;
}());
