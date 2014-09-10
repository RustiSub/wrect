(function() {
  "use strict";
  window.RootGui = window.BaseGuiCollection.extend({
    cellSize: 0,
    cols: 16,
    elementClass: 'rootGrid',
    rows: 9,
    /**
     * @param options
     * @param options.canvasWidth
     * @param options.canvasHeight
     */
    init: function(options) {
      this.setCss({
        width: options.canvasWidth + 'px',
        height: options.canvasHeight + 'px'
      });

      this.cellSize = options.canvasWidth / this.cols;
      this.grid = new window.Grid(this.rows, this.cols);
    },
    addElement: function(guiElement, row, col) {
      this.grid.addChild(guiElement, row, col);
      game.getGuiManager().addElement(guiElement, this.htmlElement);
    }
  });
})();
