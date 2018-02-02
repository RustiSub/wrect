(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Map = wrect.ECS.System.Map || {};

  wrect.Bundles.ProtoTitan.Actions = wrect.Bundles.ProtoTitan.Actions || {};
  var actions = wrect.Bundles.ProtoTitan.Actions;

  actions.Constants = {
    START: 'action.start',
    UPDATE: 'action.update',
    STOP: 'action.stop'
  };

  wrect.ECS.System.ActionHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.eventManager = this.options.eventManager;
    this.gameTime = this.options.gameTime;

    this.eventManager.addListener(actions.Constants.START, this.start, this);
  };

  wrect.ECS.System.ActionHandler.prototype = Object.create(wrect.ECS.System.BaseSystem.prototype);
  wrect.ECS.System.ActionHandler.prototype.constructor = wrect.ECS.System.ActionHandler;

  wrect.ECS.System.ActionHandler.prototype.name = 'ActionHandler';

  wrect.ECS.System.ActionHandler.prototype.checkDependencies = function (entity) {
    return entity.components.EffectCollection && entity.components.ConditionCollection;
  };

  wrect.ECS.System.ActionHandler.prototype.perform = function (entity) {
  };
}());
