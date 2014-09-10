(function(){
    "use strict";
    /**
     * @augments Class
     * @type {void|*}
     */
    window.BaseGuiElement = window.Class.extend({
        htmlElement: null,
        inDom: false,
        cols: 1,
        rows: 1,
        position: [],

       /**
        * @param {Object} options
        * @param {HTMLElement} options.element
        * @param {Array} options.position
        */
        init: function(options){
            this.position = options.position ? options.position : [0, 0];
            this.cols = options.cols;
            this.rows = options.rows;
            if (options.element) {
                this.setHtmlElement(options.element);
            }
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
            className += this.position[0];
            className += ' row-pos-';
            className += this.position[1];
            this.htmlElement.className += className;
        },
        setCss: function(cssProperties) {
            if (this.htmlElement) {
                for (var x in cssProperties) {
                    console.log(x, this.htmlElement.style[x]);
                    this.htmlElement.style[x] = cssProperties[x];
                }
            }
        },
        addEvent: function(eventName, callback) {
            if (this.htmlElement) {
                this.htmlElement.addEventListener(eventName, callback);
            }
        },
        removeEvent: function(eventName, callback) {
            if (this.htmlElement) {
                if (callback) {
                    this.htmlElement.removeEventListener(eventName, callback);
                }
                else {
                    this.htmlElement.removeEventListener(eventName);
                }
            }
        },
        triggerEvent: function(eventName, data) {
            if (this.htmlElement) {
                var event;
                if (data) {
                    event = new CustomEvent(eventName, data);
                }
                else {
                    event = new Event(eventName);
                }
                this.htmlElement.dispatchEvent(event);
            }
        },
        toDomCallback: function() {
        }
    });
})();
