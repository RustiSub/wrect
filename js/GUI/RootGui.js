(function() {
  "use strict";
  window.RootGui = BaseGuiElement.extend({
    cols: 0,
    rows: 0,
    baseGridSize: 64,
    gridElementPadding: 8,
    gridStatus: [],
    init: function(canvasWidth, canvasHeight) {
      var element = document.createElement('div');
      element.className = 'rootGrid';
      this._super({element: element});
      this.setCss({
        width: canvasWidth,
        height: canvasHeight
      });
      this.cols = Math.floor(canvasWidth / (this.baseGridSize + (this.gridElementPadding * 2)));
      this.rows = Math.floor(canvasHeight / (this.baseGridSize + (this.gridElementPadding * 2)));
      for (var i = this.rows; i; i--) {
        for (var j = this.cols; j; j--) {
          this.gridStatus[i-1][j-1] = 0;
        }
      }
      console.log(this.gridStatus);
    }
  });
})();
