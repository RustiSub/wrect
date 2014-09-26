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
        position: null,
        alignment: null,
        imgPath: '',
        parent: null,
        htmlWrapper: null,
        htmlTag: 'div',
        name: '',
        getDefaultOptions: function() {
            return {
                alignment: {
                    x: 'center',
                    y: 'center'
                },
                position: {
                    x: 0,
                    y: 0
                },
                cols: 1,
                rows: 1
            };
        },

        /**
         * @param {Object} options
         * @param {HTMLElement} options.element
         * @param {Array} options.position
         */
        init: function(options){
            if (!options.name) {
                console.error('A name is required for a GUI element!');
                return null;
            }
            this.name = options.name;
            options = Container.getGame().getHelpers().merge(this.getDefaultOptions(), options);
            this.position = options.position;
            this.cols = options.cols;
            this.rows = options.rows;
            this.alignment = options.alignment;
            if (!options.element) {
                options.element = document.createElement(this.htmlTag);
            }
            this.setImage(options.imgPath);
            this.setHtmlElement(options.element);
            if (options.css) {
                this.setCss(options.css);
            }
        },
        setHtmlElement: function(htmlElement) {
            var className = '';
            this.htmlWrapper = this.createHtmlWrapper();
            this.htmlElement = htmlElement;
            if (this.htmlWrapper) {
                if (this.htmlWrapper.className.length) {
                    className = ' ';
                }
                this.htmlWrapper.appendChild(htmlElement);
                className += 'gui wrapper';
                className += ' col-';
                className += this.cols;
                className += ' row-';
                className += this.rows;
                className += ' col-pos-';
                className += this.position.x;
                className += ' row-pos-';
                className += this.position.y;
                this.htmlWrapper.className += className;
                className = '';
            }
            if (this.htmlElement.className.length) {
                className = ' ';
            }
            className += 'gui element';
            this.htmlElement.className += className;
        },
        setImage: function(path) {
            this.imgPath = path;
            this.setCss({
                backgroundImage: 'url("' + path + '")'
            });
        },
        createHtmlWrapper: function() {
            return document.createElement('div');
        },
        setCss: function(cssProperties, wrapper) {
            var x;
            if (wrapper) {
                if (this.htmlWrapper) {
                    for (x in cssProperties) {
                        this.htmlWrapper.style[x] = cssProperties[x];
                    }
                }
            }
            else {
                if (this.htmlElement) {
                    for (x in cssProperties) {
                        this.htmlElement.style[x] = cssProperties[x];
                    }
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
        },
        getValue: function() {
            return null;
        }
    });
})();