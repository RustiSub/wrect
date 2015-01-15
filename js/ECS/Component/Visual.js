(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  wrect.ECS.Component.Visual = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.graphics = options.graphics || new PIXI.Graphics();

    this.color =  options.color || 0x000000;

    if (this.options.useSprite) {
      var frames = [
        "walk2.001.png", "walk2.003.png", "walk2.005.png", "walk2.007.png", "walk2.009.png", "walk2.011.png", "walk2.013.png"
      ];
      var sprite = PIXI.MovieClip.fromFrames(frames);
      //sprite.animationSpeed = 0.12;

      sprite.scale.x = sprite.scale.y = 0.30;
      //game.getStage().addChild(sprite);

      sprite.gotoAndPlay(0);

      this.sprite = sprite;

      game.getStage().addChild(this.sprite);
      console.log(this.sprite);
    }
  };

  wrect.ECS.Component.Visual.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Visual.prototype.constructor = wrect.ECS.Component.Visual;
  wrect.ECS.Component.Visual.prototype.name = 'Visual';

  wrect.ECS.Component.Visual.prototype.draw = function(origin) {
    this.graphics.clear();
    this.graphics.beginFill(this.options.color || 0x000000, this.options.alpha || 1);
    this.graphics.drawRect(0, 0, this.options.w, this.options.h);
    this.graphics.endFill();

    this.graphics.position = origin;
  };

  wrect.ECS.Component.Visual.prototype.clear = function(origin) {
    this.graphics.clear();
  }
}());
