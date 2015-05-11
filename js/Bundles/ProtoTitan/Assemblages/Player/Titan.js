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
    var eventManager = options.eventManager;
    this.entity = new Entity({eventManager: eventManager});

    var rigidBody = new wrect.ECS.Component.RigidBody({
      dimensions: new Rectangle({
        origin: options.position,
        dimension: options.dimension,
        material: options.material
      }),
      frozen: options.frozen
    });
    var visualComponent = new wrect.ECS.Component.Visual({
      color: options.color,
      alpha: options.alpha,
      useSprite: options.useSprite,
      shape: rigidBody.dimensions,
      renderer: options.renderer
    });

    this.entity.addComponent(rigidBody);
    this.entity.addComponent(visualComponent);

    var playerEntity = this.entity;

    var moveAction = new wrect.ECS.Component.Action({
      initCallback: function() {
        console.log('Setup listening to action: ', wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions.MOVE.FORWARD);
        eventManager.addListener(wrect.Bundles.ProtoTitan.TitanControl.Constants.Actions.MOVE.FORWARD, function() {
          console.log('Action caught from the airwave ... Queue the action');

          eventManager.trigger(wrect.Bundles.ProtoTitan.Actions.Constants.START, {
            entity: playerEntity
          });
        });
      },
      startCallback: function(data) {
        console.log('*the movement engine kicks and screams as the pistons come to life*');

        var rigidBody = data.entity.components.RigidBody;

        rigidBody.dimensions.origin.x += 10;
        rigidBody.gridCoord = rigidBody.gridCoord || new Vector(0, 0, 0);

        rigidBody.gridCoord.x += 1;
        rigidBody.gridCoord.z -= 1;

        var size = 50;
        var width = (size * 1.5);
        var height = (size * 2 * (Math.sqrt(3) / 2));
        var coord = new Vector3(
            rigidBody.gridCoord.x * width,
            rigidBody.gridCoord.y * height +
            (rigidBody.gridCoord.x * (height/ 2)),
            5
        );

        data.entity.components.RigidBody.dimensions.origin.x = coord.x;
        data.entity.components.RigidBody.dimensions.origin.y = coord.y;
      }
    });

    this.entity.addComponent(moveAction);

    eventManager.addListener('titan_control.tile_changed', function(entityData) {
      if (this.entity.components.RigidBody.dimensions.origin.x !== entityData.coord.x ||
        this.entity.components.RigidBody.dimensions.origin.y !== entityData.coord.y) {
        this.move(entityData.coord);
      } else {
        this.rotate();
      }
    }, this);
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.move = function(coord) {
    this.entity.components.RigidBody.dimensions.origin.x = coord.x;
    this.entity.components.RigidBody.dimensions.origin.y = coord.y;
  };

  wrect.ECS.Assemblage.Player.Titan.prototype.rotate = function() {
    this.entity.components.Visual.getGraphics().rotation.z += 30 * (Math.PI /180);
  };
}());
