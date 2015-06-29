(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Politica.Action = function (options) {
    wrect.ECS.Component.Politica.BaseComponent.Politica.call(this);

    this.options = options || {};

    this.initCallback = options.initCallback || {};

    this.initCallback();

    this.actionCallback = options.actionCallback || {};
  };

  wrect.ECS.Component.Politica.Action.prototype = Object.create( wrect.ECS.Component.Politica.BaseComponent.Politica.prototype );
  wrect.ECS.Component.Politica.Action.prototype.constructor = wrect.ECS.Component.Politica.Action;
  wrect.ECS.Component.Politica.Action.prototype.name = 'Action';
}());
