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
    connectedBodies: [],
    connectionPoint: {},
    connectionFaces: [],
    inClusters: -1,
    connected: false,
    _graphics: {},
    _physics: {},
    color: 0x000000,

    /**
     * @param {String} name Name of the entity. Used for identification purposes.
     * @param {PIXI.Sprite|PIXI.Graphics|String} graphics. Object or path to sprite to use for graphical representation.
     */
    init: function(name, graphics) {
        this.connectedBodies = [];
        this.connectionPoint = {};
        this.inClusters = -1;
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
      this._physics = new Physics();
      this._graphics = graphics;
    },

    getGraphics: function() {
        return this._graphics;
    },

    update: function() {

    },
    handleCollision: function(collisionShape, axesOverlap) {
      if (!collisionShape._physics.solid) {
        return;
      }
      function capSmallSpeed(speed) {
        return speed > -1 && speed < 1 ? 0 : speed;
      }

      var v = this.physicsBody.v;//.unit();
      var n = axesOverlap.axis;//.unit();
      var vn = v.dot(n);
      var u = n.multiply(vn);
      var w = v.subtract(u);
      var v2 = w.subtract(u);


      v2.x = capSmallSpeed(v2.x);
      v2.y = capSmallSpeed(v2.y);

      var sign = vn ? vn < 0 ? -1 : 1:0;
      var pushOutVector = n.unit().multiply(axesOverlap.overlap * -sign);

      this.dimensions.move(pushOutVector);

      if (!collisionShape.frozen) {
//      collisionShape.physicsBody.v = collisionShape.physicsBody.v.add(v.multiply(energyTransfer));
//      v2 = v2.multiply(energyTransfer);
      }

      this.physicsBody.v = v2;
    }
});
