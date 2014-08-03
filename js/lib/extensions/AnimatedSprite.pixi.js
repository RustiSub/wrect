PIXI.AnimatedSprite = function(texture) {
    PIXI.Sprite.call(this, texture);
};

PIXI.AnimatedSprite.prototype = Object.create(PIXI.Sprite.prototype);
PIXI.AnimatedSprite.prototype.constructor = PIXI.AnimatedSprite;