(function() {
  "use strict";

  wrect.Entities = wrect.Entities || {};
  wrect.Entities.Component = wrect.Entities.Component || {};

  var Vector = wrect.Physics.Vector;
  var PhysicsBody = wrect.Physics.PhysicsBody;

  /**
   *
   * @class wrect.Entities.Component.Mover
   * @constructor
   */
  wrect.Entities.Component.Mover = function (options) {
    this.game = Container.getGame();
    this.options = options || {};

    this.update = function() {
      alert('test');
    };

    this.game.getEventManager().addListener('game.updateStart', this.apply, this);
  };

  var Mover = wrect.Entities.Component.Mover;

  Mover.prototype.apply = function(self) {
    var inputHandler = Container.getComponent('InputHandler');
    console.log(self);
    var distance = self.options.distance;
    var moveVector = new Vector(0, 0);

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

    self.game.getEventManager().trigger('mover.apply', moveVector);
  }
}());
