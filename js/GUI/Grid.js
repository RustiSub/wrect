(function() {
  'use strict';
  window.Grid = window.Class.extend({
    rows: 1,
    cols: 1,
    status: [],
    children: [],
    init: function(rows, cols) {
      if (rows) {
        this.rows = rows;
      }
      if (cols) {
        this.cols = cols;
      }
      this.initStatus();
      this.initChildren();
    },
    initStatus: function(inputArray) {
      this.status = [];
      for (var row = 0; row < this.rows; row++) {
        this.status[row] = [];
        for (var col = 0; col < this.cols; col++) {
          if (!inputArray) {
            this.markCellAsUnused(row, col);
          }
          else {
            if (inputArray[row][col]) {
              this.markCellAsUsed(row, col);
            }
            else {
              this.markCellAsUnused(row, col);
            }
          }
        }
      }
    },
    initChildren: function(childrenArray) {
      this.children = [];
      for (var row = 0; row < this.rows; row++) {
        this.children[row] = [];
        for (var col = 0; col < this.cols; col++) {
          if (!childrenArray) {
            this.children[row][col] = null;
          }
          else {
            if (childrenArray[row][col]) {
              this.addChild(childrenArray[row][col], row, col);
            }
            else {
              this.children[row][col] = null;
            }
          }
        }
      }
    },
    markCellAsUsed: function(row, col) {
      this.status[row][col] = 1;
    },
    markCellAsUnused: function(row, col) {
      this.status[row][col] = 0;
    },
    getCell: function(row, col) {
      return this.status[row][col];
    },
    addChild: function(child, row, col) {
      this.children[row][col] = child;
    }
  });
}());
