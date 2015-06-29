(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Politica = wrect.ECS.Component.Politica || {};

  wrect.ECS.Component.Politica.Zone = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

  };

  wrect.ECS.Component.Politica.Zone.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Politica.Zone.prototype.constructor = wrect.ECS.Component.Politica.Zone;
  wrect.ECS.Component.Politica.Zone.prototype.name = 'Zone';
}());
