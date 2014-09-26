(function(){
    "use strict";
    /**
     * @augments Class
     * @type {void|*}
     */
    window.BaseGuiCollection = window.BaseGuiElement.extend({
        cellSize: 0,
        elementClass: 'baseCollection',
        init: function(options) {
            var element = document.createElement(this.htmlTag);
            element.className = this.elementClass;
            this.children = [];
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
            guiElement.parent = this;
            game.getGuiManager().addElement(guiElement, this.htmlElement);
        }
    });
}());
