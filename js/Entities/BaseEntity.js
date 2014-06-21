/**
 * @type {void|*}
 */
var BaseEntity = Class.extend({
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
    _physics: null,

    /**
     * @param {String} name Name of the entity. Used for identification purposes.
     * @param {PIXI.Sprite|PIXI.Graphics|String} graphics. Object or path to sprite to use for graphical representation.
     */
    init: function(name, graphics) {
        this.name = name;
        if (typeof graphics === 'string') {
            this._graphics = this.buildSprite(graphics);
        }
        else {
            this._graphics = graphics;
            this._physics = new Physics();
        }
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
      if (graphics == null) {
        graphics = new PIXI.Graphics();

        graphics.beginFill(0x00FF00);
        // graphics.drawCircle(100 + this.position.x, 100 + this.position.y, 10);
        graphics.drawRect(100, 100, 10, 10);
        graphics.endFill();
      }

      graphics.moveTo(this.position.x, this.position.y);

      this._graphics = graphics;
    },

    getGraphics: function() {
        return this._graphics;
    },

    update: function() {

    }
});
