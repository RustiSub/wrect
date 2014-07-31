(function(){
    "use strict";
    window.InputHandler = window.Class.extend({
        _pressed: [],
        _keys: {
            BACKSPACE: 8,
            TAB:       9,
            RETURN:   13,
            ESC:      27,
            SPACE:    32,
            PAGEUP:   33,
            PAGEDOWN: 34,
            END:      35,
            HOME:     36,
            LEFT:     37,
            UP:       38,
            RIGHT:    39,
            DOWN:     40,
            INSERT:   45,
            DELETE:   46,
            ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
            A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
            TILDA:    192
        },
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
        _keysToCapture: [],
        gamepadsConnected: [],
        gamepadSupported: false,
        currentGamepadState: null,
        init: function(containerId){
            var captureScope = window;
            if (typeof containerId !== 'undefined' ) {
                captureScope = document.getElementById(containerId);
            }
            // Register all keys in _keys as keys we should capture. Others will be ignored.
            for (var x in this._keys) {
                if (this._keys.hasOwnProperty(x)) {
                    this._keysToCapture.push(this._keys[x]);
                }
            }
            captureScope.addEventListener('keyup', this._onKeyup.bind(this));
            captureScope.addEventListener('keydown', this._onKeydown.bind(this));

            if (Modernizr.gamepads === true) {
                this.initGamepad(captureScope);
            }
            else {
                console.info('Gamepad not supported in this browser');
            }
        },
        initGamepad: function(captureScope) {
            var self = this;
            this.gamepadSupported = true;
            window.addEventListener('gamepadconnected', function(e){
                self.gamepadsConnected[e.gamepad.index] = e.gamepad.id;
            });
            window.addEventListener('gamepaddisconnected', function(e) {
                self.gamepadsConnected.splice(self.gamepadsConnected.indexOf(e.gamepad.id), 1);
            });
        },
        _onKeydown: function(event) {
            if (this._keysToCapture.indexOf(event.keyCode) !== -1 &&
                this._pressed.indexOf(event.keyCode) === -1) {
                this._pressed.push(event.keyCode);
                event.preventDefault();
            }
        },
        _onKeyup: function(event) {
            var index;
            if ((index = this._pressed.indexOf(event.keyCode)) !== -1) {
                this._pressed.splice(index, 1);
                event.preventDefault();
            }
        },
        key: function(keyName) {
            var keyCode = this._keys[keyName.toUpperCase()];
            return this._pressed.indexOf(keyCode) !== -1;
        },
        updateGamepad: function() {
            if (this.gamepadSupported) {
                this.currentGamepadState = window.navigator.getGamepads();
            }
        },
        update: function() {
            this.updateGamepad();
        },
        gamepadButton: function(buttonName, playerIndex) {
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
                        console.info('Button "' + buttonName + '" Is not mapped. Did you make a typo?');
                    }
                }
                else {
                    //console.info('Player at index ' + playerIndex + ' does not exist.');
                }
            }
            return false;
        },
        gamepadAxis: function(axisName, playerIndex) {
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
                        console.info('Axis "' + axisName + '" Is not mapped. Did you make a typo?');
                    }
                }
                else {
                    //console.info('Player at index ' + playerIndex + ' does not exist.');
                }
            }
            return false;
        },
        gamepadAxisDigital: function(axisName, playerIndex) {
            var state = this.gamepadAxis(axisName, playerIndex);
            if (state !== false) {
                if (Math.abs(state) > 0.1) {
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
        }
    });
})();
