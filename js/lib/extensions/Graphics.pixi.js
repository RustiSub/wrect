PIXI.Graphics.prototype.toJSON = function() {
    var o = {};
    for (var x in this) {
        if (x.indexOf('_') === 0 || x === 'parent' || typeof this[x] === 'function' || x === 'stage') {
            continue;
        }
        o[x] = this[x];
    }
    return o;
};

PIXI.Graphics.fromJso = function(jso) {
    var graphic = new PIXI.Graphics();
    for (var x in jso) {
        graphic[x] = jso[x];
    }

    return graphic;
};