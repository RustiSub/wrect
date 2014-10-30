(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.ControlScheme.Ship = function (options) {
    wrect.ECS.Component.ControlScheme.BaseScheme.call(this);

    options = options || {};

    this.right = options.right || function() {};
    this.left = options.left || function() {};
    this.up = options.up || function() {};
    this.down = options.down || function() {};
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype = Object.create( wrect.ECS.Component.ControlScheme.BaseScheme.prototype );
  wrect.ECS.Component.ControlScheme.Ship.prototype.constructor = wrect.ECS.Component.ControlScheme;
}());
