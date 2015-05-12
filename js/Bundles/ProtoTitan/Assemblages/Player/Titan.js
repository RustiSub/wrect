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
      if (this.entity.components.RigidBody.dimensions.origin.x !== entityData.coord.x ||
        this.entity.components.RigidBody.dimensions.origin.y !== entityData.coord.y) {
        this.move(entityData.coord);
      } else {
        this.rotate();
      }
    }, this);
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.setupMoves = function() {
    var entity = this.entity;

    function createMove(command, moveVector) {
      var playerEntity = entity;
      var eventManager = playerEntity.eventManager;
      var moveAction = new wrect.ECS.Component.Action({
        initCallback: function () {
          eventManager.addListener(command, function () {
            eventManager.trigger(wrect.Bundles.ProtoTitan.Actions.Constants.START, {
              entity: playerEntity
            });
          });
        },
        startCallback: function (data) {
          data.entity.components.Coord.targetCoord.x += moveVector.x;
          data.entity.components.Coord.targetCoord.y += moveVector.y;
          data.entity.components.Coord.targetCoord.z += moveVector.z;
        }
      });
      entity.addComponent(moveAction);
    }

    createMove(wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions.MOVE.BACKWARD, new Vector3(-1, 0, 1));
    createMove(wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions.MOVE.FORWARD, new Vector3(1, 0, -1));
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.move = function(coord) {
    this.entity.components.RigidBody.dimensions.origin.x = coord.x;
    this.entity.components.RigidBody.dimensions.origin.y = coord.y;
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.rotate = function() {
    this.entity.components.Visual.getGraphics().rotation.z += 30 * (Math.PI /180);
  };
}());
