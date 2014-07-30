(function(){
    "use strict";
    window.BaseGui = window.Class.extend({
        htmlElement: null,
        init: function(selector){
            if (selector) {
                this.setHtmlElementBySelector(selector);
            }
        },
        setHtmlElementBySelector: function(selector) {
            this.htmlElement = document.querySelector(selector);
        },
        setHtmlElement: function(htmlElement) {
            this.htmlElement = htmlElement;
        },
        setCss: function(cssProperties) {
            if (this.htmlElement) {
                for (var x in cssProperties) {
                    this.htmlElement.style[x] = cssProperties[x];
                }
            }
        },
        addEvent: function(eventName, callback) {
            if (this.htmlElement) {
                this.htmlElement.addEventListener(eventName, callback);
            }
        }
    });
})();