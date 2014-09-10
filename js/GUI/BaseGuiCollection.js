(function(){
  "use strict";
  /**
   * @augments Class
   * @type {void|*}
   */
  window.BaseGuiCollection = window.BaseGuiElement.extend({
    elementClass: 'baseCollection',
    grid: null,
    init: function(options) {
      var element = document.createElement('div');
      element.className = this.elementClass;
      this.children = [];
      this._super({element: element, rows: this.rows, cols: this.cols, position: options.position});
    }
  });
});
