/**
 * @type {void|*}
 */
var BaseEntity = Class.extend({
    GRAPHICS_TYPE_GRAPHIC: 0,
    GRAPHICS_TYPE_SPRITE: 1,
    /**
     * Whether or not to collide with other entities
     * @type Boolean
     */
    collide: true,
    /**
     * Name of the entity. Should be unique.
     * @type String
     */
    name: '',
    /**
     * Dimensions of the entity in px.
     */
    size: {
        x: 64,
        y: 64
    },
    _graphics: {},
    _physics: {},
    _className: 'BaseEntity',
    graphicsType: null,

    /**
     * @param {String} name Name of the entity. Used for identification purposes.
     * @param {PIXI.Sprite|PIXI.Graphics|String} graphics. Object or path to sprite to use for graphical representation.
     */
    init: function(name, graphics) {
        if (name) {
            this.setName(name);
        }
        if (graphics) {
            this.setGraphics(graphics);
        }
    },

    setName: function(name) {
        this.name = name;
    },

    /**
     * Builds the sprite from the given path and sets it to the object.
     * @param spritePath
     * @param options Options
     * @param options.crossOrigin Whether or not the path is on an external server
     * @param options.scaleMode ScaleMode to use for PIXI. See PIXI.scaleModes.
     */
    buildSprite: function(spritePath, options) {
        var crossOrigin = false;
        var scaleMode = PIXI.scaleModes.NEAREST;
        if (options) {
            if (options.crossOrigin !== undefined) {
                crossOrigin = options.crossorigin;
            }
            if (options.scaleMode !== undefined) {
                scaleMode = options.scaleMode;
            }
        }
        var texture = PIXI.Texture.fromImage(spritePath, crossOrigin, scaleMode);
        var frame = new PIXI.Texture(texture, {x: 0, y: 0, width: this.size.x, height: this.size.y});

        return new PIXI.AnimatedSprite(frame);
    },

    setGraphics: function(graphics) {
        if (typeof graphics === 'string') {
            this._graphics = this.buildSprite(graphics);
        }
        else {
            this._graphics = graphics;
            this._physics = new Physics();
        }

        if (this._graphics instanceof PIXI.Graphics) {
            this.graphicsType = this.GRAPHICS_TYPE_GRAPHIC;
        }
        else if (this._graphics instanceof PIXI.Sprite) {
            this.graphicsType = this.GRAPHICS_TYPE_SPRITE;
        }
    },

    getGraphics: function() {
        return this._graphics;
    },

    update: function() {

    },
    toJSON: function() {
        var o = {};
        o.specialParams = ['_graphics'];
        o._graphics = {};
        o._graphics.constructorParams = [];

        // TODO: Build chain of stuff required to reconstruct a sprite (callbacks)
        switch (this.graphicsType) {
            case this.GRAPHICS_TYPE_GRAPHIC:
                o._graphics.className = 'PIXI.Graphics';
                o._graphics.callbacks = {
                  beginFill: [this._graphics.currentPath.fillColor],
                  drawRect: this._graphics.currentPath.points,
                  endFill: []
                };
                break;
                case this.GRAPHICS_TYPE_SPRITE:
                  o._graphics.className = 'PIXI.Sprite';
                  o._graphics.constructorParams.push(this._graphics.texture);
                  o._graphics.callbacks = {};
                  break;
        }

        for (var x in this) {
            if (typeof(this[x]) !== 'function' && o.specialParams.indexOf(x) === -1) {
                o[x] = this[x];
            }
        }

        return o;
    }
});
