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
    this.game = Container.getGame();
    this.options = options || {};
    this.self = this;

    this.update = function() {
      alert('test');
    };
    var self = this;
    this.game.getEventManager().addListener('game.updateStart', this.apply, this);
  };

  var Mover = wrect.Entities.Component.Mover;

  Mover.prototype.apply = function() {
    var inputHandler = Container.getComponent('InputHandler');
    var distance = this.options.distance;
    var moveVector = null;

    if (inputHandler.key('left')) {
      moveVector = new Vector(-distance, 0);
    }
    if (inputHandler.key('right')) {
      moveVector = new Vector(distance, 0);
    }
    if (inputHandler.key('up')) {
      moveVector = new Vector(0, -distance);
    }
    if (inputHandler.key('down')) {
      moveVector = new Vector(0, distance);
    }

    if (moveVector) {
      this.game.getEventManager().trigger('mover.apply', {moveVector: moveVector});
    }
  }
}());
