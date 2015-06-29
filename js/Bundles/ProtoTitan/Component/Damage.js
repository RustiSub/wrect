(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Damage = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.amount = options.amount || 100;
  };

  wrect.ECS.Component.Damage.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Damage.prototype.constructor = wrect.ECS.Component.Damage;
  wrect.ECS.Component.Damage.prototype.name = 'Damage';
}());
