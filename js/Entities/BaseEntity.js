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
    /**
     * Path to the sprite
     * @type String
     */
    spritePath: '',
    /**
     * Sprite object used for representation.
     * @type PIXI.Sprite|Object
     */
    _sprite: {},
    _graphics: {},
    _physics: new Physics(),

    /**
     * @param {String} name Name of the entity. Used for identification purposes
     * @param {String} spritePath Path of the sprite to use
     * @param collide Collide with other entities or not
     */
    init: function(name, spritePath, collide) {
        this.name = name;
        if (spritePath) {
            this.spritePath = spritePath;
            this.setSprite(spritePath);
        }
        if (collide !== undefined) {
            this.collide = Boolean(collide);
        }
    },

    /**
     * Builds the sprite from the given path and sets it to the object.
     * @param spritePath
     * @param options Options
     * @param options.crossOrigin Whether or not the path is on an external server
     * @param options.scaleMode ScaleMode to use for PIXI. See PIXI.scaleModes.
     */
    setSprite: function(spritePath, options) {
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
        this._sprite = new PIXI.AnimatedSprite(frame);
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

    getSprite: function() {
        return this._sprite;
    },

    update: function() {

    }
});
