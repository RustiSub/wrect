(function() {
  'use strict';
  var wrect = window.wrect;

  /**
   * Manages tile maps
   * @constructor
   */
  wrect.TileMap.TileMapManager = function(game) {
    this.game = game;
    this.currentTileMap = null;
    this.visibleDimensions = null;
    this.previousVisibleDimensions = null;
    this.game.getEventManager().addListener('game.updateEnd', this.update, this);
  };

  wrect.TileMap.TileMapManager.prototype.update = function() {
    if (this.currentTileMap) {
      if (this.viewportChanged()) {
        this.updateTiles();
        this.previousVisibleDimensions.origin.x = this.visibleDimensions.origin.x;
        this.previousVisibleDimensions.origin.y = this.visibleDimensions.origin.y;
      }
    }
  };

  wrect.TileMap.TileMapManager.prototype.viewportChanged = function() {
    return this.previousVisibleDimensions.origin.x !== this.visibleDimensions.origin.x || this.previousVisibleDimensions.origin.y !== this.visibleDimensions.origin.y;
  };

  wrect.TileMap.TileMapManager.prototype.updateTiles = function() {
    this.currentTileMap.updateTiles(this.visibleDimensions);
  };

  wrect.TileMap.TileMapManager.prototype.getCurrentTileMap = function() {
    return this.currentTileMap;
  };

  wrect.TileMap.TileMapManager.prototype.loadMap = function(path, mapper) {
    if (this.currentTileMap) {
      this.destroyCurrentTileMap();
    }
    var parser = new wrect.TileMap.Parser();
    parser.loadTilemap(path, this.loadCallback, this, mapper);
  };

  wrect.TileMap.TileMapManager.prototype.loadCallback = function(tileMap) {
    this.currentTileMap = tileMap;
    tileMap.init();
    this.visibleDimensions = this.game.getCamera().getDimensions();
    this.previousVisibleDimensions = Helpers.object.copy(this.visibleDimensions);
    tileMap.build(this.visibleDimensions);
  };

  wrect.TileMap.TileMapManager.prototype.destroyCurrentTileMap = function() {
    // DESTROY
  };
}());