(function() {
    /**
     * @Class PIXI.AnimatedSprite
     * @param {String} spritePath
     * @param {int} cols
     * @param {int} rows
     * @param {int} frametime
     * @param {boolean} [loop]
     * @param {int} [defaultFrame]
     * @constructor
     * @augments PIXI.MovieClip
     */
    PIXI.AnimatedSprite = function(spritePath, cols, rows, frametime, loop, defaultFrame)  {
        var texture = PIXI.Texture.fromImage(spritePath);
        this.animations = {};
        this._baseTexture = texture;
        this.frameTime = frametime;
        this.cols = cols;
        this.rows = rows;
        this.fh = this._baseTexture.height / rows;
        this.fw = this._baseTexture.width / cols;
        this.loop = loop || true;
        this.frameCount = cols * rows;
        this.spritePath = spritePath;
        // Placeholder animation
        defaultFrame = defaultFrame || 0;
        this.addAnimationSet({
            name: '_base',
            startFrame: defaultFrame,
            endFrame: defaultFrame
        });
        PIXI.MovieClip.call(this, this.animations._base.textures);
        this.animationSpeed = frametime;
    };

    PIXI.AnimatedSprite.prototype = Object.create( PIXI.MovieClip.prototype );
    PIXI.AnimatedSprite.prototype.constructor = PIXI.AnimatedSprite;

    /**
     * Add an animation with row/col or start/endframe
     * @param {Object} params
     * @param {string} params.name
     * @param {int} [params.row]
     * @param {int} [params.col]
     * @param {int} [params.startFrame]
     * @param {int} [params.endFrame]
     * @param {int} [params.startRow]
     * @param {int} [params.endRow]
     */
    PIXI.AnimatedSprite.prototype.addAnimationSet = function(params) {
        var startFrame;
        var endFrame;
        if (params.row !== undefined) {
            startFrame = (params.row-1) * this.cols;
            endFrame = params.row * this.cols - 1;
        }
        else if (params.startFrame !== undefined && params.endFrame !== undefined) {
            startFrame = params.startFrame;
            endFrame = params.endFrame;
        }
        else if (params.startRow !== undefined && params.endRow !== undefined) {
            startFrame = (params.startRow-1) * this.cols;
            endFrame = params.endRow * this.cols - 1;
        }
        this.animations[params.name] = {
            start: startFrame,
            end: endFrame
        };
        this._buildFramesForSet(params.name);
    };

    /**
     * Build the frames and add the textures to the cache for a certain animation.
     * @param {string} animationName
     */
    PIXI.AnimatedSprite.prototype._buildFramesForSet = function(animationName) {
        var anim = this.animations[animationName];
        if (!anim.textures) {
            anim.textures = [];
            for (var i=anim.start; i <= anim.end; i++){
                var texture = new PIXI.Texture(this._baseTexture);
                texture.frame.x = (i % this.cols) * this.fw;
                texture.frame.y = Math.floor((i/this.cols)) * this.fh;
                texture.frame.width = this.fw;
                texture.frame.height = this.fh;
                texture.setFrame(texture.frame);
                PIXI.Texture.addTextureToCache(texture, this.spritePath.replace('.', '-') + '-' + animationName + '-' + i);
                anim.textures.push(texture);
            }
        }
    };

    /**
     *
     * @param {string} animationName name of the animation
     * @param {boolean} [invert] invert the animation
     */
    PIXI.AnimatedSprite.prototype.playAnimation = function(animationName, invert) {
        this.textures = this.animations[animationName].textures;
        if (invert) {
            this.textures.reverse();
        }
        this.gotoAndPlay(this.animations[animationName].start);
        this.playing = true;
    };
}).call(this);
