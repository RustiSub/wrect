(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Politica = wrect.ECS.Component.Politica || {};

  wrect.ECS.Component.Politica.Player = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

  };

  wrect.ECS.Component.Politica.Player.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Politica.Player.prototype.constructor = wrect.ECS.Component.Politica.Player;
  wrect.ECS.Component.Politica.Player.prototype.name = 'Player';
}());
