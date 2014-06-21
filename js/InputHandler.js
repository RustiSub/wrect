var InputHandler = Class.extend({
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
    _keysToCapture: [],
    init: function(containerId){
        var captureScope = window;
        if (typeof containerId !== 'undefined' ) {
            captureScope = document.getElementById(containerId);
        }
        // Register all keys in _keys as keys we should capture. Others will be ignored.
        for (var x in this._keys) {
            if (this._keys.hasOwnProperty(x)) {
                this._keysToCapture.push(this._keys[x])
            }
        }
        captureScope.addEventListener('keyup', this._onKeyup.bind(this));
        captureScope.addEventListener('keydown', this._onKeydown.bind(this));
    },
    _onKeydown: function(event) {
        if (this._keysToCapture.indexOf(event.keyCode) !== -1
            && this._pressed.indexOf(event.keyCode) === -1) {
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
        return this._pressed.indexOf(keyCode) != -1;
    }
});
