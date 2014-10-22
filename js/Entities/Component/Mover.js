(function() {
  "use strict";

  wrect.Entities = wrect.Entities || {};
  wrect.Entities.Component = wrect.Entities.Component || {};

  var Vector = wrect.Physics.Vector;

  /**
   *
   * @class wrect.Entities.Component.Mover
   * @constructor
   */
  wrect.Entities.Component.Mover = function (options) {
    this.options = options || {};

  };

  var Mover = wrect.Entities.Component.Mover;

  Mover.prototype.apply = function(physicsBody) {
    var inputHandler = Container.getComponent('InputHandler');
    var distance = this.options.distance;

    if (inputHandler.key('left')) {
      physicsBody.v = physicsBody.v.add(new Vector(-distance, 0));
    }
    if (inputHandler.key('right')) {
      physicsBody.v = physicsBody.v.add(new Vector(distance, 0));
    }
    if (inputHandler.key('up')) {
      physicsBody.v = physicsBody.v.add(new Vector(0, -distance));
    }
    if (inputHandler.key('down')) {
      physicsBody.v = physicsBody.v.add(new Vector(0, distance));
    }
  }
}());
