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

    getSprite: function() {
        return this._sprite;
    },

    update: function() {

    }
});