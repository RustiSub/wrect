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
     * Zoom level
     * @type {number}
     */
    this.zoomLevel = 1;

    /**
     * Real zoom level, incremented with smaller steps for a smoother experience
     * @type {number}
     * @private
     */
    this._realZoomLevel = 1;

    /**
     * Steps used to increment _realZoomLevel. Smaller is slower, but also smoother
     * @type {number}
     * @private
     */
    this._zoomSpeed = 0.01;

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
     * @type {{x: number, y: number}}
     */
    this.position = new Vector(x, y);

    this.targetPosition = new Vector(x, y);

    this.nextPosition = new Vector(x, y);

    this.unscaledPosition = new Vector(x, y);

    /**
     * Bounds of the camera
     * @type {{x: {min: number, max: number}, y: {min: number, max: number}}}
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
      return screenPos.add(this.position).divide(this._realZoomLevel);
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

    this.updateZoom();
    this.updateFollow();
    this.updateShake();
    this.updateCameraContainer();

    if (this.game.getInputHandler().mouseWheelUp()) {
      this.zoomIn(0.05);
    }
    else if (this.game.getInputHandler().mouseWheelDown()) {
      this.zoomOut(0.05);
    }
  };

  /**
   * Update the camera container position
   */
  Camera.prototype.updateCameraContainer = function() {
    this.displayContainer.position.x = -this.position.x;
    this.displayContainer.position.y = -this.position.y;
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
   * Update the zoom level for interpolation
   */
  Camera.prototype.updateZoom = function() {
    if (this._realZoomLevel !== this.zoomLevel) {
      if (this._realZoomLevel > this.zoomLevel) {
        this._realZoomLevel -= this._zoomSpeed;
      }
      if (this._realZoomLevel < this.zoomLevel) {
        this._realZoomLevel += this._zoomSpeed;
      }
      this.displayContainer.scale.x = this._realZoomLevel;
      this.displayContainer.scale.y = this._realZoomLevel;
    }
  };

  /**
   * Update the position of the camera
   */
  Camera.prototype.updateFollow = function() {
    if (this.target) {
      var center = this.target.dimensions.center();
      this.unscaledPosition.x = center.x - this.bounds.x/2;
      this.unscaledPosition.y = center.y - this.bounds.y/2;

      var halfBounds = this.bounds.scale(0.5);

      center = center.scale(this._realZoomLevel);
      center = center.subtract(halfBounds);
      this.position.x = center.x;
      this.position.y = center.y;
    }
  };

  /**
   * Will be used for interpolation
   */
  Camera.prototype.updatePosition = function() {
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

  /**
   * !!THESE NEED TO BE SORTED FROM SMALL TO LARGE!!
   * @type {{SMALLEST: number, SMALLER: number, SMALL: number, NORMAL: number, MEDIUM: number, LARGE: number, EXTRA_LARGE: number, LARGEST: number}}
   */
  Camera.prototype.zoomLevels = {
    SMALLEST: 0.25,
    SMALLER: 0.50,
    SMALL: 0.75,
    NORMAL: 1,
    MEDIUM: 1.25,
    LARGE: 1.50,
    EXTRA_LARGE: 1.75,
    LARGEST: 2.0
  };

  /**
   * Min/max zoom levels
   * @type {{min: number, max: number}}
   */
  Camera.prototype.zoomBounds = {
    min: 0.25,
    max: 2.0
  };

  /**
   * Zoom in with the given amount
   * @param value
   */
  Camera.prototype.zoomIn = function(value) {
    var newZoomLevel = this.zoomLevel + value;
    if (newZoomLevel >= this.zoomBounds.min && newZoomLevel <= this.zoomBounds.max) {
      this.zoom(newZoomLevel);
    }
  };

  /**
   * Zoom out with the given amount
   * @param value
   */
  Camera.prototype.zoomOut = function(value) {
    var newZoomLevel = this.zoomLevel - value;
    if (newZoomLevel >= this.zoomBounds.min && newZoomLevel <= this.zoomBounds.max) {
      this.zoom(newZoomLevel);
    }
  };

  /**
   * Zoom to the given value
   * @param value
   */
  Camera.prototype.zoom = function(value) {
    this.zoomLevel = value;
    this.updateFollow();
  };

  /**
   * Get the name of the current zoom level. Useful for doing certain things only at a certain zoomlevel.
   * @returns {*}
   */
  Camera.prototype.getCurrentZoomLevelName = function() {
    for (var x in this.zoomLevels) {
      var lvl = this.zoomLevels[x];
      if (lvl > this.zoomLevel) {
        return x;
      }
    }
    return false;
  };
}());
