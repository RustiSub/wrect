(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.System = wrect.ECS.System || {};

  wrect.ECS.System.Animator = function (options) {
    wrect.ECS.System.BaseSystem.call(this, options);

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
    var gameTime = this.options.game.gameTime;

    this.interval = gameTime.getPreviousTime() - this.lastFrame;
    this.currentFrame = gameTime.getPreviousTime();

    for (var e = 0; e < this.entities.length; e++) {
      var entity = this.entities[e];
      var animation = entity.components.Animation;

      animation.timer += gameTime.getDelta();


      for (var s = 0; s < animation.playingAnimationIds.length; s++) {
        var scriptedAnimation = animation.scriptedAnimations[animation.playingAnimationIds[s]];
        /**
         * @type {actions}
         */
        var actions = scriptedAnimation.actions;

        for (var actionIndex in actions) if (actions.hasOwnProperty(actionIndex)) {
          var action = actions[actionIndex];

          if (animation.timer >= actionIndex && action.state === 0) {
            action.perform(entity);
            action.state = 1;
          }
        }
      }

      if (animation.timer >= animation.endTime) {
        console.log('animation done');
        console.log('resetting');
        animation.timer = 0;

        /**
         * @type {actions}
         */
        var actionsEnd = scriptedAnimation.actions;

        for (var actionIndexEnd in actionsEnd) if (actionsEnd.hasOwnProperty(actionIndexEnd)) {
          var actionEnd = actionsEnd[actionIndexEnd];

          if (actionEnd.state === 1) {
            actionEnd.state = 0;
          }
        }
      }
    }
  };

  /**
   * @param {wrect.ECS.Component.ScriptedAnimation} scriptedAnimation
   */
  wrect.ECS.System.Animator.prototype.perform = function(scriptedAnimation) {

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
