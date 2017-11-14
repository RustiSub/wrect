(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Economy = wrect.ECS.Assemblage.Economy || {};

  var Entity = wrect.ECS.Entity;
  var Economy = wrect.ECS.Assemblage.Economy;

  Economy.Constants = {};
  Economy.Constants.Actions = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
  };

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Economy.ActionPoints = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    this.actionPoints = this.setup();
    this.visualComponent = this.setupVisuals(this.actionPoints);

    this.controlMap = this.setupControls(this.actionPoints, this.visualComponent);
  };

  /**
   * @returns {wrect.ECS.Component.ResourceCollection}
   */
  wrect.ECS.Assemblage.Economy.ActionPoints.prototype.setup = function () {
    var actionPoints = new wrect.ECS.Component.ResourceCollection(
        {
          originalResource: 10,
          min: 0,
          max: 20
        }
    );

    actionPoints.resetResource();

    this.entity.addComponent(actionPoints);

    return actionPoints;
  };

  /**
   * @param actionPoints
   * @returns {wrect.ECS.Component.GuiElement}
   */
  wrect.ECS.Assemblage.Economy.ActionPoints.prototype.setupVisuals = function (actionPoints) {
    var self = this;

    var visualComponent = new wrect.ECS.Component.GuiElement({
      id: 'gui-element-action-points',
      template: 'js/Bundles/ProtoTitan/Assemblages/Economy/ActionPoints.html',
      setupCallback: function() {
        document.querySelector('#action-points-remove').addEventListener('click', function () {self.controlMap.controls[Economy.Constants.Actions.REMOVE]();}, false);
        document.querySelector('#action-points-add').addEventListener('click', function () {self.controlMap.controls[Economy.Constants.Actions.ADD]();}, false);
      },
      updateCallback: function () {
        document.querySelector('#action-points-available').textContent = actionPoints.resource;
        document.querySelector('#action-points-total').textContent = actionPoints.max;
      }
    });

    this.entity.addComponent(visualComponent);

    return visualComponent;
  };

  /**
   * @param actionPoints
   * @param visualComponent
   * @returns {wrect.ECS.Component.Input.ControlMap}
   */
  wrect.ECS.Assemblage.Economy.ActionPoints.prototype.setupControls = function (actionPoints, visualComponent) {
    var controlMap = new wrect.ECS.Component.Input.ControlMap();

    controlMap.controls[Economy.Constants.Actions.ADD] = function () {
      actionPoints.addResource(1);
      visualComponent.forceUpdate();
    };

    controlMap.controls[Economy.Constants.Actions.REMOVE] = function () {
      actionPoints.removeResource(1);
      visualComponent.forceUpdate();
    };

    this.entity.addComponent(controlMap);

    return controlMap;
  };
}());
