(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Economy = wrect.ECS.Assemblage.Economy || {};

  var Entity = wrect.ECS.Entity;

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

    this.entity.addComponent(visualComponent);
  };
}());
