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

    this.setupControls(this.actionPoints, this.visualComponent);
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
    var visualComponent = new wrect.ECS.Component.GuiElement({
      id: 'gui-element-action-points',
      template: 'js/Bundles/ProtoTitan/Assemblages/Economy/ActionPoints.html',
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
   */
  wrect.ECS.Assemblage.Economy.ActionPoints.prototype.setupControls = function (actionPoints, visualComponent) {
    var controlMap = new wrect.ECS.Component.Input.ControlMap();
    var self = this;

    controlMap.controls[Economy.Constants.Actions.ADD] = function (entity, values, action) {
      self.addActionPoints(actionPoints, visualComponent);
    };

    this.entity.addComponent(controlMap);
  };

  wrect.ECS.Assemblage.Economy.ActionPoints.prototype.addActionPoints = function(actionPoints, visualComponent) {
    console.log('Remove Resource');
    actionPoints.removeResource(1);
    visualComponent.forceUpdate();
  };
}());
