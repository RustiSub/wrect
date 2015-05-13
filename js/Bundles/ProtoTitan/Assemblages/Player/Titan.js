(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Player = wrect.ECS.Assemblage.Player || {};
  wrect.Bundles.ProtoTitan.Player = wrect.Bundles.ProtoTitan.Player || {};

  var Entity = wrect.ECS.Entity;
  var Vector3 = wrect.Physics.Vector3;
  var Vector = wrect.Physics.Vector;
  var Rectangle = wrect.Geometry.Rectangle;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Player.Titan = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    //var rigidBody = new wrect.ECS.Component.RigidBody({
    //  dimensions: new Rectangle({
    //    origin: options.position,
    //    dimension: options.dimension,
    //    material: options.material
    //  }),
    //  frozen: options.frozen
    //});
    //this.entity.addComponent(rigidBody);

    var visualComponent = new wrect.ECS.Component.Visual({
      color: options.color,
      alpha: options.alpha,
      useSprite: options.useSprite,
      shape: new Rectangle({
        origin: options.position,
        dimension: options.dimension,
        material: options.material
      }),
      renderer: options.renderer
    });
    this.entity.addComponent(visualComponent);

    this.entity.addComponent(new wrect.ECS.Component.Map.Coord({
      coord: new Vector3(0, 0, 0),
      size: 50
    }));

    this.setupMoves();

    this.entity.eventManager.addListener('titan_control.tile_changed', function(entityData) {
      if (this.entity.components.Coord.targetCoord.x !== entityData.coord.x ||
          this.entity.components.Coord.targetCoord.y !== entityData.coord.y) {
        this.move(entityData.coord);
      } else {
        this.rotate();
      }
    }, this);
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.setupMoves = function() {
    var entity = this.entity;
    var actions = new wrect.ECS.Component.ActionCollection({});
    var actionConstants = wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions;

    function createMove(command, moveVector) {
      var playerEntity = entity;
      var eventManager = playerEntity.eventManager;

      return new wrect.ECS.Component.Action({
        initCallback: function () {
          var action = this;
          eventManager.addListener(command, function () {
            eventManager.trigger(wrect.Bundles.ProtoTitan.Actions.Constants.START, {
              entity: playerEntity,
              action: action
            });
          });
        },
        startCallback: function (data) {
          data.entity.components.Coord.targetCoord.x += moveVector.x;
          data.entity.components.Coord.targetCoord.y += moveVector.y;
          data.entity.components.Coord.targetCoord.z += moveVector.z;
        }
      });
    }

    actions.addAction(createMove(actionConstants.MOVE.X.FORWARD, new Vector3(1, 0, -1)));
    actions.addAction(createMove(actionConstants.MOVE.X.BACKWARD, new Vector3(-1, 0, 1)));

    actions.addAction(createMove(actionConstants.MOVE.Y.FORWARD, new Vector3(0, 1, -1)));
    actions.addAction(createMove(actionConstants.MOVE.Y.BACKWARD, new Vector3(0, -1, 1)));

    actions.addAction(createMove(actionConstants.MOVE.Z.FORWARD, new Vector3(-1, 1, 0)));
    actions.addAction(createMove(actionConstants.MOVE.Z.BACKWARD, new Vector3(1, -1, 0)));

    entity.addComponent(actions);
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.move = function(coord) {
    var visual = this.entity.components.Visual;
    visual.setPosition(coord.x, coord.y, visual.graphics.position.z);
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.rotate = function() {
    this.entity.components.Visual.getGraphics().rotation.z += 30 * (Math.PI /180);
  };
}());
