(function() {
  "use strict";

  wrect.Core = wrect.Core || {};

  var Vector = wrect.Physics.Vector;

  wrect.Core.InputHandler = function() {
    var _options = {
      _pressed: [],
      _registeredPressed: [],
      _previousMousePos: null,
      _mouseWheel: null,
      _keys: {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        68: 'attack'
      },
      _singleInputKeys: [
        13,
        //37, 38, 39, 40,
        65,
        90,
        96,
        101,
        105
      ],
      _gamepadButtonMap: {
        A: 0,
        B: 1,
        X: 2,
        Y: 3,
        LB: 4,
        RB: 5,
        LT: 6,
        RT: 7,
        BACK: 8,
        START: 9,
        LEFT_STICK: 10,
        RIGHT_STICK: 11,
        DPAD_UP: 12,
        DPAD_DOWN: 13,
        DPAD_LEFT: 14,
        DPAD_RIGHT: 15,
        BRAND: 16
      },
      _gamepadAxisMap: {
        LX: 0,
        LY: 1,
        RX: 2,
        RY: 3
      },
      _gamepadDigitalAxisDeadzones: {},
      _keysToCapture: [],
      gamepadsConnected: [],
      gamepadSupported: false,
      currentGamepadState: null,
      game: null
    };
  };

  /**
   * Init the
   * @param containerId
   */
  wrect.Core.InputHandler.init = function(containerId) {
    var captureScope = window;
    if (typeof containerId !== 'undefined' ) {
      captureScope = document.getElementById(containerId);
    }
    // Register all keys in _keys as keys we should capture. Others will be ignored.
    for (var x in this._keys) {
      if (this._keys.hasOwnProperty(x)) {
        this._keysToCapture.push(parseInt(x));
      }
    }
    this._mouseWheel = {
      up: false,
      down: false
    };
    this.game = Container.getGame();
    captureScope.addEventListener('keyup', this._onKeyup.bind(this));
    captureScope.addEventListener('keydown', this._onKeydown.bind(this));
    captureScope.addEventListener('wheel', this._onMouseWheel.bind(this));

    if (Modernizr.gamepads === true) {
      this.initGamepad(captureScope);
    }
    else {
      console.info('Gamepad API not supported in this browser');
    }
  };

  /**
   * Init the gamepad logic. Only triggered when the Gamepad API is supported
   * @param captureScope
   */
  wrect.Core.InputHandler.prototype.initGamepad = function() {
    var self = this;
    this.gamepadSupported = true;
    var currentGamepads = window.navigator.getGamepads();
    this._gamepadDigitalAxisDeadzones = {
      LX: 0.6,
      LY: 0.6,
      RX: 0.6,
      RY: 0.6
    };
    for (var i = 0; i < currentGamepads.length; i++) {
      if (currentGamepads[i] !== undefined) {
        this.gamepadsConnected[currentGamepads[i].index] = currentGamepads[i].id;
      }
    }
    this.currentGamepadState = [];
    window.addEventListener('gamepadconnected', function(e){
      self.gamepadsConnected[e.gamepad.index] = e.gamepad.id;
    });
    window.addEventListener('gamepaddisconnected', function(e) {
      self.gamepadsConnected.splice(self.gamepadsConnected.indexOf(e.gamepad.id), 1);
    });
  };

  /**
   * Internal event for detecting when a key is pushed
   * @param event
   * @private
   */
  wrect.Core.InputHandler.prototype._onKeydown = function(event) {
    var i = this._keysToCapture.indexOf(event.keyCode);
    if (i !== -1) {
      var keyName = this._keys[event.keyCode];
      if (this._pressed.indexOf(keyName) === -1) {
        this._pressed.push(keyName);
      }
      event.preventDefault();
    }
  };

  /**
   * Internal event for detecting when a key is released
   * @param event
   * @private
   */
  wrect.Core.InputHandler.prototype._onKeyup = function(event) {
    var i = this._keysToCapture.indexOf(event.keyCode);
    if (i !== -1) {
      var index = this._pressed.indexOf(this._keys[event.keyCode]);
      if (index !== -1) {
        this._pressed.splice(index, 1);
      }
    }
    /*if ((index = this._pressed.indexOf(event.keyCode)) !== -1) {

     if ((this._singleInputKeys.indexOf(event.keyCode) !== -1) && (index = this._registeredPressed.indexOf(event.keyCode)) !== -1) {
     this._registeredPressed.splice(index, 1);
     }

     event.preventDefault();
     }*/
  };

  /**
   * Internal event for handling the mousewheel
   * @param e
   * @private
   */
  wrect.Core.InputHandler.prototype._onMouseWheel = function(e) {
    if (e.wheelDelta > 0) {
      this._mouseWheel.up = true;
    }
    else if (e.wheelDelta < 0) {
      this._mouseWheel.down = true;
    }
  };

  /**
   * Get the current mouse position relative to the screen
   * @returns {wrect.Physics.Vector|boolean}
   */
  wrect.Core.InputHandler.prototype.getMousePosition = function() {
    var pos = this.game.getStage().getMousePosition();
    if (pos.x === -10000 && pos.y === -10000) {
      return false;
    }
    return new Vector(pos.x, pos.y);
  };

  /**
   * Get the current mouse position relative to the world
   * @returns {*}
   */
  wrect.Core.InputHandler.prototype.getMouseWorldPosition = function() {
    return this.game.getCamera().getMouseWorldCoordinates();
  };

  /**
   * Get if the mousewheel was scrolled up this frame
   * @returns {boolean}
   */
  wrect.Core.InputHandler.prototype.mouseWheelUp = function() {
    return this._mouseWheel.up;
  };

  /**
   * Get if the mousewheel was scrolled down this frame
   * @returns {boolean}
   */
  wrect.Core.InputHandler.prototype.mouseWheelDown = function() {
    return this._mouseWheel.down;
  };

  /**
   * Gets if the position of the mouse changed in the previous frame (relative to screen, not world)
   * @returns {boolean}
   */
  wrect.Core.InputHandler.prototype.mousePositionChanged = function() {
    if (this._previousMousePos) {
      var mp = this.getMousePosition();
      return (this._previousMousePos.x != mp.x || this._previousMousePos.y != mp.y);
    }
    return false;
  };

  /**
   * Gets if the key with the given keyname is currently down
   * @param keyName
   * @returns {boolean}
   */
  wrect.Core.InputHandler.prototype.key = function(keyName) {
    return this._pressed.indexOf(keyName) !== -1;
  };

  /**
   * Update the internal mouse variables
   */
  wrect.Core.InputHandler.prototype.updateMouse = function() {
    this._previousMousePos = this.getMousePosition();
    this._mouseWheel.up = false;
    this._mouseWheel.down = false;
  };

  /**
   * Update the gamepad state
   */
  wrect.Core.InputHandler.prototype.updateGamepad = function() {
    if (this.gamepadSupported) {
      var gamepads = window.navigator.getGamepads();
      for (var i = 0; i < this.gamepadsConnected.length; i++) {
        if (gamepads[i] !== undefined) {
          this.currentGamepadState[i] = gamepads[i];
        }
      }
    }
  };

  /**
   * Update the inputhandler
   */
  wrect.Core.InputHandler.prototype.update = function() {
    this.updateGamepad();
    this.updateMouse();
  };

  /**
   * Gets if the button with the given name (and player) is currently down
   * @param buttonName
   * @param playerIndex
   * @returns {*}
   */
  wrect.Core.InputHandler.prototype.gamepadButton = function(buttonName, playerIndex) {
    if (this.currentGamepadState !== null) {
      if (playerIndex === undefined) {
        playerIndex = 0;
      }
      if (this.currentGamepadState[playerIndex] !== undefined) {
        var buttonCode = this._gamepadButtonMap[buttonName.toUpperCase()];
        if (this._gamepadButtonMap[buttonName.toUpperCase()] !== undefined) {
          return this.currentGamepadState[playerIndex].buttons[buttonCode].pressed;
        }
        else {
          console.info('Unknown key "' + buttonName + '".');
        }
      }
      else {
        console.info('Player at index ' + playerIndex + ' does not exist.');
      }
    }
    return false;
  };

  /**
   * Gets the value of the gamepad axis with the given name
   * @param axisName
   * @param playerIndex
   * @returns {*}
   */
  wrect.Core.InputHandler.prototype.gamepadAxis = function(axisName, playerIndex) {
    if (this.currentGamepadState !== null) {
      if (playerIndex === undefined) {
        playerIndex = 0;
      }
      if (this.currentGamepadState[playerIndex] !== undefined) {
        var axisCode = this._gamepadAxisMap[axisName.toUpperCase()];
        if (this._gamepadAxisMap[axisName.toUpperCase()] !== undefined) {
          return parseFloat(this.currentGamepadState[playerIndex].axes[axisCode].toFixed(4));
        }
        else {
          console.info('Unknown axis "' + axisName + '".');
        }
      }
      else {
        console.info('Player at index ' + playerIndex + ' does not exist.');
      }
    }
    return false;
  };

  /**
   * Gets a boolean value of the direction of the gamepad axis
   * @param axisName
   * @param playerIndex
   * @returns {*}
   */
  wrect.Core.InputHandler.prototype.gamepadAxisDigital = function(axisName, playerIndex) {
    var state = this.gamepadAxis(axisName, playerIndex);
    if (state !== false) {
      if (Math.abs(state) > this._gamepadDigitalAxisDeadzones[axisName]) {
        if (state > 0) {
          return 1;
        }
        else if (state < 0) {
          return -1;
        }
      }
      else {
        return 0;
      }
    }
    return false;
  };
  /**
   * Sets the gamezone to use for the Digital Axis checks
   * @param axisName
   * @param deadzone
   */
  wrect.Core.InputHandler.prototype.setgamepadDigitalAxisDeadzone = function(axisName, deadzone) {
    this._gamepadDigitalAxisDeadzones[axisName] = deadzone;
  };

  /**
   * Gets the gamezone to use for the Digital Axis checks
   * @param axisName
   * @param deadzone
   */
  wrect.Core.InputHandler.prototype.getgamepadDigitalAxisDeadzone = function(axisName) {
    return this._gamepadDigitalAxisDeadzones[axisName];
  };
})();
