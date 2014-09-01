(function(){
  "use strict";
  /**
   * @augments BaseGui
   * @type {void|*}
   */
  window.Panel = window.BaseGui.extend({
    STATE_CLOSED: 0,
    STATE_OPEN: 1,
    state: 0,
    height: 0,
    width: 0,
    /**
     * @param backgroundColor
     * @param width
     * @param height
     * @param positionCss
     * @param [id]
     */
    init: function(backgroundColor, width, height, defaultState, positionCss, id) {
      var element = document.createElement('div');
      this._super(element);
      if (defaultState === this.STATE_OPEN) {
        this.openPanel();
      }
      if (id) {
        element.id = id;
      }
      this.width = width;
      this.height = height;
      var cssProps = {
        background: 'url(' + imagePath + ')',
        display: 'block',
        height: height + 'px',
        position: 'absolute',
        width: width + 'px',
        "background-color": backgroundColor
      };

      cssProps = window.game.getHelpers().merge(cssProps, positionCss);
      this.setCss(cssProps);
    },

    openPanel: function() {
      this.setCss({width: this.width});
    },

    closePanel: function() {
      this.setCss({width: 0});
    }
  });
})();
