(function(){
    "use strict";
    window.GuiManager = window.Class.extend({
        elements: [],
        elementsByName: {},
        guiRoot: null,
        guiState: 0,
        STATE_READY: 0,
        STATE_TRANSITIONING_IN: 1,
        STATE_TRANSITIONING_OUT: 2,
        init: function(){
            this.createRootGui();
            this.initGlobalEvents();
            this.elementsByName = {};
            this.elements = [];
        },
        createRootGui: function() {
            this.guiRoot = new window.RootGui({
                name: 'root',
                canvasWidth: window.innerWidth,
                canvasHeight: window.innerHeight
            });
            this.addElement(this.guiRoot);
        },
        getRoot: function() {
            return this.guiRoot;
        },
        addElement: function(guiElement, container) {
            if (guiElement instanceof window.BaseGuiElement) {
                this.elements.push(guiElement);
                this.elementsByName[guiElement.name] = guiElement;
                if (container === undefined) {
                    if (this.guiRoot.inDom) {
                        container = this.guiRoot.htmlElement;
                    }
                    else {
                        container = window.Container.getComponent('Renderer').view.parentNode;
                    }
                }
                if (guiElement.htmlWrapper) {
                    container.appendChild(guiElement.htmlWrapper);
                }
                else {
                    container.appendChild(guiElement.htmlElement);
                }
                guiElement.inDom = true;
                guiElement.toDomCallback();
            }
        },
        getElement: function(name) {
            return this.elementsByName[name];
        },
        createElement: function(type, options) {
            if (typeof window[type] === 'function' && options.name) {
                return new window[type](options);
            }
            console.error(type + ' ain\'t no element I\'ve ever heard of! Or did you forget to give this element a name?');
            return null;
        },
        // FRAGILE, do not touch
        initGlobalEvents: function() {
            var domHelpers = window.Helpers.dom;
            var rootGui = this.getRoot().htmlElement;
            var self = this;

            function fadeOutGui () {
              domHelpers.addClass(rootGui, 'fade-out');
                self.guiState = self.STATE_TRANSITIONING_OUT;
            }

            function fadeInGui () {
                if (domHelpers.hasClass(rootGui, 'fade-out')) {
                  domHelpers.removeClass(rootGui, 'fade-out');
                    if (self.guiState === self.STATE_READY) {
                        self.guiState = self.STATE_TRANSITIONING_IN;
                    }
                    else {
                        self.guiState = self.STATE_READY;
                    }
                }
            }

            rootGui.addEventListener('transitionend', function updateState(e) {
                if (self.guiState !== self.STATE_READY) {
                    self.guiState = self.STATE_READY;
                }
            });

            document.addEventListener('mouseover', function(e) {
                if (e.target !== document) {
                    if (!domHelpers.hasClass(e.target, 'rootGrid') && domHelpers.hasClass(e.target, 'collection')) {
                        if (self.guiState === self.STATE_TRANSITIONING_OUT || self.guiState === self.STATE_READY) {
                            fadeInGui();
                        }
                    }
                }
            });

            document.addEventListener('mouseout', function(e) {
                if (e.target !== document) {
                    if (!domHelpers.hasClass(e.target, 'rootGrid') && domHelpers.hasClass(e.target, 'collection')) {
                        if (self.guiState !== self.STATE_TRANSITIONING_IN) {
                            fadeOutGui();
                        }
                        else {
                            rootGui.addEventListener('transitionend', function fadeOut() {
                                fadeOutGui();
                                rootGui.removeEventListener('transitionend', fadeOut);
                            });
                        }
                    }
                }
            });
        },
        // Untested
        reset: function() {
            for (var i = this.elements.length; i; i--) {
                var el = this.elements[i];
                if (el.inDom) {
                    if (el.htmlWrapper) {
                        el.htmlWrapper.removeChild(el.htmlElement);
                        el.htmlWrapper.parentNode.removeChild(el.htmlWrapper);
                    }
                    else if (el.htmlElement){
                        el.htmlElement.parentNode.removeChild(el.htmlElement);
                    }
                }
            }
            this.elements = [];
            this.init();
        }
    });
})();
