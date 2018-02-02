(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Chess = wrect.ECS.Assemblage.Chess || {};
  wrect.Bundles.ProtoTitan.Chess = wrect.Bundles.ProtoTitan.Chess || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;
  var Vector = wrect.Physics.Vector;
  var Rectangle = wrect.Geometry.Rectangle;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Chess.Piece = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    var visualComponent = new wrect.ECS.Component.Visual({
      color: options.color,
      alpha: options.alpha,
      useSprite: options.useSprite,
      shape: options.shape,
      renderer: options.renderer
    });
    visualComponent.graphics.castShadow = true;
    visualComponent.graphics.receiveShadow = true;

    this.entity.addComponent(visualComponent);
    this.entity.addComponent(new wrect.ECS.Component.Map.Coord({
      forceMove: true,
      targetCoord: options.startCoord || new Vector3(0, 0, 0),
      size: 50
    }));

    //this.setupMoves();

    //this.setupActions();
    //this.setupControlScheme();
  };

  wrect.ECS.Assemblage.Chess.Piece.prototype.setupActions = function() {
    var actionPoints = new wrect.ECS.Assemblage.Economy.ActionPoints({
      eventManager: game.getEventManager()
    });

    game.getEntityManager().addEntity(actionPoints.entity);
  };

  wrect.ECS.Assemblage.Chess.Piece.prototype.setupControlScheme = function() {
    var controlScheme = new wrect.ECS.Assemblage.Control.ControlScheme({
      eventManager: game.getEventManager()
    });

    game.getEntityManager().addEntity(controlScheme.entity);
  };

  wrect.ECS.Assemblage.Chess.Piece.prototype.move = function(coord) {
    var visual = this.entity.components.Visual;
    visual.setPosition(coord.x, coord.y, visual.graphics.position.z);
  };
}());
