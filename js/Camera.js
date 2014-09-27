(function() {
  /**
   * A Camera is your view into the game world. It has a position and size and renders only those objects within its field of view.
   * The game automatically creates a single Stage sized camera on boot. Move the camera around the world with Phaser.Camera.x/y
   *
   * @class window.Camera
   * @constructor
   * @param {number} x - Position of the camera on the X axis
   * @param {number} y - Position of the camera on the Y axis
   * @param {number} width - The width of the view rectangle
   * @param {number} height - The height of the view rectangle
   */
  window.Camera = function(x, y, width, height) {
    /**
     * Reference to game
     * @type Game
     */
    this.game = Container.getGame();

    /**
     * Target, usually an entity
     * @type {null}
     */
    this.target = null;

    /**
     * Zoom level
     * @type {number}
     */
    this.scale = 1;

    /**
     * Whether or not the position changed since the last update
     * @type {boolean}
     */
    this.changed = false;

    /**
     * Deadzone to combat motionsickness
     * @type {{height: number, width: number}}
     */
    this.deadzone = {
      height: 200,
      width: 200
    };

    this.displayContainer = this.game._cameraContainer;

    /**
     * Position of the camera
     * @type {{x: number, y: number}}
     */
    this.position = new Vector(x, y);

    this.targetPosition = new Vector(x, y);

    this.nextPosition = new Vector(x, y);

    /**
     * Bounds of the camera
     * @type {{x: {min: number, max: number}, y: {min: number, max: number}}}
     */
    this.bounds = {
      x: {
        min: 0,
        max: width
      },
      y: {
        min: 0,
        max: height
      }
    };

    var curLvl = this.game.getCurrentLevel();

    /**
     * Dimensions of the level
     * @type {{x: *, y: *}}
     */
    this.levelDimensions = new Vector(
      curLvl.width,
      curLvl.height
    );

    /**
     * Whether or not the camera is at the edge
     * @type {{x: boolean, y: boolean}}
     */
    this.atEdge = {
      x: false,
      y: false
    };
  };

  /**
   * Follow the BaseEntity
   * @param {Block} entity
   */
  window.Camera.prototype.follow = function(entity) {
    this.target = entity;
  };

  window.Camera.prototype.getMouseWorldCoordinates = function() {
    var screenPos = this.game.getInputHandler().getMousePosition();
    if (screenPos) {
      return screenPos.add(this.position);
    }

    return false;
  };

  window.Camera.prototype.unfollow = function() {
    this.target = null;
  };

  window.Camera.prototype.update = function() {
    this.changed = false;

    this.updateFollow();
    this.displayContainer.position.x = -this.position.x;
    this.displayContainer.position.y = -this.position.y;
  };

  window.Camera.prototype.updateFollow = function() {
    if (this.target) {
      var center = this.target._physics.center(this.target.dimensions);
      this.position.x = center.x - this.bounds.x.max/2;
      this.position.y = center.y - this.bounds.y.max/2;
    }
  };

  window.Camera.prototype.updatePosition = function() {
    var delta = {
      x: this.position.x - this.targetPosition.x,
      y: this.position.y - this.targetPosition.y
    };

    if (delta.x || delta.y) {
      /*if (Math.abs(delta.x) > 100) {
        //this.nextPosition.x = Math.round(this.position.x + delta.x/10);
      }
      if (Math.abs(delta.y) > 100) {
        //this.nextPosition.y = Math.round(this.position.y + delta.y/10);
      }*/
    }
  };
}());
