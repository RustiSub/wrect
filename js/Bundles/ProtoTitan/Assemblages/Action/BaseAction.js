(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Action = wrect.ECS.Assemblage.Action || {};

  var Entity = wrect.ECS.Entity;
  var Action = wrect.ECS.Assemblage.Action;

  Action.Constants = {};
  Action.Constants.Actions = {};

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Action.BaseAction = function (options) {
    this.entity = new Entity({eventManager: options.eventManager});

    this.effectCollection = options.effectCollection || [];
    this.conditionCollection = options.conditionCollection || [];

    this.setup();

    for (var e in this.effectCollection) {
      this.entity.addComponent(this.effectCollection[e]);
    }

    for (var c in this.conditionCollection) {
      this.entity.addComponent(this.conditionCollection[c]);
    }
  };

  wrect.ECS.Assemblage.Action.BaseAction.prototype.setup = function (actionPoints, visualComponent) {

  };
}());
