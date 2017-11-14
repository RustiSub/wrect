(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  /**
   * @constructor
   */
  wrect.ECS.System.ControlMapHandler = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

    this.options = options || {};

    this.eventManager = options.eventManager;

    this.eventManager.addListener('input_handler.control.perform', this.handleInput, this);
    this.actions = [];
  };

  wrect.ECS.System.ControlMapHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.ControlMapHandler.prototype.constructor = wrect.ECS.System.ControlMapHandler;
  wrect.ECS.System.ControlMapHandler.prototype.name = 'ControlMapHandler';

  wrect.ECS.System.ControlMapHandler.prototype.checkDependencies = function(entity) {
    return entity.components.ControlMap;
  };

  wrect.ECS.System.ControlMapHandler.prototype.perform = function(entity) {
    var controls = entity.components.ControlMap.controls;

    for (var actionIndex in this.actions) if (this.actions.hasOwnProperty(actionIndex)) {
      var action = this.actions[actionIndex];
      if (controls[action.action]) {
        controls[action.action](entity, action.values);
        this.actions.splice(this.actions.indexOf(action), 1);
      }
    }
  };

  wrect.ECS.System.ControlMapHandler.prototype.handleInput = function(event) {
    this.actions.push(event.action);
  };
}());
