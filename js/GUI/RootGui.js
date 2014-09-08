(function() {
  "use strict";
  window.RootGui = BaseGuiElement.extend({
    cols: 0,
    rows: 0,
    grid: null,
    baseGridSize: 64,
    elementPadding: 8,
    init: function(canvasWidth, canvasHeight, options) {
      var element = document.createElement('div');
      element.className = 'rootGrid';
      this.children = [];
      this._super({element: element});
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
      this.cols = Math.floor(canvasWidth / this.baseGridSize);
      this.rows = Math.floor(canvasHeight / this.baseGridSize);
      this.colMargin = canvasWidth % this.baseGridSize;
      this.rowMargin = canvasHeight % this.baseGridSize;
      console.log(this.colMargin);
      console.log(this.rowMargin);
      this.grid = new window.Grid(this.rows, this.cols);
    },
    addElement: function(guiElement, row, col) {
      this.grid.addChild(guiElement, row, col);
    }
  });
})();
