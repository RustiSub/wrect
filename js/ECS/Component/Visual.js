(function() {
  "use strict";

  wrect.ECS = wrect.ECS || {};
  wrect.ECS.Component = wrect.ECS.Component || {};

  var Vector = wrect.Physics.Vector;

  wrect.ECS.Component.Visual = function (options) {
    wrect.ECS.Component.BaseComponent.call(this);

    this.options = options || {};
    this.graphics = options.graphics || new PIXI.Graphics();

    if (this.options.alpha == undefined) {
      this.options.alpha = 1;
    }

    if (this.options.useSprite) {
      var frames = [
        "Image.001.png","Image.002.png","Image.003.png","Image.004.png","Image.005.png","Image.006.png","Image.007.png","Image.008.png"
      ];
      var sprite = PIXI.MovieClip.fromFrames(frames);
      //sprite.animationSpeed = 0.12;

      this.spriteOffset = new Vector(100, 0);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0;
      sprite.scale.x = sprite.scale.y = 0.30;

      //game.getStage().addChild(sprite);

      sprite.gotoAndPlay(2);

      sprite.loop = false;
      sprite.onComplete = function() {
        this.gotoAndPlay(2);
      };

      this.sprite = sprite;

      game.getStage().addChild(this.sprite);
    }
  };

  wrect.ECS.Component.Visual.prototype = Object.create( wrect.ECS.Component.BaseComponent.prototype );
  wrect.ECS.Component.Visual.prototype.constructor = wrect.ECS.Component.Visual;
  wrect.ECS.Component.Visual.prototype.name = 'Visual';

  wrect.ECS.Component.Visual.prototype.draw = function(origin) {
    this.graphics.clear();

    this.graphics.beginFill(this.options.color || 0x000000, this.options.alpha);
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(this.options.w, 0);
    this.graphics.lineTo(this.options.w, this.options.h);
    this.graphics.lineTo(0, this.options.h);

    this.graphics.endFill();

    this.graphics.position = origin;
  };

  wrect.ECS.Component.Visual.prototype.reDraw = function(origin, dimensions) {
    this.graphics.clear();

    this.graphics.beginFill(this.options.color || 0x000000, this.options.alpha);

    this.graphics.moveTo(0, 0);
    //this.graphics.lineTo(50, 0);
    //this.graphics.lineTo(50, 100);
    //this.graphics.lineTo(0, 100);
    //this.graphics.moveTo(origin.x, origin.y);
    for (var d = 0; d < dimensions.length; d++) {
      this.graphics.lineTo(dimensions[d].x, dimensions[d].y);
    }
    //this.graphics.lineTo(dimensions[0].x, dimensions[0].y);
    this.graphics.lineTo(0, 0);

    this.graphics.endFill();

    //this.graphics.position = origin;
  };

  wrect.ECS.Component.Visual.prototype.clear = function(origin) {
    this.graphics.clear();
  }
}());
