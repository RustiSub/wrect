(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.ControlScheme.Ship = function (options) {
    wrect.ECS.Component.ControlScheme.BaseScheme.call(this);

    options = options || {};

    this.keyright = options.keyright || function(entity) {
      console.log('right', entity);
    };
    this.keyleft = options.keyleft || function(entity) {
      console.log('left', entity);
    };
    this.keyup = options.keyup || function(entity) {
      console.log('up', entity);
    };
    this.keydown = options.keyDown || function(entity) {
      console.log('down', entity);
    };
  };

  wrect.ECS.Component.ControlScheme.Ship.prototype = Object.create( wrect.ECS.Component.ControlScheme.BaseScheme.prototype );
  wrect.ECS.Component.ControlScheme.Ship.prototype.constructor = wrect.ECS.Component.ControlScheme;
}());
