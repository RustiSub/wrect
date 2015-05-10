(function () {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.Animation = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.scriptedAnimations = [];
    this.timer = 0;
    this.endTime = 2500;

    var testAnimation = new wrect.ECS.Component.ScriptedAnimation({
      actions: {
        2000: {
          perform: function (entity) {
            console.log('action op 1000 triggered');
            //entity.components.RigidBody.physicsBody.f = entity.components.RigidBody.physicsBody.f.add(new Vector(15, -50));
            //entity.components.Visual.options.color = (Math.random()*0xFFFFFF<<0);
            //entity.components.Visual.draw(entity.components.RigidBody.dimensions.origin);
          },
          state: 0
        },
        2500: {
          perform: function (entity) {
            console.log('action op 3000 triggered');
            //entity.components.RigidBody.physicsBody.f = entity.components.RigidBody.physicsBody.f.add(new Vector(50, 0));
            //entity.components.Visual.options.color = (Math.random()*0xFFFFFF<<0);
            //entity.components.Visual.draw(entity.components.RigidBody.dimensions.origin);
          },
          state: 0
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
