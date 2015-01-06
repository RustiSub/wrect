(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Animation = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.scriptedAnimations = [];

    var testAnimation = new wrect.ECS.Component.ScriptedAnimation({
      actions: {
        100: function (entity) {
          console.log('action op 100 triggered');
        },
        500: function (entity) {
          console.log('action op 500 triggered');
        }
      }
    });

    this.scriptedAnimations.push(testAnimation);

    this.playingAnimationIds = [0];

    //this.absorb = this.options.absorb || new Vector(0, 0);
    //
    //game.getEventManager().addListener('physics.collide', function(data) {
    //  data.force = data.force.multiply(new Vector(1, 1).subtract(this.absorb));
    //}, this);
  };

  wrect.ECS.Component.Animation.prototype = Object.create(wrect.ECS.Component.BaseComponent.prototype);
  wrect.ECS.Component.Animation.prototype.constructor = wrect.ECS.Component.Animation;
  wrect.ECS.Component.Animation.prototype.name = 'Animation';
}());
