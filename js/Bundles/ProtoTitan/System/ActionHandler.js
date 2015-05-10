(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Map = wrect.ECS.System.Map || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.ActionHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.eventManager = this.options.eventManager;
    this.gameTime = this.options.gameTime;

    this.eventManager.addListener('action.start', this.start, this);
    this.eventManager.addListener('action.update', this.update, this);
    this.eventManager.addListener('action.stop', this.stop, this);
  };

  wrect.ECS.System.ActionHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.ActionHandler.prototype.constructor = wrect.ECS.System.ActionHandler;

  wrect.ECS.System.ActionHandler.prototype.name = 'ActionHandler';

  wrect.ECS.System.ActionHandler.prototype.checkDependencies = function(entity) {
    return entity.components.Action ? true : false;
  };

  wrect.ECS.System.ActionHandler.prototype.perform = function(entity) {
    var queue = entity.components.Action.queue;
    for(var actionIndex in queue) if(queue.hasOwnProperty(actionIndex)) {
      var queuedAction = queue[actionIndex];
      this.call(queuedAction);

      entity.queue.splice(entity.queue.indexOf(queuedAction), 1);
    }
  };

  wrect.ECS.System.ActionHandler.prototype.start = function(eventData) {
    if (this.hasEntity(eventData.entity)) {
      this.queue.push(eventData.entity.components.Action.startCallback);
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

  wrect.ECS.System.ActionHandler.prototype.hasEntity = function() {
    return this.entities.indexOf(entity) !== -1
  };
}());
