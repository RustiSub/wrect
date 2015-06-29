(function() {
  "use strict";

  wrect.Bundles = wrect.Bundles || {};

  /**
   * @constructor
   */
  wrect.Bundles.Politica = function (options) {
    this.game = options.game;

    this.playerCount = options.playerCount || 2;
    console.log('Politica loaded...');
  };

  wrect.Bundles.Politica.prototype.init = function() {
    this.setupPlayers();
    this.setupBoard();
    this.setupDecks();
  };

  /**
   * @returns {wrect.ECS.Assemblage.Politica.Player}[]
   */
  wrect.Bundles.Politica.prototype.setupPlayers = function() {
  };

  /**
   * @returns {wrect.ECS.Assemblage.Politica.Board}
   */
  wrect.Bundles.Politica.prototype.setupBoard = function() {
  };

  /**
   * @returns {wrect.ECS.Assemblage.Politica.Deck}[]
   */
  wrect.Bundles.Politica.prototype.setupDecks = function() {
  };
}());
