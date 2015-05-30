(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.Steps = wrect.Bundles.ProtoTitan.Steps || {};

  var TitanEngine = wrect.Bundles.ProtoTitan.TitanEngine;
  var titanControl = wrect.Bundles.ProtoTitan.TitanControl;
  var components = wrect.ECS.Component.TitanEngine;

  /**
   * @returns {Array}
   * @constructor
   */
  wrect.ECS.Assemblage.TitanEngineSystems = function (options) {
    this.eventManager = options.eventManager;
    var eventManager = this.eventManager;

    this.systemsCollection = new components.TitanEngineSystemCollection({});

    var systemsCollection = this.systemsCollection;

    systemsCollection.addSystem(this.createMovementSystem());
    systemsCollection.addSystem(this.createOffensiveSystem());
  };

  wrect.ECS.Assemblage.TitanEngineSystems.prototype.createMovementSystem = function() {
    var eventManager = this.eventManager;
    var steps = new wrect.ECS.Assemblage.TitanEngineSteps({eventManager: eventManager}).steps;
    var movementSystem = new components.TitanEngineSystem(
      {
        name: TitanEngine.Constants.Systems.MOVEMENT,
        eventManager: eventManager,
        steps: steps
      }
    );
    movementSystem.actions = [
      new components.TitanEngineAction(
        {
          name: titanControl.Constants.Ranges.CURSOR.MOVE,
          startCallback: function(data) {
            eventManager.trigger('titan_control.move', data);
          }
        }
      ),
      new components.TitanEngineAction({name: 'Backward'})
    ];

    return movementSystem;
  };

  wrect.ECS.Assemblage.TitanEngineSystems.prototype.createOffensiveSystem = function() {
    var eventManager = this.eventManager;
    var steps = new wrect.ECS.Assemblage.TitanEngineSteps({eventManager: eventManager}).steps;
    var offensiveSystem = new components.TitanEngineSystem(
      {
        name: TitanEngine.Constants.Systems.OFFENSIVE,
        eventManager: eventManager,
        steps: steps
      }
    );
    offensiveSystem.actions = [
      new components.TitanEngineAction(
        {
          name: titanControl.Constants.Ranges.CURSOR.ATTACK,
          startCallback: function(data) {
            //eventManager.trigger('titan_control.move', data);
            console.log('trigger attack');
          }
        }
      )
    ];

    return offensiveSystem;
  };
}());
