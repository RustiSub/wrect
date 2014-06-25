PIXI.Sprite.prototype.toJSON = function() {
  //var tempSprite = Helpers.copy(this);
  var o = {};
  for (var x in this) {
    if (x.indexOf('_') === 0 || x === 'parent' || typeof this[x] === 'function') {
      continue;
    }
    o[x] = this[x];
  }
  return JSON.stringify(o);
};

PIXI.Graphics.prototype.toJSON = function() {
  //var tempSprite = Helpers.copy(this);
  var o = {};
  for (var x in this) {
    if (x.indexOf('_') === 0 || x === 'parent' || typeof this[x] === 'function' || x === 'stage') {
      continue;
    }
    o[x] = this[x];
  }
  console.log(o);
  return JSON.stringify(o);
};
