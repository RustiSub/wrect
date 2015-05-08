(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Player = wrect.ECS.Component.Player || {};

  var Vector3 = wrect.Physics.Vector3;

  wrect.ECS.Component.Player.Titan = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
  };

  wrect.ECS.Component.Player.Titan.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Player.Titan.prototype.constructor = wrect.ECS.Component.Player.Titan;
  wrect.ECS.Component.Player.Titan.prototype.name = 'Titan';
}());
