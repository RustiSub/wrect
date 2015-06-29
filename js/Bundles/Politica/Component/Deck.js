(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};
  wrect.ECS.Component.Politica = wrect.ECS.Component.Politica || {};

  wrect.ECS.Component.Politica.Deck = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

  };

  wrect.ECS.Component.Politica.Deck.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Politica.Deck.prototype.constructor = wrect.ECS.Component.Politica.Deck;
  wrect.ECS.Component.Politica.Deck.prototype.name = 'Deck';
}());
