(function() {
  "use strict";

  var Entity = require('../Entity');
  var Rectangle = require('../../Geometry/Shape/Rectangle');
  var RigidBody = require('../Component/RigidBody');
  var Visual = require('../Component/Visual');

  /**
   * @param options
   * @returns {Entity|*}
   * @constructor
   */
  var Block = function (options) {
    this.entity = new Entity({
      eventManager: options.eventManager
    });

    var rigidBody = new RigidBody({
      dimensions: new Rectangle({
        origin: options.position,
        dimension: options.dimension,
        material: options.material
      }),
      frozen: options.frozen
    });
    var visualComponent = new Visual({
      color: options.color,
      alpha: options.alpha,
      useSprite: options.useSprite,
      shape: rigidBody.dimensions,
      renderer: options.renderer
    });

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);
  };
  
  module.exports = Block;
}());
