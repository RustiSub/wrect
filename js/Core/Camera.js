(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  var Vector = wrect.Physics.Vector;

  /**
   * A Camera is your view into the game world. It has a position and size and renders only those objects within its field of view.
   * The game automatically creates a single Stage sized camera on boot. Move the camera around the world with Phaser.Camera.x/y
   *
   * @class wrect.Core.Camera
   * @constructor
   * @param {number} x - Position of the camera on the X axis
   * @param {number} y - Position of the camera on the Y axis
   * @param {number} width - The width of the view rectangle
   * @param {number} height - The height of the view rectangle
   * @param {Game} game - The game class to bind to
   */
  wrect.Core.Camera = function(x, y, width, height, game) {
    /**
     * Reference to game
     * @type Game
     */
    this.game = game;

    /**
     * Target, usually an entity
     * @type {null}
     */
    this.target = null;

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

    /**
     * Time how long to shake
     * @type {wrect.Core.Timer}
     */
    this.shakeTimer = new wrect.Core.Timer(0);

    /**
     * @type {wrect.Physics.Vector}
     */
    this.shakeOffset = new Vector(0, 0);

    /**
     * SOOOO INTENSE
     * @type {number}
     */
    this.shakeIntensity = 1;

    /**
     * Currently shaking
     * @type {boolean}
     */
    this.shaking = false;

    /**
     * Display element containing the Camera
     * @type {PIXI.DisplayObjectContainer}
     */
    this.displayContainer = this.game._cameraContainer;

    /**
     * Position of the camera
     * @type {wrect.Physics.Vector}
     */
    this.position = new Vector(x, y);

    this.unscaledPosition = new Vector(x, y);

    /**
     * Bounds of the camera
     * @type {wrect.Physics.Vector}}
     */
    this.bounds = new Vector(width, height);

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

    this.game.getEventManager().addListener('game.updateEnd', this.update, this);

  };

  var Camera = wrect.Core.Camera;

  /**
   * Follow the BaseEntity
   * @param {Block} entity
   */
  Camera.prototype.follow = function(entity) {
    this.target = entity;
  };

  /**
   * Get position of the mouse relative to the camera position.
   * @returns {wrect.Physics.Vector|boolean}
   */
  Camera.prototype.getMouseWorldCoordinates = function() {
    var screenPos = this.game.getInputHandler().getMousePosition();
    if (screenPos) {
      return screenPos.add(this.position);
    }

    return false;
  };

  /**
   * Stop following entities
   */
  Camera.prototype.unfollow = function() {
    this.target = null;
  };

  /**
   * Update
   */
  Camera.prototype.update = function() {
    this.changed = false;

    this.updateFollow();
    this.updateShake();
    this.updateCameraContainer();
  };

  /**
   * Update the camera container position
   */
  Camera.prototype.updateCameraContainer = function() {
    this.displayContainer.position.x = Math.round(-this.position.x);
    this.displayContainer.position.y = Math.round(-this.position.y);
  };

  /**
   * Update the shaking
   */
  Camera.prototype.updateShake = function() {
    if (this.shaking) {
      var delta = this.shakeTimer.delta();
      if (delta > 0) {
        var deltaPct = -delta / this.shakeTimer.targetTime;
        var value = this.shakeIntensity * Math.pow(deltaPct, 2);
        if (value > 0.5) {
          this.shakeOffset.x = value * Math.random();
          this.shakeOffset.y = value * Math.random();
        }
        this.shakeOffset.multiply(deltaPct);
        var resultVector = this.position.add(this.shakeOffset);
        this.position.x = resultVector.x;
        this.position.y = resultVector.y;
      }
      else {
        this.shaking = false;
        this.shakeTimer.reset();
      }
      this.shakeTimer.update(this.game.getDelta());
    }
  };

  /**
   * Update the position of the camera
   */
  Camera.prototype.updateFollow = function() {
    if (this.target) {
      var center = this.target.components.RigidBody.dimensions.getBounds().topLeft;
      this.unscaledPosition.x = center.x - this.bounds.x/2;
      this.unscaledPosition.y = center.y - this.bounds.y/2;

      var halfBounds = this.bounds.scale(0.5);

      center = center.subtract(halfBounds);
      this.position.x = Helpers.math.clamp(center.x, 0, 350);
      this.position.y = Helpers.math.clamp(center.y, 0, 900);
    }
  };

  /**
   * Shake the camera for a certain amount of time
   * @param {int} intensity
   * @param {int} duration
   */
  Camera.prototype.shake = function(intensity, duration) {
    if (!this.shaking) {
      this.shaking = true;
      this.shakeTimer.set(duration);
      this.shakeIntensity = intensity;
    }
  };

}());
