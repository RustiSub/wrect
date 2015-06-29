(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Assemblage = wrect.ECS.Assemblage || {};
  wrect.ECS.Assemblage.Politica = wrect.ECS.Assemblage.Politica || {};

  /**
   * @param options
   * @returns {wrect.ECS.Entity|wrect.ECS.Entity}
   * @constructor
   */
  wrect.ECS.Assemblage.Politica.Player = function (options) {

  };

  wrect.ECS.Assemblage.Politica.Player.prototype.setupActions = function() {
    var actions = new wrect.ECS.Component.ActionCollection({});

    //Move Worker
    var moveWorkerAction = new wrect.ECS.component.Politica.Action({});
    //Create Bill
    var createBillAction = new wrect.ECS.component.Politica.Action({});
    //Vote on Bill
    var voteAction = new wrect.ECS.component.Politica.Action({});

    actions.addAction(moveWorkerAction);
    actions.addAction(createBillAction);
    actions.addAction(voteAction);

    this.entity.addComponent(actions);
  };
}());
