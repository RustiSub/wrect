(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Collision = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    options = options || {};
  };

  wrect.ECS.Component.Collision.prototype = Object.create(wrect.ECS.Component.BaseComponent.prototype);
  wrect.ECS.Component.Collision.prototype.constructor = wrect.ECS.Component.Collision;
  wrect.ECS.Component.Collision.prototype.name = 'Collision';
}());
