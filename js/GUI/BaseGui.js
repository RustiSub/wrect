(function(){
    "use strict";
    /**
     * @augments Class
     * @type {void|*}
     */
    window.BaseGui = window.Class.extend({
        htmlElement: null,
        inDom: false,
        init: function(element){
            if (element) {
                this.setHtmlElement(element);
            }
        },

        setHtmlElement: function(htmlElement) {
            this.htmlElement = htmlElement;
            var className;
            if (this.htmlElement.className.length) {
                className = ' gui';
            }
            else {
                className = 'gui';
            }
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