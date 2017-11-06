(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Control = wrect.ECS.Assemblage.Control || {};

  var Entity = wrect.ECS.Entity;
  var KeyMap = wrect.Core.Constants.KeyMap;

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Control.ControlScheme = function (options) {
    this.entity = new Entity(
        {
          eventManager: options.eventManager,
          name: 'ControlScheme'
        }
    );

    var rawInputMap = new wrect.ECS.Component.Input.RawInputMap({
      keys: [
        KeyMap.a
      ]
    });

    var contextMap = new wrect.ECS.Component.Input.ContextMap();

    contextMap.actions[KeyMap.a] = new wrect.ECS.Component.Input.ContextAction({action: wrect.ECS.Assemblage.Economy.Constants.Actions.ADD});

    this.entity.addComponent(rawInputMap);
    this.entity.addComponent(contextMap);
  };
}());
