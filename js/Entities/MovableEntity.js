(function() {
  "use strict";

  wrect.Entities = wrect.Entities || {};

  var Vector = wrect.Physics.Vector;

  /**
   * @augments BaseEntity
   * @type {void|*}
   */
  wrect.Entities.MovableEntity = wrect.Entities.BaseEntity.extend({
      selected: false,
      graphicsCallbacks: {},
      baseGraphicsCallback: {},
      originalBaseGraphicsCallback: {},
      selectedGraphicsCallback : {},
      deselectGraphicsCallback: {},
      gluedGraphicsCallback: {},
      unGluedGraphicsCallback: {},
      position: {},
      stats: {},
      frozen: true,
      collisions: [],

      /**
       * @param {String} name
       * @param {PIXI.Sprite, PIXI.Graphics, String} graphics
       * @param {Object} options
       * @param {Object} options.position
       * @param {Number} options.position.x
       * @param {Number} options.position.y
       */
      init: function(name, graphics, options) {
        this._super(name, graphics);
        this.position = this._graphics.position;
        if (options && options.position) {
          this.position.x = options.position.x;
          this.position.y = options.position.y;
        }
      },

      getDefaultStats: function() {
        return {
          health: 10,
          speed: 1
        };
      },
      deselect: function() {
        this.selected = false;
        this.baseGraphicsCallback();
      },
      select: function() {
        this.selected = true;
        this.baseGraphicsCallback();
      },
      applyGlue: function() {
        if (!this.hasGlue) {
          this.hasGlue = true;
          this.baseGraphicsCallback();
        }
      },
      removeGlue: function() {
        if (this.hasGlue) {
          this.hasGlue = false;
          this.baseGraphicsCallback();
        }
      },
      toggleSelect: function()  {
        if (this.selected) {
          this.deselect();
        } else {
          this.select();
        }
      },
      update: function() {
        this._super();

        if (this.component) {
          this.component.apply(game.timeDelta);

          this._graphics.position = this.component.dimensions.origin;
        }
      }
  });
}());
