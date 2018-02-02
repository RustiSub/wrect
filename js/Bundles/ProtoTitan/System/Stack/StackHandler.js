(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};
  wrect.ECS.System.Stack = wrect.ECS.System.Stack || {};

  wrect.Bundles.ProtoTitan.Stack = wrect.Bundles.ProtoTitan.Stack || {};
  var stack = wrect.Bundles.ProtoTitan.Stack;

  stack.Constants = {
    ADD: 'stack.add',
    REMOVE: 'stack.remove'
  };

  wrect.ECS.System.StackHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};
    this.eventManager = this.options.eventManager;
    this.stack = this.options.stack || {};

    this.eventManager.addListener(stack.Constants.ADD, this.add, this);
    this.eventManager.addListener(stack.Constants.REMOVE, this.remove, this);
  };

  wrect.ECS.System.StackHandler.prototype = Object.create(wrect.ECS.System.BaseSystem.prototype);
  wrect.ECS.System.StackHandler.prototype.constructor = wrect.ECS.System.StackHandler;

  wrect.ECS.System.StackHandler.prototype.name = 'StackHandler';

  wrect.ECS.System.ActionHandler.prototype.checkDependencies = function (entity) {
    return entity.components.StackItem;
  };

  wrect.ECS.System.StackHandler.prototype.add = function (entity) {
    if (this.checkDependencies(data.entity) && this.entities.indexOf(data.entity) === -1) {
      this.entities.push(data.entity);
    }
  };

  wrect.ECS.System.StackHandler.prototype.remove = function (entity) {

  };

  wrect.ECS.System.StackHandler.prototype.execute = function (entity) {

  };
}());
