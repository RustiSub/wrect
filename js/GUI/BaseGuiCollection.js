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
            this.grid = new window.Grid(this.rows, this.cols);
            this._super({element: element, rows: this.rows, cols: this.cols, position: options.position});
        },
        addElement: function(guiElement) {
            this.grid.addChild(guiElement, guiElement.position.y, guiElement.position.x);
            game.getGuiManager().addElement(guiElement, this.htmlElement);
        }
    });
}());
