PIXI.Sprite.prototype.toJSON = function() {
  //var tempSprite = Helpers.copy(this);
  var o = {};
  for (var x in this) {
    if (x.indexOf('_') === 0 || x === 'parent' || typeof this[x] === 'function' || x === 'stage') {
      continue;
    }
    o[x] = this[x];
  }
  return o;
};

PIXI.Sprite.fromJso = function(jso) {
    console.error('NOT YET IMPLEMENTED');
    /*var sprite = new PIXI.Sprite();
    for (var x in jso) {
        sprite[x] = jso[x];
    }

    return sprite;*/
};
