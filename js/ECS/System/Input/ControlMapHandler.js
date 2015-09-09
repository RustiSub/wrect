(function() {
  "use strict";

  var BaseSystem = require('../BaseSystem');
  /**
   * @constructor
   */
  var ControlMapHandler = function (options) {
    BaseSystem.call(this, options);

    this.options = options || {};
  };

  ControlMapHandler.prototype = Object.create( BaseSystem.prototype );
  ControlMapHandler.prototype.constructor = ControlMapHandler;
  ControlMapHandler.prototype.name = 'ControlMapHandler';

  ControlMapHandler.prototype.checkDependencies = function(entity) {
    return entity.components.ControlMap ? true : false;
  };

  ControlMapHandler.prototype.perform = function(entity) {
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

  module.exports = ControlMapHandler;
}());
