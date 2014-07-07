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

// TODO: somehow save full namespace in _className so we can also rebuild namespaced objects :(
for (var x in PIXI) {
  if (typeof PIXI[x] === 'function' && x.substr(0, 1) === x.substr(0, 1).toUpperCase()) {
    PIXI[x].prototype._className = x;
    PIXI[x].prototype.toJSON = function() {
      var jsonable = {};
      for (var y in this) {
        if (y.indexOf('_') === 0 || y === 'parent' || typeof this[y] === 'function' || y === 'stage') {
          continue;
        }
          jsonable[y] = this[y];
      }
      jsonable._className = this._className;

      return jsonable;
    }
  }
}
