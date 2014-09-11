(function(){
    "use strict";
    /**
     * @augments Class
     * @type {void|*}
     */
    window.BaseGuiCollection = window.BaseGuiElement.extend({
        cellSize: 0,
        elementClass: 'baseCollection',
        grid: null,
        init: function(options) {
            var element = document.createElement('div');
            element.className = this.elementClass;
            this.children = [];
            this.grid = new window.Grid(this.rows, this.cols);
            options.element = element;
            this._super(options);
            this.htmlElement.className += ' collection';
        },
        setHtmlElement: function(htmlElement) {
            this.htmlElement = htmlElement;
            var className = '';
            if (this.htmlElement.className.length) {
                className = ' ';
            }
            className += 'gui';
            className += ' col-';
            className += this.cols;
            className += ' row-';
            className += this.rows;
            className += ' col-pos-';
            className += this.position.x;
            className += ' row-pos-';
            className += this.position.y;
            this.htmlElement.className += className;
        },
        addElement: function(guiElement) {
            this.grid.addChild(guiElement, guiElement.position.y, guiElement.position.x);
            this.alterChildStyle(guiElement);
            guiElement.parent = this;
            game.getGuiManager().addElement(guiElement, this.htmlElement);
        },
        alterChildStyle: function(guiElement) {
            var sizeCss = {
                width: Math.round(this.cellSize * guiElement.cols) + 'px',
                height: Math.round(this.cellSize * guiElement.rows) + 'px'
            };
            debugger;
            console.log(this.cellSize, guiElement.cols);
            guiElement.setCss(sizeCss);
        },
        calculateCellSize: function() {
            return this.getWidth / this.cols;
        },
        toDomCallback: function() {
            this.cellSize = this.calculateCellSize();
        }
    });
}());
