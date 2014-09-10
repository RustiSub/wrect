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
      this._super({position: { x:0, y: 0 }});
      this.setCss({
        width: options.canvasWidth + 'px',
        height: options.canvasHeight + 'px'
      });

      this.cellSize = options.canvasWidth / this.cols;
        console.log(this.cellSize);
    }
  });
}());
