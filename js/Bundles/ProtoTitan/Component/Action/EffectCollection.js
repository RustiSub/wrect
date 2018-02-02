(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Action.EffectCollection = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};

    this.effect = options.effect || [];
  };

  wrect.ECS.Component.Action.EffectCollection.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Action.EffectCollection.prototype.constructor = wrect.ECS.Component.Action.EffectCollection;
  wrect.ECS.Component.Action.EffectCollection.prototype.name = 'EffectCollection';

  wrect.ECS.Component.Action.EffectCollection.prototype.addEffect = function(effect) {
    this.effect.push(effect);
  };
}());
