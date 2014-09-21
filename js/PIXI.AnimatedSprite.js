(function() {
    PIXI.AnimatedSprite = function(spritePath, frames, frametime, loop)  {
        var texture = PIXI.Texture.fromImage(spritePath);
        this._stop = true;
        this._baseTexture = texture;
        this.frameTime = frametime;
        this.fh = this._baseTexture.height;
        this.fw = this._baseTexture.width / frames;
        this.loop = loop || true;
        this.frameCount = frames;
        this.spritePath = spritePath;
        this.frameTextures = this.buildFrames();
        PIXI.MovieClip.call(this, this.frameTextures);
        this.animationSpeed = frametime;
    };

    PIXI.AnimatedSprite.prototype = Object.create( PIXI.MovieClip.prototype );
    PIXI.AnimatedSprite.prototype.constructor = PIXI.AnimatedSprite;

    PIXI.AnimatedSprite.prototype.buildFrames = function() {
        var textures = [];
        for (var i=0;i<this.frameCount;i++){
            var texture = new PIXI.Texture(this._baseTexture);
            texture.frame.x = i * this.fw;
            texture.frame.y = 0;
            texture.frame.width = this.fw;
            texture.frame.height = this.fh;
            texture.setFrame(texture.frame);
            PIXI.Texture.addTextureToCache(texture, this.spritePath.replace('.', '-') + i);
            textures.push(texture);
        }

        return textures;
    };
}).call(this);