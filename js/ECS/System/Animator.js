(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.System.Animator = function (options) {
    wrect.ECS.System.BaseSystem.call(this);

    this.options = options || {};
    this.lastFrame = 0;
    this.currentFrame = 0;
    this.interval = 0;
  };

  wrect.ECS.System.Animator.prototype = Object.create( wrect.ECS.System.BaseSystem.prototype );
  wrect.ECS.System.Animator.prototype.constructor = wrect.ECS.System.Animator;

  wrect.ECS.System.Animator.prototype.name = 'Animator';

  wrect.ECS.System.Animator.prototype.checkDependencies = function(entity) {
    return entity.components.Animation ? true : false;
  };

  wrect.ECS.System.Animator.prototype.run = function() {
    this.interval = game.getPreviousTime() - this.lastFrame;
    this.currentFrame = game.getPreviousTime();

    for (var e = 0; e < this.entities.length; e++) {
      var animation = this.entities[e].components.Animation;

      for (var s = 0; s < animation.playingAnimationIds.length; s++) {
        var scriptedAnimation = animation.scriptedAnimations[animation.playingAnimationIds[s]];

        this.perform(scriptedAnimation);
      }
    }
  };

  /**
   * @param {wrect.ECS.Component.ScriptedAnimation} scriptedAnimation
   */
  wrect.ECS.System.Animator.prototype.perform = function(scriptedAnimation) {
    for (var actionIndex in scriptedAnimation.actions) {
      var action = scriptedAnimation.actions[actionIndex];

      //console.log('checking action :', actionIndex);
      //console.log(this.interval % actionIndex);
    }
  };

  /**
   * @param {wrect.ECS.Component.Animation} animation
   * @param {wrect.ECS.Component.ScriptedAnimation} scriptedAnimation
   * @param {int} index
   */
  wrect.ECS.System.Animator.prototype.start = function(animation, scriptedAnimation, index) {
    scriptedAnimation.state = wrect.Component.Animation.states.playing;
    scriptedAnimation.state = wrect.Component.Animation.startFrame = this.currentFrame;
    animation.playingAnimationIds.push(index);
  };

  /**
   * @param {wrect.ECS.Component.Animation} animation
   * @param {wrect.ECS.Component.ScriptedAnimation} scriptedAnimation
   * @param {int} index
   */
  wrect.ECS.System.Animator.prototype.stop = function(animation, scriptedAnimation, index) {
    scriptedAnimation.state = wrect.Component.Animation.states.stopped;
    scriptedAnimation.state = wrect.Component.Animation.currentFrame = scriptedAnimation.timing.stop;

    animation.playingAnimationIds.splice(index, 1);
  };

  wrect.ECS.System.Animator.prototype.pause = function(scriptedAnimation) {
    scriptedAnimation.state = wrect.Component.Animation.states.paused;
  };
}());
