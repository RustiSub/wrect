(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Economy = wrect.ECS.Assemblage.Economy || {};

  var Entity = wrect.ECS.Entity;
  var KeyMap = wrect.Core.Constants.KeyMap;
  var Economy = wrect.ECS.Assemblage.Economy;

  Economy.Constants = {};
  Economy.Constants.Actions = {
    SPEAK: 'SPEAK'
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Economy.ActionPoints = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    var actionPoints = new wrect.ECS.Component.ResourceCollection(
        {
          originalResource: 10,
          min: 0,
          max: 20
        }
    );

    actionPoints.resetResource();

    this.entity.addComponent(actionPoints);

    var visualComponent = new wrect.ECS.Component.GuiElement({
      id: 'gui-element-action-points',
      template: 'js/Bundles/ProtoTitan/Assemblages/Economy/ActionPoints.html',
      updateCallback: function() {
        document.querySelector('#action-points-available').textContent = actionPoints.resource;
        document.querySelector('#action-points-total').textContent = actionPoints.max;
      }
    });

    var controlMap = new wrect.ECS.Component.Input.ControlMap();

    controlMap.controls[Economy.Constants.Actions.SPEAK] = function(entity, values, action) {
      console.log('Remove Resource');
      actionPoints.removeResource(1);
      visualComponent.forceUpdate();
    };

    var rawInputMap = new wrect.ECS.Component.Input.RawInputMap({
      keys: [
        KeyMap.a
      ]
    });

    var contextMap = new wrect.ECS.Component.Input.ContextMap();

    contextMap.actions[KeyMap.a] = new wrect.ECS.Component.Input.ContextAction({action: Economy.Constants.Actions.SPEAK});

    this.entity.addComponent(controlMap);
    this.entity.addComponent(rawInputMap);
    this.entity.addComponent(contextMap);

    this.entity.addComponent(visualComponent);
  };
}());
