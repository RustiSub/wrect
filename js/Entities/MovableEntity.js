/**
 * @augments BaseEntity
 * @type {void|*}
 */
var MovableEntity = BaseEntity.extend({
    selected: false,
    graphicsCallbacks: {},
    baseGraphicsCallback: {},
    originalBaseGraphicsCallback: {},
    selectedGraphicsCallback : {},
    deselectGraphicsCallback: {},
    gluedGraphicsCallback: {},
    unGluedGraphicsCallback: {},
    position: {},
    frozen: true,
    collisions: [],

    /**
     * @param {String} name
     * @param {PIXI.Sprite, PIXI.Graphics, String} graphics
     * @param {Object} options
     * @param {Object} options.position
     * @param {Number} options.position.x
     * @param {Number} options.position.y
     */
    init: function(name, graphics, options) {
      this._super(name, graphics);
      this.position = this._graphics.position;
      if (options && options.position) {
        this.position.x = options.position.x;
        this.position.y = options.position.y;
      }
    },
    moveLeft: function(speed) {
        this._physics.xSpeed = -speed;
    },
    moveRight: function(speed) {
        this._physics.xSpeed = speed;
    },
    moveUp: function() {
        // TODO: top-down only
    },
    moveDown: function() {
        // TODO: top-down only
    },
    stop: function() {
        this._physics.xSpeed = 0;
        this._physics.ySpeed = 0;
    },
    jump: function() {

    },
    deselect: function() {
      this.selected = false;
      this.baseGraphicsCallback();
    },
    select: function() {
      this.selected = true;
      this.baseGraphicsCallback();
    },
    applyGlue: function() {
      if (!this.hasGlue) {
        this.hasGlue = true;
        this.baseGraphicsCallback();
      }
    },
    removeGlue: function() {
      if (this.hasGlue) {
        this.hasGlue = false;
        this.baseGraphicsCallback();
      }
    },
    toggleSelect: function()  {
      if (this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    },

    update: function() {
        this._graphics.position.x += this._physics.calculateSpeedX();
        this._graphics.position.y += this._physics.calculateSpeedY();
    }
});
