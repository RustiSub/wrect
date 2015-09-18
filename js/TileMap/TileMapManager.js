(function() {
  'use strict';

  /** @type {Parser} */
  var Parser = require('TileMap/Parser');

  /**
   * Manages tile maps
   * @constructor
   */
  var TileMapManager = function(game) {
    this.game = game;
    this.currentTileMap = null;
    this.visibleDimensions = null;
    this.previousVisibleDimensions = null;
    this.game.getEventManager().addListener('game.updateEnd', this.update, this);
  };

  TileMapManager.prototype.update = function() {
    if (this.currentTileMap) {
      if (this.viewportChanged()) {
        this.updateTiles();
        this.previousVisibleDimensions.origin.x = this.visibleDimensions.origin.x;
        this.previousVisibleDimensions.origin.y = this.visibleDimensions.origin.y;
      }
    }
  };

  TileMapManager.prototype.viewportChanged = function() {
    //return this.previousVisibleDimensions.origin.x !== this.visibleDimensions.origin.x || this.previousVisibleDimensions.origin.y !== this.visibleDimensions.origin.y;
  };

  TileMapManager.prototype.updateTiles = function() {
    this.currentTileMap.updateTiles(this.visibleDimensions);
  };

  TileMapManager.prototype.getCurrentTileMap = function() {
    return this.currentTileMap;
  };

  TileMapManager.prototype.loadMap = function(path, mapper) {
    if (this.currentTileMap) {
      this.destroyCurrentTileMap();
    }
    var parser = new Parser(
      {
        eventManager: this.game.getEventManager(),
        entityManager: this.game.getEntityManager(),
        renderer: this.game.getRenderer()
      }
    );
    parser.loadTilemap(path, this.loadCallback, this, mapper);
  };

  TileMapManager.prototype.loadCallback = function(tileMap) {
    this.currentTileMap = tileMap;
    tileMap.init();
    this.visibleDimensions = this.game.camera.getCamera().getDimensions();
    var Helpers = require('Helpers');
    this.previousVisibleDimensions = Helpers.object.copy(this.visibleDimensions);

    tileMap.build(this.visibleDimensions, this.game.camera.getCamera().container);

    //var Ball = require('ECS/Assemblage/Ball');
    //var ball = new Ball({
    //  x: 260,
    //  y: 350,
    //  radius: 20,
    //  color: 0xF0E000
    //});
    //game.getEntityManager().addEntity(ball);
    //
    //ball.components.RigidBody.gravity = true;
    //ball.addComponent(new wrect.ECS.Component.ControlScheme.Player());
    //
    //ball.components.RigidBody.physicsBody.m = 1;
    ////ball.components.RigidBody.physicsBody.f = ball.components.RigidBody.physicsBody.f.add(new wrect.Physics.Vector(50,45));
  };

  TileMapManager.prototype.destroyCurrentTileMap = function() {
    // DESTROY
  };

  module.exports = TileMapManager;
  
}());
