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

    this.updateTimers = {
      up: new wrect.Core.Timer(1000),
      down: new wrect.Core.Timer(1000),
      left: new wrect.Core.Timer(1000),
      right: new wrect.Core.Timer(1000)
    };

    this.game.getEventManager().addListener('game.updateEnd', this.apply, this);
  };

  var Mover = wrect.Entities.Component.Mover;

  Mover.prototype.apply = function() {
    var inputHandler = Container.getComponent('InputHandler');
    var distance = this.options.distance;
    var moveVector = null;

    if (inputHandler.key('left') && this.updateTimers.left.delta() <= 0) {
      moveVector = new Vector(-distance, 0);
      this.updateTimers.left.reset();
    }
    if (inputHandler.key('right') && this.updateTimers.right.delta() <= 0) {
      moveVector = new Vector(distance, 0);
      this.updateTimers.right.reset();
    }
    if (inputHandler.key('up') && this.updateTimers.up.delta() <= 0) {
      moveVector = new Vector(0, -distance);
      this.updateTimers.up.reset();
    }
    if (inputHandler.key('down') && this.updateTimers.down.delta() <= 0) {
      moveVector = new Vector(0, distance);
      this.updateTimers.down.reset();
    }

    if (moveVector) {
      this.game.getEventManager().trigger('mover.apply', {moveVector: moveVector});
    }
  }
}());
