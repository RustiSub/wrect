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
    visualComponent.graphics.castShadow = true;
    visualComponent.graphics.receiveShadow = true;
    this.entity.addComponent(visualComponent);

    this.entity.addComponent(new wrect.ECS.Component.Map.Coord({
      coord: new Vector3(0, 0, 0),
      size: 50
    }));

    this.setupMoves();

    this.move(new Vector3(0, 0, 0));
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.setupMoves = function() {
    var entity = this.entity;
    var actions = new wrect.ECS.Component.ActionCollection({});
    var actionConstants = wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions;
    var eventManager = entity.eventManager;

    function createMove(command, moveVector) {

      return new wrect.ECS.Component.Action({
        updateTick: 1000,
        initCallback: function () {
          var action = this;
          eventManager.addListener(command, function () {
            eventManager.trigger(wrect.Bundles.ProtoTitan.Actions.Constants.START, {
              entity: entity,
              action: action
            });
          });
        },
        tickCallback: function (data) {
          data.entity.components.Coord.targetCoord.x += moveVector.x;
          data.entity.components.Coord.targetCoord.y += moveVector.y;
          data.entity.components.Coord.targetCoord.z += moveVector.z;
        },
        updateCallback: function (updatePercentage, data) {
          var coord = data.entity.components.Coord;
          var visual = data.entity.components.Visual;

          var directionVector = coord.getDirectionVector(coord.coord.add(moveVector));
          var totalDistance = directionVector.len();

          var updateVector = directionVector.unitScalar(totalDistance * updatePercentage);

          visual.graphics.position.x += updateVector.x;
          visual.graphics.position.y += updateVector.y;
        },
        stopCallback: function() {
          return true;
        }
      });
    }

    actions.addAction(createMove(actionConstants.MOVE.X.FORWARD, new Vector3(1, 0, -1)));
    actions.addAction(createMove(actionConstants.MOVE.X.BACKWARD, new Vector3(-1, 0, 1)));

    actions.addAction(createMove(actionConstants.MOVE.Y.FORWARD, new Vector3(0, 1, -1)));
    actions.addAction(createMove(actionConstants.MOVE.Y.BACKWARD, new Vector3(0, -1, 1)));

    actions.addAction(createMove(actionConstants.MOVE.Z.FORWARD, new Vector3(-1, 1, 0)));
    actions.addAction(createMove(actionConstants.MOVE.Z.BACKWARD, new Vector3(1, -1, 0)));

    actions.addAction(new wrect.ECS.Component.Action({
      speed: 1000,
      initCallback: function () {
        var action = this;
        eventManager.addListener('titan_control.move', function (entityData) {
          var a = entity.components.Coord.coord;
          var b = entityData.entity.components.Coord.coord;
          var gridDistance = (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;

          action.setUpdateTick(gridDistance * action.speed);

          if (entityData.step) {
            eventManager.trigger('titan_control.move.time', {
              step: entityData.step,
              time: gridDistance * action.speed
            });
          }

          var marker = new wrect.ECS.Component.Map.Marker({
            coord: entityData.entity.components.Coord
          });

          eventManager.trigger(wrect.Bundles.ProtoTitan.Actions.Constants.START, {
            entity: entity,
            action: action,
            marker: marker
          });
        });
      },
      tickCallback: function (data) {
        var entity = data.entity;

        entity.components.Coord.targetCoord = new Vector3(data.marker.coord.coord);
      },
      updateCallback: function (updatePercentage, data) {
        var coord = data.entity.components.Coord;
        var visual = data.entity.components.Visual;
        var targetCoord = data.marker.coord.worldTargetCoord;

        var directionVector = targetCoord.subtract(coord.worldCoord);

        var totalDistance = directionVector.len();
        var updateVector = directionVector.unitScalar(totalDistance * updatePercentage);

        visual.graphics.position.x += updateVector.x;
        visual.graphics.position.y += updateVector.y;
      },
      stopCallback: function() {
        return true;
      }
    }));

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
