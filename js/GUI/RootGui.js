(function() {
  "use strict";
  window.RootGui = BaseGuiElement.extend({
    cols: 16,
    rows: 9,
    grid: null,
    cellSize: 0,
    elementPadding: 8,
    init: function(canvasWidth, canvasHeight, options) {
      var element = document.createElement('div');
      element.className = 'rootGrid';
      this.children = [];
      this._super({element: element, rows: this.rows, cols: this.cols});
      this.setCss({
        width: canvasWidth + 'px',
        height: canvasHeight + 'px'
      });
      if (options) {
        if (options.baseGridSize) {
          this.baseGridSize = options.baseGridSize;
        }
        if (options.elementPadding) {
          this.elementPadding = options.elementPadding;
        }
      }
      this.cellSize = canvasWidth / this.cols;
      this.grid = new window.Grid(this.rows, this.cols);
    },
    addElement: function(guiElement, row, col) {
      this.grid.addChild(guiElement, row, col);
      game.getGuiManager().addElement(guiElement, this.htmlElement);
    }
  });
})();
