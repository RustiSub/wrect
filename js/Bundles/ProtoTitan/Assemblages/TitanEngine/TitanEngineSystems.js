(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.Bundles.ProtoTitan.Steps = wrect.Bundles.ProtoTitan.Steps || {};

  var TitanEngine = wrect.Bundles.ProtoTitan.TitanEngine;
  var components = wrect.ECS.Component.TitanEngine;

  /**
   * @returns {Array}
   * @constructor
   */
  wrect.ECS.Assemblage.TitanEngineSystems = function (options) {
    this.eventManager = options.eventManager;
    var eventManager = this.eventManager;
    this.steps = options.steps;

    this.systemsCollection = new components.TitanEngineSystemCollection({});

    var systemsCollection = this.systemsCollection;

    var movementSystem = new components.TitanEngineSystem({name: TitanEngine.Constants.Systems.MOVEMENT, eventManager: eventManager});
    movementSystem.actions = [
      new components.TitanEngineAction(
        {
          name: 'Forward',
          startCallback: function(data) {
            eventManager.trigger('titan_control.move', data);
          }
        }
      ),
      new components.TitanEngineAction({name: 'Backward'})
    ];
    movementSystem.steps = this.steps;

    systemsCollection.addSystem(movementSystem);
  };
}());
