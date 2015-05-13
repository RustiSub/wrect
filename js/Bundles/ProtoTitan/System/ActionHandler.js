(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Map = wrect.ECS.System.Map || {};

  var Vector = wrect.Physics.Vector;

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
    this.eventManager.addListener(actions.Constants.UPDATE, this.update, this);
    this.eventManager.addListener(actions.Constants.STOP, this.stop, this);
  };

  wrect.ECS.System.ActionHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.ActionHandler.prototype.constructor = wrect.ECS.System.ActionHandler;

  wrect.ECS.System.ActionHandler.prototype.name = 'ActionHandler';

  wrect.ECS.System.ActionHandler.prototype.checkDependencies = function(entity) {
    return entity.components.ActionCollection ? true : false;
  };

  wrect.ECS.System.ActionHandler.prototype.perform = function(entity) {
    var actions = entity.components.ActionCollection.actions;
    for(var actionIndex in actions) if (actions.hasOwnProperty(actionIndex)) {
      var action = actions[actionIndex];
      var queue = action.queue;
      for(var callbackIndex in queue) if(queue.hasOwnProperty(callbackIndex)) {
        var queuedAction = queue[callbackIndex];
        queuedAction.callback(queuedAction.data);

        queue.splice(queue.indexOf(queuedAction), 1);
      }
    }
  };

  wrect.ECS.System.ActionHandler.prototype.start = function(eventData) {
    var entity = eventData.entity;
    if (this.hasEntity(entity) && this.hasAction(entity, eventData.action)) {

      eventData.action.queue.push(
          {
            callback: eventData.action.startCallback,
            data: eventData
          }
      );
    }
  };

  wrect.ECS.System.ActionHandler.prototype.update = function(eventData) {
    if (this.hasEntity(eventData.entity)) {
      this.queue.push(eventData.entity.components.Action.updateCallback);
    }
  };

  wrect.ECS.System.ActionHandler.prototype.stop = function(eventData) {
    if (this.hasEntity(eventData.entity)) {
      this.queue.push(eventData.entity.components.Action.stopCallback);
    }
  };

  wrect.ECS.System.ActionHandler.prototype.hasEntity = function(entity) {
    return this.entities.indexOf(entity) !== -1
  };

  wrect.ECS.System.ActionHandler.prototype.hasAction = function(entity, action) {
    return entity.components.ActionCollection.actions.indexOf(action) !== -1;
  };
}());
