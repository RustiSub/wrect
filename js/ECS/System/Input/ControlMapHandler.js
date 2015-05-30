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
  };

  wrect.ECS.System.ControlMapHandler.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.ControlMapHandler.prototype.constructor = wrect.ECS.System.ControlMapHandler;
  wrect.ECS.System.ControlMapHandler.prototype.name = 'ControlMapHandler';

  wrect.ECS.System.ControlMapHandler.prototype.checkDependencies = function(entity) {
    return entity.components.ControlMap ? true : false;
  };

  wrect.ECS.System.ControlMapHandler.prototype.perform = function(entity) {
    var controls = entity.components.ControlMap.controls;
    var actions = entity.components.ControlMap.actions;
    for (var actionIndex in  actions) if (actions.hasOwnProperty(actionIndex)) {
      var action = actions[actionIndex];
      if (controls[action.action]) {
        controls[action.action](entity, action.values);
        actions.splice(actions.indexOf(action), 1);
      }
    }
  };
}());
