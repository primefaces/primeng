/*
 * PrimeUI 3.0.1-SNAPSHOT
 * 
 * Copyright 2009-2015 PrimeTek.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * PUI Object 
 */
var PUI = {
    
    zindex : 1000,
    
    gridColumns: {
        '1': 'pui-grid-col-12',
        '2': 'pui-grid-col-6',
        '3': 'pui-grid-col-4',
        '4': 'pui-grid-col-3',
        '6': 'pui-grid-col-2',
        '12': 'pui-grid-col-11'
    },
        
    /**
     *  Aligns container scrollbar to keep item in container viewport, algorithm copied from jquery-ui menu widget
     */
    scrollInView: function(container, item) {        
        var borderTop = parseFloat(container.css('borderTopWidth')) || 0,
        paddingTop = parseFloat(container.css('paddingTop')) || 0,
        offset = item.offset().top - container.offset().top - borderTop - paddingTop,
        scroll = container.scrollTop(),
        elementHeight = container.height(),
        itemHeight = item.outerHeight(true);

        if(offset < 0) {
            container.scrollTop(scroll + offset);
        }
        else if((offset + itemHeight) > elementHeight) {
            container.scrollTop(scroll + offset - elementHeight + itemHeight);
        }
    },
    
    isIE: function(version) {
        return (this.browser.msie && parseInt(this.browser.version, 10) === version);
    },
    
    escapeRegExp: function(text) {
        return text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    },

    escapeHTML: function(value) {
        return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    },
    
    escapeClientId: function(id) {
        return "#" + id.replace(/:/g,"\\:");
    },
    
    clearSelection: function() {
        if(window.getSelection) {
            if(window.getSelection().empty) {
                window.getSelection().empty();
            } else if(window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        } else if(document.selection && document.selection.empty) {
                document.selection.empty();
        }
    },
            
    inArray: function(arr, item) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] === item) {
                return true;
            }
        }

        return false;
    },
    
    calculateScrollbarWidth: function() {
        if(!this.scrollbarWidth) {
            if(this.browser.msie) {
                var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
                        .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body'),
                    $textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
                        .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body');
                this.scrollbarWidth = $textarea1.width() - $textarea2.width();
                $textarea1.add($textarea2).remove();
            }
            else {
                var $div = $('<div />')
                    .css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
                    .prependTo('body').append('<div />').find('div')
                        .css({ width: '100%', height: 200 });
                this.scrollbarWidth = 100 - $div.width();
                $div.parent().remove();
            }
        }

        return this.scrollbarWidth;
    },
    
    //adapted from jquery browser plugin
    resolveUserAgent: function() {
        var matched, browser;

        jQuery.uaMatch = function( ua ) {
          ua = ua.toLowerCase();

          var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
              /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
              /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
              /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
              /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
              /(msie) ([\w.]+)/.exec( ua ) ||
              ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
              ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
              [];

          var platform_match = /(ipad)/.exec( ua ) ||
              /(iphone)/.exec( ua ) ||
              /(android)/.exec( ua ) ||
              /(windows phone)/.exec( ua ) ||
              /(win)/.exec( ua ) ||
              /(mac)/.exec( ua ) ||
              /(linux)/.exec( ua ) ||
              /(cros)/i.exec( ua ) ||
              [];

          return {
              browser: match[ 3 ] || match[ 1 ] || "",
              version: match[ 2 ] || "0",
              platform: platform_match[ 0 ] || ""
          };
        };

        matched = jQuery.uaMatch( window.navigator.userAgent );
        browser = {};

        if ( matched.browser ) {
          browser[ matched.browser ] = true;
          browser.version = matched.version;
          browser.versionNumber = parseInt(matched.version);
        }

        if ( matched.platform ) {
          browser[ matched.platform ] = true;
        }

        // These are all considered mobile platforms, meaning they run a mobile browser
        if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
          browser.mobile = true;
        }

        // These are all considered desktop platforms, meaning they run a desktop browser
        if ( browser.cros || browser.mac || browser.linux || browser.win ) {
          browser.desktop = true;
        }

        // Chrome, Opera 15+ and Safari are webkit based browsers
        if ( browser.chrome || browser.opr || browser.safari ) {
          browser.webkit = true;
        }

        // IE11 has a new token so we will assign it msie to avoid breaking changes
        if ( browser.rv )
        {
          var ie = "msie";

          matched.browser = ie;
          browser[ie] = true;
        }

        // Opera 15+ are identified as opr
        if ( browser.opr )
        {
          var opera = "opera";

          matched.browser = opera;
          browser[opera] = true;
        }

        // Stock Android browsers are marked as Safari on Android.
        if ( browser.safari && browser.android )
        {
          var android = "android";

          matched.browser = android;
          browser[android] = true;
        }

        // Assign the name and platform variable
        browser.name = matched.browser;
        browser.platform = matched.platform;

        this.browser = browser;
        $.browser = browser;
    },
    
    getGridColumn: function(number) {
        return this.gridColumns[number + ''];
    },
    
    executeFunctionByName: function(functionName /*, args */) {
        var args = [].slice.call(arguments).splice(1),
        context = window,
        namespaces = functionName.split("."),
        func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
        }
        return context[func].apply(this, args);
    },
    
    resolveObjectByName: function(name) {
        if(name) {
            var parts = name.split(".");
            for(var i = 0, len = parts.length, obj = window; i < len; ++i) {
                obj = obj[parts[i]];
            }
            return obj;
        }
        else {
            return null;
        }
    }
};

PUI.resolveUserAgent();/**
 * PrimeUI Accordion widget
 */
(function() {

    $.widget("primeui.puiaccordion", {
       
        options: {
             activeIndex: 0,
             multiple: false
        },
        
        _create: function() {
            if(this.options.multiple) {
                this.options.activeIndex = this.options.activeIndex||[0];
            }
        
            var $this = this;
            this.element.addClass('pui-accordion ui-widget ui-helper-reset');

            var tabContainers = this.element.children();

            //primeui
            if(tabContainers.is('div')) {
                this.panelMode = 'native';
                this.headers = this.element.children('h3');
                this.panels = this.element.children('div');
            }
            //primeng
            else {
                this.panelMode = 'wrapped';
                this.headers = tabContainers.children('h3');
                this.panels = tabContainers.children('div');
            }
            
            this.headers.addClass('pui-accordion-header ui-helper-reset ui-state-default').each(function(i) {
                var header = $(this),
                title = header.html(),
                active = $this.options.multiple ? ($.inArray(i, $this.options.activeIndex) !== -1) : (i == $this.options.activeIndex);
                headerClass = (active) ? 'ui-state-active ui-corner-top' : 'ui-corner-all',
                iconClass = (active) ? 'pui-icon fa fa-fw fa-caret-down' : 'pui-icon fa fa-fw fa-caret-right';

                header.addClass(headerClass).html('<span class="' + iconClass + '"></span><a href="#">' + title + '</a>');
            });
            
            this.panels.each(function(i) {
                var content = $(this);
                content.addClass('pui-accordion-content ui-helper-reset ui-widget-content'),
                active = $this.options.multiple ? ($.inArray(i, $this.options.activeIndex) !== -1) : (i == $this.options.activeIndex);
                
                if(!active) {
                    content.addClass('ui-helper-hidden');
                }
            });
            
            this.headers.children('a').disableSelection();
            
            this._bindEvents();
        },
        
        _bindEvents: function() {
            var $this = this;

            this.headers.mouseover(function() {
                var element = $(this);
                if(!element.hasClass('ui-state-active')&&!element.hasClass('ui-state-disabled')) {
                    element.addClass('ui-state-hover');
                }
            }).mouseout(function() {
                var element = $(this);
                if(!element.hasClass('ui-state-active')&&!element.hasClass('ui-state-disabled')) {
                    element.removeClass('ui-state-hover');
                }
            }).click(function(e) {
                var element = $(this);
                if(!element.hasClass('ui-state-disabled')) {
                    var tabIndex = ($this.panelMode === 'native') ? element.index() / 2 : element.parent().index();

                    if(element.hasClass('ui-state-active')) {
                        $this.unselect(tabIndex);
                    }
                    else {
                        $this.select(tabIndex, false);
                    }
                }

                e.preventDefault();
            });
        },

        /**
         *  Activates a tab with given index
         */
        select: function(index, silent) {
            var panel = this.panels.eq(index);

            if(!silent) {
                this._trigger('change', null, {'index': index});
            }
            
            //update state
            if(this.options.multiple) {
                this._addToSelection(index);
            }
            else {
                this.options.activeIndex = index;
            }
            this._show(panel);
        },

        /**
         *  Deactivates a tab with given index
         */
        unselect: function(index) {
            var panel = this.panels.eq(index),
            header = panel.prev();

            header.attr('aria-expanded', false).children('.pui-icon').removeClass('fa-caret-down').addClass('fa-caret-right');
            header.removeClass('ui-state-active ui-corner-top').addClass('ui-corner-all');
            panel.attr('aria-hidden', true).slideUp();

            this._removeFromSelection(index);
        },

        _show: function(panel) {
            //deactivate current
            if(!this.options.multiple) {
                var oldHeader = this.headers.filter('.ui-state-active');
                oldHeader.children('.pui-icon').removeClass('fa-caret-down').addClass('fa-caret-right');
                oldHeader.attr('aria-expanded', false).removeClass('ui-state-active ui-corner-top').addClass('ui-corner-all').next().attr('aria-hidden', true).slideUp();
            }

            //activate selected
            var newHeader = panel.prev();
            newHeader.attr('aria-expanded', true).addClass('ui-state-active ui-corner-top').removeClass('ui-state-hover ui-corner-all')
                    .children('.pui-icon').removeClass('fa-caret-right').addClass('fa-caret-down');

            panel.attr('aria-hidden', false).slideDown('normal');
        },

        _addToSelection: function(nodeId) {
            this.options.activeIndex.push(nodeId);
        },

        _removeFromSelection: function(index) {
            this.options.activeIndex = $.grep(this.options.activeIndex, function(r) {
                return r != index;
            });
        },

        _setOption: function(key, value) {
            if(key === 'activeIndex') {
                this.select(value, true);
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }
        
    });
})();
/**
 * PrimeUI autocomplete widget
 */
(function() {

    $.widget("primeui.puiautocomplete", {
       
        options: {
            delay: 300,
            minQueryLength: 1,
            multiple: false,
            dropdown: false,
            scrollHeight: 200,
            forceSelection: false,
            effect:null,
            effectOptions: {},
            effectSpeed: 'normal',
            content: null,
            caseSensitive: false
        },

        _create: function() {
            this.element.wrap('<span class="pui-autocomplete ui-widget" />');
            this.element.puiinputtext();
            this.panel = $('<div class="pui-autocomplete-panel ui-widget-content ui-corner-all ui-helper-hidden pui-shadow"></div>').appendTo('body');
            
            if(this.options.multiple) {
                this.element.wrap('<ul class="pui-autocomplete-multiple ui-widget pui-inputtext ui-state-default ui-corner-all">' + 
                                        '<li class="pui-autocomplete-input-token"></li></ul>');
                this.inputContainer = this.element.parent();
                this.multiContainer = this.inputContainer.parent();
            }
            else {
                if(this.options.dropdown) {
                    this.dropdown = $('<button type="button" class="pui-autocomplete-dropdown pui-button ui-widget ui-state-default ui-corner-right pui-button-icon-only">' +
                        '<span class="pui-icon fa fa-fw fa-caret-down"></span><span class="pui-button-text">&nbsp;</span></button>')
                        .insertAfter(this.element);
                    this.element.removeClass('ui-corner-all').addClass('ui-corner-left');
                }
            }

            this._bindEvents();
        },
                
        _bindEvents: function() {
            var $this = this;
 
            this._bindKeyEvents();
            
            if(this.options.dropdown) {
                this.dropdown.on('mouseenter.puiautocomplete', function() {
                    if(!$this.element.prop('disabled')) {
                        $this.dropdown.addClass('ui-state-hover');
                    }
                })
                .on('mouseleave.puiautocomplete', function() {
                    $this.dropdown.removeClass('ui-state-hover');
                })
                .on('mousedown.puiautocomplete', function() {
                    if(!$this.element.prop('disabled')) {
                        $this.dropdown.addClass('ui-state-active');
                    }
                })
                .on('mouseup.puiautocomplete', function() {
                    if(!$this.element.prop('disabled')) {
                        $this.dropdown.removeClass('ui-state-active');
                        $this.search('');
                        $this.element.focus();
                    }
                })
                .on('focus.puiautocomplete', function() {
                    $this.dropdown.addClass('ui-state-focus');
                })
                .on('blur.puiautocomplete', function() {
                    $this.dropdown.removeClass('ui-state-focus');
                })
                .on('keydown.puiautocomplete', function(e) {
                    var keyCode = $.ui.keyCode;

                    if(e.which == keyCode.ENTER || e.which == keyCode.NUMPAD_ENTER) {
                        $this.search('');
                        $this.input.focus();

                        e.preventDefault();
                    }
                });
            }
            
            if(this.options.multiple) {
                this.multiContainer.on('hover.puiautocomplete', function() {
                    $(this).toggleClass('ui-state-hover');
                })
                .on('click.puiautocomplete', function() {
                    $this.element.trigger('focus');
                });

                this.element.on('focus.pui-autocomplete', function() {
                    $this.multiContainer.addClass('ui-state-focus');
                })
                .on('blur.pui-autocomplete', function(e) {
                    $this.multiContainer.removeClass('ui-state-focus');
                });
            }
            
            if(this.options.forceSelection) {
                this.currentItems = [this.element.val()];

                this.element.on('blur.puiautocomplete', function() {
                    var value = $(this).val(),
                    valid = false;
                    
                    for(var i = 0; i < $this.currentItems.length; i++) {
                        if($this.currentItems[i] === value) {
                            valid = true;
                            break;
                        }
                    }

                    if(!valid) {
                        $this.element.val('');
                    }
                });
            }

            $(document.body).bind('mousedown.puiautocomplete', function (e) {
                if($this.panel.is(":hidden")) {
                    return;
                }
                
                if(e.target === $this.element.get(0)) {
                    return;
                }
                
                var offset = $this.panel.offset();
                if (e.pageX < offset.left ||
                    e.pageX > offset.left + $this.panel.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + $this.panel.height()) {
                    $this.hide();
                }
            });

            $(window).bind('resize.' + this.element.id, function() {
                if($this.panel.is(':visible')) {
                    $this._alignPanel();
                }
            });
        },
        
        _bindKeyEvents: function() {
            var $this = this;

            this.element.on('keyup.puiautocomplete', function(e) {
                var keyCode = $.ui.keyCode,
                key = e.which,
                shouldSearch = true;

                if(key == keyCode.UP ||
                    key == keyCode.LEFT ||
                    key == keyCode.DOWN ||
                    key == keyCode.RIGHT ||
                    key == keyCode.TAB ||
                    key == keyCode.SHIFT ||
                    key == keyCode.ENTER ||
                    key == keyCode.NUMPAD_ENTER) {
                    shouldSearch = false;
                } 

                if(shouldSearch) {
                    var value = $this.element.val();

                    if(!value.length) {
                        $this.hide();
                    }

                    if(value.length >= $this.options.minQueryLength) {
                        if($this.timeout) {
                            window.clearTimeout($this.timeout);
                        }

                        $this.timeout = window.setTimeout(function() {
                            $this.search(value);
                        }, 
                        $this.options.delay);
                    }
                }

            }).on('keydown.puiautocomplete', function(e) {
                if($this.panel.is(':visible')) {
                    var keyCode = $.ui.keyCode,
                    highlightedItem = $this.items.filter('.ui-state-highlight');

                    switch(e.which) {
                        case keyCode.UP:
                        case keyCode.LEFT:
                            var prev = highlightedItem.prev();

                            if(prev.length == 1) {
                                highlightedItem.removeClass('ui-state-highlight');
                                prev.addClass('ui-state-highlight');

                                if($this.options.scrollHeight) {
                                    PUI.scrollInView($this.panel, prev);
                                }
                            }

                            e.preventDefault();
                            break;

                        case keyCode.DOWN:
                        case keyCode.RIGHT:
                            var next = highlightedItem.next();

                            if(next.length == 1) {
                                highlightedItem.removeClass('ui-state-highlight');
                                next.addClass('ui-state-highlight');

                                if($this.options.scrollHeight) {
                                    PUI.scrollInView($this.panel, next);
                                }
                            }

                            e.preventDefault();
                            break;

                        case keyCode.ENTER:
                        case keyCode.NUMPAD_ENTER:
                            highlightedItem.trigger('click');

                            e.preventDefault();
                            break;

                        case keyCode.ALT: 
                        case 224:
                            break;

                        case keyCode.TAB:
                            highlightedItem.trigger('click');
                            $this.hide();
                            break;
                    }
                }

            });
        },

        _bindDynamicEvents: function() {
            var $this = this;

            this.items.on('mouseover.puiautocomplete', function() {
                var item = $(this);

                if(!item.hasClass('ui-state-highlight')) {
                    $this.items.filter('.ui-state-highlight').removeClass('ui-state-highlight');
                    item.addClass('ui-state-highlight');
                }
            })
            .on('click.puiautocomplete', function(event) {
                var item = $(this);
                
                if($this.options.multiple) {
                    var tokenMarkup = '<li class="pui-autocomplete-token ui-state-active ui-corner-all ui-helper-hidden">';
                    tokenMarkup += '<span class="pui-autocomplete-token-icon fa fa-fw fa-close" />';
                    tokenMarkup += '<span class="pui-autocomplete-token-label">' + item.data('label') + '</span></li>';

                    $(tokenMarkup).data(item.data())
                        .insertBefore($this.inputContainer).fadeIn()
                        .children('.pui-autocomplete-token-icon').on('click.pui-autocomplete', function(e) {
                            var token = $(this).parent();
                            $this._removeItem(token);
                            $this._trigger('unselect', e, token);
                    });
                    
                    $this.element.val('').trigger('focus');
                }
                else {
                    $this.element.val(item.data('label')).focus();
                }

                $this._trigger('select', event, item);
                $this.hide();
            });
        },
        
        search: function(q) {            
            this.query = this.options.caseSensitive ? q : q.toLowerCase();

            var request = {
                query: this.query
            };

            if(this.options.completeSource) {
                if($.isArray(this.options.completeSource)) {
                    var sourceArr = this.options.completeSource,
                    data = [],
                    emptyQuery = ($.trim(q) === '');
                    
                    for(var i = 0 ; i < sourceArr.length; i++) {
                        var item = sourceArr[i],
                        itemLabel = item.label||item;
                        
                        if(!this.options.caseSensitive) {
                            itemLabel = itemLabel.toLowerCase();
                        }

                        if(emptyQuery||itemLabel.indexOf(this.query) === 0) {
                            data.push({label:sourceArr[i], value: item});
                        }
                    }

                    this._handleData(data);
                }
                else {
                    this.options.completeSource.call(this, request, this._handleData);
                }
            }
        },

        _handleData: function(data) {
            var $this = this;
            this.panel.html('');
            this.listContainer = $('<ul class="pui-autocomplete-items pui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul>').appendTo(this.panel);

            for(var i = 0; i < data.length; i++) {
                var item = $('<li class="pui-autocomplete-item pui-autocomplete-list-item ui-corner-all"></li>');
                item.data(data[i]);
                
                if(this.options.content)
                    item.html(this.options.content.call(this, data[i]));
                else
                    item.text(data[i].label);
                
                this.listContainer.append(item);
            }
            
            this.items = this.listContainer.children('.pui-autocomplete-item');
            
            this._bindDynamicEvents();

            if(this.items.length > 0) {
                var firstItem = $this.items.eq(0),
                hidden = this.panel.is(':hidden');
                firstItem.addClass('ui-state-highlight');

                if($this.query.length > 0 && !$this.options.content) {
                    $this.items.each(function() {
                        var item = $(this),
                        text = item.html(),
                        re = new RegExp(PUI.escapeRegExp($this.query), 'gi'),
                        highlighedText = text.replace(re, '<span class="pui-autocomplete-query">$&</span>');

                        item.html(highlighedText);
                    });
                }

                if(this.options.forceSelection) {
                    this.currentItems = [];
                    $.each(data, function(i, item) {
                        $this.currentItems.push(item.label);
                    });
                }

                //adjust height
                if($this.options.scrollHeight) {
                    var heightConstraint = hidden ? $this.panel.height() : $this.panel.children().height();

                    if(heightConstraint > $this.options.scrollHeight)
                        $this.panel.height($this.options.scrollHeight);
                    else
                        $this.panel.css('height', 'auto');                              

                }

                if(hidden) {
                    $this.show();
                }
                else {
                    $this._alignPanel();
                }
            }
            else {
                this.panel.hide();
            }
        },

        show: function() {
            this._alignPanel();

            if(this.options.effect)
                this.panel.show(this.options.effect, {}, this.options.effectSpeed);
            else
                this.panel.show();
        },

        hide: function() {        
            this.panel.hide();
            this.panel.css('height', 'auto');
        },
        
        _removeItem: function(item) {
            item.fadeOut('fast', function() {
                var token = $(this);

                token.remove();
            });
        },
        
        _alignPanel: function() {
            var panelWidth = null;

            if(this.options.multiple) {
                panelWidth = this.multiContainer.innerWidth() - (this.element.position().left - this.multiContainer.position().left);
            }
            else {
                if(this.panel.is(':visible')) {
                    panelWidth = this.panel.children('.pui-autocomplete-items').outerWidth();
                }
                else {
                    this.panel.css({'visibility':'hidden','display':'block'});
                    panelWidth = this.panel.children('.pui-autocomplete-items').outerWidth();
                    this.panel.css({'visibility':'visible','display':'none'});
                }

                var inputWidth = this.element.outerWidth();
                if(panelWidth < inputWidth) {
                    panelWidth = inputWidth;
                }
            }

            this.panel.css({
                            'left':'',
                            'top':'',
                            'width': panelWidth,
                            'z-index': ++PUI.zindex
                    })
                    .position({
                        my: 'left top',
                        at: 'left bottom',
                        of: this.element
                    });
        }
    });
    
})();/**
 * PrimeFaces Button Widget
 */
(function() {

    $.widget("primeui.puibutton", {
       
        options: {
            value: null,
            icon: null,
            iconPos: 'left',
            click: null
        },
        
        _create: function() {
            var element = this.element,
            elementText = element.text(),
            value = this.options.value||(elementText === '' ? 'pui-button' : elementText),
            disabled = element.prop('disabled'),
            styleClass = null;
            
            if(this.options.icon) {
                styleClass = (value === 'pui-button') ? 'pui-button-icon-only' : 'pui-button-text-icon-' + this.options.iconPos;
            }
            else {
                styleClass = 'pui-button-text-only';
            }

            if(disabled) {
                styleClass += ' ui-state-disabled';
            }
            
            this.element.addClass('pui-button ui-widget ui-state-default ui-corner-all ' + styleClass).text('');
            
            if(this.options.icon) {
                this.element.append('<span class="pui-button-icon-' + this.options.iconPos + ' pui-icon pui-c fa fa-fw ' + this.options.icon + '" />');
            }
            
            this.element.append('<span class="pui-button-text pui-c">' + value + '</span>');
            
            //aria
            element.attr('role', 'button').attr('aria-disabled', disabled);    
            
            if(!disabled) {
                this._bindEvents();
            }
        },
        
        _bindEvents: function() {
            var element = this.element,
            $this = this;
            
            element.on('mouseover.puibutton', function(){
                if(!element.prop('disabled')) {
                    element.addClass('ui-state-hover');
                }
            }).on('mouseout.puibutton', function() {
                $(this).removeClass('ui-state-active ui-state-hover');
            }).on('mousedown.puibutton', function() {
                if(!element.hasClass('ui-state-disabled')) {
                    element.addClass('ui-state-active').removeClass('ui-state-hover');
                }
            }).on('mouseup.puibutton', function(e) {
                element.removeClass('ui-state-active').addClass('ui-state-hover');
                
                $this._trigger('click', e);
            }).on('focus.puibutton', function() {
                element.addClass('ui-state-focus');
            }).on('blur.puibutton', function() {
                element.removeClass('ui-state-focus');
            }).on('keydown.puibutton',function(e) {
                if(e.keyCode == $.ui.keyCode.SPACE || e.keyCode == $.ui.keyCode.ENTER || e.keyCode == $.ui.keyCode.NUMPAD_ENTER) {
                    element.addClass('ui-state-active');
                }
            }).on('keyup.puibutton', function() {
                element.removeClass('ui-state-active');
            });

            return this;
        },
        
        _unbindEvents: function() {
            this.element.off('mouseover.puibutton mouseout.puibutton mousedown.puibutton mouseup.puibutton focus.puibutton blur.puibutton keydown.puibutton keyup.puibutton');
        },
        
        disable: function() {
            this._unbindEvents();
            
            this.element.attr({
                'disabled':'disabled',
                'aria-disabled': true
            }).addClass('ui-state-disabled');
        },
        
        enable: function() {
            if(this.element.prop('disabled')) {
                this._bindEvents();           
                this.element.removeAttr('disabled').attr('aria-disabled', false).removeClass('ui-state-disabled');
            }
        },

        _setOption: function(key, value) {
            if(key === 'disabled') {
                if(value)
                    this.disable();
                else
                    this.enable();
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }
        
    });
})();/**
 * PrimeUI Carousel widget
 */
(function() {

    $.widget("primeui.puicarousel", {
       
       options: {
            datasource: null,
            numVisible: 3,
            firstVisible: 0,
            headerText: null,
            effectDuration: 500,
            circular :false,
            breakpoint: 560,
            itemContent: null,
            responsive: true,
            autoplayInterval: 0,
            easing: 'easeInOutCirc',
            pageLinks: 3,
            styleClass: null,
            template: null
        },
       
        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
            
            //create elements
            this.element.wrap('<div class="pui-carousel ui-widget ui-widget-content ui-corner-all"><div class="pui-carousel-viewport"></div></div>');
            this.container = this.element.parent().parent();
            this.element.addClass('pui-carousel-items');
            this.container.prepend('<div class="pui-carousel-header ui-widget-header"><div class="pui-carousel-header-title"></div></div>');
            this.viewport = this.element.parent();
            this.header = this.container.children('.pui-carousel-header');
            this.header.append('<span class="pui-carousel-button pui-carousel-next-button fa fa-arrow-circle-right"></span>' + 
                                '<span class="pui-carousel-button pui-carousel-prev-button fa fa-arrow-circle-left"></span>');
                
            if(this.options.headerText) {
                this.header.children('.pui-carousel-header-title').html(this.options.headerText);
            }
            
            if(this.options.styleClass) {
                this.container.addClass(this.options.styleClass);
            }
            
            if(this.options.datasource)
                this._loadData();
            else
                this._render();
        },
        
        _loadData: function() {
            if($.isArray(this.options.datasource))
                this._render(this.options.datasource);
            else if($.type(this.options.datasource) === 'function')
                this.options.datasource.call(this, this._render);
        },
        
        _updateDatasource: function(value) {
            this.options.datasource = value;
            this.element.children().remove();
            this.header.children('.pui-carousel-page-links').remove();
            this.header.children('select').remove();
            this._loadData();
        },
        
        _render: function(data) {
            this.data = data;
            
            if(this.data) {
                for(var i = 0; i < data.length; i++) {
                    var itemContent = this._createItemContent(data[i]);
                    if($.type(itemContent) === 'string')
                        this.element.append('<li>' + itemContent + '</li>');
                    else
                        this.element.append($('<li></li>').wrapInner(itemContent));
                }
            }
            
            this.items = this.element.children('li');
            this.items.addClass('pui-carousel-item ui-widget-content ui-corner-all');
            this.itemsCount = this.items.length;
            this.columns = this.options.numVisible;
            this.first = this.options.firstVisible;
            this.page = parseInt(this.first/this.columns);
            this.totalPages = Math.ceil(this.itemsCount/this.options.numVisible);
            
            this._renderPageLinks();
            
            this.prevNav = this.header.children('.pui-carousel-prev-button');
            this.nextNav = this.header.children('.pui-carousel-next-button');
            this.pageLinks = this.header.find('> .pui-carousel-page-links > .pui-carousel-page-link');
            this.dropdown = this.header.children('.pui-carousel-dropdown');
            this.mobileDropdown = this.header.children('.pui-carousel-mobiledropdown');
            
            this._bindEvents();
            
            if(this.options.responsive) {
                this.refreshDimensions();
            }
            else {
                this.calculateItemWidths();
                this.container.width(this.container.width());
                this.updateNavigators();
            }        
        },
        
        _renderPageLinks: function() {
            if(this.totalPages <= this.options.pageLinks) {
                this.pageLinksContainer = $('<div class="pui-carousel-page-links"></div>');
                for(var i = 0; i < this.totalPages; i++) {
                    this.pageLinksContainer.append('<a href="#" class="pui-carousel-page-link fa fa-circle-o"></a>');
                }
                this.header.append(this.pageLinksContainer);
            }
            else {
                this.dropdown = $('<select class="pui-carousel-dropdown ui-widget ui-state-default ui-corner-left"></select>');
                for(var i = 0; i < this.totalPages; i++) {
                    var pageNumber = (i+1);
                    this.dropdown.append('<option value="' + pageNumber + '">' + pageNumber + '</option>');
                }
                this.header.append(this.dropdown);
            }
            
            if(this.options.responsive) {
                this.mobileDropdown = $('<select class="pui-carousel-mobiledropdown ui-widget ui-state-default ui-corner-left"></select>');
                for(var i = 0; i < this.itemsCount; i++) {
                    var pageNumber = (i+1);
                    this.mobileDropdown.append('<option value="' + pageNumber + '">' + pageNumber + '</option>');
                }
                this.header.append(this.mobileDropdown);
            }
        },
        
        calculateItemWidths: function() {
            var firstItem = this.items.eq(0);
            if(firstItem.length) {
                var itemFrameWidth = firstItem.outerWidth(true) - firstItem.width();    //sum of margin, border and padding
                this.items.width((this.viewport.innerWidth() - itemFrameWidth * this.columns) / this.columns);
            }
        },
    
        refreshDimensions: function() {
            var win = $(window);
            if(win.width() <= this.options.breakpoint) {
                this.columns = 1;
                this.calculateItemWidths(this.columns);
                this.totalPages = this.itemsCount;
                this.mobileDropdown.show();
                this.pageLinks.hide();
            }
            else {
                this.columns = this.options.numVisible;
                this.calculateItemWidths();
                this.totalPages = Math.ceil(this.itemsCount / this.options.numVisible);
                this.mobileDropdown.hide();
                this.pageLinks.show();
            }

            this.page = parseInt(this.first / this.columns);
            this.updateNavigators();
            this.element.css('left', (-1 * (this.viewport.innerWidth() * this.page)));
        },

        _bindEvents: function() {
            var $this = this;
            
            if(this.eventsBound) {
                return;
            }

            this.prevNav.on('click.puicarousel', function() {
                if($this.page !== 0) {
                    $this.setPage($this.page - 1);
                }
                else if($this.options.circular) {
                    $this.setPage($this.totalPages - 1);
                }
            });

            this.nextNav.on('click.puicarousel', function() {
                var lastPage = ($this.page === ($this.totalPages - 1));

                if(!lastPage) {
                    $this.setPage($this.page + 1);
                }
                else if($this.options.circular) {
                    $this.setPage(0);
                }
            });

            this.element.swipe({
                swipe:function(event, direction) {
                    if(direction === 'left') {
                        if($this.page === ($this.totalPages - 1)) {
                            if($this.options.circular)
                                $this.setPage(0);
                        }
                        else {
                            $this.setPage($this.page + 1);
                        }
                    }
                    else if(direction === 'right') {
                        if($this.page === 0) {
                            if($this.options.circular)
                                $this.setPage($this.totalPages - 1);
                        }
                        else {
                            $this.setPage($this.page - 1);
                        }
                    }
                }
            });

            if(this.pageLinks.length) {
                this.pageLinks.on('click', function(e) {
                    $this.setPage($(this).index());
                    e.preventDefault();
                });
            }

            this.header.children('select').on('change', function() {
                $this.setPage(parseInt($(this).val()) - 1);
            });

            if(this.options.autoplayInterval) {
                this.options.circular = true;
                this.startAutoplay();
            }

            if(this.options.responsive) {
                var resizeNS = 'resize.' + this.id;
                $(window).off(resizeNS).on(resizeNS, function() {
                    $this.refreshDimensions();
                });
            }
            
            this.eventsBound = true;
        },

        updateNavigators: function() {
            if(!this.options.circular) {
                if(this.page === 0) {
                    this.prevNav.addClass('ui-state-disabled');
                    this.nextNav.removeClass('ui-state-disabled');   
                }
                else if(this.page === (this.totalPages - 1)) {
                    this.prevNav.removeClass('ui-state-disabled');
                    this.nextNav.addClass('ui-state-disabled');
                }
                else {
                    this.prevNav.removeClass('ui-state-disabled');
                    this.nextNav.removeClass('ui-state-disabled');   
                }
            }

            if(this.pageLinks.length) {
                this.pageLinks.filter('.fa-dot-circle-o').removeClass('fa-dot-circle-o');
                this.pageLinks.eq(this.page).addClass('fa-dot-circle-o');
            }

            if(this.dropdown.length) {
                this.dropdown.val(this.page + 1);
            }

            if(this.mobileDropdown.length) {
                this.mobileDropdown.val(this.page + 1);
            }
        },

        setPage: function(p) {      
            if(p !== this.page && !this.element.is(':animated')) {
                var $this = this;

                this.element.animate({
                    left: -1 * (this.viewport.innerWidth() * p)
                    ,easing: this.options.easing
                }, 
                {
                    duration: this.options.effectDuration,
                    easing: this.options.easing,
                    complete: function() {
                        $this.page = p;
                        $this.first = $this.page * $this.columns;
                        $this.updateNavigators();
                        $this._trigger('pageChange', null, {'page':p});
                    }
                });
            }
        },

        startAutoplay: function() {
            var $this = this;

            this.interval = setInterval(function() {
                if($this.page === ($this.totalPages - 1))
                    $this.setPage(0);
                else
                    $this.setPage($this.page + 1);
            }, this.options.autoplayInterval);
        },

        stopAutoplay: function() {
            clearInterval(this.interval);
        },
                
        _setOption: function(key, value) {
            if(key === 'datasource')
                this._updateDatasource(value);
            else
                $.Widget.prototype._setOption.apply(this, arguments);
        },
        
        _createItemContent: function(obj) {
            if(this.options.template) {
                var template = this.options.template.html();
                Mustache.parse(template);
                return Mustache.render(template, obj);
            }
            else {
                return this.options.itemContent.call(this, obj);
            }
        }

    });
    
})();/**
 * PrimeUI checkbox widget
 */
(function() {

    $.widget("primeui.puicheckbox", {
       
        _create: function() {
            this.element.wrap('<div class="pui-chkbox ui-widget"><div class="ui-helper-hidden-accessible"></div></div>');
            this.container = this.element.parent().parent();
            this.box = $('<div class="pui-chkbox-box ui-widget ui-corner-all ui-state-default">').appendTo(this.container);
            this.icon = $('<span class="pui-chkbox-icon pui-c"></span>').appendTo(this.box);
            this.disabled = this.element.prop('disabled');
            this.label = $('label[for="' + this.element.attr('id') + '"]');
            
            if(this.isChecked()) {
                this.box.addClass('ui-state-active');
                this.icon.addClass('fa fa-fw fa-check');
            }
            
            if(this.disabled) {
                this.box.addClass('ui-state-disabled');
            } else {
                this._bindEvents();
            }
        },
        
        _bindEvents: function() {
            var $this = this;
            
            this.box.on('mouseover.puicheckbox', function() {
                if(!$this.isChecked())
                    $this.box.addClass('ui-state-hover');
            })
            .on('mouseout.puicheckbox', function() {
                $this.box.removeClass('ui-state-hover');
            })
            .on('click.puicheckbox', function() {
                $this.toggle();
            });
            
            this.element.focus(function() {
                if($this.isChecked()) {
                    $this.box.removeClass('ui-state-active');
                }

                $this.box.addClass('ui-state-focus');
            })
            .blur(function() {
                if($this.isChecked()) {
                    $this.box.addClass('ui-state-active');
                }

                $this.box.removeClass('ui-state-focus');
            })
            .keydown(function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which == keyCode.SPACE) {
                    e.preventDefault();
                }
            })
            .keyup(function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which == keyCode.SPACE) {
                    $this.toggle(true);
                    
                    e.preventDefault();
                }
            });
            
            this.label.on('click.puicheckbox', function(e) {
                $this.toggle();
                e.preventDefault();
            });
        },
        
        toggle: function(keypress) {
            if(this.isChecked()) {
                this.uncheck(keypress);
            } else {
                this.check(keypress);
            }
            
            this._trigger('change', null, this.isChecked());
        },

        isChecked: function() {
            return this.element.prop('checked');
        },

        check: function(activate, silent) {
            if(!this.isChecked()) {
                this.element.prop('checked', true);
                this.icon.addClass('fa fa-fw fa-check');

                if(!activate) {
                    this.box.addClass('ui-state-active');
                }
                
                if(!silent) {
                    this.element.trigger('change');
                }
            }
        },

        uncheck: function() {
            if(this.isChecked()) {
                this.element.prop('checked', false);
                this.box.removeClass('ui-state-active');
                this.icon.removeClass('fa fa-fw fa-check');

                this.element.trigger('change');
            }
        },

        _unbindEvents: function() {
            this.box.off();
            this.element.off('focus blur keydown keyup');
            this.label.off();
        },

        disable: function() {
            this.box.prop('disabled', true);

            this.box.attr('aria-disabled', true);
            this.box.addClass('ui-state-disabled').removeClass('ui-state-hover');
            this._unbindEvents();
        },

        enable: function() {
            this.box.prop('disabled', false);
            this.box.attr('aria-disabled', false);
            this.box.removeClass('ui-state-disabled');
            this._bindEvents();
        }
    });
    
})();/**
 * PrimeUI Datatable Widget
 */
(function() {

    $.widget("primeui.puidatatable", {
       
        options: {
            columns: null,
            datasource: null,
            paginator: null,
            selectionMode: null,
            caption: null,
            footer: null,
            sortField: null,
            sortOrder: null,
            keepSelectionInLazyMode: false,
            scrollable: false,
            scrollHeight: null,
            scrollWidth: null,
            responsive: false,
            expandableRows: false,
            expandedRowContent: null,
            rowExpandMode: 'multiple',
            draggableColumns: false,
            resizableColumns: false,
            columnResizeMode: 'fit',
            draggableRows: false,
            filterDelay: 300,
            stickyHeader: false,
            editMode: null,
            tabindex: 0,
            emptyMessage: 'No records found',
            sort: null,
            rowSelect: null,
            rowUnselect: null,
            rowSelectContextMenu: null,
            rowCollapse: null,
            rowExpand: null,
            colReorder: null,
            colResize: null,
            rowReorder: null,
            cellEdit: null,
        },
        
        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
            
            this.element.addClass('pui-datatable ui-widget');
            if(this.options.responsive) {
                this.element.addClass('pui-datatable-reflow');
            }
            
            if(this.options.scrollable) {
                this._createScrollableDatatable();
            }
            else {
                this._createRegularDatatable();
            }
            
            if(this.options.datasource) {
                if($.isArray(this.options.datasource)) {
                    this._onDataInit(this.options.datasource);
                }
                else {
                    if($.type(this.options.datasource) === 'string') {
                        var $this = this,
                        dataURL = this.options.datasource;
                
                        this.options.datasource = function() {
                            $.ajax({
                                type: 'GET',
                                url: dataURL,
                                dataType: "json",
                                context: $this,
                                success: function (response) {
                                    this._onDataInit(response);
                                }
                            });
                        };
                    }
                    
                    if($.type(this.options.datasource) === 'function') {
                        if(this.options.lazy)
                            this.options.datasource.call(this, this._onDataInit, {first:0, sortField:this.options.sortField, sortOrder:this.options.sortOrder});
                        else
                            this.options.datasource.call(this, this._onDataInit);
                    }
                }
            }
        },
        
        _createRegularDatatable: function() {
            this.tableWrapper = $('<div class="pui-datatable-tablewrapper" />').appendTo(this.element);
            this.table = $('<table><thead></thead><tbody></tbody></table>').appendTo(this.tableWrapper);
            this.thead = this.table.children('thead');
            this.tbody = this.table.children('tbody').addClass('pui-datatable-data');

            if(this.containsFooter()) {
                this.tfoot = this.thead.after('<tfoot></tfoot>').next();
            }
        },
        
        _createScrollableDatatable: function() {            
            this.element.append('<div class="ui-widget-header pui-datatable-scrollable-header"><div class="pui-datatable-scrollable-header-box"><table><thead></thead></table></div></div>')
                        .append('<div class="pui-datatable-scrollable-body"><table><tbody></tbody></table></div>');
        
            this.thead = this.element.find('> .pui-datatable-scrollable-header > .pui-datatable-scrollable-header-box > table > thead');
            this.tbody = this.element.find('> .pui-datatable-scrollable-body > table > tbody');
            
            if(this.containsFooter()) {
                this.element.append('<div class="ui-widget-header pui-datatable-scrollable-footer"><div class="pui-datatable-scrollable-footer-box"><table><tfoot></tfoot></table></div></div>');
                this.tfoot = this.element.find('> .pui-datatable-scrollable-footer > .pui-datatable-scrollable-footer-box > table > tfoot');
            }
        },
                
        _initialize: function() {
            var $this = this;

            this._initHeader();
            this._initFooter();

            if(this.options.caption) {
                this.element.prepend('<div class="pui-datatable-caption ui-widget-header">' + this.options.caption + '</div>');
            }
            
            if(this.options.paginator) {
                this.options.paginator.paginate = function(event, state) {
                    $this.paginate();
                };
                
                this.options.paginator.totalRecords = this.options.lazy ? this.options.paginator.totalRecords : this.data.length;
                this.paginator = $('<div></div>').insertAfter(this.tableWrapper).puipaginator(this.options.paginator);
            }
            
            if(this.options.footer) {
                this.element.append('<div class="pui-datatable-footer ui-widget-header">' + this.options.footer + '</div>');
            }

            if(this._isSortingEnabled()) {
                this._initSorting();
            }
            
            if(this.hasFiltering) {
                this._initFiltering();
            }
            
            if(this.options.selectionMode) {
                this._initSelection();
            }
            
            if(this.options.expandableRows) {
                this._initExpandableRows();
            }
            
            if(this.options.draggableColumns) {
                this._initDraggableColumns();
            }
            
            if(this.options.stickyHeader) {
                this._initStickyHeader();
            }

            if (this.options.sortField && this.options.sortOrder) {
                this._indicateInitialSortColumn();
                this.sort(this.options.sortField, this.options.sortOrder);
            } 
            else {
                this._renderData();
            }
            
            if(this.options.scrollable) {
                this._initScrolling();
            }
            
            if(this.options.resizableColumns) {
                this._initResizableColumns();
            }
            
            if(this.options.draggableRows) {
                this._initDraggableRows();
            }
            
            if(this.options.editMode) {
                this._initEditing();
            }

        },
        
        _initHeader: function() {
            if(this.options.headerRows) {
                for(var i = 0; i < this.options.headerRows.length; i++) {
                    this._initHeaderColumns(this.options.headerRows[i].columns);
                }
            }            
            else if(this.options.columns) {
                this._initHeaderColumns(this.options.columns);
            }
        },
        
        _initFooter: function() {
            if(this.containsFooter()) {
                if(this.options.footerRows) {
                    for(var i = 0; i < this.options.footerRows.length; i++) {
                        this._initFooterColumns(this.options.footerRows[i].columns);
                    }
                }            
                else if(this.options.columns) {
                    this._initFooterColumns(this.options.columns);
                }
            }
        },
        
        _initHeaderColumns: function(columns) {
            var headerRow = $('<tr></tr>').appendTo(this.thead),
            $this = this;
    
            $.each(columns, function(i, col) {
                var cell = $('<th class="ui-state-default"><span class="pui-column-title"></span></th>').data('field', col.field).uniqueId().appendTo(headerRow);

                if(col.headerClass) {
                    cell.addClass(col.headerClass);
                }

                if(col.headerStyle) {
                    cell.attr('style', col.headerStyle);
                }

                if(col.headerText)
                    cell.children('.pui-column-title').text(col.headerText);
                else if(col.headerContent)
                    cell.children('.pui-column-title').append(col.headerContent.call(this, col));
                
                if(col.rowspan) {
                    cell.attr('rowspan', col.rowspan);
                }
                
                if(col.colspan) {
                    cell.attr('colspan', col.colspan);
                }

                if(col.sortable) {
                    cell.addClass('pui-sortable-column')
                            .data('order', 0)
                            .append('<span class="pui-sortable-column-icon fa fa-fw fa-sort"></span>');
                }
                
                if(col.filter) {
                    $this.hasFiltering = true;
                    
                    var filterElement = $('<input type="text" class="pui-column-filter" />').puiinputtext().data({
                        'field': col.field,
                        'filtermatchmode': col.filterMatchMode||'startsWith'
                    }).appendTo(cell);
                    
                    if(col.filterFunction) {
                        filterElement.on('filter', function(event, dataValue, filterValue) {
                            return col.filterFunction.call($this, dataValue, filterValue);
                        });
                    }
                }
            });
        },
        
        _initFooterColumns: function(columns) {
            var footerRow = $('<tr></tr>').appendTo(this.tfoot);
            $.each(columns, function(i, col) {
                var cell = $('<td class="ui-state-default"></td>');
                if(col.footerText) {
                    cell.text(col.footerText);
                }
                
                if(col.rowspan) {
                    cell.attr('rowspan', col.rowspan);
                }
                
                if(col.colspan) {
                    cell.attr('colspan', col.colspan);
                }

                cell.appendTo(footerRow);
            });
        },

        _indicateInitialSortColumn: function() {
            this.sortableColumns = this.thead.find('> tr > th.pui-sortable-column');
            var $this = this;
            
            $.each(this.sortableColumns, function(i, column) {
                var $column = $(column),
                    data = $column.data();
                if ($this.options.sortField === data.field) {
                    var sortIcon = $column.children('.pui-sortable-column-icon');
                    $column.data('order', $this.options.sortOrder).removeClass('ui-state-hover').addClass('ui-state-active');
                    if($this.options.sortOrder === -1)
                        sortIcon.removeClass('fa-sort fa-sort-asc').addClass('fa-sort-desc');
                    else if($this.options.sortOrder === 1)
                        sortIcon.removeClass('fa-sort fa-sort-desc').addClass('fa-sort-asc');
                }
            });

        },

        _onDataInit: function(data) {
            this.data = data;
            if(!this.data) {
                this.data = [];
            }
                
            this._initialize();
        },
                
        _onDataUpdate: function(data) {
            this.data = data;
            if(!this.data) {
                this.data = [];
            }
            
            this.reset();
                
            this._renderData();
        },
        
        _onLazyLoad: function(data) {
            this.data = data;
            if(!this.data) {
                this.data = [];
            }
            
            this._renderData();
        },
        
        reset: function() {
            if(this.options.selectionMode) {
                this.selection = [];
            }
            
            if(this.paginator) {
                this.paginator.puipaginator('setState', {
                    page: 0,
                    totalRecords: this.options.lazy ? this.options.paginator.totalRecords : this.data.length
                });
            }
            
            this.thead.children('th.pui-sortable-column').data('order', 0).filter('.ui-state-active').removeClass('ui-state-active')
                                .children('span.pui-sortable-column-icon').removeClass('fa-sort-asc fa-sort-desc').addClass('fa-sort');
        },
                
        _initSorting: function() {
            var $this = this,
            sortableColumns = this.thead.find('> tr > th.pui-sortable-column');
            
            sortableColumns.on('mouseover.puidatatable', function() {
                var column = $(this);

                if(!column.hasClass('ui-state-active'))
                    column.addClass('ui-state-hover');
            })
            .on('mouseout.puidatatable', function() {
                var column = $(this);

                if(!column.hasClass('ui-state-active'))
                    column.removeClass('ui-state-hover');
            })
            .on('click.puidatatable', function(event) {
                if(!$(event.target).is('th,span')) {
                    return;
                }
                
                var column = $(this),
                sortField = column.data('field'),
                order = column.data('order'),
                sortOrder = (order === 0) ? 1 : (order * -1),
                sortIcon = column.children('.pui-sortable-column-icon');
                
                //clean previous sort state
                column.siblings().filter('.ui-state-active').data('order', 0).removeClass('ui-state-active').children('span.pui-sortable-column-icon')
                                                            .removeClass('fa-sort-asc fa-sort-desc').addClass('fa-sort');
                                                    
                //update state
                $this.options.sortField = sortField;
                $this.options.sortOrder = sortOrder;
    
                $this.sort(sortField, sortOrder);
                                
                column.data('order', sortOrder).removeClass('ui-state-hover').addClass('ui-state-active');
                if(sortOrder === -1)
                    sortIcon.removeClass('fa-sort fa-sort-asc').addClass('fa-sort-desc');
                else if(sortOrder === 1)
                    sortIcon.removeClass('fa-sort fa-sort-desc').addClass('fa-sort-asc');
                
                $this._trigger('sort', event, {'sortOrder' : sortOrder, 'sortField' : sortField});
            });
        },
        
        paginate: function() {
            if(this.options.lazy) {
                if(this.options.selectionMode && ! this.options.keepSelectionInLazyMode) {
                    this.selection = [];
                }
                this.options.datasource.call(this, this._onLazyLoad, this._createStateMeta());
            }
            else {
               this._renderData();
            }
        },
                
        sort: function(field, order) {
            if(this.options.selectionMode) {
                this.selection = [];
            }
            
            if(this.options.lazy) {
                this.options.datasource.call(this, this._onLazyLoad, this._createStateMeta());
            }
            else {
                this.data.sort(function(data1, data2) {
                    var value1 = data1[field], value2 = data2[field],
                    result = null;
                    
                    if (typeof value1 == 'string' || value1 instanceof String) {
                        if ( value1.localeCompare ) {
                            return (order * value1.localeCompare(value2));
                        }
                        else {
                            if (value1.toLowerCase) {
                                value1 = value1.toLowerCase();
                            }
                            if (value2.toLowerCase) {
                                value2 = value2.toLowerCase();
                            }
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                            
                            
                        }
                    }
                    else {
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    }  
                    
                    return (order * result);
                });

                if(this.options.selectionMode) {
                    this.selection = [];
                }

                if(this.paginator) {
                    this.paginator.puipaginator('option', 'page', 0);
                }

                this._renderData();
            }
        },
                
        sortByField: function(a, b) {
            var aName = a.name.toLowerCase();
            var bName = b.name.toLowerCase(); 
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        },
                
        _renderData: function() {
            this.tbody.html('');
            
            var dataToRender = this.filteredData||this.data;
            if(dataToRender && dataToRender.length) {
                var firstNonLazy = this._getFirst(),
                first = this.options.lazy ? 0 : firstNonLazy,
                rows = this._getRows();

                for(var i = first; i < (first + rows); i++) {
                    var rowData = dataToRender[i];
                    
                    if(rowData) {
                        var row = $('<tr class="ui-widget-content" />').appendTo(this.tbody),
                        zebraStyle = (i%2 === 0) ? 'pui-datatable-even' : 'pui-datatable-odd',
                        rowIndex = i;

                        row.addClass(zebraStyle);
                        
                        if(this.options.lazy) {
                            rowIndex += firstNonLazy; // Selection is kept as it is non lazy data
                        }

                        if(this.options.selectionMode && PUI.inArray(this.selection, rowIndex)) {
                            row.addClass("ui-state-highlight");
                        }
                        
                        row.data('rowindex', rowIndex);

                        for(var j = 0; j < this.options.columns.length; j++) {
                            var column = $('<td />').appendTo(row),
                            columnOptions = this.options.columns[j];

                            if(columnOptions.bodyClass) {
                                column.addClass(columnOptions.bodyClass);
                            } 

                            if(columnOptions.bodyStyle) {
                                column.attr('style', columnOptions.bodyStyle);
                            }
                            
                            if(columnOptions.editor) {
                                column.addClass('pui-editable-column').data({
                                    'editor': columnOptions.editor, 
                                    'rowdata': rowData,
                                    'field': columnOptions.field
                                });
                            }
                            
                            if(columnOptions.content) {
                                var content = columnOptions.content.call(this, rowData);
                                if($.type(content) === 'string')
                                    column.html(content);
                                else
                                    column.append(content);
                            }
                            else if(columnOptions.rowToggler) {
                                column.append('<div class="pui-row-toggler fa fa-fw fa-chevron-circle-right pui-c"></div>');
                            }
                            else if(columnOptions.field) {
                                column.text(rowData[columnOptions.field]);
                            }
                            
                            if(this.options.responsive && columnOptions.headerText) {
                                column.prepend('<span class="pui-column-title">' + columnOptions.headerText + '</span>');
                            }
                        }
                    }
                }
            }
            else {
                var emptyRow = $('<tr class="ui-widget-content"></tr>').appendTo(this.tbody);
                var emptyColumn = $('<td></td>').attr('colspan',this.options.columns.length).appendTo(emptyRow);
                emptyColumn.html(this.options.emptyMessage);
            }
        },
                                
        _getFirst: function() {
            if(this.paginator) {
                var page = this.paginator.puipaginator('option', 'page'),
                rows = this.paginator.puipaginator('option', 'rows');
                
                return (page * rows);
            }
            else {
                return 0;
            }
        },
        
        _getRows: function() {
            return this.paginator ? this.paginator.puipaginator('option', 'rows') : this.data.length;
        },
                
        _isSortingEnabled: function() {
            var cols = this.options.columns;
            if(cols) {
                for(var i = 0; i < cols.length; i++) {
                    if(cols[i].sortable) {
                        return true;
                    }
                }
            }
            
            return false;
        },
                
        _initSelection: function() {
            var $this = this;
            this.selection = [];
            this.rowSelector = '> tr.ui-widget-content:not(.pui-datatable-empty-message,.pui-datatable-unselectable)';
            
            //shift key based range selection
            if(this._isMultipleSelection()) {
                this.originRowIndex = 0;
                this.cursorIndex = null;
            }
                        
            this.tbody.off('mouseover.puidatatable mouseout.puidatatable mousedown.puidatatable click.puidatatable', this.rowSelector)
                    .on('mouseover.datatable', this.rowSelector, null, function() {
                        var element = $(this);

                        if(!element.hasClass('ui-state-highlight')) {
                            element.addClass('ui-state-hover');
                        }
                    })
                    .on('mouseout.datatable', this.rowSelector, null, function() {
                        var element = $(this);

                        if(!element.hasClass('ui-state-highlight')) {
                            element.removeClass('ui-state-hover');
                        }
                    })
                    .on('mousedown.datatable', this.rowSelector, null, function() {
                        $this.mousedownOnRow = true;
                    })
                    .on('click.datatable', this.rowSelector, null, function(e) {
                        $this._onRowClick(e, this);
                        $this.mousedownOnRow = false;
                    });
                    
            this._bindSelectionKeyEvents();
        },
                
        _onRowClick: function(event, rowElement) {
            if(!$(event.target).is(':input,:button,a,.pui-c')) {
                var row = $(rowElement),
                selected = row.hasClass('ui-state-highlight'),
                metaKey = event.metaKey||event.ctrlKey,
                shiftKey = event.shiftKey;
        
                this.focusedRow = row;

                //unselect a selected row if metakey is on
                if(selected && metaKey) {
                    this.unselectRow(row);
                }
                else {
                    //unselect previous selection if this is single selection or multiple one with no keys
                    if(this._isSingleSelection() || (this._isMultipleSelection() && !metaKey && !shiftKey)) {
                        if (this._isMultipleSelection()) {
                            var selections = this.getSelection();
                            for (var i = 0; i < selections.length; i++) {
                                this._trigger('rowUnselect', null, selections[i]);
                            }
                        }

                        this.unselectAllRows();
                    }
                    
                    this.selectRow(row, false, event);
                } 

                PUI.clearSelection();
            }
        },
        
        onRowRightClick: function(event, rowElement) {
            var row = $(rowElement),
            rowIndex = this._getRowIndex(row),
            selectedData = this.data[rowIndex],
            selected = row.hasClass('ui-state-highlight');
    
            if(this._isSingleSelection() || !selected) {
                this.unselectAllRows();
            }
            
            this.selectRow(row, true);
            this.dataSelectedByContextMenu = selectedData;
            this._trigger('rowSelectContextMenu', event, selectedData);

            PUI.clearSelection();
        },
        
        _bindSelectionKeyEvents: function() {
            var $this = this;

            this.tbody.attr('tabindex', this.options.tabindex).on('focus', function(e) {
                //ignore mouse click on row
                if(!$this.mousedownOnRow) {
                    $this.focusedRow = $this.tbody.children('tr.ui-widget-content').eq(0);
                    $this.focusedRow.addClass('ui-state-hover');
                }
            })
            .on('blur', function() {
                if($this.focusedRow) {
                    $this.focusedRow.removeClass('ui-state-hover');
                    $this.focusedRow = null;
                }
            })
            .on('keydown', function(e) {
                var keyCode = $.ui.keyCode,
                key = e.which;

                if($this.focusedRow) {
                    switch(key) {
                        case keyCode.UP:
                            var prevRow = $this.focusedRow.prev('tr.ui-widget-content');
                            if(prevRow.length) {
                                $this.focusedRow.removeClass('ui-state-hover');
                                $this.focusedRow = prevRow;
                                $this.focusedRow.addClass('ui-state-hover');
                            }
                            e.preventDefault();
                        break;

                        case keyCode.DOWN:
                            var nextRow = $this.focusedRow.next('tr.ui-widget-content');
                            if(nextRow.length) {
                                $this.focusedRow.removeClass('ui-state-hover');
                                $this.focusedRow = nextRow;
                                $this.focusedRow.addClass('ui-state-hover');
                            }
                            e.preventDefault();
                        break;

                        case keyCode.ENTER:
                        case keyCode.NUMPAD_ENTER:
                        case keyCode.SPACE:
                            e.target = $this.focusedRow.children().eq(0).get(0);
                            $this._onRowClick(e, $this.focusedRow.get(0));
                            e.preventDefault();
                        break;

                        default:
                        break;
                    };
                }
            });

        },
                
        _isSingleSelection: function() {
            return this.options.selectionMode === 'single';
        },

        _isMultipleSelection: function() {
            return this.options.selectionMode === 'multiple';
        },
                
        unselectAllRows: function() {
            this.tbody.children('tr.ui-state-highlight').removeClass('ui-state-highlight').attr('aria-selected', false);
            this.selection = [];
        },
        
        unselectRow: function(row, silent) {
            var rowIndex = this._getRowIndex(row);
            row.removeClass('ui-state-highlight').attr('aria-selected', false);

            this._removeSelection(rowIndex);

            if(!silent) {
                this._trigger('rowUnselect', null, this.data[rowIndex]);
            }
        },
                
        selectRow: function(row, silent, event) {
            var rowIndex = this._getRowIndex(row),
            selectedData = this.data[rowIndex];
            row.removeClass('ui-state-hover').addClass('ui-state-highlight').attr('aria-selected', true);

            this._addSelection(rowIndex);

            if(!silent) {
                if (this.options.lazy) {
                    selectedData = this.data[rowIndex - this._getFirst()];
                }
                
                this._trigger('rowSelect', event, selectedData);
            }
        },
                
        getSelection: function() {
            var first = this.options.lazy ? this._getFirst() : 0,
                selections = [];
            for(var i = 0; i < this.selection.length; i++) {
                if(this.data.length > this.selection[i]-first && this.selection[i]-first > 0) {
                    selections.push(this.data[this.selection[i]-first]);
                }
            }
            return selections;
        },
                
        _removeSelection: function(rowIndex) {        
            this.selection = $.grep(this.selection, function(value) {
                return value !== rowIndex;
            });
        },

        _addSelection: function(rowIndex) {
            if(!this._isSelected(rowIndex)) {
                this.selection.push(rowIndex);
            }
        },
                
        _isSelected: function(rowIndex) {
            return PUI.inArray(this.selection, rowIndex);
        },
                
        _getRowIndex: function(row) {
            return row.data('rowindex');
        },
        
        _initExpandableRows: function() {
            var $this = this,
            togglerSelector = '> tr > td > div.pui-row-toggler';

            this.tbody.off('click', togglerSelector)
                .on('click', togglerSelector, null, function() {
                    $this.toggleExpansion($(this));
                })
                .on('keydown', togglerSelector, null, function(e) {
                    var key = e.which,
                    keyCode = $.ui.keyCode;

                    if((key === keyCode.ENTER||key === keyCode.NUMPAD_ENTER)) {
                        $this.toggleExpansion($(this));
                        e.preventDefault();
                    }
            });
        },
        
        toggleExpansion: function(toggler) {
            var row = toggler.closest('tr'),
            expanded = toggler.hasClass('fa-chevron-circle-down');
    
            if(expanded) {
                toggler.addClass('fa-chevron-circle-right').removeClass('fa-chevron-circle-down').attr('aria-expanded', false);

                this.collapseRow(row);
                this._trigger('rowCollapse', null, this.data[this._getRowIndex(row)]);
            }
            else {
                if(this.options.rowExpandMode === 'single') {
                    this.collapseAllRows();
                }

                toggler.addClass('fa-chevron-circle-down').removeClass('fa-chevron-circle-right').attr('aria-expanded', true);

                this.loadExpandedRowContent(row);
            }
        },
        
        loadExpandedRowContent: function(row) {
            var rowIndex = this._getRowIndex(row),
            expandedRow = $('<tr class="pui-expanded-row-content pui-datatable-unselectable ui-widget-content"><td colspan="' + this.options.columns.length + '"></td></tr>');
            expandedRow.children('td').append(this.options.expandedRowContent.call(this, this.data[rowIndex]));

            row.addClass('pui-expanded-row').after(expandedRow);
            this._trigger('rowExpand', null, this.data[this._getRowIndex(row)]);
        },
        
        collapseRow: function(row) {
            row.removeClass('pui-expanded-row').next('.pui-expanded-row-content').remove();
        },
        
        collapseAllRows: function() {
            var $this = this;

            this.getExpandedRows().each(function () {
                var expandedRow = $(this);
                $this.collapseRow(expandedRow);

                var columns = expandedRow.children('td');
                for (var i = 0; i < columns.length; i++) {
                    var column = columns.eq(i),
                    toggler = column.children('.pui-row-toggler');

                    if (toggler.length) {
                        toggler.addClass('fa-chevron-circle-right').removeClass('fa-chevron-circle-down');
                    }
                }
            });
        },
        
        getExpandedRows: function () {
            return this.tbody.children('.pui-expanded-row');
        },
                
        _createStateMeta: function() {
            var state = {
                first: this._getFirst(),
                rows: this._getRows(),
                sortField: this.options.sortField,
                sortOrder: this.options.sortOrder,
                filters: this.filterMetaMap
            };
            
            return state;
        },
                
        _updateDatasource: function(datasource) {
            this.options.datasource = datasource;
                        
            if($.isArray(this.options.datasource)) {
                this._onDataUpdate(this.options.datasource);
            }
            else if($.type(this.options.datasource) === 'function') {
                if(this.options.lazy)
                    this.options.datasource.call(this, this._onDataUpdate, {first:0, sortField:this.options.sortField, sortorder:this.options.sortOrder});
                else
                    this.options.datasource.call(this, this._onDataUpdate);
            }
        },
                
        _setOption: function(key, value) {
            if(key === 'datasource') {
                this._updateDatasource(value);
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        },
        
        _initScrolling: function() {
            this.scrollHeader = this.element.children('.pui-datatable-scrollable-header');
            this.scrollBody = this.element.children('.pui-datatable-scrollable-body');
            this.scrollHeaderBox = this.scrollHeader.children('.pui-datatable-scrollable-header-box');
            this.headerTable = this.scrollHeaderBox.children('table');
            this.bodyTable = this.scrollBody.children('table');
            this.percentageScrollHeight = this.options.scrollHeight && (this.options.scrollHeight.indexOf('%') !== -1);
            this.percentageScrollWidth = this.options.scrollWidth && (this.options.scrollWidth.indexOf('%') !== -1);
            var $this = this,
            scrollBarWidth = this.getScrollbarWidth() + 'px';

            if(this.options.scrollHeight) {
                if(this.percentageScrollHeight)
                    this.adjustScrollHeight();
                else
                    this.scrollBody.css('max-height', this.options.scrollHeight + 'px');

                if(this.hasVerticalOverflow()) {
                    this.scrollHeaderBox.css('margin-right', scrollBarWidth);
                }
            }

            this.fixColumnWidths();

            if(this.options.scrollWidth) {
                if(this.percentageScrollWidth)
                    this.adjustScrollWidth();
                else
                    this.setScrollWidth(parseInt(this.options.scrollWidth));
            }

            this.cloneHead();

            this.scrollBody.on('scroll.dataTable', function() {
                var scrollLeft = $this.scrollBody.scrollLeft();
                $this.scrollHeaderBox.css('margin-left', -scrollLeft);
            });

            this.scrollHeader.on('scroll.dataTable', function() {
                $this.scrollHeader.scrollLeft(0);
            });

            var resizeNS = 'resize.' + this.id;
            $(window).off(resizeNS).on(resizeNS, function() {
                if($this.element.is(':visible')) {
                    if($this.percentageScrollHeight)
                        $this.adjustScrollHeight();

                    if($this.percentageScrollWidth)
                        $this.adjustScrollWidth();
                }
            });
        },

        cloneHead: function() {
            this.theadClone = this.thead.clone();
            this.theadClone.find('th').each(function() {
                var header = $(this);
                header.attr('id', header.attr('id') + '_clone');
                $(this).children().not('.pui-column-title').remove();
            });
            this.theadClone.removeAttr('id').addClass('pui-datatable-scrollable-theadclone').height(0).prependTo(this.bodyTable);

            //align horizontal scroller on keyboard tab
            if(this.options.scrollWidth) {
                var clonedSortableColumns = this.theadClone.find('> tr > th.pui-sortable-column');
                clonedSortableColumns.each(function() {
                    $(this).data('original', $(this).attr('id').split('_clone')[0]);
                });

                clonedSortableColumns.on('blur.dataTable', function() {
                    $(PUI.escapeClientId($(this).data('original'))).removeClass('ui-state-focus');
                })
                .on('focus.dataTable', function() {
                    $(PUI.escapeClientId($(this).data('original'))).addClass('ui-state-focus');
                })
                .on('keydown.dataTable', function(e) {
                    var key = e.which,
                    keyCode = $.ui.keyCode;

                    if((key === keyCode.ENTER||key === keyCode.NUMPAD_ENTER) && $(e.target).is(':not(:input)')) {
                        $(PUI.escapeClientId($(this).data('original'))).trigger('click.dataTable', (e.metaKey||e.ctrlKey));
                        e.preventDefault();
                    }
                });
            }
        },

        adjustScrollHeight: function() {
            var relativeHeight = this.element.parent().innerHeight() * (parseInt(this.options.scrollHeight) / 100),
            tableHeaderHeight = this.element.children('.pui-datatable-header').outerHeight(true),
            tableFooterHeight = this.element.children('.pui-datatable-footer').outerHeight(true),
            scrollersHeight = (this.scrollHeader.outerHeight(true) + this.scrollFooter.outerHeight(true)),
            paginatorsHeight = this.paginator ? this.paginator.getContainerHeight(true) : 0,
            height = (relativeHeight - (scrollersHeight + paginatorsHeight + tableHeaderHeight + tableFooterHeight));

            this.scrollBody.css('max-height', height + 'px');
        },

        adjustScrollWidth: function() {
            var width = parseInt((this.element.parent().innerWidth() * (parseInt(this.options.scrollWidth) / 100)));
            this.setScrollWidth(width);
        },

        setOuterWidth: function(element, width) {
            var diff = element.outerWidth() - element.width();
            element.width(width - diff);
        },

        setScrollWidth: function(width) {
            var $this = this;
            this.element.children('.ui-widget-header').each(function() {
                $this.setOuterWidth($(this), width);
            });
            this.scrollHeader.width(width);
            this.scrollBody.css('margin-right', 0).width(width);
        },

        alignScrollBody: function() {
            var marginRight = this.hasVerticalOverflow() ? this.getScrollbarWidth() + 'px' : '0px';

            this.scrollHeaderBox.css('margin-right', marginRight);
        },

        getScrollbarWidth: function() {
            if(!this.scrollbarWidth) {
                this.scrollbarWidth = PUI.browser.webkit ? '15' : PUI.calculateScrollbarWidth();
            }

            return this.scrollbarWidth;
        },

        hasVerticalOverflow: function() {
            return (this.options.scrollHeight && this.bodyTable.outerHeight() > this.scrollBody.outerHeight())
        },

        restoreScrollState: function() {
            var scrollState = this.scrollStateHolder.val(),
            scrollValues = scrollState.split(',');

            this.scrollBody.scrollLeft(scrollValues[0]);
            this.scrollBody.scrollTop(scrollValues[1]);
        },

        saveScrollState: function() {
            var scrollState = this.scrollBody.scrollLeft() + ',' + this.scrollBody.scrollTop();

            this.scrollStateHolder.val(scrollState);
        },

        clearScrollState: function() {
            this.scrollStateHolder.val('0,0');
        },

        fixColumnWidths: function() {
            if(!this.columnWidthsFixed) {
                if(this.options.scrollable) {
                    this.scrollHeaderBox.find('> table > thead > tr > th').each(function() {
                        var headerCol = $(this),
                        width = headerCol.width();
                        headerCol.width(width);
                    });
                }
                else {
                    this.element.find('> .pui-datatable-tablewrapper > table > thead > tr > th').each(function() {
                        var col = $(this);
                        col.width(col.width());
                    });
                }

                this.columnWidthsFixed = true;
            }
        },
        
        _initDraggableColumns: function() {
            var $this = this;
            
            this.dragIndicatorTop = $('<span class="fa fa-arrow-down" style="position:absolute"/></span>').hide().appendTo(this.element);
            this.dragIndicatorBottom = $('<span class="fa fa-arrow-up" style="position:absolute"/></span>').hide().appendTo(this.element);

            this.thead.find('> tr > th').draggable({
                appendTo: 'body',
                opacity: 0.75,
                cursor: 'move',
                scope: this.id,
                cancel: ':input,.ui-column-resizer',
                drag: function(event, ui) {
                    var droppable = ui.helper.data('droppable-column');

                    if(droppable) {
                        var droppableOffset = droppable.offset(),
                        topArrowY = droppableOffset.top - 10,
                        bottomArrowY = droppableOffset.top + droppable.height() + 8,
                        arrowX = null;

                        //calculate coordinates of arrow depending on mouse location
                        if(event.originalEvent.pageX >= droppableOffset.left + (droppable.width() / 2)) {
                            var nextDroppable = droppable.next();
                            if(nextDroppable.length == 1)
                                arrowX = nextDroppable.offset().left - 9;
                            else
                                arrowX = droppable.offset().left + droppable.innerWidth() - 9;

                            ui.helper.data('drop-location', 1);     //right
                        }
                        else {
                            arrowX = droppableOffset.left  - 9;
                            ui.helper.data('drop-location', -1);    //left
                        }

                        $this.dragIndicatorTop.offset({
                            'left': arrowX, 
                            'top': topArrowY - 3
                        }).show();

                        $this.dragIndicatorBottom.offset({
                            'left': arrowX, 
                            'top': bottomArrowY - 3
                        }).show();
                    }
                },
                stop: function(event, ui) {
                    //hide dnd arrows
                    $this.dragIndicatorTop.css({
                        'left':0, 
                        'top':0
                    }).hide();

                    $this.dragIndicatorBottom.css({
                        'left':0, 
                        'top':0
                    }).hide();
                },
                helper: function() {
                    var header = $(this),
                    helper = $('<div class="ui-widget ui-state-default" style="padding:4px 10px;text-align:center;"></div>');

                    helper.width(header.width());
                    helper.height(header.height());

                    helper.html(header.html());

                    return helper.get(0);
                }
            }).droppable({
                hoverClass:'ui-state-highlight',
                tolerance:'pointer',
                scope: this.id,
                over: function(event, ui) {
                    ui.helper.data('droppable-column', $(this));
                },
                drop: function(event, ui) {
                    var draggedColumnHeader = ui.draggable,
                    dropLocation = ui.helper.data('drop-location'),
                    droppedColumnHeader =  $(this),
                    draggedColumnFooter = null,
                    droppedColumnFooter = null;

                    var draggedCells = $this.tbody.find('> tr:not(.ui-expanded-row-content) > td:nth-child(' + (draggedColumnHeader.index() + 1) + ')'),
                    droppedCells = $this.tbody.find('> tr:not(.ui-expanded-row-content) > td:nth-child(' + (droppedColumnHeader.index() + 1) + ')');

                    if($this.containsFooter()) {
                        var footerColumns = $this.tfoot.find('> tr > td'),
                        draggedColumnFooter = footerColumns.eq(draggedColumnHeader.index()),
                        droppedColumnFooter = footerColumns.eq(droppedColumnHeader.index());
                    }

                    //drop right
                    if(dropLocation > 0) {
                        /* TODO :Resizable columns
                         * if($this.options.resizableColumns) {
                            if(droppedColumnHeader.next().length) {
                                droppedColumnHeader.children('span.ui-column-resizer').show();
                                draggedColumnHeader.children('span.ui-column-resizer').hide();
                            }
                        }*/

                        draggedColumnHeader.insertAfter(droppedColumnHeader);

                        draggedCells.each(function(i, item) {
                            $(this).insertAfter(droppedCells.eq(i));
                        });

                        if(draggedColumnFooter && droppedColumnFooter) {
                            draggedColumnFooter.insertAfter(droppedColumnFooter);
                        }

                        //sync clone
                        if($this.options.scrollable) {
                            var draggedColumnClone = $(document.getElementById(draggedColumnHeader.attr('id') + '_clone')),
                            droppedColumnClone = $(document.getElementById(droppedColumnHeader.attr('id') + '_clone'));
                            draggedColumnClone.insertAfter(droppedColumnClone);
                        }
                    }
                    //drop left
                    else {
                        draggedColumnHeader.insertBefore(droppedColumnHeader);

                        draggedCells.each(function(i, item) {
                            $(this).insertBefore(droppedCells.eq(i));
                        });

                        if(draggedColumnFooter && droppedColumnFooter) {
                            draggedColumnFooter.insertBefore(droppedColumnFooter);
                        }

                        //sync clone
                        if($this.options.scrollable) {
                            var draggedColumnClone = $(document.getElementById(draggedColumnHeader.attr('id') + '_clone')),
                            droppedColumnClone = $(document.getElementById(droppedColumnHeader.attr('id') + '_clone'));
                            draggedColumnClone.insertBefore(droppedColumnClone);
                        }
                    }

                    //fire colReorder event
                    $this._trigger('colReorder', null, {
                        dragIndex: draggedColumnHeader.index(),
                        dropIndex: droppedColumnHeader.index()
                    });
                }
            });
        },
        
        containsFooter: function() {
            if(this.hasFooter === undefined) {
                this.hasFooter = this.options.footerRows !== undefined;
                if(!this.hasFooter) {
                    if(this.options.columns) {
                        for(var i = 0; i  < this.options.columns.length; i++) {
                            if(this.options.columns[i].footerText !== undefined) {
                                this.hasFooter = true;
                                break;
                            }
                        }
                    }
                }
            }

            return this.hasFooter;
        },
        
        _initResizableColumns: function() {
            this.element.addClass('pui-datatable-resizable');
            this.thead.find('> tr > th').addClass('pui-resizable-column');
            this.resizerHelper = $('<div class="pui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.element);
            this.addResizers();
            var resizers = this.thead.find('> tr > th > span.pui-column-resizer'),
            $this = this;

            setTimeout(function() {
                $this.fixColumnWidths();
            }, 5);

            resizers.draggable({
                axis: 'x',
                start: function(event, ui) {
                    ui.helper.data('originalposition', ui.helper.offset());

                    var height = $this.options.scrollable ? $this.scrollBody.height() : $this.thead.parent().height() - $this.thead.height() - 1;
                    $this.resizerHelper.height(height);
                    $this.resizerHelper.show();
                },
                drag: function(event, ui) {
                    $this.resizerHelper.offset({
                        left: ui.helper.offset().left + ui.helper.width() / 2, 
                        top: $this.thead.offset().top + $this.thead.height()
                    });                
                },
                stop: function(event, ui) {                
                    ui.helper.css({
                        'left': '',
                        'top': '0px',
                        'right': '0px'
                    });

                    $this.resize(event, ui);
                    $this.resizerHelper.hide();

                    if($this.options.columnResizeMode === 'expand') {
                        setTimeout(function() {
                            $this._trigger('colResize', null, {element: ui.helper.parent()});
                        }, 5);
                    }
                    else {
                        $this._trigger('colResize', null, {element: ui.helper.parent()});
                    }

                    if($this.options.stickyHeader) {
                        $this.thead.find('.pui-column-filter').prop('disabled', false);
                        $this.clone = $this.thead.clone(true);
                        $this.cloneContainer.find('thead').remove();
                        $this.cloneContainer.children('table').append($this.clone);
                        $this.thead.find('.ui-column-filter').prop('disabled', true);
                    }
                },
                containment: this.element
            });
        },
        
        resize: function(event, ui) {
            var columnHeader, nextColumnHeader, change = null, newWidth = null, nextColumnWidth = null, 
            expandMode = (this.options.columnResizeMode === 'expand'),
            table = this.thead.parent(),
            columnHeader = ui.helper.parent(),
            nextColumnHeader = columnHeader.next();

            change = (ui.position.left - ui.originalPosition.left),
            newWidth = (columnHeader.width() + change),
            nextColumnWidth = (nextColumnHeader.width() - change);

            if((newWidth > 15 && nextColumnWidth > 15) || (expandMode && newWidth > 15)) {          
                if(expandMode) {
                    table.width(table.width() + change);
                    setTimeout(function() {
                        columnHeader.width(newWidth);
                    }, 1);
                }
                else {
                    columnHeader.width(newWidth);
                    nextColumnHeader.width(nextColumnWidth);
                }

                if(this.options.scrollable) {
                    var cloneTable = this.theadClone.parent(),
                    colIndex = columnHeader.index();

                    if(expandMode) {
                        var $this = this;

                        //body
                        cloneTable.width(cloneTable.width() + change);

                        //footer
                        this.footerTable.width(this.footerTable.width() + change);

                        setTimeout(function() {
                            if($this.hasColumnGroup) {
                                $this.theadClone.find('> tr:first').children('th').eq(colIndex).width(newWidth);            //body
                                $this.footerTable.find('> tfoot > tr:first').children('th').eq(colIndex).width(newWidth);   //footer
                            }
                            else {
                                $this.theadClone.find(PUI.escapeClientId(columnHeader.attr('id') + '_clone')).width(newWidth);   //body
                                $this.footerCols.eq(colIndex).width(newWidth);                                                          //footer
                            }
                        }, 1);
                    }
                    else {
                        //body
                        this.theadClone.find(PUI.escapeClientId(columnHeader.attr('id') + '_clone')).width(newWidth);
                        this.theadClone.find(PUI.escapeClientId(nextColumnHeader.attr('id') + '_clone')).width(nextColumnWidth);

                        //footer
                        /*if(this.footerCols.length > 0) {
                            var footerCol = this.footerCols.eq(colIndex),
                            nextFooterCol = footerCol.next();

                            footerCol.width(newWidth);
                            nextFooterCol.width(nextColumnWidth);
                        }*/
                    }
                }            
            }
        },
        
        addResizers: function() {
            var resizableColumns = this.thead.find('> tr > th.pui-resizable-column');
            resizableColumns.prepend('<span class="pui-column-resizer">&nbsp;</span>');

            if(this.options.columnResizeMode === 'fit') {
                resizableColumns.filter(':last-child').children('span.pui-column-resizer').hide();
            }
        },
        
        _initDraggableRows: function() {
            var $this = this;

            this.tbody.sortable({
                placeholder: 'pui-datatable-rowordering ui-state-active',
                cursor: 'move',
                handle: 'td,span:not(.ui-c)',
                appendTo: document.body,
                helper: function(event, ui) {
                    var cells = ui.children(),
                    helper = $('<div class="pui-datatable ui-widget"><table><tbody></tbody></table></div>'),
                    helperRow = ui.clone(),
                    helperCells = helperRow.children();

                    for(var i = 0; i < helperCells.length; i++) {
                        helperCells.eq(i).width(cells.eq(i).width());
                    }

                    helperRow.appendTo(helper.find('tbody'));

                    return helper;
                },
                update: function(event, ui) {
                    $this.syncRowParity();

                    $this._trigger('rowReorder', null, {
                        fromIndex: ui.item.data('ri'),
                        toIndex: $this._getFirst() + ui.item.index()
                    });
                },
                change: function(event, ui) {
                    if($this.options.scrollable) {
                        PUI.scrollInView($this.scrollBody, ui.placeholder);
                    }
                }
            });
        },

        syncRowParity: function() {
            var rows = this.tbody.children('tr.ui-widget-content');

            for(var i = this._getFirst(); i < rows.length; i++) {
                var row = rows.eq(i);

                row.data('ri', i).removeClass('pui-datatable-even pui-datatable-odd');

                if(i % 2 === 0)
                    row.addClass('pui-datatable-even');
                else
                    row.addClass('pui-datatable-odd');

            }
        },
        
        getContextMenuSelection: function(data) {
            return this.dataSelectedByContextMenu;
        },
        
        _initFiltering: function() {
            var $this = this;
            this.filterElements = this.thead.find('.pui-column-filter');
            
            this.filterElements.on('keyup', function() {
                        if($this.filterTimeout) {
                            clearTimeout($this.filterTimeout);
                        }

                        $this.filterTimeout = setTimeout(function() {
                            $this.filter();
                            $this.filterTimeout = null;
                        },
                        $this.options.filterDelay);
                    });
        },
        
        filter: function() {
            this.filterMetaMap = [];
                
            for(var i = 0; i < this.filterElements.length; i++) {
                var filterElement = this.filterElements.eq(i),
                filterElementValue = filterElement.val();

                if(filterElementValue && $.trim(filterElementValue) !== '') {
                    this.filterMetaMap.push({
                        field: filterElement.data('field'), 
                        filterMatchMode: filterElement.data('filtermatchmode'), 
                        value: filterElementValue.toLowerCase(),
                        element: filterElement
                    });
                }
            }
                
            if(this.options.lazy) {
                this.options.datasource.call(this, this._onLazyLoad, this._createStateMeta());
            }
            else {
                if(this.filterMetaMap.length) {
                    this.filteredData = [];
                    
                    for(var i = 0; i < this.data.length; i++) {
                        var localMatch = true;

                        for(var j = 0; j < this.filterMetaMap.length; j++) {
                            var filterMeta = this.filterMetaMap[j],
                            filterValue = filterMeta.value,
                            filterField = filterMeta.field,
                            dataFieldValue = this.data[i][filterField];
                    
                            if(filterMeta.filterMatchMode === 'custom') {
                                localMatch = filterMeta.element.triggerHandler('filter', [dataFieldValue, filterValue]);
                            }
                            else {
                                var filterConstraint = this.filterConstraints[filterMeta.filterMatchMode];
                                if(!filterConstraint(dataFieldValue, filterValue)) {
                                    localMatch = false;
                                }
                            }

                            if(!localMatch) {
                                break;
                            }
                        }

                        if(localMatch) {
                            this.filteredData.push(this.data[i]);
                        }
                    }
                }
                else {
                    this.filteredData = null;
                }

                if(this.paginator) {
                    this.paginator.puipaginator('option', 'totalRecords', this.filteredData ? this.filteredData.length : this.data ? this.data.length : 0);
                }
                
                this._renderData();
            }
        },
        
        filterConstraints: {
            
            startsWith: function(value, filter) {
                if(filter === undefined || filter === null || $.trim(filter) === '') {
                    return true;
                }
                
                if(value === undefined || value === null) {
                    return false;
                }
                
                return value.toString().toLowerCase().slice(0, filter.length) === filter;
            },
            
            contains: function(value, filter) {
                if(filter === undefined || filter === null || $.trim(filter) === '') {
                    return true;
                }
                
                if(value === undefined || value === null) {
                    return false;
                }
                
                return value.toString().toLowerCase().indexOf(filter) !== -1;
            }
            
        },
        
        _initStickyHeader: function() {
            var table = this.thead.parent(),
            offset = table.offset(),
            win = $(window),
            $this = this,
            stickyNS = 'scroll.' + this.id,
            resizeNS = 'resize.sticky-' + this.id; 

            this.cloneContainer = $('<div class="pui-datatable pui-datatable-sticky ui-widget"><table></table></div>');
            this.clone = this.thead.clone(true);
            this.cloneContainer.children('table').append(this.clone);

            this.cloneContainer.css({
                position: 'absolute',
                width: table.outerWidth(),
                top: offset.top,
                left: offset.left,
                'z-index': ++PUI.zindex
            })
            .appendTo(this.element);

            win.off(stickyNS).on(stickyNS, function() {
                var scrollTop = win.scrollTop(),
                tableOffset = table.offset();

                if(scrollTop > tableOffset.top) {
                    $this.cloneContainer.css({
                                            'position': 'fixed',
                                            'top': '0px'
                                        })
                                        .addClass('pui-shadow pui-sticky');

                    if(scrollTop >= (tableOffset.top + $this.tbody.height()))
                        $this.cloneContainer.hide();
                    else
                        $this.cloneContainer.show();
                }
                else {
                    $this.cloneContainer.css({
                                            'position': 'absolute',
                                            'top': tableOffset.top
                                        })
                                        .removeClass('pui-shadow pui-sticky');
                }
            })
            .off(resizeNS).on(resizeNS, function() {
                $this.cloneContainer.width(table.outerWidth());
            });

            //filter support
            this.thead.find('.pui-column-filter').prop('disabled', true);
        },
        
        _initEditing: function() {
            var cellSelector = '> tr > td.pui-editable-column',
            $this = this;
            
            this.tbody.off('click', cellSelector)
                        .on('click', cellSelector, null, function(e) {
                            var cell = $(this);
                            if(!cell.hasClass('pui-cell-editing')) {
                                $this._showCellEditor(cell);
                                e.stopPropagation();
                            }
                        });
        },
  
        _showCellEditor: function(cell) {
            var editor = this.editors[cell.data('editor')].call(),
            $this = this;
    
            editor.val(cell.data('rowdata')[cell.data('field')]);
            
            cell.addClass('pui-cell-editing').html('').append(editor);
            
            editor.focus().on('change', function() {
                $this._onCellEditorChange(cell);
            })
            .on('blur', function() {
                $this._onCellEditorBlur(cell);
            })
            .on('keydown', function(e) {
                var key = e.which,
                keyCode = $.ui.keyCode;

                if((key === keyCode.ENTER||key === keyCode.NUMPAD_ENTER)) {
                    $(this).trigger('change').trigger('blur');
                    e.preventDefault();
                }
                else if(key === keyCode.TAB) {
                    if(e.shiftKey) {
                        var prevCell = cell.prevAll('td.pui-editable-column').eq(0);
                        if(!prevCell.length) {
                            prevCell = cell.parent().prev('tr').children('td.pui-editable-column:last');
                        }
                        if(prevCell.length) {
                            $this._showCellEditor(prevCell);
                        }
                    }
                    else {
                        var nextCell = cell.nextAll('td.pui-editable-column').eq(0);
                        if(!nextCell.length) {
                            nextCell = cell.parent().next('tr').children('td.pui-editable-column').eq(0);
                        }
                        if(nextCell.length) {
                            $this._showCellEditor(nextCell);
                        }
                    }
                    
                    e.preventDefault();
                } else if(key === keyCode.ESCAPE) {
                    $this._onCellEditorBlur(cell);
                }
                
            });
        },
        
        _onCellEditorChange: function(cell) {
            var newCellValue = cell.children('.pui-cell-editor').val();
            
            var retVal = this._trigger('cellEdit', null, {
                oldValue: cell.data('rowdata')[cell.data('field')],
                newValue: newCellValue,
                data: cell.data('rowdata'),
                field: cell.data('field')
            });
            
            if(retVal !== false) {
                cell.data('rowdata')[cell.data('field')] = newCellValue;
            }
        },
        
        _onCellEditorBlur: function(cell) {
            cell.removeClass('pui-cell-editing').text(cell.data('rowdata')[cell.data('field')])
                    .children('.pui-cell-editor').remove();
        },
        
        editors: {
            
            'input': function() {
                return $('<input type="text" class="pui-cell-editor"/>');
            }
        }
    
    });
})();
/**
 * PrimeUI Datagrid Widget
 */
(function() {

    $.widget("primeui.puidatagrid", {
       
        options: {
            columns: 3,
            datasource: null,
            paginator: null,
            header: null,
            footer: null,
            content: null,
            lazy: false,
            template: null
        },
        
        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
                        
            this.element.addClass('pui-datagrid ui-widget');
            
            //header
            if(this.options.header) {
                this.element.append('<div class="pui-datagrid-header ui-widget-header ui-corner-top">' + this.options.header + '</div>');
            }
            
            //content
            this.content = $('<div class="pui-datagrid-content ui-widget-content pui-grid pui-grid-responsive"></div>').appendTo(this.element);
            
            //footer
            if(this.options.footer) {
                this.element.append('<div class="pui-datagrid-footer ui-widget-header ui-corner-top">' + this.options.footer + '</div>');
            }
            
            //data
            if(this.options.datasource) {
                this._initDatasource();
            }
        },
        
        _onDataInit: function(data) {
            this._onDataUpdate(data);
            this._initPaginator();
        },
                
        _onDataUpdate: function(data) {
            this.data = data;
            if(!this.data) {
                this.data = [];
            }
            
            this.reset();
                
            this._renderData();
        },
        
        _onLazyLoad: function(data) {
            this.data = data;
            if(!this.data) {
                this.data = [];
            }
            
            this._renderData();
        },
        
        reset: function() {            
            if(this.paginator) {
                this.paginator.puipaginator('setState', {
                    page: 0,
                    totalRecords: this.options.lazy ? this.options.paginator.totalRecords : this.data.length
                });
            }
        },
                
        paginate: function() {
            if(this.options.lazy) {
                this.options.datasource.call(this, this._onLazyLoad, this._createStateMeta());
            }
            else {
               this._renderData();
            }
        },
               
        _renderData: function() {
            if(this.data) {
                this.content.html('');
                
                var firstNonLazy = this._getFirst(),
                first = this.options.lazy ? 0 : firstNonLazy,
                rows = this._getRows(),
                gridRow = null;

                for(var i = first; i < (first + rows); i++) {
                    var dataValue = this.data[i];
                    
                    if(dataValue) {
                        if(i % this.options.columns === 0) {
                            gridRow = $('<div class="pui-grid-row"></div>').appendTo(this.content);
                        }
                        
                        var gridColumn = $('<div class="pui-datagrid-column ' + PUI.getGridColumn(this.options.columns) + '"></div>').appendTo(gridRow),
                        markup = this._createItemContent(dataValue);
                        gridColumn.append(markup);
                    }
                }
            }
        },
                                
        _getFirst: function() {
            if(this.paginator) {
                var page = this.paginator.puipaginator('option', 'page'),
                rows = this.paginator.puipaginator('option', 'rows');
                
                return (page * rows);
            }
            else {
                return 0;
            }
        },
        
        _getRows: function() {
            if(this.options.paginator)
                return this.paginator ? this.paginator.puipaginator('option', 'rows') : this.options.paginator.rows; 
            else
                return this.data ? this.data.length : 0;
        },
            
        _createStateMeta: function() {
            var state = {
                first: this._getFirst(),
                rows: this._getRows()
            };
            
            return state;
        },
        
        _initPaginator: function() {
            var $this = this;
            if(this.options.paginator) {
                this.options.paginator.paginate = function(event, state) {
                    $this.paginate();
                };
                
                this.options.paginator.totalRecords = this.options.lazy ? this.options.paginator.totalRecords : this.data.length;
                this.paginator = $('<div></div>').insertAfter(this.content).puipaginator(this.options.paginator);
            }
        },
        
        _initDatasource: function() {
            if($.isArray(this.options.datasource)) {
                this._onDataInit(this.options.datasource);
            }
            else {
                if($.type(this.options.datasource) === 'string') {
                    var $this = this,
                    dataURL = this.options.datasource;

                    this.options.datasource = function() {
                        $.ajax({
                            type: 'GET',
                            url: dataURL,
                            dataType: "json",
                            context: $this,
                            success: function (response) {
                                this._onDataInit(response);
                            }
                        });
                    };
                }
                
                if($.type(this.options.datasource) === 'function') {
                    if(this.options.lazy)
                        this.options.datasource.call(this, this._onDataInit, {first:0, rows: this._getRows()});
                    else
                        this.options.datasource.call(this, this._onDataInit);
                }
            }
        },
                
        _updateDatasource: function(datasource) {
            this.options.datasource = datasource;
            
            if($.isArray(this.options.datasource)) {
                this._onDataUpdate(this.options.datasource);
            }
            else if($.type(this.options.datasource) === 'function') {
                if(this.options.lazy)
                    this.options.datasource.call(this, this._onDataUpdate, {first:0, rows: this._getRows()});
                else
                    this.options.datasource.call(this, this._onDataUpdate);
            }
        },
                
        _setOption: function(key, value) {
            if(key === 'datasource') {
                this._updateDatasource(value);
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        },
        
        _createItemContent: function(obj) {
            if(this.options.template) {
                var template = this.options.template.html();
                Mustache.parse(template);
                return Mustache.render(template, obj);
            }
            else {
                return this.options.content.call(this, obj);
            }
        }
        
    });
})();/**
 * PrimeUI Datascroller Widget
 */
(function() {

    $.widget("primeui.puidatascroller", {
       
        options: {
            header: null,
            buffer: 0.9,
            chunkSize: 10,
            datasource: null,
            lazy: false,
            content: null,
            template: null,
            mode: 'document',
            loader: null,
            scrollHeight: null,
            totalSize: null
        },
        
        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
            
            this.element.addClass('pui-datascroller ui-widget');
            if(this.options.header) {
                this.header = this.element.append('<div class="pui-datascroller-header ui-widget-header ui-corner-top">' + this.options.header + '</div>').children('.pui-datascroller-header');
            }
            
            this.content = this.element.append('<div class="pui-datascroller-content ui-widget-content ui-corner-bottom"></div>').children('.pui-datascroller-content');
            this.list = this.content.append('<ul class="pui-datascroller-list"></ul>').children('.pui-datascroller-list');
            this.loaderContainer = this.content.append('<div class="pui-datascroller-loader"></div>').children('.pui-datascroller-loader');
            this.loadStatus = $('<div class="pui-datascroller-loading"></div>');
            this.loading = false;
            this.allLoaded = false;
            this.offset = 0;
            
            if(this.options.mode === 'self') {
                this.element.addClass('pui-datascroller-inline');
                
                if(this.options.scrollHeight) {
                    this.content.css('height', this.options.scrollHeight);
                }
            }
            
            if(this.options.loader) {
                this.bindManualLoader();
            }
            else {
                this.bindScrollListener();
            }

            if(this.options.datasource) {
                if($.isArray(this.options.datasource)) {
                    this._onDataInit(this.options.datasource);
                }
                else {
                    if($.type(this.options.datasource) === 'string') {
                        var $this = this,
                        dataURL = this.options.datasource;
                
                        this.options.datasource = function() {
                            $.ajax({
                                type: 'GET',
                                url: dataURL,
                                dataType: "json",
                                context: $this,
                                success: function (response) {
                                    this._onDataInit(response);
                                }
                            });
                        };
                    }
                    
                    if($.type(this.options.datasource) === 'function') {
                        if(this.options.lazy)
                            this.options.datasource.call(this, this._onLazyLoad, {first:this.offset});
                        else
                            this.options.datasource.call(this, this._onDataInit);
                    }
                }
            }
        },
        
        _onDataInit: function(data) {
            this.data = data||[];
            this.options.totalSize = this.data.length;
            
            this._load();
        },
        
        _onLazyLoad: function(data) {
            this._renderData(data, 0, this.options.chunkSize);
            
            this._onloadComplete();
        },
        
        bindScrollListener: function() {
            var $this = this;

            if(this.options.mode === 'document') {
                var win = $(window),
                doc = $(document),
                $this = this,
                NS = 'scroll.' + this.id;

                win.off(NS).on(NS, function () {
                    if(win.scrollTop() >= ((doc.height() * $this.options.buffer) - win.height()) && $this.shouldLoad()) {
                        $this._load();
                    }
                });
            }
            else {
                this.content.on('scroll', function () {
                    var scrollTop = this.scrollTop,
                    scrollHeight = this.scrollHeight,
                    viewportHeight = this.clientHeight;

                    if((scrollTop >= ((scrollHeight * $this.options.buffer) - (viewportHeight))) && $this.shouldLoad()) {
                        $this._load();
                    }
                });
            }
        },

        bindManualLoader: function() {
            var $this = this;

            this.options.loader.on('click.dataScroller', function(e) {
                $this._load();
                e.preventDefault();
            });
        },

        _load: function() {
            this.loading = true;
            this.loadStatus.appendTo(this.loaderContainer);
            if(this.options.loader) {
                this.options.loader.hide();
            }

            if(this.options.lazy) {
                this.options.datasource.call(this, this._onLazyLoad, {first: this.offset});
            }
            else {
               this._renderData(this.data, this.offset, (this.offset + this.options.chunkSize));
               this._onloadComplete();
            }
        },
        
        _renderData: function(data, start, end) {
            if(data && data.length) {
                for(var i = start; i < end; i++) {
                    var listItem = $('<li class="pui-datascroller-item"></li>'),
                    content = this._createItemContent(data[i]);
                    listItem.append(content);
                    
                    this.list.append(listItem); 
                }
            }
        },
        
        shouldLoad: function() {
            return (!this.loading && !this.allLoaded);
        },
        
        _createItemContent: function(obj) {
            if(this.options.template) {
                var template = this.options.template.html();
                Mustache.parse(template);
                return Mustache.render(template, obj);
            }
            else {
                return this.options.content.call(this, obj);
            }
        },
        
        _onloadComplete: function() {
            this.offset += this.options.chunkSize;
            this.loading = false;
            this.allLoaded = this.offset >= this.options.totalSize;

            this.loadStatus.remove();

            if(this.options.loader && !this.allLoaded) {
                this.options.loader.show();
            }
        }
        
    });
    
})();/**
 * PrimeUI Dialog Widget
 */
(function() {

    $.widget("primeui.puidialog", {
       
        options: {
            draggable: true,
            resizable: true,
            location: 'center',
            minWidth: 150,
            minHeight: 25,
            height: 'auto',
            width: '300px',
            visible: false,
            modal: false,
            showEffect: null,
            hideEffect: null,
            effectOptions: {},
            effectSpeed: 'normal',
            closeOnEscape: true,
            rtl: false,
            closable: true,
            minimizable: false,
            maximizable: false,
            appendTo: null,
            buttons: null,
            responsive: false,
            title: null
        },
        
        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
            
            //container
            this.element.addClass('pui-dialog ui-widget ui-widget-content ui-helper-hidden ui-corner-all pui-shadow')
                        .contents().wrapAll('<div class="pui-dialog-content ui-widget-content" />');
                    
            //header
            var title = this.options.title||this.element.attr('title');
            this.element.prepend('<div class="pui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">' +
                                '<span id="' + this.element.attr('id') + '_label" class="pui-dialog-title">' + title + '</span>')
                                .removeAttr('title');
            
            //footer
            if(this.options.buttons) {
                this.footer = $('<div class="pui-dialog-buttonpane ui-widget-content ui-helper-clearfix"></div>').appendTo(this.element);
                for(var i = 0; i < this.options.buttons.length; i++) {
                    var buttonMeta = this.options.buttons[i],
                    button = $('<button type="button"></button>').appendTo(this.footer);
                    if(buttonMeta.text) {
                        button.text(buttonMeta.text);
                    }
                    
                    button.puibutton(buttonMeta);
                }  
            }
            
            if(this.options.rtl) {
                this.element.addClass('pui-dialog-rtl');
            }
            
            //elements
            this.content = this.element.children('.pui-dialog-content');
            this.titlebar = this.element.children('.pui-dialog-titlebar');
            
            if(this.options.closable) {
                this._renderHeaderIcon('pui-dialog-titlebar-close', 'fa-close');
            }
            
            if(this.options.maximizable) {
                this._renderHeaderIcon('pui-dialog-titlebar-maximize', 'fa-sort');
            }
            
            if(this.options.minimizable) {
                this._renderHeaderIcon('pui-dialog-titlebar-minimize', 'fa-minus');
            }
            
            //icons
            this.icons = this.titlebar.children('.pui-dialog-titlebar-icon');
            this.closeIcon = this.titlebar.children('.pui-dialog-titlebar-close');
            this.minimizeIcon = this.titlebar.children('.pui-dialog-titlebar-minimize');
            this.maximizeIcon = this.titlebar.children('.pui-dialog-titlebar-maximize');
            
            this.blockEvents = 'focus.puidialog mousedown.puidialog mouseup.puidialog keydown.puidialog keyup.puidialog';            
            this.parent = this.element.parent();
            
            //size
            this.element.css({'width': this.options.width, 'height': 'auto'});
            this.content.height(this.options.height);

            //events
            this._bindEvents();
            
            

            if(this.options.draggable) {
                this._setupDraggable();
            }

            if(this.options.resizable) {
                this._setupResizable();
            }

            if(this.options.appendTo) {
                this.element.appendTo(this.options.appendTo);
            }
            
            if(this.options.responsive) {
                this.resizeNS = 'resize.' + this.id;
            }

            //docking zone
            if($(document.body).children('.pui-dialog-docking-zone').length === 0) {
                $(document.body).append('<div class="pui-dialog-docking-zone"></div>');
            }

            //aria
            this._applyARIA();

            if(this.options.visible) {
                this.show();
            }
        },
        
        _renderHeaderIcon: function(styleClass, icon) {
            this.titlebar.append('<a class="pui-dialog-titlebar-icon ' + styleClass + ' ui-corner-all" href="#" role="button">' +
                                '<span class="pui-icon fa fa-fw ' + icon + '"></span></a>');
        },
        
        _enableModality: function() {
            var $this = this,
            doc = $(document);

            this.modality = $('<div id="' + this.element.attr('id') + '_modal" class="ui-widget-overlay pui-dialog-mask"></div>').appendTo(document.body)
                                .css('z-index', this.element.css('z-index') - 1);

            //Disable tabbing out of modal dialog and stop events from targets outside of dialog
            doc.bind('keydown.puidialog',
                    function(event) {
                        if(event.keyCode == $.ui.keyCode.TAB) {
                            var tabbables = $this.content.find(':tabbable'), 
                            first = tabbables.filter(':first'), 
                            last = tabbables.filter(':last');

                            if(event.target === last[0] && !event.shiftKey) {
                                first.focus(1);
                                return false;
                            } 
                            else if (event.target === first[0] && event.shiftKey) {
                                last.focus(1);
                                return false;
                            }
                        }
                    })
                    .bind(this.blockEvents, function(event) {
                        if ($(event.target).zIndex() < $this.element.zIndex()) {
                            return false;
                        }
                    });
        },

        _disableModality: function(){
            this.modality.remove();
            this.modality = null;
            $(document).unbind(this.blockEvents).unbind('keydown.dialog');
        },

        show: function() {
            if(this.element.is(':visible')) {
                return;
            }

            if(!this.positionInitialized) {
                this._initPosition();
            }
            
            this._trigger('beforeShow', null);

            if(this.options.showEffect) {
                var $this = this;

                this.element.show(this.options.showEffect, this.options.effectOptions, this.options.effectSpeed, function() {
                    $this._postShow();
                });
            }    
            else {
                this.element.show();

                this._postShow();
            }

            this._moveToTop();

            if(this.options.modal) {
                this._enableModality();
            }
        },

        _postShow: function() {   
            //execute user defined callback
            this._trigger('afterShow', null);

            this.element.attr({
                'aria-hidden': false,
                'aria-live': 'polite'
            });

            this._applyFocus();
            
            if(this.options.responsive) {
                this._bindResizeListener();
            }
        },

        hide: function() {   
            if(this.element.is(':hidden')) {
                return;
            }
            
            this._trigger('beforeHide', null);

            if(this.options.hideEffect) {
                var _self = this;

                this.element.hide(this.options.hideEffect, this.options.effectOptions, this.options.effectSpeed, function() {
                    _self._postHide();
                });
            }
            else {
                this.element.hide();

                this._postHide();
            }

            if(this.options.modal) {
                this._disableModality();
            }
        },
        
        _postHide: function() {
            //execute user defined callback
            this._trigger('afterHide', null);

            this.element.attr({
                'aria-hidden': true,
                'aria-live': 'off'
            });
            
            if(this.options.responsive) {
                this._unbindResizeListener();
            }
        },

        _applyFocus: function() {
            this.element.find(':not(:submit):not(:button):input:visible:enabled:first').focus();
        },

        _bindEvents: function() {   
            var $this = this;
            this.element.mousedown(function(e) {
                if(!$(e.target).data('ui-widget-overlay')) { 
                  $this._moveToTop();
                }
             });
            this.icons.mouseover(function() {
                $(this).addClass('ui-state-hover');
            }).mouseout(function() {
                $(this).removeClass('ui-state-hover');
            });

            this.closeIcon.on('click.puidialog', function(e) {
                $this.hide();
                e.preventDefault();
            });

            this.maximizeIcon.click(function(e) {
                $this.toggleMaximize();
                e.preventDefault();
            });

            this.minimizeIcon.click(function(e) {
                $this.toggleMinimize();
                e.preventDefault();
            });

            if(this.options.closeOnEscape) {
                $(document).on('keydown.dialog_' + this.element.attr('id'), function(e) {
                    var keyCode = $.ui.keyCode,
                    active = parseInt($this.element.css('z-index'), 10) === PUI.zindex;

                    if(e.which === keyCode.ESCAPE && $this.element.is(':visible') && active) {
                        $this.hide();
                    }
                });
            }
        },

        _setupDraggable: function() {    
            this.element.draggable({
                cancel: '.pui-dialog-content, .pui-dialog-titlebar-close',
                handle: '.pui-dialog-titlebar',
                containment : 'document'
            });
        },

        _setupResizable: function() {
            var $this = this;
            
            this.element.resizable({
                minWidth : this.options.minWidth,
                minHeight : this.options.minHeight,
                alsoResize : this.content,
                containment: 'document',
                start: function(event, ui) {
                    $this.element.data('offset', $this.element.offset());
                },
                stop: function(event, ui) {
                    var offset = $this.element.data('offset');

                    $this.element.css('position', 'fixed');
                    $this.element.offset(offset);
                }
            });

            this.resizers = this.element.children('.ui-resizable-handle');
        },

        _initPosition: function() {
            //reset
            this.element.css({left:0,top:0});

            if(/(center|left|top|right|bottom)/.test(this.options.location)) {
                this.options.location = this.options.location.replace(',', ' ');

                this.element.position({
                            my: 'center',
                            at: this.options.location,
                            collision: 'fit',
                            of: window,
                            //make sure dialog stays in viewport
                            using: function(pos) {
                                var l = pos.left < 0 ? 0 : pos.left,
                                t = pos.top < 0 ? 0 : pos.top;

                                $(this).css({
                                    left: l,
                                    top: t
                                });
                            }
                        });
            }
            else {
                var coords = this.options.position.split(','),
                x = $.trim(coords[0]),
                y = $.trim(coords[1]);

                this.element.offset({
                    left: x,
                    top: y
                });
            }

            this.positionInitialized = true;
        },

        _moveToTop: function() {
            this.element.css('z-index',++PUI.zindex);
        },

        toggleMaximize: function() {
            if(this.minimized) {
                this.toggleMinimize();
            }

            if(this.maximized) {
                this.element.removeClass('pui-dialog-maximized');
                this._restoreState();

                this.maximizeIcon.removeClass('ui-state-hover');//.children('.ui-icon').removeClass('ui-icon-newwin').addClass('ui-icon-extlink');
                this.maximized = false;
            }
            else {
                this._saveState();

                var win = $(window);

                this.element.addClass('pui-dialog-maximized').css({
                    'width': win.width() - 6,
                    'height': win.height()
                }).offset({
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                });

                //maximize content
                this.content.css({
                    width: 'auto',
                    height: 'auto'
                });

                this.maximizeIcon.removeClass('ui-state-hover');//.children('.ui-icon').removeClass('ui-icon-extlink').addClass('ui-icon-newwin');
                this.maximized = true;
                this._trigger('maximize');
            }
        },

        toggleMinimize: function() {
            var animate = true,
            dockingZone = $(document.body).children('.pui-dialog-docking-zone');

            if(this.maximized) {
                this.toggleMaximize();
                animate = false;
            }

            var $this = this;

            if(this.minimized) {
                this.element.appendTo(this.parent).removeClass('pui-dialog-minimized').css({'position':'fixed', 'float':'none'});
                this._restoreState();
                this.content.show();
                this.minimizeIcon.removeClass('ui-state-hover');//.children('.ui-icon').removeClass('ui-icon-plus').addClass('ui-icon-minus');
                this.minimized = false;

                if(this.options.resizable) {
                    this.resizers.show();
                }
                
                if(this.footer) {
                    this.footer.show();
                }
            }
            else {
                this._saveState();

                if(animate) {
                    this.element.effect('transfer', {
                                    to: dockingZone,
                                    className: 'pui-dialog-minimizing'
                                 }, 500,
                                    function() {
                                        $this._dock(dockingZone);
                                        $this.element.addClass('pui-dialog-minimized');
                                    });
                } 
                else {
                    this._dock(dockingZone);
                }
            }
        },

        _dock: function(zone) {
            this.element.appendTo(zone).css('position', 'static');
            this.element.css({'height':'auto', 'width':'auto', 'float': 'left'});
            this.content.hide();
            this.minimizeIcon.removeClass('ui-state-hover').children('.ui-icon').removeClass('ui-icon-minus').addClass('ui-icon-plus');
            this.minimized = true;

            if(this.options.resizable) {
                this.resizers.hide();
            }
            
            if(this.footer) {
                this.footer.hide();
            }
            
            zone.css('z-index',++PUI.zindex);

            this._trigger('minimize');
        },

        _saveState: function() {
            this.state = {
                width: this.element.width(),
                height: this.element.height()
            };

            var win = $(window);
            this.state.offset = this.element.offset();
            this.state.windowScrollLeft = win.scrollLeft();
            this.state.windowScrollTop = win.scrollTop();
        },

        _restoreState: function() {
            this.element.width(this.state.width).height(this.state.height);
            
            var win = $(window);
            this.element.offset({
                    top: this.state.offset.top + (win.scrollTop() - this.state.windowScrollTop),
                    left: this.state.offset.left + (win.scrollLeft() - this.state.windowScrollLeft)
            });
        },

        _applyARIA: function() {
            this.element.attr({
                'role': 'dialog',
                'aria-labelledby': this.element.attr('id') + '_title',
                'aria-hidden': !this.options.visible
            });

            this.titlebar.children('a.pui-dialog-titlebar-icon').attr('role', 'button');
        },
        
        _bindResizeListener: function() {
            var $this = this;
            $(window).on(this.resizeNS, function(e) {
                if(e.target === window) {
                    $this._initPosition();
                }
            });
        },

        _unbindResizeListener: function() {
            $(window).off(this.resizeNS);
        },

        _setOption: function(key, value) {
            if(key === 'visible') {
                if(value)
                    this.show();
                else
                    this.hide();
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }
    });
})();/**
 * PrimeUI dropdown widget
 */
(function() {

    $.widget("primeui.puidropdown", {
       
        options: {
            effect: 'fade',
            effectSpeed: 'normal',
            filter: false,
            filterMatchMode: 'startsWith',
            caseSensitiveFilter: false,
            filterFunction: null,
            data: null,
            content: null,
            scrollHeight: 200,
            appendTo: 'body',
            editable:false
        },

        _create: function() {
            if(this.options.data) {
                for(var i = 0; i < this.options.data.length; i++) {
                    var choice = this.options.data[i];
                    if(choice.label)
                        this.element.append('<option value="' + choice.value + '">' + choice.label + '</option>');
                    else
                        this.element.append('<option value="' + choice + '">' + choice + '</option>');
                }
            }
            
            this.element.wrap('<div class="pui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix" />')
                    .wrap('<div class="ui-helper-hidden-accessible" />');
            this.container = this.element.closest('.pui-dropdown');
            this.focusElementContainer = $('<div class="ui-helper-hidden-accessible"><input type="text" /></div>').appendTo(this.container);
            this.focusElement = this.focusElementContainer.children('input');
            this.label = this.options.editable ? $('<input type="text" class="pui-dropdown-label pui-inputtext ui-corner-all"">') 
                                : $('<label class="pui-dropdown-label pui-inputtext ui-corner-all"/>');
            this.label.appendTo(this.container);
            this.menuIcon = $('<div class="pui-dropdown-trigger ui-state-default ui-corner-right"><span class="pui-icon fa fa-fw fa-caret-down"></span></div>')
                                .appendTo(this.container);
            //panel
            this.panel = $('<div class="pui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden pui-shadow" />');
            if(this.options.appendTo === 'self')
                this.panel.appendTo(this.container);
            else
                this.panel.appendTo(this.options.appendTo);
                
            this.itemsWrapper = $('<div class="pui-dropdown-items-wrapper" />').appendTo(this.panel);
            this.itemsContainer = $('<ul class="pui-dropdown-items pui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul>')
                                    .appendTo(this.itemsWrapper);
                            
            this.disabled = this.element.prop('disabled');
            this.choices = this.element.children('option');
            this.optGroupsSize = this.itemsContainer.children('li.puiselectonemenu-item-group').length;
            
            if(this.options.filter) {
                this.filterContainer = $('<div class="pui-dropdown-filter-container" />').prependTo(this.panel);
                this.filterInput = $('<input type="text" autocomplete="off" class="pui-dropdown-filter pui-inputtext ui-widget ui-state-default ui-corner-all" />')
                                            .appendTo(this.filterContainer);
                this.filterContainer.append('<span class="pui-icon fa fa-search"></span>');
            }

            this._generateItems();
            
            if(this.options.scrollHeight && this.panel.outerHeight() > this.options.scrollHeight) {
                this.itemsWrapper.height(this.options.scrollHeight);
            }
            
            var $this = this,
            selectedOption = this.choices.filter(':selected');

            //disable options
            this.choices.filter(':disabled').each(function() {
                $this.items.eq($(this).index()).addClass('ui-state-disabled');
            });

            //triggers
            this.triggers = this.options.editable ? this.menuIcon : this.container.children('.pui-dropdown-trigger, .pui-dropdown-label');

            //activate selected
            if(this.options.editable) {
                var customInputVal = this.label.val();

                //predefined input
                if(customInputVal === selectedOption.text()) {
                    this._highlightItem(this.items.eq(selectedOption.index()));
                }
                //custom input
                else {
                    this.items.eq(0).addClass('ui-state-highlight');
                    this.customInput = true;
                    this.customInputVal = customInputVal;
                }
            }
            else {
                this._highlightItem(this.items.eq(selectedOption.index()));
            }

            if(!this.disabled) {            
                this._bindEvents();
                this._bindConstantEvents();
            }
        },
        
        _generateItems: function() {
            for(var i = 0; i < this.choices.length; i++) {
                var option = this.choices.eq(i),
                optionLabel = option.text(),
                content = this.options.content ? this.options.content.call(this, this.options.data[i]) : optionLabel;
                    
                this.itemsContainer.append('<li data-label="' + optionLabel + '" class="pui-dropdown-item pui-dropdown-list-item ui-corner-all">' + content + '</li>');
            }
            
            this.items = this.itemsContainer.children('.pui-dropdown-item');
        },
        
        _bindEvents: function() {
            var $this = this;

            this.items.filter(':not(.ui-state-disabled)').each(function(i, item) {
                $this._bindItemEvents($(item));
            });

            this.triggers.on('mouseenter.puidropdown', function() {
                if(!$this.container.hasClass('ui-state-focus')) {
                    $this.container.addClass('ui-state-hover');
                    $this.menuIcon.addClass('ui-state-hover');
                }
            })
            .on('mouseleave.puidropdown', function() {
                $this.container.removeClass('ui-state-hover');
                $this.menuIcon.removeClass('ui-state-hover');
            })
            .on('click.puidropdown', function(e) {
                if($this.panel.is(":hidden")) {
                    $this._show();
                }
                else {
                    $this._hide();

                    $this._revert();
                }

                $this.container.removeClass('ui-state-hover');
                $this.menuIcon.removeClass('ui-state-hover');          
                $this.focusElement.trigger('focus.puidropdown');
                e.preventDefault();
            });

            this.focusElement.on('focus.puidropdown', function() {
                $this.container.addClass('ui-state-focus');
                $this.menuIcon.addClass('ui-state-focus');
            })
            .on('blur.puidropdown', function() {
                $this.container.removeClass('ui-state-focus');
                $this.menuIcon.removeClass('ui-state-focus');
            });

            if(this.options.editable) {
                this.label.on('change.pui-dropdown', function() {
                    $this._triggerChange(true);
                    $this.customInput = true;
                    $this.customInputVal = $(this).val();
                    $this.items.filter('.ui-state-highlight').removeClass('ui-state-highlight');
                    $this.items.eq(0).addClass('ui-state-highlight');
                });
            }

            this._bindKeyEvents();

            if(this.options.filter) {
                this._setupFilterMatcher();

                this.filterInput.puiinputtext();

                this.filterInput.on('keyup.pui-dropdown', function() {
                    $this._filter($(this).val());
                });
            }
        },
                
        _bindItemEvents: function(item) {
            var $this = this;
            
            item.on('mouseover.puidropdown', function() {
                var el = $(this);

                if(!el.hasClass('ui-state-highlight'))
                    $(this).addClass('ui-state-hover');
            })
            .on('mouseout.puidropdown', function() {
                $(this).removeClass('ui-state-hover');
            })
            .on('click.puidropdown', function() {
                $this._selectItem($(this));   
            });
        },
        
        _bindConstantEvents: function() {
            var $this = this;
            
            $(document.body).bind('mousedown.pui-dropdown', function (e) {
                if($this.panel.is(":hidden")) {
                    return;
                }

                var offset = $this.panel.offset();
                if (e.target === $this.label.get(0) ||
                    e.target === $this.menuIcon.get(0) ||
                    e.target === $this.menuIcon.children().get(0)) {
                    return;
                }

                if (e.pageX < offset.left ||
                    e.pageX > offset.left + $this.panel.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + $this.panel.height()) {

                    $this._hide();
                    $this._revert();
                }
            });

            this.resizeNS = 'resize.' + this.id;
            this._unbindResize();
            this._bindResize();
        },
        
        _bindKeyEvents: function() {
            var $this = this;

            this.focusElement.on('keydown.puiselectonemenu', function(e) {
                var keyCode = $.ui.keyCode,
                    key = e.which,
                    activeItem;

                switch(key) { 
                    case keyCode.UP:
                    case keyCode.LEFT:
                        activeItem = $this._getActiveItem();
                        var prev = activeItem.prevAll(':not(.ui-state-disabled,.ui-selectonemenu-item-group):first');

                        if(prev.length == 1) {
                            if($this.panel.is(':hidden')) {
                                $this._selectItem(prev);
                            } 
                            else {
                                $this._highlightItem(prev);
                                PUI.scrollInView($this.itemsWrapper, prev);
                            }
                        }

                        e.preventDefault();                    
                    break;

                    case keyCode.DOWN:
                    case keyCode.RIGHT:
                        activeItem = $this._getActiveItem();
                        var next = activeItem.nextAll(':not(.ui-state-disabled,.ui-selectonemenu-item-group):first');

                        if(next.length == 1) {
                            if($this.panel.is(':hidden')) {
                                if(e.altKey) {
                                    $this._show();
                                } else {
                                    $this._selectItem(next);
                                }
                            }
                            else {
                                $this._highlightItem(next);
                                PUI.scrollInView($this.itemsWrapper, next);
                            }
                        }

                        e.preventDefault();
                    break;

                    case keyCode.ENTER:
                    case keyCode.NUMPAD_ENTER: 
                        if($this.panel.is(':hidden')) {
                            $this._show();
                        }
                        else {
                            $this._selectItem($this._getActiveItem());
                        }

                        e.preventDefault();
                    break;

                    case keyCode.TAB:
                        if($this.panel.is(':visible')) {
                            $this._revert();
                            $this._hide();
                        }
                    break;

                    case keyCode.ESCAPE:
                        if($this.panel.is(':visible')) {
                            $this._revert();
                            $this._hide();
                        }
                    break;

                    default:    
                        var k = String.fromCharCode((96 <= key && key <= 105)? key-48 : key),
                        currentItem = $this.items.filter('.ui-state-highlight');

                        //Search items forward from current to end and on no result, search from start until current
                        var highlightItem = $this._search(k, currentItem.index() + 1, $this.options.length);
                        if(!highlightItem) {
                            highlightItem = $this._search(k, 0, currentItem.index());
                        }

                        if(highlightItem) {
                            if($this.panel.is(':hidden')) {
                                $this._selectItem(highlightItem);
                            }
                            else {
                                $this._highlightItem(highlightItem);
                                PUI.scrollInView($this.itemsWrapper, highlightItem);
                            }    
                        }

                    break;
                }
            });
        },
                
        _selectItem: function(item, silent) {
            var selectedOption = this.choices.eq(this._resolveItemIndex(item)),
            currentOption = this.choices.filter(':selected'),
            sameOption = selectedOption.val() == currentOption.val(),
            shouldChange = null;

            if(this.options.editable) {
                shouldChange = (!sameOption)||(selectedOption.text() != this.label.val());
            }
            else {
                shouldChange = !sameOption;
            }

            if(shouldChange) {
                this._highlightItem(item);
                this.element.val(selectedOption.val());

                this._triggerChange();

                if(this.options.editable) {
                    this.customInput = false;
                }
            }

            if(!silent) {
                this.focusElement.trigger('focus.puidropdown');
            }

            if(this.panel.is(':visible')) {
                this._hide();
            }
        },
        
        _highlightItem: function(item) {
            this.items.filter('.ui-state-highlight').removeClass('ui-state-highlight');
            
            if(item.length) {
                item.addClass('ui-state-highlight');

                this._setLabel(item.data('label'));
            }
            else {
                this._setLabel('&nbsp;');
            }
        },
        
        _triggerChange: function(edited) {
            this.changed = false;

            if(this.options.change) {
                this._trigger('change');
            }

            if(!edited) {
                this.value = this.choices.filter(':selected').val();
            }
        },
        
        _resolveItemIndex: function(item) {
            if(this.optGroupsSize === 0) {
                return item.index();
            }
            else {
                return item.index() - item.prevAll('li.pui-dropdown-item-group').length;
            }
        },
        
        _setLabel: function(value) {
            if(this.options.editable) {
                this.label.val(value);
            }
            else {
                if(value === '&nbsp;') {
                    this.label.html('&nbsp;');
                }
                else {
                    this.label.text(value);
                }
            }
        },
        
        _bindResize: function() {
            var $this = this;

            $(window).bind(this.resizeNS, function(e) {
                if($this.panel.is(':visible')) {
                    $this._alignPanel();
                }
            });
        },

        _unbindResize: function() {
            $(window).unbind(this.resizeNS);
        },

        _unbindEvents: function() {
            this.items.off();
            this.triggers.off();
            this.label.off();
        },
        
        _alignPanelWidth: function() {
            if(!this.panelWidthAdjusted) {
                var jqWidth = this.container.outerWidth();
                if(this.panel.outerWidth() < jqWidth) {
                    this.panel.width(jqWidth);
                }

                this.panelWidthAdjusted = true;
            }
        },
        
        _alignPanel: function() {
            if(this.panel.parent().is(this.container)) {
                this.panel.css({
                    left: '0px',
                    top: this.container.outerHeight() + 'px'
                })
                .width(this.container.outerWidth());
            } 
            else {
                this._alignPanelWidth();
                this.panel.css({left:'', top:''}).position({
                                            my: 'left top',
                                            at: 'left bottom',
                                            of: this.container,
                                            collision: 'flipfit'
                                        });
            }
        },
        
        _show: function() {
            this._alignPanel();

            this.panel.css('z-index', ++PUI.zindex);
            
            if(this.options.effect !== 'none') {
                this.panel.show(this.options.effect, {}, this.options.effectSpeed);
            }
            else {
                this.panel.show();
            }
            this.preShowValue = this.choices.filter(':selected');
        },

        _hide: function() {
            this.panel.hide();
        },
        
        _revert: function() {
            if(this.options.editable && this.customInput) {
                this._setLabel(this.customInputVal);
                this.items.filter('.ui-state-active').removeClass('ui-state-active');
                this.items.eq(0).addClass('ui-state-active');
            }
            else {
                this._highlightItem(this.items.eq(this.preShowValue.index()));
            }
        },
        
        _getActiveItem: function() {
            return this.items.filter('.ui-state-highlight');
        },
        
        _setupFilterMatcher: function() {
            this.filterMatchers = {
                'startsWith': this._startsWithFilter,
                'contains': this._containsFilter,
                'endsWith': this._endsWithFilter,
                'custom': this.options.filterFunction
            };

            this.filterMatcher = this.filterMatchers[this.options.filterMatchMode];
        },

        _startsWithFilter: function(value, filter) {
            return value.indexOf(filter) === 0;
        },

        _containsFilter: function(value, filter) {
            return value.indexOf(filter) !== -1;
        },

        _endsWithFilter: function(value, filter) {
            return value.indexOf(filter, value.length - filter.length) !== -1;
        },

        _filter: function(value) {
            this.initialHeight = this.initialHeight||this.itemsWrapper.height();        
            var filterValue = this.options.caseSensitiveFilter ? $.trim(value) : $.trim(value).toLowerCase();

            if(filterValue === '') {
                this.items.filter(':hidden').show();
            }
            else {
                for(var i = 0; i < this.choices.length; i++) {
                    var option = this.choices.eq(i),
                    itemLabel = this.options.caseSensitiveFilter ? option.text() : option.text().toLowerCase(),
                    item = this.items.eq(i);

                    if(this.filterMatcher(itemLabel, filterValue))
                        item.show();
                    else
                        item.hide();
                }
            }

            if(this.itemsContainer.height() < this.initialHeight) {
                this.itemsWrapper.css('height', 'auto');
            }
            else {
                this.itemsWrapper.height(this.initialHeight);
            }
        },
        
        _search: function(text, start, end) { 
            for(var i = start; i  < end; i++) {
                var option = this.choices.eq(i);

                if(option.text().indexOf(text) === 0) {
                    return this.items.eq(i);
                }
            }

            return null;
        },

        getSelectedValue: function() {
            return this.element.val();
        },

        getSelectedLabel: function() {
            return this.choices.filter(':selected').text();
        },
        
        selectValue : function(value) {
            var option = this.choices.filter('[value="' + value + '"]');

            this._selectItem(this.items.eq(option.index()), true);
        },

        addOption: function(option, val) {
            var value, label;
            
            //backward compatibility for key-value parameters
            if(val !== undefined && val !== null) {
                value = val;
                label = option;
            }
            //key-value as properties of option object
            else {
                value = (option.value !== undefined && option.value !== null) ? option.value : option;
                label = (option.label !== undefined && option.label !== null) ? option.label : option;
            }
            
            var content = this.options.content ? this.options.content.call(this, option) : label,
            item = $('<li data-label="' + label + '" class="pui-dropdown-item pui-dropdown-list-item ui-corner-all">' + content + '</li>'),
            optionElement = $('<option value="' + value + '">' + label + '</option>');
            
            optionElement.appendTo(this.element);
            this._bindItemEvents(item);
            item.appendTo(this.itemsContainer);
            this.items.push(item[0]);
            this.choices = this.element.children('option');

            // If this is the first option, it is the default selected one
            if (this.items.length === 1) {
                this.selectValue(value);
                this._highlightItem(item);
            }
        },

        removeAllOptions: function() {
            this.element.empty();
            this.itemsContainer.empty();
            this.items.length = 0;
            this.choices.length = 0;
            this.element.val('');
            this.label.text('');
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            if (key === 'data') {
                this.removeAllOptions();
                
                for(var i = 0; i < this.options.data.length; i++) {
                    this.addOption(this.options.data[i]);
                }
                
                if(this.options.scrollHeight && this.panel.outerHeight() > this.options.scrollHeight) {
                    this.itemsWrapper.height(this.options.scrollHeight);
                }
            }
        },

        disable: function() {
            this._unbindEvents();
            this.label.addClass('ui-state-disabled');
            this.menuIcon.addClass('ui-state-disabled');
        },

        enable: function() {
            this._bindEvents();
            this.label.removeClass('ui-state-disabled');
            this.menuIcon.removeClass('ui-state-disabled');
        },
        
        getEditableText: function() {
            return this.label.val();
        }
    });
    
})();/**
 * PrimeFaces Fieldset Widget
 */
(function() {

    $.widget("primeui.puifieldset", {
       
        options: {
            toggleable: false,
            toggleDuration: 'normal',
            collapsed: false
        },
        
        _create: function() {
            this.element.addClass('pui-fieldset ui-widget ui-widget-content ui-corner-all').
                children('legend').addClass('pui-fieldset-legend ui-corner-all ui-state-default');
            
            this.element.contents().wrapAll('<div class="pui-fieldset-content" />');            
            
            this.content = this.element.children('div.pui-fieldset-content');
            this.legend = this.content.children('legend.pui-fieldset-legend');
            this.legend.prependTo(this.element);
            
            if(this.options.toggleable) {
                this.element.addClass('pui-fieldset-toggleable');
                this.toggler = $('<span class="pui-fieldset-toggler fa fa-fw" />').prependTo(this.legend);
                
                this._bindEvents();
                
                if(this.options.collapsed) {
                    this.content.hide();
                    this.toggler.addClass('fa-plus');
                } else {
                    this.toggler.addClass('fa-minus');
                }
            }
        },
        
        _bindEvents: function() {
            var $this = this;
            
            this.legend.on('click.puifieldset', function(e) {$this.toggle(e);})
                            .on('mouseover.puifieldset', function() {$this.legend.addClass('ui-state-hover');})
                            .on('mouseout.puifieldset', function() {$this.legend.removeClass('ui-state-hover ui-state-active');})
                            .on('mousedown.puifieldset', function() {$this.legend.removeClass('ui-state-hover').addClass('ui-state-active');})
                            .on('mouseup.puifieldset', function() {$this.legend.removeClass('ui-state-active').addClass('ui-state-hover');});
        },
        
        toggle: function(e) {
            var $this = this;

            this._trigger('beforeToggle', e);

            if(this.options.collapsed) {
                this.toggler.removeClass('fa-plus').addClass('fa-minus');
            }
            else {
                this.toggler.removeClass('fa-minus').addClass('fa-plus');
            }

            this.content.slideToggle(this.options.toggleSpeed, 'easeInOutCirc', function() {
                $this._trigger('afterToggle', e);
                $this.options.collapsed = !$this.options.collapsed;
            });
        }
        
    });
})();/**
 * PrimeUI Lightbox Widget
 */
(function() {

    $.widget("primeui.puigalleria", {
       
        options: {
            panelWidth: 600,
            panelHeight: 400,
            frameWidth: 60,
            frameHeight: 40,
            activeIndex: 0,
            showFilmstrip: true,
            autoPlay: true,
            transitionInterval: 4000,
            effect: 'fade',
            effectSpeed: 250,
            effectOptions: {},
            showCaption: true,
            customContent: false
        },
        
        _create: function() {
            this.element.addClass('pui-galleria ui-widget ui-widget-content ui-corner-all');
            this.panelWrapper = this.element.children('ul');
            this.panelWrapper.addClass('pui-galleria-panel-wrapper');
            this.panels = this.panelWrapper.children('li');
            this.panels.addClass('pui-galleria-panel ui-helper-hidden');
                        
            this.element.width(this.options.panelWidth);
            this.panelWrapper.width(this.options.panelWidth).height(this.options.panelHeight);
            this.panels.width(this.options.panelWidth).height(this.options.panelHeight);

            if(this.options.showFilmstrip) {
                this._renderStrip();
                this._bindEvents();
            }
            
            if(this.options.customContent) {
                this.panels.children('img').remove();
                this.panels.children('div').addClass('pui-galleria-panel-content');
            }
            
            //show first
            var activePanel = this.panels.eq(this.options.activeIndex);
            activePanel.removeClass('ui-helper-hidden');
            if(this.options.showCaption) {
                this._showCaption(activePanel);
            }
            
            this.element.css('visibility', 'visible');

            if(this.options.autoPlay) {
                this.startSlideshow();
            }
        },
        
        _renderStrip: function() {
            var frameStyle = 'style="width:' + this.options.frameWidth + "px;height:" + this.options.frameHeight + 'px;"';

            this.stripWrapper = $('<div class="pui-galleria-filmstrip-wrapper"></div>')
                    .width(this.element.width() - 50)
                    .height(this.options.frameHeight)
                    .appendTo(this.element);

            this.strip = $('<ul class="pui-galleria-filmstrip"></div>').appendTo(this.stripWrapper);

            for(var i = 0; i < this.panels.length; i++) {
                var image = this.panels.eq(i).children('img'),
                frameClass = (i == this.options.activeIndex) ? 'pui-galleria-frame pui-galleria-frame-active' : 'pui-galleria-frame',
                frameMarkup = '<li class="'+ frameClass + '" ' + frameStyle + '>' +
                '<div class="pui-galleria-frame-content" ' + frameStyle + '>' +
                '<img src="' + image.attr('src') + '" class="pui-galleria-frame-image" ' + frameStyle + '/>' +
                '</div></li>';

                this.strip.append(frameMarkup);
            }

            this.frames = this.strip.children('li.pui-galleria-frame');

            //navigators
            this.element.append('<div class="pui-galleria-nav-prev fa fa-fw fa-chevron-circle-left" style="bottom:' + (this.options.frameHeight / 2) + 'px"></div>' + 
                '<div class="pui-galleria-nav-next fa fa-fw fa-chevron-circle-right" style="bottom:' + (this.options.frameHeight / 2) + 'px"></div>');

            //caption
            if(this.options.showCaption) {
                this.caption = $('<div class="pui-galleria-caption"></div>').css({
                    'bottom': this.stripWrapper.outerHeight() + 10,
                    'width': this.panelWrapper.width()
                    }).appendTo(this.element);
            }
        },
        
        _bindEvents: function() {
            var $this = this;

            this.element.children('div.pui-galleria-nav-prev').on('click.puigalleria', function() {
                if($this.slideshowActive) {
                    $this.stopSlideshow();
                }

                if(!$this.isAnimating()) {
                    $this.prev();
                }
            });

            this.element.children('div.pui-galleria-nav-next').on('click.puigalleria', function() {
                if($this.slideshowActive) {
                    $this.stopSlideshow();
                }

                if(!$this.isAnimating()) {
                    $this.next();
                }
            });

            this.strip.children('li.pui-galleria-frame').on('click.puigalleria', function() {
                if($this.slideshowActive) {
                    $this.stopSlideshow();
                }

                $this.select($(this).index(), false);
            });
        },

        startSlideshow: function() {
            var $this = this;

            this.interval = window.setInterval(function() {
                $this.next();
            }, this.options.transitionInterval);

            this.slideshowActive = true;
        },

        stopSlideshow: function() {
            window.clearInterval(this.interval);

            this.slideshowActive = false;
        },

        isSlideshowActive: function() {
            return this.slideshowActive;
        },

        select: function(index, reposition) {
            if(index !== this.options.activeIndex) {
                if(this.options.showCaption) {
                    this._hideCaption();
                }

                var oldPanel = this.panels.eq(this.options.activeIndex),
                newPanel = this.panels.eq(index);

                //content
                oldPanel.hide(this.options.effect, this.options.effectOptions, this.options.effectSpeed);
                newPanel.show(this.options.effect, this.options.effectOptions, this.options.effectSpeed);

                if (this.options.showFilmstrip) {
                    var oldFrame = this.frames.eq(this.options.activeIndex),
                        newFrame = this.frames.eq(index);

                    //frame
                    oldFrame.removeClass('pui-galleria-frame-active').css('opacity', '');
                    newFrame.animate({opacity:1.0}, this.options.effectSpeed, null, function() {
                       $(this).addClass('pui-galleria-frame-active');
                    });

                    //viewport
                    if( (reposition === undefined || reposition === true) ) {
                        var frameLeft = newFrame.position().left,
                            stepFactor = this.options.frameWidth + parseInt(newFrame.css('margin-right'), 10),
                            stripLeft = this.strip.position().left,
                            frameViewportLeft = frameLeft + stripLeft,
                            frameViewportRight = frameViewportLeft + this.options.frameWidth;

                        if(frameViewportRight > this.stripWrapper.width()) {
                            this.strip.animate({left: '-=' + stepFactor}, this.options.effectSpeed, 'easeInOutCirc');
                        } else if(frameViewportLeft < 0) {
                            this.strip.animate({left: '+=' + stepFactor}, this.options.effectSpeed, 'easeInOutCirc');
                        }
                    }
                }

                //caption
                if(this.options.showCaption) {
                    this._showCaption(newPanel);
                }

                this.options.activeIndex = index;
            }
        },
        
        _hideCaption: function() {
            this.caption.slideUp(this.options.effectSpeed);
        },
        
        _showCaption: function(panel) {
            var image = panel.children('img');
            this.caption.html('<h4>' + image.attr('title') + '</h4><p>' + image.attr('alt') + '</p>').slideDown(this.options.effectSpeed);
        },

        prev: function() {
            if(this.options.activeIndex !== 0) {
                this.select(this.options.activeIndex - 1);
            }
        },

        next: function() {
            if(this.options.activeIndex !== (this.panels.length - 1)) {
                this.select(this.options.activeIndex + 1);
            } 
            else {
                this.select(0, false);
                this.strip.animate({left: 0}, this.options.effectSpeed, 'easeInOutCirc');
            }
        },

        isAnimating: function() {
            return this.strip.is(':animated');
        }
    });
})();/**
 * PrimeFaces Growl Widget
 */
(function() {

    $.widget("primeui.puigrowl", {
       
        options: {
            sticky: false,
            life: 3000
        },
        
        _create: function() {
            var container = this.element;
            
            container.addClass("pui-growl ui-widget").appendTo(document.body);
        },
        
        show: function(msgs) {
            var $this = this;
        
            //this.jq.css('z-index', ++PrimeFaces.zindex);

            this.clear();

            $.each(msgs, function(i, msg) {
                $this._renderMessage(msg);
            }); 
        },
        
        clear: function() {
            this.element.children('div.pui-growl-item-container').remove();
        },
        
        _renderMessage: function(msg) {
            var markup = '<div class="pui-growl-item-container ui-state-highlight ui-corner-all ui-helper-hidden" aria-live="polite">';
            markup += '<div class="pui-growl-item pui-shadow">';
            markup += '<div class="pui-growl-icon-close fa fa-close" style="display:none"></div>';
            markup += '<span class="pui-growl-image fa fa-2x ' + this._getIcon(msg.severity) + ' pui-growl-image-' + msg.severity + '"/>';
            markup += '<div class="pui-growl-message">';
            markup += '<span class="pui-growl-title">' + msg.summary + '</span>';
            markup += '<p>' + (msg.detail||'') + '</p>';
            markup += '</div><div style="clear: both;"></div></div></div>';

            var message = $(markup);
            
            this._bindMessageEvents(message);
            message.appendTo(this.element).fadeIn();
        },
        
        _removeMessage: function(message) {
            message.fadeTo('normal', 0, function() {
                message.slideUp('normal', 'easeInOutCirc', function() {
                    message.remove();
                });
            });
        },
        
        _bindMessageEvents: function(message) {
            var $this = this,
            sticky = this.options.sticky;

            message.on('mouseover.puigrowl', function() {
                var msg = $(this);

                if(!msg.is(':animated')) {
                    msg.find('div.pui-growl-icon-close:first').show();
                }
            })
            .on('mouseout.puigrowl', function() {        
                $(this).find('div.pui-growl-icon-close:first').hide();
            });

            //remove message on click of close icon
            message.find('div.pui-growl-icon-close').on('click.puigrowl',function() {
                $this._removeMessage(message);

                if(!sticky) {
                    window.clearTimeout(message.data('timeout'));
                }
            });

            if(!sticky) {
                this._setRemovalTimeout(message);
            }
        },
        
        _setRemovalTimeout: function(message) {
            var $this = this;

            var timeout = window.setTimeout(function() {
                $this._removeMessage(message);
            }, this.options.life);

            message.data('timeout', timeout);
        },
        
        _getIcon: function(severity) {
            switch(severity) {
                case 'info':
                    return 'fa-info-circle';
                break;
                
                case 'warn':
                    return 'fa-warning';
                break;
                
                case 'error':
                    return 'fa-close';
                break;
                
                default:
                    return 'fa-info-circle';
                break;
            }
        }
    });
})();/**
 * PrimeUI inputtext widget
 */
(function() {

    $.widget("primeui.puiinputtext", {
       
        _create: function() {
            var input = this.element,
            disabled = input.prop('disabled');

            //visuals
            input.addClass('pui-inputtext ui-widget ui-state-default ui-corner-all');
            
            if(disabled)
                input.addClass('ui-state-disabled');
            else
                this._enableMouseEffects();

            //aria
            input.attr('role', 'textbox').attr('aria-disabled', disabled)
                                          .attr('aria-readonly', input.prop('readonly'))
                                          .attr('aria-multiline', input.is('textarea'));
        },
        
        _destroy: function() {

        },

        _enableMouseEffects: function () {
            var input = this.element;
            input.hover(function () {
                input.toggleClass('ui-state-hover');
            }).focus(function () {
                input.addClass('ui-state-focus');
            }).blur(function () {
                input.removeClass('ui-state-focus');
            });
        },

        _disableMouseEffects: function () {
            var input = this.element;
            input.off( "mouseenter mouseleave focus blur" );
        },

        disable: function () {
            this.element.prop('disabled', true);
            this.element.attr('aria-disabled', true);
            this.element.addClass('ui-state-disabled');
            this.element.removeClass('ui-state-focus ui-state-hover');
            this._disableMouseEffects();
        },

        enable: function () {
            this.element.prop('disabled', false);
            this.element.attr('aria-disabled', false);
            this.element.removeClass('ui-state-disabled');
            this._enableMouseEffects();
        },

        _setOption: function(key, value) {
            if(key === 'disabled') {
                if(value)
                    this.disable();
                else
                    this.enable();
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }
        
    });
    
})();/**
 * PrimeUI inputtextarea widget
 */
(function() {

    $.widget("primeui.puiinputtextarea", {
       
        options: {
            autoResize: false,
            autoComplete: false,
            maxlength: null,
            counter: null,
            counterTemplate: '{0}',
            minQueryLength: 3,
            queryDelay: 700,
            completeSource: null
        },

        _create: function() {
            var $this = this;
            
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
            
            this.element.puiinputtext();
            
            if(this.options.autoResize) {
                this.options.rowsDefault = this.element.attr('rows');
                this.options.colsDefault = this.element.attr('cols');
        
                this.element.addClass('pui-inputtextarea-resizable');
                
                this.element.keyup(function() {
                    $this._resize();
                }).focus(function() {
                    $this._resize();
                }).blur(function() {
                    $this._resize();
                });
            }
            
            if(this.options.maxlength) {
                this.element.keyup(function(e) {
                    var value = $this.element.val(),
                    length = value.length;

                    if(length > $this.options.maxlength) {
                        $this.element.val(value.substr(0, $this.options.maxlength));
                    }

                    if($this.options.counter) {
                        $this._updateCounter();
                    }
                });
            }
            
            if(this.options.counter) {
                this._updateCounter();
            }
            
            if(this.options.autoComplete) {
                this._initAutoComplete();
            }
        },
        
        _updateCounter: function() {
            var value = this.element.val(),
            length = value.length;

            if(this.options.counter) {
                var remaining = this.options.maxlength - length,
                remainingText = this.options.counterTemplate.replace('{0}', remaining);

                this.options.counter.text(remainingText);
            }
        },
        
        _resize: function() {
            var linesCount = 0,
            lines = this.element.val().split('\n');

            for(var i = lines.length-1; i >= 0 ; --i) {
                linesCount += Math.floor((lines[i].length / this.options.colsDefault) + 1);
            }

            var newRows = (linesCount >= this.options.rowsDefault) ? (linesCount + 1) : this.options.rowsDefault;

            this.element.attr('rows', newRows);
        },
        
        
        _initAutoComplete: function() {
            var panelMarkup = '<div id="' + this.id + '_panel" class="pui-autocomplete-panel ui-widget-content ui-corner-all ui-helper-hidden pui-shadow"></div>',
            $this = this;

            this.panel = $(panelMarkup).appendTo(document.body);

            this.element.keyup(function(e) {
                var keyCode = $.ui.keyCode;

                switch(e.which) {

                    case keyCode.UP:
                    case keyCode.LEFT:
                    case keyCode.DOWN:
                    case keyCode.RIGHT:
                    case keyCode.ENTER:
                    case keyCode.NUMPAD_ENTER:
                    case keyCode.TAB:
                    case keyCode.SPACE:
                    case keyCode.CONTROL:
                    case keyCode.ALT:
                    case keyCode.ESCAPE:
                    case 224:   //mac command
                        //do not search
                    break;

                    default:
                        var query = $this._extractQuery();           
                        if(query && query.length >= $this.options.minQueryLength) {

                             //Cancel the search request if user types within the timeout
                            if($this.timeout) {
                                $this._clearTimeout($this.timeout);
                            }

                            $this.timeout = window.setTimeout(function() {
                                $this.search(query);
                            }, $this.options.queryDelay);

                        }
                    break;
                }

            }).keydown(function(e) {
                var overlayVisible = $this.panel.is(':visible'),
                    keyCode = $.ui.keyCode,
                    highlightedItem;

                switch(e.which) {
                    case keyCode.UP:
                    case keyCode.LEFT:
                        if(overlayVisible) {
                            highlightedItem = $this.items.filter('.ui-state-highlight');
                            var prev = highlightedItem.length === 0 ? $this.items.eq(0) : highlightedItem.prev();

                            if(prev.length == 1) {
                                highlightedItem.removeClass('ui-state-highlight');
                                prev.addClass('ui-state-highlight');

                                if($this.options.scrollHeight) {
                                    PUI.scrollInView($this.panel, prev);
                                }
                            }

                            e.preventDefault();
                        }
                        else {
                            $this._clearTimeout();
                        }
                    break;

                    case keyCode.DOWN:
                    case keyCode.RIGHT:
                        if(overlayVisible) {
                            highlightedItem = $this.items.filter('.ui-state-highlight');
                            var next = highlightedItem.length === 0 ? _self.items.eq(0) : highlightedItem.next();

                            if(next.length == 1) {
                                highlightedItem.removeClass('ui-state-highlight');
                                next.addClass('ui-state-highlight');

                                if($this.options.scrollHeight) {
                                    PUI.scrollInView($this.panel, next);
                                }
                            }

                            e.preventDefault();
                        }
                        else {
                            $this._clearTimeout();
                        }
                    break;

                    case keyCode.ENTER:
                    case keyCode.NUMPAD_ENTER:
                        if(overlayVisible) {
                            $this.items.filter('.ui-state-highlight').trigger('click');

                            e.preventDefault();
                        }
                        else {
                            $this._clearTimeout();
                        } 
                    break;

                    case keyCode.SPACE:
                    case keyCode.CONTROL:
                    case keyCode.ALT:
                    case keyCode.BACKSPACE:
                    case keyCode.ESCAPE:
                    case 224:   //mac command
                        $this._clearTimeout();

                        if(overlayVisible) {
                            $this._hide();
                        }
                    break;

                    case keyCode.TAB:
                        $this._clearTimeout();

                        if(overlayVisible) {
                            $this.items.filter('.ui-state-highlight').trigger('click');
                            $this._hide();
                        }
                    break;
                }
            });

            //hide panel when outside is clicked
            $(document.body).bind('mousedown.puiinputtextarea', function (e) {
                if($this.panel.is(":hidden")) {
                    return;
                }
                var offset = $this.panel.offset();
                if(e.target === $this.element.get(0)) {
                    return;
                }

                if (e.pageX < offset.left ||
                    e.pageX > offset.left + $this.panel.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + $this.panel.height()) {
                    $this._hide();
                }
            });

            //Hide overlay on resize
            var resizeNS = 'resize.' + this.id;
            $(window).unbind(resizeNS).bind(resizeNS, function() {
                if($this.panel.is(':visible')) {
                    $this._hide();
                }
            });
        },

        _bindDynamicEvents: function() {
            var $this = this;

            //visuals and click handler for items
            this.items.bind('mouseover', function() {
                var item = $(this);

                if(!item.hasClass('ui-state-highlight')) {
                    $this.items.filter('.ui-state-highlight').removeClass('ui-state-highlight');
                    item.addClass('ui-state-highlight');
                }
            })
            .bind('click', function(event) {
                var item = $(this),
                itemValue = item.attr('data-item-value'),
                insertValue = itemValue.substring($this.query.length);

                $this.element.focus();

                $this.element.insertText(insertValue, $this.element.getSelection().start, true);

                $this._hide();
                
                $this._trigger("itemselect", event, item);
            });
        },

        _clearTimeout: function() {
            if(this.timeout) {
                window.clearTimeout(this.timeout);
            }

            this.timeout = null;
        },

        _extractQuery: function() {
            var end = this.element.getSelection().end,
            result = /\S+$/.exec(this.element.get(0).value.slice(0, end)),
            lastWord = result ? result[0] : null;

            return lastWord;
        },

        search: function(q) {
            this.query = q;

            var request = {
                query: q 
            };

            if(this.options.completeSource) {
                this.options.completeSource.call(this, request, this._handleResponse);
            }
        },

        _handleResponse: function(data) {
            this.panel.html('');
            
            var listContainer = $('<ul class="pui-autocomplete-items pui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul>');

            for(var i = 0; i < data.length; i++) {
                var item = $('<li class="pui-autocomplete-item pui-autocomplete-list-item ui-corner-all"></li>');
                item.attr('data-item-value', data[i].value);
                item.text(data[i].label);

                listContainer.append(item);
            }
            
            this.panel.append(listContainer);
            this.items = this.panel.find('.pui-autocomplete-item');

            this._bindDynamicEvents();

            if(this.items.length > 0) {
                //highlight first item
                this.items.eq(0).addClass('ui-state-highlight');

                //adjust height
                if(this.options.scrollHeight && this.panel.height() > this.options.scrollHeight) {
                    this.panel.height(this.options.scrollHeight);
                }

                if(this.panel.is(':hidden')) {
                    this._show();
                } 
                else {
                    this._alignPanel(); //with new items
                }

            }
            else {
                this.panel.hide();
            }
        },

        _alignPanel: function() {
            var pos = this.element.getCaretPosition(),
            offset = this.element.offset();

            this.panel.css({
                            'left': offset.left + pos.left,
                            'top': offset.top + pos.top,
                            'width': this.element.innerWidth()
                    });
        },

        _show: function() {
            this._alignPanel();

            this.panel.show();
        },

        _hide: function() {        
            this.panel.hide();
        },

        disable: function () {
            this.element.puiinputtext('disable');
        },

        enable: function () {
            this.element.puiinputtext('enable');
        }
    });
    
})();/**
 * PrimeUI Lightbox Widget
 */
(function() {

    $.widget("primeui.puilightbox", {
       
        options: {
            iframeWidth: 640,
            iframeHeight: 480,
            iframe: false
        },
        
        _create: function() { 
            this.options.mode = this.options.iframe ? 'iframe' : (this.element.children('div').length == 1) ? 'inline' : 'image';
            
            var dom = '<div class="pui-lightbox ui-widget ui-helper-hidden ui-corner-all pui-shadow">';
            dom += '<div class="pui-lightbox-content-wrapper">';
            dom += '<a class="ui-state-default pui-lightbox-nav-left ui-corner-right ui-helper-hidden"><span class="fa fa-fw fa-caret-left"></span></a>';
            dom += '<div class="pui-lightbox-content ui-corner-all"></div>';
            dom += '<a class="ui-state-default pui-lightbox-nav-right ui-corner-left ui-helper-hidden"><span class="fa fa-fw fa-caret-right"></span></a>';
            dom += '</div>';
            dom += '<div class="pui-lightbox-caption ui-widget-header"><span class="pui-lightbox-caption-text"></span>';
            dom += '<a class="pui-lightbox-close ui-corner-all" href="#"><span class="fa fa-fw fa-close"></span></a><div style="clear:both" /></div>';
            dom += '</div>';

            this.panel = $(dom).appendTo(document.body);
            this.contentWrapper = this.panel.children('.pui-lightbox-content-wrapper');
            this.content = this.contentWrapper.children('.pui-lightbox-content');
            this.caption = this.panel.children('.pui-lightbox-caption');
            this.captionText = this.caption.children('.pui-lightbox-caption-text');        
            this.closeIcon = this.caption.children('.pui-lightbox-close');
            
            if(this.options.mode === 'image') {
                this._setupImaging();
            } 
            else if(this.options.mode === 'inline') {
                this._setupInline();
            } 
            else if(this.options.mode === 'iframe') {
                this._setupIframe();
            }
            
            this._bindCommonEvents();
            
            this.links.data('puilightbox-trigger', true).find('*').data('puilightbox-trigger', true);
            this.closeIcon.data('puilightbox-trigger', true).find('*').data('puilightbox-trigger', true);
        },
        
        _bindCommonEvents: function() {
            var $this = this;

            this.closeIcon.hover(function() {
                $(this).toggleClass('ui-state-hover');
            }).click(function(e) {
                $this.hide();
                e.preventDefault();
            });

            //hide when outside is clicked
            $(document.body).bind('click.pui-lightbox', function (e) {            
                if($this.isHidden()) {
                    return;
                }

                //do nothing if target is the link
                var target = $(e.target);
                if(target.data('puilightbox-trigger')) {
                    return;
                }

                //hide if mouse is outside of lightbox
                var offset = $this.panel.offset();
                if(e.pageX < offset.left ||
                    e.pageX > offset.left + $this.panel.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + $this.panel.height()) {

                    $this.hide();
                }
            });

            //sync window resize
            $(window).resize(function() {
                if(!$this.isHidden()) {
                    $(document.body).children('.ui-widget-overlay').css({
                        'width': $(document).width(),
                        'height': $(document).height()
                    });
                }
            });
        },
                
        _setupImaging: function() {
            var $this = this;

            this.links = this.element.children('a');
            this.content.append('<img class="ui-helper-hidden"></img>');
            this.imageDisplay = this.content.children('img');
            this.navigators = this.contentWrapper.children('a');

            this.imageDisplay.load(function() { 
                var image = $(this);

                $this._scaleImage(image);

                //coordinates to center overlay
                var leftOffset = ($this.panel.width() - image.width()) / 2,
                topOffset = ($this.panel.height() - image.height()) / 2;

                //resize content for new image
                $this.content.removeClass('pui-lightbox-loading').animate({
                    width: image.width(),
                    height: image.height()
                },
                500,
                function() {            
                    //show image
                    image.fadeIn();
                    $this._showNavigators();
                    $this.caption.slideDown();
                });

                $this.panel.animate({
                    left: '+=' + leftOffset,
                    top: '+=' + topOffset
                }, 500);
            });

            this.navigators.hover(function() {
                $(this).toggleClass('ui-state-hover'); 
            })
            .click(function(e) {
                var nav = $(this),
                    index;

                $this._hideNavigators();

                if(nav.hasClass('pui-lightbox-nav-left')) {
                    index = $this.current === 0 ? $this.links.length - 1 : $this.current - 1;

                    $this.links.eq(index).trigger('click');
                } 
                else {
                    index = $this.current == $this.links.length - 1 ? 0 : $this.current + 1;

                    $this.links.eq(index).trigger('click');
                }

                e.preventDefault(); 
            });

            this.links.click(function(e) {
                var link = $(this);

                if($this.isHidden()) {
                    $this.content.addClass('pui-lightbox-loading').width(32).height(32);
                    $this.show();
                }
                else {
                    $this.imageDisplay.fadeOut(function() {
                        //clear for onload scaling
                        $(this).css({
                            'width': 'auto',
                            'height': 'auto'
                        });

                        $this.content.addClass('pui-lightbox-loading');
                    });

                    $this.caption.slideUp();
                }

                window.setTimeout(function() {
                    $this.imageDisplay.attr('src', link.attr('href'));
                    $this.current = link.index();

                    var title = link.attr('title');
                    if(title) {
                        $this.captionText.html(title);
                    }
                }, 1000);


                e.preventDefault();
            });
        },

        _scaleImage: function(image) {
            var win = $(window),
            winWidth = win.width(),
            winHeight = win.height(),
            imageWidth = image.width(),
            imageHeight = image.height(),
            ratio = imageHeight / imageWidth;

            if(imageWidth >= winWidth && ratio <= 1){
                imageWidth = winWidth * 0.75;
                imageHeight = imageWidth * ratio;
            } 
            else if(imageHeight >= winHeight){
                imageHeight = winHeight * 0.75;
                imageWidth = imageHeight / ratio;
            }

            image.css({
                'width':imageWidth + 'px',
                'height':imageHeight + 'px'
            });
        },
        
        _setupInline: function() {
            this.links = this.element.children('a');
            this.inline = this.element.children('div').addClass('pui-lightbox-inline');
            this.inline.appendTo(this.content).show();
            var $this = this;

            this.links.click(function(e) {
                $this.show();

                var title = $(this).attr('title');
                if(title) {
                    $this.captionText.html(title);
                    $this.caption.slideDown();
                }

                e.preventDefault();
            });
        },

        _setupIframe: function() {
            var $this = this;
            this.links = this.element;
            this.iframe = $('<iframe frameborder="0" style="width:' + this.options.iframeWidth + 'px;height:' +
                            this.options.iframeHeight + 'px;border:0 none; display: block;"></iframe>').appendTo(this.content);

            if(this.options.iframeTitle) {
                this.iframe.attr('title', this.options.iframeTitle);
            }

            this.element.click(function(e) {
                if(!$this.iframeLoaded) {
                    $this.content.addClass('pui-lightbox-loading').css({
                        width: $this.options.iframeWidth,
                        height: $this.options.iframeHeight
                    });
                    
                    $this.show();

                    $this.iframe.on('load', function() {
                                    $this.iframeLoaded = true;
                                    $this.content.removeClass('pui-lightbox-loading');
                                })
                                .attr('src', $this.element.attr('href'));
                }
                else {
                    $this.show();
                }

                var title = $this.element.attr('title');
                if(title) {
                    $this.caption.html(title);
                    $this.caption.slideDown();
                }

                e.preventDefault();
            });
        },

        show: function() {
            this.center();

            this.panel.css('z-index', ++PUI.zindex).show();

            if(!this.modality) {
                this._enableModality();
            }

            this._trigger('show');
        },

        hide: function() {
            this.panel.fadeOut();
            this._disableModality();
            this.caption.hide();

            if(this.options.mode === 'image') {
                this.imageDisplay.hide().attr('src', '').removeAttr('style');
                this._hideNavigators();
            }

            this._trigger('hide');
        },

        center: function() { 
            var win = $(window),
            left = (win.width() / 2 ) - (this.panel.width() / 2),
            top = (win.height() / 2 ) - (this.panel.height() / 2);

            this.panel.css({
                'left': left,
                'top': top
            });
        },

        _enableModality: function() {
            this.modality = $('<div class="ui-widget-overlay"></div>')
                            .css({
                                'width': $(document).width(),
                                'height': $(document).height(),
                                'z-index': this.panel.css('z-index') - 1
                            })
                            .appendTo(document.body);
        },

        _disableModality: function() {
            this.modality.remove();
            this.modality = null;
        },

        _showNavigators: function() {
            this.navigators.zIndex(this.imageDisplay.zIndex() + 1).show();
        },

        _hideNavigators: function() {
            this.navigators.hide();
        },
        
        isHidden: function() {
            return this.panel.is(':hidden');
        },

        showURL: function(opt) {
            if(opt.width) {
                this.iframe.attr('width', opt.width);
            }
            if(opt.height) {
                this.iframe.attr('height', opt.height);
            }

            this.iframe.attr('src', opt.src); 

            this.show();
        }
    });
})();/**
 * PrimeUI listvox widget
 */
(function() {

    $.widget("primeui.puilistbox", {
       
        options: {
            scrollHeight: 200,
            content: null,
            data: null,
            template: null,
            style: null,
            styleClass: null
        },

        _create: function() {
            this.element.wrap('<div class="pui-listbox pui-inputtext ui-widget ui-widget-content ui-corner-all"><div class="ui-helper-hidden-accessible"></div></div>');
            this.container = this.element.parent().parent();
            this.listContainer = $('<ul class="pui-listbox-list"></ul>').appendTo(this.container);
            this.options.multiple = this.element.prop("multiple");

            if(this.options.style) {
                this.container.attr('style', this.options.style);
            }
            
            if(this.options.styleClass) {
                this.container.addClass(this.options.styleClass);
            }

            if(this.options.data) {
                this._populateInputFromData();
            }

            this._populateContainerFromOptions();

            this._restrictHeight();

            this._bindEvents();
        },

        _populateInputFromData: function() {
            for(var i = 0; i < this.options.data.length; i++) {
                var choice = this.options.data[i];
                if(choice.label) {
                    this.element.append('<option value="' + choice.value + '">' + choice.label + '</option>');
                } else {
                    this.element.append('<option value="' + choice + '">' + choice + '</option>');
                }
            }
        },

        _populateContainerFromOptions: function() {
            this.choices = this.element.children('option');
            for(var i = 0; i < this.choices.length; i++) {
                var choice = this.choices.eq(i);
                this.listContainer.append('<li class="pui-listbox-item ui-corner-all">' + this._createItemContent(choice.get(0)) + '</li>');
            }
            this.items = this.listContainer.find('.pui-listbox-item:not(.ui-state-disabled)');
        },

        _restrictHeight: function() {
            if(this.container.height() > this.options.scrollHeight) {
                this.container.height(this.options.scrollHeight);
            }
        },

        _bindEvents: function() {
            var $this = this;

            //items
            this.items.on('mouseover.puilistbox', function() {
                var item = $(this);
                if(!item.hasClass('ui-state-highlight')) {
                    item.addClass('ui-state-hover');
                }
            })
            .on('mouseout.puilistbox', function() {
                $(this).removeClass('ui-state-hover');
            })
            .on('dblclick.puilistbox', function(e) {       
                $this.element.trigger('dblclick');

                PUI.clearSelection();
                e.preventDefault();
            })
            .on('click.puilistbox', function(e) {       
                if($this.options.multiple)
                    $this._clickMultiple(e, $(this));
                else
                    $this._clickSingle(e, $(this));
            
                
            });

            //input
            this.element.on('focus.puilistbox', function() {
                $this.container.addClass('ui-state-focus');
            }).on('blur.puilistbox', function() {
                $this.container.removeClass('ui-state-focus');
            });
        },
        
        _clickSingle: function(event, item) {
            var selectedItem = this.items.filter('.ui-state-highlight');

            if(item.index() !== selectedItem.index()) {
                if(selectedItem.length) {
                    this.unselectItem(selectedItem);
                }

                this.selectItem(item);
                this.element.trigger('change');
            }

            this.element.trigger('click');

            PUI.clearSelection();
            
            event.preventDefault();
        },
                
        _clickMultiple: function(event, item) {            
            var selectedItems = this.items.filter('.ui-state-highlight'),
            metaKey = (event.metaKey||event.ctrlKey),
            unchanged = (!metaKey && selectedItems.length === 1 && selectedItems.index() === item.index());

            if(!event.shiftKey) {
                if(!metaKey) {
                    this.unselectAll();
                }

                if(metaKey && item.hasClass('ui-state-highlight')) {
                    this.unselectItem(item);
                } 
                else {
                    this.selectItem(item);
                    this.cursorItem = item;
                }
            }
            else {
                //range selection
                if(this.cursorItem) {
                    this.unselectAll();
 
                    var currentItemIndex = item.index(),
                    cursorItemIndex = this.cursorItem.index(),
                    startIndex = (currentItemIndex > cursorItemIndex) ? cursorItemIndex : currentItemIndex,
                    endIndex = (currentItemIndex > cursorItemIndex) ? (currentItemIndex + 1) : (cursorItemIndex + 1);
                    
                    for(var i = startIndex ; i < endIndex; i++) {
                        this.selectItem(this.items.eq(i));
                    }
                } 
                else {
                    this.selectItem(item);
                    this.cursorItem = item;
                }
            }
            
            if(!unchanged) {
                this.element.trigger('change');
            }

            this.element.trigger('click');
            PUI.clearSelection();
            event.preventDefault();
        },

        unselectAll: function() {
            this.items.removeClass('ui-state-highlight ui-state-hover');
            this.choices.filter(':selected').prop('selected', false);
        },

        selectItem: function(value) {
            var item = null;
            if($.type(value) === 'number') {
                item = this.items.eq(value);
            }
            else {
                item = value;
            }

            item.addClass('ui-state-highlight').removeClass('ui-state-hover');
            this.choices.eq(item.index()).prop('selected', true);
            this._trigger('itemSelect', null, this.choices.eq(item.index()));
        },

        unselectItem: function(value) {
            var item = null;
            if($.type(value) === 'number') {
                item = this.items.eq(value);
            }
            else {
                item = value;
            }
            
            item.removeClass('ui-state-highlight');
            this.choices.eq(item.index()).prop('selected', false);
            this._trigger('itemUnselect', null, this.choices.eq(item.index()));
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            if (key === 'data') {
                this.element.empty();
                this.listContainer.empty();
                this._populateInputFromData();

                this._populateContainerFromOptions();

                this._restrictHeight();
                this._bindEvents();
            }
        },

        _unbindEvents: function() {
            this.items.off('mouseover.puilistbox click.puilistbox dblclick.puilistbox');
        },

        disable: function () {
            this._unbindEvents();
            this.items.addClass('ui-state-disabled');
        },

        enable: function () {
            this._bindEvents();
            this.items.removeClass('ui-state-disabled');
        },
        
        _createItemContent: function(choice) {
            if(this.options.template) {
                var template = this.options.template.html();
                Mustache.parse(template);
                return Mustache.render(template, choice);
            }
            else if(this.options.content) {
                return this.options.content.call(this, choice);
            }
            else {
                return choice.label;
            }
        }
    });
        
})();/**
 * PrimeUI BaseMenu widget
 */
(function() {

    $.widget("primeui.puibasemenu", {
       
        options: {
             popup: false,
             trigger: null,
             my: 'left top',
             at: 'left bottom',
             triggerEvent: 'click'
        },
        
        _create: function() {
            if(this.options.popup) {
                this._initPopup();
            }
        },
                
        _initPopup: function() {
            var $this = this;

            this.element.closest('.pui-menu').addClass('pui-menu-dynamic pui-shadow').appendTo(document.body);

            if($.type(this.options.trigger) === 'string') {
                this.options.trigger =  $(this.options.trigger);
            }
            
            this.positionConfig = {
                my: this.options.my,
                at: this.options.at,
                of: this.options.trigger
            };
            
            this.options.trigger.on(this.options.triggerEvent + '.pui-menu', function(e) {
                if($this.element.is(':visible')) {
                    $this.hide();
                }
                else {
                    $this.show();
                }
                
                e.preventDefault();
            });

            //hide overlay on document click
            $(document.body).on('click.pui-menu', function (e) {
                var popup = $this.element.closest('.pui-menu');
                if(popup.is(":hidden")) {
                    return;
                }

                //do nothing if mousedown is on trigger
                var target = $(e.target);
                if(target.is($this.options.trigger.get(0))||$this.options.trigger.has(target).length > 0) {
                    return;
                }

                //hide if mouse is outside of overlay except trigger
                var offset = popup.offset();
                if(e.pageX < offset.left ||
                    e.pageX > offset.left + popup.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + popup.height()) {

                    $this.hide(e);
                }
            });

            //Hide overlay on resize
            $(window).on('resize.pui-menu', function() {
                if($this.element.closest('.pui-menu').is(':visible')) {
                    $this.align();
                }
            });
        },
                
        show: function() {
            this.align();
            this.element.closest('.pui-menu').css('z-index', ++PUI.zindex).show();
        },

        hide: function() {
            this.element.closest('.pui-menu').fadeOut('fast');
        },

        align: function() {
            this.element.closest('.pui-menu').css({left:'', top:''}).position(this.positionConfig);
        }
    });
})();

/**
 * PrimeUI Menu widget
 */
(function() {

    $.widget("primeui.puimenu", $.primeui.puibasemenu, {
       
        options: {
             
        },
        
        _create: function() {
            this.element.addClass('pui-menu-list ui-helper-reset').
                    wrap('<div class="pui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix" />');
            
            this.element.children('li').each(function() {
                var listItem = $(this);
                
                if(listItem.children('h3').length > 0) {
                    listItem.addClass('ui-widget-header ui-corner-all');
                }
                else {
                    listItem.addClass('pui-menuitem ui-widget ui-corner-all');
                    var menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');
                    
                    menuitemLink.addClass('pui-menuitem-link ui-corner-all').contents().wrap('<span class="pui-menuitem-text" />');
                    
                    if(icon) {
                        menuitemLink.prepend('<span class="pui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                    }
                }
            });
            
            this.menuitemLinks = this.element.find('.pui-menuitem-link:not(.ui-state-disabled)');

            this._bindEvents();
            
            this._super();
        },
            
        _bindEvents: function() {  
            var $this = this;

            this.menuitemLinks.on('mouseenter.pui-menu', function(e) {
                $(this).addClass('ui-state-hover');
            })
            .on('mouseleave.pui-menu', function(e) {
                $(this).removeClass('ui-state-hover');
            });

            if(this.options.popup) {
                this.menuitemLinks.on('click.pui-menu', function() {
                    $this.hide();
                });  
            }   
        }
    });
})();

/**
 * PrimeUI BreadCrumb Widget
 */
(function() {

    $.widget("primeui.puibreadcrumb", {
        
        _create: function() {
            this.element.wrap('<div class="pui-breadcrumb ui-module ui-widget ui-widget-header ui-helper-clearfix ui-corner-all" role="menu">');
            
            this.element.children('li').each(function(index) {
                var listItem = $(this);
                
                listItem.attr('role', 'menuitem');
                var menuitemLink = listItem.children('a');
                menuitemLink.addClass('pui-menuitem-link ui-corner-all').contents().wrap('<span class="pui-menuitem-text" />');
                    
                if(index > 0) {
                    listItem.before('<li class="pui-breadcrumb-chevron fa fa-chevron-right"></li>');
                }
                else {
                    listItem.before('<li class="fa fa-home"></li>');
                }
            });
        }
    });
})();

/*
 * PrimeUI TieredMenu Widget
 */
(function() {

    $.widget("primeui.puitieredmenu", $.primeui.puibasemenu, {
        
        options: {
            autoDisplay: true    
        },
        
        _create: function() {
            this._render();
            
            this.links = this.element.find('.pui-menuitem-link:not(.ui-state-disabled)');

            this._bindEvents();
            
            this._super();
        },
                
        _render: function() {
            var $this = this;
            this.element.addClass('pui-menu-list ui-helper-reset').
                    wrap('<div class="pui-tieredmenu pui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix" />');
            
            this.element.parent().uniqueId();
            this.options.id = this.element.parent().attr('id');
          
            this.element.find('li').each(function() {
                    var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');
                    
                    menuitemLink.addClass('pui-menuitem-link ui-corner-all').contents().wrap('<span class="pui-menuitem-text" />');
                    
                    if(icon) {
                        menuitemLink.prepend('<span class="pui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                    }
                    
                    listItem.addClass('pui-menuitem ui-widget ui-corner-all');
                    if(listItem.children('ul').length > 0) {
                        var submenuIcon = listItem.parent().hasClass('pui-menu-child') ? 'fa-caret-right' : $this._getRootSubmenuIcon();
                        listItem.addClass('pui-menu-parent');
                        listItem.children('ul').addClass('ui-widget-content pui-menu-list ui-corner-all ui-helper-clearfix pui-menu-child pui-shadow');
                        
                        menuitemLink.prepend('<span class="pui-submenu-icon fa fa-fw ' + submenuIcon + '"></span>');
                    }            
            });
        },
                
        _bindEvents: function() {        
            this._bindItemEvents();
        
            this._bindDocumentHandler();
        },
    
        _bindItemEvents: function() {
            var $this = this;

            this.links.on('mouseenter.pui-menu',function() {
                var link = $(this),
                menuitem = link.parent(),
                autoDisplay = $this.options.autoDisplay;

                var activeSibling = menuitem.siblings('.pui-menuitem-active');
                if(activeSibling.length === 1) {
                    $this._deactivate(activeSibling);
                }

                if(autoDisplay||$this.active) {
                    if(menuitem.hasClass('pui-menuitem-active')) {
                        $this._reactivate(menuitem);
                    }
                    else {
                        $this._activate(menuitem);
                    }  
                }
                else {
                    $this._highlight(menuitem);
                }
            });

            if(this.options.autoDisplay === false) {
                this.rootLinks = this.element.find('> .pui-menuitem > .pui-menuitem-link');
                this.rootLinks.data('primeui-tieredmenu-rootlink', this.options.id).find('*').data('primeui-tieredmenu-rootlink', this.options.id);

                this.rootLinks.on('click.pui-menu', function(e) {
                    var link = $(this),
                    menuitem = link.parent(),
                    submenu = menuitem.children('ul.pui-menu-child');

                    if(submenu.length === 1) {
                        if(submenu.is(':visible')) {
                            $this.active = false;
                            $this._deactivate(menuitem);
                        }
                        else {                                        
                            $this.active = true;
                            $this._highlight(menuitem);
                            $this._showSubmenu(menuitem, submenu);
                        }
                    }
                });
            }
            
            this.element.parent().find('ul.pui-menu-list').on('mouseleave.pui-menu', function(e) {
                if($this.activeitem) {
                    $this._deactivate($this.activeitem);
                }
           
                e.stopPropagation();
            });
        },
       
        _bindDocumentHandler: function() {
            var $this = this;

            $(document.body).on('click.pui-menu', function(e) {
                var target = $(e.target);
                if(target.data('primeui-tieredmenu-rootlink') === $this.options.id) {
                    return;
                }
                    
                $this.active = false;

                $this.element.find('li.pui-menuitem-active').each(function() {
                    $this._deactivate($(this), true);
                });
            });
        },
    
        _deactivate: function(menuitem, animate) {
            this.activeitem = null;
            menuitem.children('a.pui-menuitem-link').removeClass('ui-state-hover');
            menuitem.removeClass('pui-menuitem-active');

            if(animate) {
                menuitem.children('ul.pui-menu-child:visible').fadeOut('fast');
            }
            else {
                menuitem.children('ul.pui-menu-child:visible').hide();
            }
        },

        _activate: function(menuitem) {
            this._highlight(menuitem);

            var submenu = menuitem.children('ul.pui-menu-child');
            if(submenu.length === 1) {
                this._showSubmenu(menuitem, submenu);
            }
        },

        _reactivate: function(menuitem) {
            this.activeitem = menuitem;
            var submenu = menuitem.children('ul.pui-menu-child'),
            activeChilditem = submenu.children('li.pui-menuitem-active:first'),
            _self = this;

            if(activeChilditem.length === 1) {
                _self._deactivate(activeChilditem);
            }
        },

        _highlight: function(menuitem) {
            this.activeitem = menuitem;
            menuitem.children('a.pui-menuitem-link').addClass('ui-state-hover');
            menuitem.addClass('pui-menuitem-active');
        },
                
        _showSubmenu: function(menuitem, submenu) {
            submenu.css({
                'left': menuitem.outerWidth(),
                'top': 0,
                'z-index': ++PUI.zindex
            });

            submenu.show();
        },
        
        _getRootSubmenuIcon: function() {
            return 'fa-caret-right';
        }
            
    });

})();

/**
 * PrimeUI Menubar Widget
 */
(function() {

    $.widget("primeui.puimenubar", $.primeui.puitieredmenu, {
        
        options: {
            autoDisplay: true    
        },
        
        _create: function() {
            this._super();
            this.element.parent().removeClass('pui-tieredmenu').
                    addClass('pui-menubar');
        },
              
        _showSubmenu: function(menuitem, submenu) {
            var win = $(window),
            submenuOffsetTop = null,
            submenuCSS = {
                'z-index': ++PUI.zindex
            };

            if(menuitem.parent().hasClass('pui-menu-child')) {
                submenuCSS.left = menuitem.outerWidth();
                submenuCSS.top = 0; 
                submenuOffsetTop = menuitem.offset().top - win.scrollTop();
            } 
            else {
                submenuCSS.left = 0;
                submenuCSS.top = menuitem.outerHeight(); 
                submenuOffsetTop = menuitem.offset().top + submenuCSS.top - win.scrollTop();
            }

            //adjust height within viewport
            submenu.css('height', 'auto');
            if((submenuOffsetTop + submenu.outerHeight()) > win.height()) {
                submenuCSS.overflow = 'auto';
                submenuCSS.height = win.height() - (submenuOffsetTop + 20);
            }

            submenu.css(submenuCSS).show();
        },
        
        _getRootSubmenuIcon: function() {
            return 'fa-caret-down';
        }
    });

})();

/*
 * PrimeUI SlideMenu Widget
 */
(function() {

    $.widget("primeui.puislidemenu", $.primeui.puibasemenu, {
                
        _create: function() {
            this._render();
        
            //elements
            this.rootList = this.element;
            this.content = this.element.parent();
            this.wrapper = this.content.parent();
            this.container = this.wrapper.parent();
            this.submenus = this.container.find('ul.pui-menu-list');
            
            this.links = this.element.find('a.pui-menuitem-link:not(.ui-state-disabled)');
            this.backward = this.wrapper.children('div.pui-slidemenu-backward');

            //config
            this.stack = [];
            this.jqWidth = this.container.width();

            if(!this.element.hasClass('pui-menu-dynamic')) {
                var $this = this;
                setTimeout(function() {
                    $this._applyDimensions();
                }, 100);
                
            }
            this._super();

            this._bindEvents();
        },
        
        _render: function() {
            this.element.addClass('pui-menu-list ui-helper-reset').
                    wrap('<div class="pui-menu pui-slidemenu ui-widget ui-widget-content ui-corner-all"/>').
                    wrap('<div class="pui-slidemenu-wrapper" />').
                    after('<div class="pui-slidemenu-backward ui-widget-header ui-corner-all">\n\
                    <span class="pui-icon fa fa-fw fa-caret-left"></span>Back</div>').
                    wrap('<div class="pui-slidemenu-content" />');
            
            this.element.parent().uniqueId();
            this.options.id = this.element.parent().attr('id');
          
            this.element.find('li').each(function() {
                    var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');
                    
                    menuitemLink.addClass('pui-menuitem-link ui-corner-all').contents().wrap('<span class="pui-menuitem-text" />');
                    
                    if(icon) {
                        menuitemLink.prepend('<span class="pui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                    }
                    
                    listItem.addClass('pui-menuitem ui-widget ui-corner-all');
                    if(listItem.children('ul').length > 0) {
                        listItem.addClass('pui-menu-parent');
                        listItem.children('ul').addClass('ui-widget-content pui-menu-list ui-corner-all ui-helper-clearfix pui-menu-child ui-shadow');
                        menuitemLink.prepend('<span class="pui-submenu-icon fa fa-fw fa-caret-right"></span>');
                    }
            });
        },
              
        _bindEvents: function() {
            var $this = this;

            this.links.on('mouseenter.pui-menu',function() {
               $(this).addClass('ui-state-hover'); 
            })
            .on('mouseleave.pui-menu',function() {
               $(this).removeClass('ui-state-hover'); 
            })
            .on('click.pui-menu',function() {
               var link = $(this),
               submenu = link.next();

               if(submenu.length == 1) {
                   $this._forward(submenu);
               }
            });

            this.backward.on('click.pui-menu',function() {
                $this._back();
            });
       },

       _forward: function(submenu) {
            var $this = this;

            this._push(submenu);

            var rootLeft = -1 * (this._depth() * this.jqWidth);

            submenu.show().css({
                left: this.jqWidth
            });

            this.rootList.animate({
                left: rootLeft
            }, 500, 'easeInOutCirc', function() {
                if($this.backward.is(':hidden')) {
                    $this.backward.fadeIn('fast');
                }
            });
       },

       _back: function() {
            if(!this.rootList.is(':animated')) {
                var $this = this,
                last = this._pop(),
                depth = this._depth();

                var rootLeft = -1 * (depth * this.jqWidth);

                this.rootList.animate({
                    left: rootLeft
                }, 500, 'easeInOutCirc', function() {
                    if(last) {
                        last.hide();
                    }

                    if(depth === 0) {
                        $this.backward.fadeOut('fast');
                    }
                });
            }
       },

       _push: function(submenu) {
             this.stack.push(submenu);
       },
    
       _pop: function() {
             return this.stack.pop();
       },

       _last: function() {
            return this.stack[this.stack.length - 1];
        },

       _depth: function() {
            return this.stack.length;
        },

       _applyDimensions: function() {
            this.submenus.width(this.container.width());
            this.wrapper.height(this.rootList.outerHeight(true) + this.backward.outerHeight(true));
            this.content.height(this.rootList.outerHeight(true));
            this.rendered = true;
        },

       show: function() {                
            this.align();
            this.container.css('z-index', ++PUI.zindex).show();

            if(!this.rendered) {
                this._applyDimensions();
            }
        }        
    });

})();

/**
 * PrimeUI Context Menu Widget
 */
(function() {

    $.widget("primeui.puicontextmenu", $.primeui.puitieredmenu, {
        
        options: {
            autoDisplay: true,
            target: null,
            event: 'contextmenu'
        },
        
        _create: function() {
            this._super();
            this.element.parent().removeClass('pui-tieredmenu').
                    addClass('pui-contextmenu pui-menu-dynamic pui-shadow');
            
            var $this = this;
            
            if(this.options.target) {
                if($.type(this.options.trigger) === 'string') {
                    this.options.trigger =  $(this.options.trigger);
                }
            }
            else {
                this.options.target = $(document);
            }
                
            if(!this.element.parent().parent().is(document.body)) {
                this.element.parent().appendTo('body');
            }
            
            if(this.options.target.hasClass('pui-datatable')) {
                $this._bindDataTable();
            }
            else {
                this.options.target.on(this.options.event + '.pui-contextmenu' , function(e){
                    $this.show(e);
                });   
            }
        },        

        _bindItemEvents: function() {
            this._super();

            var $this = this;

            //hide menu on item click
            this.links.bind('click', function() {
                $this._hide();
            });
        },

        _bindDocumentHandler: function() {
            var $this = this;

            //hide overlay when document is clicked
            $(document.body).on('click.pui-contextmenu', function (e) {
                if($this.element.parent().is(":hidden")) {
                    return;
                }

                $this._hide();
            });
        },
        
        _bindDataTable: function() {
            var rowSelector = '#' + this.options.target.attr('id') + ' tbody.pui-datatable-data > tr.ui-widget-content:not(.pui-datatable-empty-message)',
            event = this.options.event + '.pui-datatable',
            $this = this;

            $(document).off(event, rowSelector)
                        .on(event, rowSelector, null, function(e) {
                            $this.options.target.puidatatable('onRowRightClick', event, $(this));
                            $this.show(e);
                        });

        },
        
        show: function(e) {  
            //hide other contextmenus if any
            $(document.body).children('.pui-contextmenu:visible').hide();

            var win = $(window),
            left = e.pageX,
            top = e.pageY,
            width = this.element.parent().outerWidth(),
            height = this.element.parent().outerHeight();

            //collision detection for window boundaries
            if((left + width) > (win.width())+ win.scrollLeft()) {
                left = left - width;
            }
            if((top + height ) > (win.height() + win.scrollTop())) {
                top = top - height;
            }

            if(this.options.beforeShow) {
                this.options.beforeShow.call(this);
            }

            this.element.parent().css({
                'left': left,
                'top': top,
                'z-index': ++PUI.zindex
            }).show();

            e.preventDefault();
            e.stopPropagation();
        },

        _hide: function() {
            var $this = this;

            //hide submenus
            this.element.parent().find('li.pui-menuitem-active').each(function() {
                $this._deactivate($(this), true);
            });

            this.element.parent().fadeOut('fast');
        },

        isVisible: function() {
            return this.element.parent().is(':visible');
        },

        getTarget: function() {
            return this.jqTarget;
        }              
              
    });

})();/**
 * PrimeUI Messages widget
 */
(function() {

    $.widget("primeui.puimessages", {
       
        options: {
            closable: true
        },

        _create: function() {
            this.element.addClass('pui-messages ui-widget ui-corner-all');
            if(this.options.closable) {
                this.closer = $('<a href="#" class="pui-messages-close"><i class="fa fa-close"></i></a>').appendTo(this.element);
            }
            this.element.append('<span class="pui-messages-icon fa fa-2x"></span>');
            
            this.msgContainer = $('<ul></ul>').appendTo(this.element);
            
            this._bindEvents();
        },
        
        _bindEvents: function() {
            var $this = this;
            if(this.options.closable) {
                this.closer.on('click', function(e) {
                    $this.element.slideUp();
                    e.preventDefault();
                });
            }
        },

        show: function(severity, msgs) {
            this.clear();
            this.element.removeClass('pui-messages-info pui-messages-warn pui-messages-error').addClass('pui-messages-' + severity);
            
            this.element.children('.pui-messages-icon').removeClass('fa-info-circle fa-close fa-warning').addClass(this._getIcon(severity));
            
            if($.isArray(msgs)) {
                for(var i = 0; i < msgs.length; i++) {
                    this._showMessage(msgs[i]);
                }
            }
            else {
                this._showMessage(msgs);
            }
            
            this.element.show();
        },
        
        _showMessage: function(msg) {
            this.msgContainer.append('<li><span class="pui-messages-summary">' + msg.summary + '</span><span class="pui-messages-detail">' + msg.detail + '</span></li>');
        },
        
        clear: function() {
            this.msgContainer.children().remove();
            this.element.hide();
        },
        
        _getIcon: function(severity) {
            switch(severity) {
                case 'info':
                    return 'fa-info-circle';
                break;
                
                case 'warn':
                    return 'fa-warning';
                break;
                
                case 'error':
                    return 'fa-close';
                break;
                
                default:
                    return 'fa-info-circle';
                break;
            }
        }
        
    });
    
})();(function() {

    $.widget("primeui.puimultiselectlistbox", {
       
       options: {
            caption: null,
            choices: null,
            effect: false||'fade',
            name: null,
            value: null
        },
        
        _create: function() {
            this.element.addClass('pui-multiselectlistbox ui-widget ui-helper-clearfix');
            this.element.append('<input type="hidden"></input>');
            this.element.append('<div class="pui-multiselectlistbox-listcontainer"></div>');
            this.container = this.element.children('div');
            this.input = this.element.children('input');
            var choices = this.options.choices;
            if(this.options.name) {
                this.input.attr('name', this.options.name);
            }

            if(choices) {
                if(this.options.caption) {
                    this.container.append('<div class="pui-multiselectlistbox-header ui-widget-header ui-corner-top">'+ this.options.caption +'</div>');
                }
                
                this.container.append('<ul class="pui-multiselectlistbox-list pui-inputfield ui-widget-content ui-corner-bottom"></ul>');
                this.rootList = this.container.children('ul');
                
                for(var i = 0; i < choices.length; i++) {
                    this._createItemNode(choices[i], this.rootList);
                }
                
                this.items = this.element.find('li.pui-multiselectlistbox-item');
                this._bindEvents();
                
                if(this.options.value !== undefined || this.options.value !== null) {
                    this.preselect(this.options.value);
                }
            }
        },
        
        _createItemNode: function(choice, parent) {
            var listItem = $('<li class="pui-multiselectlistbox-item"><span>'+ choice.label + '</span></li>');
            listItem.appendTo(parent);
            
            if(choice.items) {
                listItem.append('<ul class="ui-helper-hidden"></ul>');
                var sublistContainer = listItem.children('ul');
                for(var i = 0; i < choice.items.length; i++) {
                    this._createItemNode(choice.items[i], sublistContainer);
                }
            }
            else {
                listItem.attr('data-value', choice.value);
            }
        },
                
        _unbindEvents: function() {
           this.items.off('mouseover.multiSelectListbox mouseout.multiSelectListbox click.multiSelectListbox');
        },
        
        _bindEvents: function() {
           var $this = this;
           
           this.items.on('mouseover.multiSelectListbox', function() {
               var item = $(this);

               if(!item.hasClass('ui-state-highlight'))
                   $(this).addClass('ui-state-hover');
           })
           .on('mouseout.multiSelectListbox', function() {
               var item = $(this);

               if(!item.hasClass('ui-state-highlight'))
                   $(this).removeClass('ui-state-hover');
           })
           .on('click.multiSelectListbox', function() {
               var item = $(this);
               if(!item.hasClass('ui-state-highlight')) {
                   $this.showOptionGroup(item);
               }
           });
        },
        
        showOptionGroup: function(item) {
           item.addClass('ui-state-highlight').removeClass('ui-state-hover').siblings().filter('.ui-state-highlight').removeClass('ui-state-highlight');
           item.closest('.pui-multiselectlistbox-listcontainer').nextAll().remove();
           var childItemsContainer = item.children('ul'),
           itemValue = item.attr('data-value');
   
           if(itemValue) {
               this.input.val(itemValue);
           }

           if(childItemsContainer.length) {
              var groupContainer = $('<div class="pui-multiselectlistbox-listcontainer" style="display:none"></div>');
              childItemsContainer.clone(true).appendTo(groupContainer).addClass('pui-multiselectlistbox-list pui-inputfield ui-widget-content').removeClass('ui-helper-hidden');

              groupContainer.prepend('<div class="pui-multiselectlistbox-header ui-widget-header ui-corner-top">' + item.children('span').text() + '</div>')
                  .children('.pui-multiselectlistbox-list').addClass('ui-corner-bottom');

              this.element.append(groupContainer);

              if (this.options.effect)
                  groupContainer.show(this.options.effect);
              else
                  groupContainer.show();
            }
        },
        
        disable: function() {
           if(!this.options.disabled) {
               this.options.disabled = true;
               this.element.addClass('ui-state-disabled');
               this._unbindEvents();
               this.container.nextAll().remove();
           }
        },
        
        getValue: function() {
            return this.input.val();
        },

        preselect: function(value) {
            var $this = this,
            item = this.items.filter('[data-value="' + value + '"]');

            if(item.length === 0) {
                return;
            }

            var ancestors = item.parentsUntil('.pui-multiselectlistbox-list'),
            selectedIndexMap = [];

            for(var i = (ancestors.length - 1); i >= 0; i--) {
                var ancestor = ancestors.eq(i);

                if(ancestor.is('li')) {
                    selectedIndexMap.push(ancestor.index());
                }
                else if(ancestor.is('ul')) {
                    var groupContainer = $('<div class="pui-multiselectlistbox-listcontainer" style="display:none"></div>');
                    ancestor.clone(true).appendTo(groupContainer).addClass('pui-multiselectlistbox-list ui-widget-content ui-corner-all').removeClass('ui-helper-hidden');

                    groupContainer.prepend('<div class="pui-multiselectlistbox-header ui-widget-header ui-corner-top">' + ancestor.prev('span').text() + '</div>')
                           .children('.pui-multiselectlistbox-list').addClass('ui-corner-bottom').removeClass('ui-corner-all');

                    $this.element.append(groupContainer);
                }
            }

            //highlight item
            var lists = this.element.children('div.pui-multiselectlistbox-listcontainer'),
            clonedItem = lists.find(' > ul.pui-multiselectlistbox-list > li.pui-multiselectlistbox-item').filter('[data-value="' + value + '"]');
            clonedItem.addClass('ui-state-highlight');

            //highlight ancestors
            for(var i = 0; i < selectedIndexMap.length; i++) {
                lists.eq(i).find('> .pui-multiselectlistbox-list > li.pui-multiselectlistbox-item').eq(selectedIndexMap[i]).addClass('ui-state-highlight');
            }

            $this.element.children('div.pui-multiselectlistbox-listcontainer:hidden').show();
        }
    });
    
})();

/**
 * PrimeFaces Notify Widget
 */
(function() {

    $.widget("primeui.puinotify", {
       
        options: {
            position: 'top',
            visible: false,
            animate: true,
            effectSpeed: 'normal',
            easing: 'swing'
        },
        
        _create: function() {
            this.element.addClass('pui-notify pui-notify-' + this.options.position + ' ui-widget ui-widget-content pui-shadow')
                    .wrapInner('<div class="pui-notify-content" />').appendTo(document.body);
            this.content = this.element.children('.pui-notify-content');
            this.closeIcon = $('<span class="pui-notify-close fa fa-close"></span>').appendTo(this.element);
            
            this._bindEvents();
            
            if(this.options.visible) {
                this.show();
            }
        },
        
        _bindEvents: function() {
            var $this = this;
            
            this.closeIcon.on('click.puinotify', function() {
                $this.hide();
            });
        },
        
        show: function(content) {
            var $this = this;
            
            if(content) {
                this.update(content);
            }
            
            this.element.css('z-index',++PUI.zindex);
            
            this._trigger('beforeShow');
            
            if(this.options.animate) {
                this.element.slideDown(this.options.effectSpeed, this.options.easing, function() {
                    $this._trigger('afterShow');
                });
            }
            else {
                this.element.show();
                $this._trigger('afterShow');
            }
        },

        hide: function() {
            var $this = this;
            
            this._trigger('beforeHide');
            
            if(this.options.animate) {
                this.element.slideUp(this.options.effectSpeed, this.options.easing, function() {
                    $this._trigger('afterHide');
                });
            }
            else {
                this.element.hide();
                $this._trigger('afterHide');
            }
        },
        
        update: function(content) {
            this.content.html(content);
        }
    });
})();/**
 * PrimeUI picklist widget
 */
(function() {

    $.widget("primeui.puiorderlist", {
       
        options: {
            controlsLocation: 'none',
            dragdrop: true,
            effect: 'fade',
            caption: null,
            responsive: false,
            datasource: null,
            content: null,
            template: null
        },

        _create: function() {
            this._createDom();
            
            if(this.options.datasource) {
                if($.isArray(this.options.datasource)) {
                    this._generateOptionElements(this.options.datasource);
                }
                else if($.type(this.options.datasource) === 'function') {
                    this.options.datasource.call(this, this._generateOptionElements);
                }
            }
            
            this.optionElements = this.element.children('option');
            this._createListElement();

            this._bindEvents();
        },
        
        _createDom: function() {
            this.element.addClass('ui-helper-hidden');
            if(this.options.controlsLocation !== 'none')
                this.element.wrap('<div class="pui-grid-col-10"></div>');
            else
                this.element.wrap('<div class="pui-grid-col-12"></div>');

            this.element.parent().wrap('<div class="pui-orderlist pui-grid ui-widget"><div class="pui-grid-row"></div></div>')
            this.container = this.element.closest('.pui-orderlist');
            
            if(this.options.controlsLocation !== 'none') {
                this.element.parent().before('<div class="pui-orderlist-controls pui-grid-col-2"></div>');
                this._createButtons();
            }
            
            if(this.options.responsive) {
                this.container.addClass('pui-grid-responsive');
            }
        },
        
        _generateOptionElements: function(data) {
            for(var i = 0; i < data.length; i++) {
                var choice = data[i];
                if(choice.label)
                    this.element.append('<option value="' + choice.value + '">' + choice.label + '</option>');
                else
                    this.element.append('<option value="' + choice + '">' + choice + '</option>');
            }
        },
        
        _createListElement: function() {
            this.list = $('<ul class="ui-widget-content pui-orderlist-list"></ul>').insertBefore(this.element);
                    
            for(var i = 0; i < this.optionElements.length; i++) {
                var optionElement = this.optionElements.eq(i),
                itemContent = this._createItemContent(optionElement.get(0)),
                listItem = $('<li class="pui-orderlist-item ui-corner-all"></li>');
        
                if($.type(itemContent) === 'string')
                    listItem.html(itemContent);
                else
                    listItem.append(itemContent);
        
                listItem.data('item-value', optionElement.attr('value')).appendTo(this.list);
            }
            
            this.items = this.list.children('.pui-orderlist-item');
            
            if(this.options.caption) {
                this.list.addClass('ui-corner-bottom').before('<div class="pui-orderlist-caption ui-widget-header ui-corner-top">' + this.options.caption + '</div>')
            } else {
                this.list.addClass('ui-corner-all')
            }
        },
        
        _createButtons: function() {
            var $this = this,
            buttonContainer = this.element.parent().prev();
            
            buttonContainer.append(this._createButton('fa-angle-up', 'pui-orderlist-button-moveup', function(){$this._moveUp();}))
                            .append(this._createButton('fa-angle-double-up', 'pui-orderlist-button-move-top', function(){$this._moveTop();}))
                            .append(this._createButton('fa-angle-down', 'pui-orderlist-button-move-down', function(){$this._moveDown();}))
                            .append(this._createButton('fa-angle-double-down', 'pui-orderlist-move-bottom', function(){$this._moveBottom();}));
        },
        
        _createButton: function(icon, cssClass, fn) {
            var btn = $('<button class="' + cssClass + '" type="button"></button>').puibutton({
                'icon': icon,
                'click': function() {
                    fn();
                    $(this).removeClass('ui-state-hover ui-state-focus');
                }
            });
            
            return btn;
        },
        
        _bindEvents: function() {
            var $this = this;
            
            this.items.on('mouseover.puiorderlist', function(e) {
                var element = $(this);

                if(!element.hasClass('ui-state-highlight'))
                    $(this).addClass('ui-state-hover');
            })
            .on('mouseout.puiorderlist', function(e) {
                var element = $(this);

                if(!element.hasClass('ui-state-highlight'))
                    $(this).removeClass('ui-state-hover');
            })
            .on('mousedown.puiorderlist', function(e) {
                var element = $(this),
                metaKey = (e.metaKey||e.ctrlKey);

                if(!metaKey) {
                    element.removeClass('ui-state-hover').addClass('ui-state-highlight')
                            .siblings('.ui-state-highlight').removeClass('ui-state-highlight');

                    //$this.fireItemSelectEvent(element, e);
                }
                else {
                    if(element.hasClass('ui-state-highlight')) {
                        element.removeClass('ui-state-highlight');
                        //$this.fireItemUnselectEvent(element);
                    }
                    else {
                        element.removeClass('ui-state-hover').addClass('ui-state-highlight');
                        //$this.fireItemSelectEvent(element, e);
                    }
                }
            });

            if(this.options.dragdrop) {
                this.list.sortable({
                    revert: 1,
                    start: function(event, ui) {
                        //PrimeFaces.clearSelection();
                    }
                    ,update: function(event, ui) {
                        $this.onDragDrop(event, ui);
                    }
                });
            }
        },
        
        _moveUp: function() {
            var $this = this,
            selectedItems = this.items.filter('.ui-state-highlight'),
            itemsToMoveCount = selectedItems.length,
            movedItemsCount = 0;

            selectedItems.each(function() {
                var item = $(this);

                if(!item.is(':first-child')) {
                    item.hide($this.options.effect, {}, 'fast', function() {
                        item.insertBefore(item.prev()).show($this.options.effect, {}, 'fast', function() {
                            movedItemsCount++;

                            if(itemsToMoveCount === movedItemsCount) {
                                $this._saveState();
                                $this._fireReorderEvent();
                            }
                        });
                    });
                }
                else {
                    itemsToMoveCount--;
                }
            });
        },

        _moveTop: function() {
            var $this = this,
            selectedItems = this.items.filter('.ui-state-highlight'),
            itemsToMoveCount = selectedItems.length,
            movedItemsCount = 0;

            selectedItems.each(function() {
                var item = $(this);

                if(!item.is(':first-child')) {
                    item.hide($this.options.effect, {}, 'fast', function() {
                        item.prependTo(item.parent()).show($this.options.effect, {}, 'fast', function(){
                            movedItemsCount++;

                            if(itemsToMoveCount === movedItemsCount) {
                                $this._saveState();
                                $this._fireReorderEvent();
                            }
                        });
                    });
                }
                else {
                    itemsToMoveCount--;
                }
            });
        },

        _moveDown: function() {
            var $this = this,
            selectedItems = $(this.items.filter('.ui-state-highlight').get().reverse()),
            itemsToMoveCount = selectedItems.length,
            movedItemsCount = 0;

            selectedItems.each(function() {
                var item = $(this);

                if(!item.is(':last-child')) {                
                    item.hide($this.options.effect, {}, 'fast', function() {
                        item.insertAfter(item.next()).show($this.options.effect, {}, 'fast', function() {
                            movedItemsCount++;

                            if(itemsToMoveCount === movedItemsCount) {
                                $this._saveState();
                                $this._fireReorderEvent();
                            }
                        });
                    });
                }
                else {
                    itemsToMoveCount--;
                }
            });
        },

        _moveBottom: function() {
            var $this = this,
            selectedItems = this.items.filter('.ui-state-highlight'),
            itemsToMoveCount = selectedItems.length,
            movedItemsCount = 0;

            selectedItems.each(function() {
                var item = $(this);

                if(!item.is(':last-child')) {
                    item.hide($this.options.effect, {}, 'fast', function() {
                        item.appendTo(item.parent()).show($this.options.effect, {}, 'fast', function() {
                            movedItemsCount++;

                            if(itemsToMoveCount === movedItemsCount) {
                                $this._saveState();
                                $this._fireReorderEvent();
                            }
                        });
                    });
                }
                else {
                    itemsToMoveCount--;
                }
            });
        },
        
        _saveState: function() {
            this.element.children().remove();
            this._generateOptions();
        },
        
        _fireReorderEvent: function() {
            this._trigger('reorder', null);
        },
        
        onDragDrop: function(event, ui) {
            ui.item.removeClass('ui-state-highlight');
            this._saveState();
            this._fireReorderEvent();
        },
        
        _generateOptions: function() {
            var $this = this;

            this.list.children('.pui-orderlist-item').each(function() {
                var item = $(this),
                itemValue = item.data('item-value');

                $this.element.append('<option value="' + itemValue + '" selected="selected">' + itemValue + '</option>');
            });
        },
        
        _createItemContent: function(choice) {
            if(this.options.template) {
                var template = this.options.template.html();
                Mustache.parse(template);
                return Mustache.render(template, choice);
            }
            else if(this.options.content) {
                return this.options.content.call(this, choice);
            }
            else {
                return choice.label;
            }
        }
        
    });
        
})();/**
 * PrimeUI Paginator Widget
 */
(function() {

    var ElementHandlers = {
        
        '{FirstPageLink}': {
            markup: '<span class="pui-paginator-first pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-step-backward"></span></span>',
            
            create: function(paginator) {
                var element = $(this.markup);
                
                if(paginator.options.page === 0) {
                    element.addClass('ui-state-disabled');
                }
                
                element.on('click.puipaginator', function() {
                    if(!$(this).hasClass("ui-state-disabled")) {
                        paginator.option('page', 0);
                    }
                });
                                
                return element;
            },
            
            update: function(element, state) {
                if(state.page === 0) {
                    element.addClass('ui-state-disabled').removeClass('ui-state-hover ui-state-active');
                }
                else {
                    element.removeClass('ui-state-disabled');
                }
            }
        },
                
        '{PreviousPageLink}': {
            markup: '<span class="pui-paginator-prev pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-backward"></span></span>',
                    
            create: function(paginator) {
                var element = $(this.markup);
                
                if(paginator.options.page === 0) {
                    element.addClass('ui-state-disabled');
                }
                
                element.on('click.puipaginator', function() {
                    if(!$(this).hasClass("ui-state-disabled")) {
                        paginator.option('page', paginator.options.page - 1);
                    }
                });
                
                return element;
            },
                    
            update: function(element, state) {
                if(state.page === 0) {
                    element.addClass('ui-state-disabled').removeClass('ui-state-hover ui-state-active');
                }
                else {
                    element.removeClass('ui-state-disabled');
                }
            }
        },
                
        '{NextPageLink}': {
            markup: '<span class="pui-paginator-next pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-forward"></span></span>',
                    
            create: function(paginator) {
                var element = $(this.markup);
                
                if(paginator.options.page === (paginator.getPageCount() - 1)) {
                    element.addClass('ui-state-disabled').removeClass('ui-state-hover ui-state-active');
                }
                
                element.on('click.puipaginator', function() {
                    if(!$(this).hasClass("ui-state-disabled")) {
                        paginator.option('page', paginator.options.page + 1);
                    }
                });
                
                return element;
            },
                    
            update: function(element, state) {
                if(state.page === (state.pageCount - 1)) {
                    element.addClass('ui-state-disabled').removeClass('ui-state-hover ui-state-active');
                }
                else {
                    element.removeClass('ui-state-disabled');
                }
            }
        },
                
        '{LastPageLink}': {
            markup: '<span class="pui-paginator-last pui-paginator-element ui-state-default ui-corner-all"><span class="fa fa-step-forward"></span></span>',
                    
            create: function(paginator) {
                var element = $(this.markup);

                if(paginator.options.page === (paginator.getPageCount() - 1)) {
                    element.addClass('ui-state-disabled').removeClass('ui-state-hover ui-state-active');
                }
                
                element.on('click.puipaginator', function() {
                    if(!$(this).hasClass("ui-state-disabled")) {
                        paginator.option('page', paginator.getPageCount() - 1);
                    }
                });
                
                return element;
            },
            
            update: function(element, state) {
                if(state.page === (state.pageCount - 1)) {
                    element.addClass('ui-state-disabled').removeClass('ui-state-hover ui-state-active');
                }
                else {
                    element.removeClass('ui-state-disabled');
                }
            }
        },
                
        '{PageLinks}': {
            markup: '<span class="pui-paginator-pages"></span>',
                    
            create: function(paginator) {
                var element = $(this.markup),
                boundaries = this.calculateBoundaries({
                    page: paginator.options.page,
                    pageLinks: paginator.options.pageLinks,
                    pageCount: paginator.getPageCount()
                }),
                start = boundaries[0],
                end = boundaries[1];
                
                for(var i = start; i <= end; i++) {
                    var pageLinkNumber = (i + 1),
                    pageLinkElement = $('<span class="pui-paginator-page pui-paginator-element ui-state-default ui-corner-all">' + pageLinkNumber + "</span>");
                    
                    if(i === paginator.options.page) {
                        pageLinkElement.addClass('ui-state-active');
                    }
                    
                    pageLinkElement.on('click.puipaginator', function(e){
                        var link = $(this);

                        if(!link.hasClass('ui-state-disabled')&&!link.hasClass('ui-state-active')) {
                            paginator.option('page', parseInt(link.text(), 10) - 1);
                        }
                    });
                    
                    element.append(pageLinkElement);
                }

                return element;
            },
                    
            update: function(element, state, paginator) {
                var pageLinks = element.children(),
                boundaries = this.calculateBoundaries({
                    page: state.page,
                    pageLinks: state.pageLinks,
                    pageCount: state.pageCount
                }),
                start = boundaries[0],
                end = boundaries[1];
                
                pageLinks.remove();
        
                for(var i = start; i <= end; i++) {
                    var pageLinkNumber = (i + 1),
                    pageLinkElement = $('<span class="pui-paginator-page pui-paginator-element ui-state-default ui-corner-all">' + pageLinkNumber + "</span>");
                    
                    if(i === state.page) {
                        pageLinkElement.addClass('ui-state-active');
                    }
                    
                    pageLinkElement.on('click.puipaginator', function(e){
                        var link = $(this);

                        if(!link.hasClass('ui-state-disabled')&&!link.hasClass('ui-state-active')) {
                            paginator.option('page', parseInt(link.text(), 10) - 1);
                        }
                    });
                    
                    paginator._bindHover(pageLinkElement);
                    
                    element.append(pageLinkElement);
                }
            },
                    
            calculateBoundaries: function(config) {
                var page = config.page,
                pageLinks = config.pageLinks,
                pageCount = config.pageCount,
                visiblePages = Math.min(pageLinks, pageCount);
                
                //calculate range, keep current in middle if necessary
                var start = Math.max(0, parseInt(Math.ceil(page - ((visiblePages) / 2)), 10)),
                end = Math.min(pageCount - 1, start + visiblePages - 1);

                //check when approaching to last page
                var delta = pageLinks - (end - start + 1);
                start = Math.max(0, start - delta);
                
                return [start, end];
            }
        }
        
    };

    $.widget("primeui.puipaginator", {
       
        options: {
            pageLinks: 5,
            totalRecords: 0,
            page: 0,
            rows: 0,
            template: '{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}'
        },
        
        _create: function() {
            this.element.addClass('pui-paginator ui-widget-header');
            this.paginatorElements = [];
            
            var elementKeys = this.options.template.split(/[ ]+/);
            for(var i = 0; i < elementKeys.length;i++) {
                var elementKey = elementKeys[i],
                handler = ElementHandlers[elementKey];
        
                if(handler) {
                    var paginatorElement = handler.create(this);
                    this.paginatorElements[elementKey] = paginatorElement;
                    this.element.append(paginatorElement);
                }
            }
            
            this._bindEvents();
        },
                
        _bindEvents: function() {
            this._bindHover(this.element.find('span.pui-paginator-element'));
        },
        
        _bindHover: function(elements) {
            elements.on('mouseover.puipaginator', function() {
                        var el = $(this);
                        if(!el.hasClass('ui-state-active')&&!el.hasClass('ui-state-disabled')) {
                            el.addClass('ui-state-hover');
                        }
                    })
                    .on('mouseout.puipaginator', function() {
                        var el = $(this);
                        if(el.hasClass('ui-state-hover')) {
                            el.removeClass('ui-state-hover');
                        }
                    });
        },
        
        _setOption: function(key, value) {
            if(key === 'page')
                this.setPage(value);
            else if(key === 'totalRecords')
                this.setTotalRecords(value);
            else
                $.Widget.prototype._setOption.apply(this, arguments);
        },
                
        setPage: function(p, silent) {
            var pc = this.getPageCount();

            if(p >= 0 && p < pc) {
                var newState = {
                    first: this.options.rows * p,
                    rows: this.options.rows,
                    page: p,
                    pageCount: pc,
                    pageLinks: this.options.pageLinks
                };
                
                this.options.page = p;

                if(!silent) {
                    this._trigger('paginate', null, newState);
                }
                
                this.updateUI(newState);
            }
        },
        
        //state contains page and totalRecords
        setState: function(state) {
            this.options.totalRecords = state.totalRecords;
            this.setPage(state.page, true);
        },
                
        updateUI: function(state) {
            for(var paginatorElementKey in this.paginatorElements) {
                ElementHandlers[paginatorElementKey].update(this.paginatorElements[paginatorElementKey], state, this);
            }
        },
                
        getPageCount: function() {
            return Math.ceil(this.options.totalRecords / this.options.rows)||1;
        },
        
        setTotalRecords: function(value) {
            this.options.totalRecords = value;
            this.setPage(0, true);
        }
    });
})();/**
 * PrimeUI Panel Widget
 */
(function() {

    $.widget("primeui.puipanel", {
       
        options: {
            toggleable: false,
            toggleDuration: 'normal',
            toggleOrientation : 'vertical',
            collapsed: false,
            closable: false,
            closeDuration: 'slow',
            title: null
        },
        
        _create: function() {
            this.element.addClass('pui-panel ui-widget ui-widget-content ui-corner-all')
                .contents().wrapAll('<div class="pui-panel-content ui-widget-content" />');
                
            var title = this.element.attr('title')||this.options.title;
            if(title) {
                this.element.prepend('<div class="pui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all"><span class="ui-panel-title">' +
                        title + "</span></div>").removeAttr('title');
            }
            
            this.header = this.element.children('div.pui-panel-titlebar');
            this.title = this.header.children('span.ui-panel-title');
            this.content = this.element.children('div.pui-panel-content');
            
            var $this = this;
            
            if(this.options.closable) {
                this.closer = $('<a class="pui-panel-titlebar-icon ui-corner-all ui-state-default" href="#"><span class="pui-icon fa fa-fw fa-close"></span></a>')
                                .appendTo(this.header)
                                .on('click.puipanel', function(e) {
                                    $this.close();
                                    e.preventDefault();
                                });
            }
            
            if(this.options.toggleable) {
                var icon = this.options.collapsed ? 'fa-plus' : 'fa-minus';
                
                this.toggler = $('<a class="pui-panel-titlebar-icon ui-corner-all ui-state-default" href="#"><span class="pui-icon fa fa-fw ' + icon + '"></span></a>')
                                .appendTo(this.header)
                                .on('click.puipanel', function(e) {
                                    $this.toggle();
                                    e.preventDefault();
                                });
                                
                if(this.options.collapsed) {
                    this.content.hide();
                }
            }
            
            this._bindEvents();
        },

        _bindEvents: function() {
            this.header.find('a.pui-panel-titlebar-icon').on('mouseenter.puipanel', function() {
                $(this).addClass('ui-state-hover');
            })
            .on('mouseleave.puipanel', function() {
                $(this).removeClass('ui-state-hover');
            });
        },
        
        close: function() {
            var $this = this;
            
            this._trigger('beforeClose', null);
            
            this.element.fadeOut(this.options.closeDuration,
                function() {
                    $this._trigger('afterClose', null);
                }
            );
        },
        
        toggle: function() {
            if(this.options.collapsed) {
                this.expand();
            }
            else {
                this.collapse();
            }
        },
        
        expand: function() {
            this.toggler.children('.pui-icon').removeClass('fa-plus').addClass('fa-minus');
            
            if(this.options.toggleOrientation === 'vertical') {
                this._slideDown();
            } 
            else if(this.options.toggleOrientation === 'horizontal') {
                this._slideRight();
            }
        },

        collapse: function() {
            this.toggler.children('.pui-icon').removeClass('fa-minus').addClass('fa-plus');
            
            if(this.options.toggleOrientation === 'vertical') {
                this._slideUp();
            } 
            else if(this.options.toggleOrientation === 'horizontal') {
                this._slideLeft();
            }
        },
        
        _slideUp: function() {        
            var $this = this;
            
            this._trigger('beforeCollapse');
            
            this.content.slideUp(this.options.toggleDuration, 'easeInOutCirc', function() {
                $this._trigger('afterCollapse');
                $this.options.collapsed = !$this.options.collapsed;
            });
        },

        _slideDown: function() {  
            var $this = this;
            
            this._trigger('beforeExpand');
            
            this.content.slideDown(this.options.toggleDuration, 'easeInOutCirc', function() {
                $this._trigger('afterExpand');
                $this.options.collapsed = !$this.options.collapsed;
            }); 
        },

        _slideLeft: function() {
            var $this = this;

            this.originalWidth = this.element.width();

            this.title.hide();
            this.toggler.hide();
            this.content.hide();

            this.element.animate({
                width: '42px'
            }, this.options.toggleSpeed, 'easeInOutCirc', function() {
                $this.toggler.show();
                $this.element.addClass('pui-panel-collapsed-h');
                $this.options.collapsed = !$this.options.collapsed;
            });
        },

        _slideRight: function() {
            var $this = this,
            expandWidth = this.originalWidth||'100%';

            this.toggler.hide();

            this.element.animate({
                width: expandWidth
            }, this.options.toggleSpeed, 'easeInOutCirc', function() {
                $this.element.removeClass('pui-panel-collapsed-h');
                $this.title.show();
                $this.toggler.show();
                $this.options.collapsed = !$this.options.collapsed;

                $this.content.css({
                    'visibility': 'visible',
                    'display': 'block',
                    'height': 'auto'
                });
            });
        }
    });
})();/**
 * PrimeUI password widget
 */
(function() {

    $.widget("primeui.puipassword", {
        
        options: {
            promptLabel: 'Please enter a password',
            weakLabel: 'Weak',
            goodLabel: 'Medium',
            strongLabel: 'Strong',
            inline: false
        },
       
        _create: function() {
            this.element.puiinputtext().addClass('pui-password');
            
            if(!this.element.prop(':disabled')) {
                var panelMarkup = '<div class="pui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden">';
                panelMarkup += '<div class="pui-password-meter" style="background-position:0pt 0pt">&nbsp;</div>';
                panelMarkup += '<div class="pui-password-info">' + this.options.promptLabel + '</div>';
                panelMarkup += '</div>';

                this.panel = $(panelMarkup).insertAfter(this.element);
                this.meter = this.panel.children('div.pui-password-meter');
                this.infoText = this.panel.children('div.pui-password-info');

                if(this.options.inline) {
                    this.panel.addClass('pui-password-panel-inline');
                } else {
                    this.panel.addClass('pui-password-panel-overlay').appendTo('body');
                }

                this._bindEvents();
            }
        },
        
        _destroy: function() {
            this.panel.remove();
        },
        
        _bindEvents: function() {
            var $this = this;
            
            this.element.on('focus.puipassword', function() {
                $this.show();
            })
            .on('blur.puipassword', function() {
                $this.hide();
            })
            .on('keyup.puipassword', function() {
                var value = $this.element.val(),
                label = null,
                meterPos = null;

                if(value.length === 0) {
                    label = $this.options.promptLabel;
                    meterPos = '0px 0px';
                }
                else {
                    var score = $this._testStrength($this.element.val());

                    if(score < 30) {
                        label = $this.options.weakLabel;
                        meterPos = '0px -10px';
                    }
                    else if(score >= 30 && score < 80) {
                        label = $this.options.goodLabel;
                        meterPos = '0px -20px';
                    } 
                    else if(score >= 80) {
                        label = $this.options.strongLabel;
                        meterPos = '0px -30px';
                    }
                }

                $this.meter.css('background-position', meterPos);
                $this.infoText.text(label);
            });

            if(!this.options.inline) {
                var resizeNS = 'resize.' + this.element.attr('id');
                $(window).unbind(resizeNS).bind(resizeNS, function() {
                    if($this.panel.is(':visible')) {
                        $this.align();
                    }
                });
            }
        },

        _unbindEvents: function() {
            this.element.off('focus.puipassword blur.puipassword keyup.puipassword');
        },
        
        _testStrength: function(str) {
            var grade = 0, 
            val = 0, 
            $this = this;

            val = str.match('[0-9]');
            grade += $this._normalize(val ? val.length : 1/4, 1) * 25;

            val = str.match('[a-zA-Z]');
            grade += $this._normalize(val ? val.length : 1/2, 3) * 10;

            val = str.match('[!@#$%^&*?_~.,;=]');
            grade += $this._normalize(val ? val.length : 1/6, 1) * 35;

            val = str.match('[A-Z]');
            grade += $this._normalize(val ? val.length : 1/6, 1) * 30;

            grade *= str.length / 8;

            return grade > 100 ? 100 : grade;
        },

        _normalize: function(x, y) {
            var diff = x - y;

            if(diff <= 0) {
                return x / y;
            }
            else {
                return 1 + 0.5 * (x / (x + y/4));
            }
        },

        align: function() {
            this.panel.css({
                left:'', 
                top:'',
                'z-index': ++PUI.zindex
            })
            .position({
                my: 'left top',
                at: 'right top',
                of: this.element
            });
        },

        show: function() {
            if(!this.options.inline) {
                this.align();

                this.panel.fadeIn();
            }
            else {
                this.panel.slideDown(); 
            }        
        },

        hide: function() {
            if(this.options.inline) {
                this.panel.slideUp();
            }
            else {
                this.panel.fadeOut();
            }
        },

        disable: function () {
            this.element.puiinputtext('disable');
            this._unbindEvents();
        },

        enable: function () {
            this.element.puiinputtext('enable');
            this._bindEvents();
        }
    });
    
})();/**
 * PrimeUI picklist widget
 */
(function() {

    $.widget("primeui.puipicklist", {
       
        options: {
            effect: 'fade',
            effectSpeed: 'fast',
            sourceCaption: null,
            targetCaption: null,
            filter: false,
            filterFunction: null,
            filterMatchMode: 'startsWith',
            dragdrop: true,
            sourceData: null,
            targetData: null,
            content: null,
            template: null,
            responsive: false
        },

        _create: function() {
            this.element.uniqueId().addClass('pui-picklist ui-widget ui-helper-clearfix');
            if(this.options.responsive) {
                this.element.addClass('pui-picklist-responsive');
            }
            this.inputs = this.element.children('select');
            this.items = $();
            this.sourceInput = this.inputs.eq(0);
            this.targetInput = this.inputs.eq(1);
            
            if(this.options.sourceData) {
                this._populateInputFromData(this.sourceInput, this.options.sourceData);
            }
            
            if(this.options.targetData) {
                this._populateInputFromData(this.targetInput, this.options.targetData);
            }
                        
            this.sourceList = this._createList(this.sourceInput, 'pui-picklist-source', this.options.sourceCaption);
            this._createButtons();
            this.targetList = this._createList(this.targetInput, 'pui-picklist-target', this.options.targetCaption);
            
            if(this.options.showSourceControls) {
                this.element.prepend(this._createListControls(this.sourceList, 'pui-picklist-source-controls'));
            }
            
            if(this.options.showTargetControls) {
                this.element.append(this._createListControls(this.targetList, 'pui-picklist-target-controls'));
            }
            
            this._bindEvents();
        },
                
        _populateInputFromData: function(input, data) {
            for(var i = 0; i < data.length; i++) {
                var choice = data[i];
                if(choice.label)
                    input.append('<option value="' + choice.value + '">' + choice.label + '</option>');
                else
                    input.append('<option value="' + choice + '">' + choice + '</option>');
            }
        },
                
        _createList: function(input, cssClass, caption) {                        
            var listWrapper = $('<div class="pui-picklist-listwrapper ' + cssClass + '-wrapper"></div>'),
                listContainer = $('<ul class="ui-widget-content pui-picklist-list ' + cssClass + '"></ul>');

            if(this.options.filter) {
                listWrapper.append('<div class="pui-picklist-filter-container"><input type="text" class="pui-picklist-filter" /><span class="pui-icon fa fa-fw fa-search"></span></div>');
                listWrapper.find('> .pui-picklist-filter-container > input').puiinputtext();
            } 
    
            if(caption) {
                listWrapper.append('<div class="pui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr">' + caption + '</div>');
                listContainer.addClass('ui-corner-bottom');
            }
            else {
                listContainer.addClass('ui-corner-all');
            }

            this._populateContainerFromOptions(input, listContainer);
            
            
            listWrapper.append(listContainer);
            input.addClass('ui-helper-hidden').appendTo(listWrapper);
            listWrapper.appendTo(this.element);
            
            return listContainer;
        },

        _populateContainerFromOptions: function(input, listContainer, data) {
            var choices = input.children('option');
            for(var i = 0; i < choices.length; i++) {
                var choice = choices.eq(i),
                content = this._createItemContent(choice.get(0)),
                item = $('<li class="pui-picklist-item ui-corner-all"></li>').data({
                    'item-label': choice.text(),
                    'item-value': choice.val()
                });

                if($.type(content) === 'string')
                    item.html(content);
                else
                    item.append(content);

                this.items = this.items.add(item);
                listContainer.append(item);
            }
        },

        _createButtons: function() {
            var $this = this,
            buttonContainer = $('<div class="pui-picklist-buttons"><div class="pui-picklist-buttons-cell"></div>');
            
            buttonContainer.children('div').append(this._createButton('fa-angle-right', 'pui-picklist-button-add', function(){$this._add();}))
                            .append(this._createButton('fa-angle-double-right', 'pui-picklist-button-addall', function(){$this._addAll();}))
                            .append(this._createButton('fa-angle-left', 'pui-picklist-button-remove', function(){$this._remove();}))
                            .append(this._createButton('fa-angle-double-left', 'pui-picklist-button-removeall', function(){$this._removeAll();}));
                    
            this.element.append(buttonContainer);
        },
                
        _createListControls: function(list, cssClass) {
            var $this = this,
            buttonContainer = $('<div class="' + cssClass + ' pui-picklist-buttons"><div class="pui-picklist-buttons-cell"></div>');
            
            buttonContainer.children('div').append(this._createButton('fa-angle-up', 'pui-picklist-button-move-up', function(){$this._moveUp(list);}))
                            .append(this._createButton('fa-angle-double-up', 'pui-picklist-button-move-top', function(){$this._moveTop(list);}))
                            .append(this._createButton('fa-angle-down', 'pui-picklist-button-move-down', function(){$this._moveDown(list);}))
                            .append(this._createButton('fa-angle-double-down', 'pui-picklist-button-move-bottom', function(){$this._moveBottom(list);}));
                    
            return buttonContainer;
        },
                
        _createButton: function(icon, cssClass, fn) {
            var btn = $('<button class="' + cssClass + '" type="button"></button>').puibutton({
                'icon': icon,
                'click': function() {
                    fn();
                    $(this).removeClass('ui-state-hover ui-state-focus');
                }

            });
            
            return btn;
        },
                
        _bindEvents: function() {
            var $this = this;
        
            this.items.on('mouseover.puipicklist', function(e) {
                var element = $(this);

                if(!element.hasClass('ui-state-highlight')) {
                    $(this).addClass('ui-state-hover');
                }
            })
            .on('mouseout.puipicklist', function(e) {
                $(this).removeClass('ui-state-hover');
            })
            .on('click.puipicklist', function(e) {
                var item = $(this),
                metaKey = (e.metaKey||e.ctrlKey);

                if(!e.shiftKey) {
                    if(!metaKey) {
                        $this.unselectAll();
                    }

                    if(metaKey && item.hasClass('ui-state-highlight')) {
                        $this.unselectItem(item);
                    } 
                    else {
                        $this.selectItem(item);
                        $this.cursorItem = item;
                    }
                }
                else {
                    $this.unselectAll();

                    if($this.cursorItem && ($this.cursorItem.parent().is(item.parent()))) {
                        var currentItemIndex = item.index(),
                        cursorItemIndex = $this.cursorItem.index(),
                        startIndex = (currentItemIndex > cursorItemIndex) ? cursorItemIndex : currentItemIndex,
                        endIndex = (currentItemIndex > cursorItemIndex) ? (currentItemIndex + 1) : (cursorItemIndex + 1),
                        parentList = item.parent();

                        for(var i = startIndex ; i < endIndex; i++) {
                            $this.selectItem(parentList.children('li.ui-picklist-item').eq(i));
                        }
                    }
                    else {
                        $this.selectItem(item);
                        $this.cursorItem = item;
                    }
                }
            })
            .on('dblclick.pickList', function() {
                var item = $(this);

                if($(this).closest('.pui-picklist-listwrapper').hasClass('pui-picklist-source-wrapper'))
                    $this._transfer(item, $this.sourceList, $this.targetList, 'dblclick');
                else
                    $this._transfer(item, $this.targetList, $this.sourceList, 'dblclick');

                PUI.clearSelection();
            });
            
            if(this.options.filter) {
                this._setupFilterMatcher();
                
                this.element.find('> .pui-picklist-source-wrapper > .pui-picklist-filter-container > input').on('keyup', function(e) {
                    $this._filter(this.value, $this.sourceList);
                });

                this.element.find('> .pui-picklist-target-wrapper > .pui-picklist-filter-container > input').on('keyup', function(e) {
                    $this._filter(this.value, $this.targetList);
                });
            }
            
            if(this.options.dragdrop) {                
                this.element.find('> .pui-picklist-listwrapper > ul.pui-picklist-list').sortable({
                    cancel: '.ui-state-disabled',
                    connectWith: '#' + this.element.attr('id') + ' .pui-picklist-list',
                    revert: 1,
                    update: function(event, ui) {
                        $this.unselectItem(ui.item);

                        $this._saveState();
                    },
                    receive: function(event, ui) {
                        $this._triggerTransferEvent(ui.item, ui.sender, ui.item.closest('ul.pui-picklist-list'), 'dragdrop');
                    }
                });
            }
        },
                
        selectItem: function(item) {
            item.removeClass('ui-state-hover').addClass('ui-state-highlight');
        },

        unselectItem: function(item) {
            item.removeClass('ui-state-highlight');
        },

        unselectAll: function() {
            var selectedItems = this.items.filter('.ui-state-highlight');
            for(var i = 0; i < selectedItems.length; i++) {
                this.unselectItem(selectedItems.eq(i));
            }
        },
                
        _add: function() {
            var items = this.sourceList.children('li.pui-picklist-item.ui-state-highlight');

            this._transfer(items, this.sourceList, this.targetList, 'command');
        },

        _addAll: function() {
            var items = this.sourceList.children('li.pui-picklist-item:visible:not(.ui-state-disabled)');

            this._transfer(items, this.sourceList, this.targetList, 'command');
        },

        _remove: function() {
            var items = this.targetList.children('li.pui-picklist-item.ui-state-highlight');

            this._transfer(items, this.targetList, this.sourceList, 'command');
        },

        _removeAll: function() {
            var items = this.targetList.children('li.pui-picklist-item:visible:not(.ui-state-disabled)');

            this._transfer(items, this.targetList, this.sourceList, 'command');
        },
                
        _moveUp: function(list) {
            var $this = this,
            animated = $this.options.effect,
            items = list.children('.ui-state-highlight'),
            itemsCount = items.length,
            movedCount = 0;

            items.each(function() {
                var item = $(this);
                
                if(!item.is(':first-child')) {
                    if(animated) {
                        item.hide($this.options.effect, {}, $this.options.effectSpeed, function() {
                            item.insertBefore(item.prev()).show($this.options.effect, {}, $this.options.effectSpeed, function() {
                                movedCount++;

                                if(movedCount === itemsCount) {
                                    $this._saveState();
                                }
                            });
                        });
                    }
                    else {
                        item.hide().insertBefore(item.prev()).show();
                    }

                }
            });

            if(!animated) {
                this._saveState();
            }

        },

        _moveTop: function(list) {
            var $this = this,
            animated = $this.options.effect,
            items = list.children('.ui-state-highlight'),
            itemsCount = items.length,
            movedCount = 0;

            list.children('.ui-state-highlight').each(function() {
                var item = $(this);

                if(!item.is(':first-child')) {
                    if(animated) {
                        item.hide($this.options.effect, {}, $this.options.effectSpeed, function() {
                            item.prependTo(item.parent()).show($this.options.effect, {}, $this.options.effectSpeed, function(){
                                movedCount++;

                                if(movedCount === itemsCount) {
                                    $this._saveState();
                                }
                            });
                        });
                    }
                    else {
                        item.hide().prependTo(item.parent()).show();
                    }
                }
            });

            if(!animated) {
                this._saveState();
            }
        },

        _moveDown: function(list) {
            var $this = this,
            animated = $this.options.effect,
            items = list.children('.ui-state-highlight'),
            itemsCount = items.length,
            movedCount = 0;

            $(list.children('.ui-state-highlight').get().reverse()).each(function() {
                var item = $(this);

                if(!item.is(':last-child')) {
                    if(animated) {
                        item.hide($this.options.effect, {}, $this.options.effectSpeed, function() {
                            item.insertAfter(item.next()).show($this.options.effect, {}, $this.options.effectSpeed, function() {
                                movedCount++;

                                if(movedCount === itemsCount) {
                                    $this._saveState();
                                }
                            });
                        });
                    }
                    else {
                        item.hide().insertAfter(item.next()).show();
                    }
                }

            });

            if(!animated) {
                this._saveState();
            }
        },

        _moveBottom: function(list) {
            var $this = this,
            animated = $this.options.effect,
            items = list.children('.ui-state-highlight'),
            itemsCount = items.length,
            movedCount = 0;

            list.children('.ui-state-highlight').each(function() {
                var item = $(this);

                if(!item.is(':last-child')) {

                    if(animated) {
                        item.hide($this.options.effect, {}, $this.options.effectSpeed, function() {
                            item.appendTo(item.parent()).show($this.options.effect, {}, $this.options.effectSpeed, function() {
                                movedCount++;

                                if(movedCount === itemsCount) {
                                    $this._saveState();
                                }
                            });
                        });
                    }
                    else {
                        item.hide().appendTo(item.parent()).show();
                    }
                }

            });

            if(!animated) {
                this._saveState();
            }
        },
                
        _transfer: function(items, from, to, type) {  
            var $this = this,
            itemsCount = items.length,
            transferCount = 0;

            if(this.options.effect) {
                items.hide(this.options.effect, {}, this.options.effectSpeed, function() {
                    var item = $(this);
                    $this.unselectItem(item);

                    item.appendTo(to).show($this.options.effect, {}, $this.options.effectSpeed, function() {
                        transferCount++;

                        if(transferCount === itemsCount) {
                            $this._saveState();
                            $this._triggerTransferEvent(items, from, to, type);
                        }
                    });
                });
            }
            else {
                items.hide().removeClass('ui-state-highlight ui-state-hover').appendTo(to).show();

                this._saveState();
                this._triggerTransferEvent(items, from, to, type);
            }
        },

        _triggerTransferEvent: function(items, from, to, type) {
            var obj = {};
            obj.items = items;
            obj.from = from;
            obj.to = to;
            obj.type = type;

            this._trigger('transfer', null, obj);
        },
                
        _saveState: function() {
            this.sourceInput.children().remove();
            this.targetInput.children().remove();

            this._generateItems(this.sourceList, this.sourceInput);
            this._generateItems(this.targetList, this.targetInput);
            this.cursorItem = null;
        },
                
        _generateItems: function(list, input) {   
            list.children('.pui-picklist-item').each(function() {
                var item = $(this),
                itemValue = item.data('item-value'),
                itemLabel = item.data('item-label');

                input.append('<option value="' + itemValue + '" selected="selected">' + itemLabel + '</option>');
            });
        },
                
        _setupFilterMatcher: function() {
            this.filterMatchers = {
                'startsWith': this._startsWithFilter,
                'contains': this._containsFilter,
                'endsWith': this._endsWithFilter,
                'custom': this.options.filterFunction
            };

            this.filterMatcher = this.filterMatchers[this.options.filterMatchMode];
        },
                
        _filter: function(value, list) {
            var filterValue = $.trim(value).toLowerCase(),
            items = list.children('li.pui-picklist-item');

            if(filterValue === '') {
                items.filter(':hidden').show();
            }
            else {
                for(var i = 0; i < items.length; i++) {
                    var item = items.eq(i),
                    itemLabel = item.data('item-label');

                    if(this.filterMatcher(itemLabel, filterValue))
                        item.show();
                    else 
                        item.hide();                    
                }
            }
        },

        _startsWithFilter: function(value, filter) {
            return value.toLowerCase().indexOf(filter) === 0;
        },

        _containsFilter: function(value, filter) {
            return value.toLowerCase().indexOf(filter) !== -1;
        },

        _endsWithFilter: function(value, filter) {
            return value.indexOf(filter, value.length - filter.length) !== -1;
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            if (key === 'sourceData') {
                this._setOptionData(this.sourceInput, this.sourceList, this.options.sourceData);
            }
            if (key === 'targetData') {
                this._setOptionData(this.targetInput, this.targetList, this.options.targetData);
            }
        },

        _setOptionData: function(input, listContainer, data) {
            input.empty();
            listContainer.empty();
            this._populateInputFromData(input, data);

            this._populateContainerFromOptions(input, listContainer, data);
            this._bindEvents();
        },

        _unbindEvents: function() {
            this.items.off("mouseover.puipicklist mouseout.puipicklist click.puipicklist dblclick.pickList");
        },

        disable: function () {
            this._unbindEvents();
            this.items.addClass('ui-state-disabled');
            this.element.find('.pui-picklist-buttons > button').each(function (idx, btn) {
                $(btn).puibutton('disable');
            });
        },

        enable: function () {
            this._bindEvents();
            this.items.removeClass('ui-state-disabled');
            this.element.find('.pui-picklist-buttons > button').each(function (idx, btn) {
                $(btn).puibutton('enable');
            });
        },
        
        _createItemContent: function(choice) {
            if(this.options.template) {
                var template = this.options.template.html();
                Mustache.parse(template);
                return Mustache.render(template, choice);
            }
            else if(this.options.content) {
                return this.options.content.call(this, choice);
            }
            else {
                return choice.label;
            }
        }
    });
        
})();/**
 * PrimeUI progressbar widget
 */
(function() {

    $.widget("primeui.puiprogressbar", {
       
        options: {
            value: 0,
            labelTemplate: '{value}%',
            complete: null,
            easing: 'easeInOutCirc',
            effectSpeed: 'normal',
            showLabel: true
        },
       
        _create: function() {
            this.element.addClass('pui-progressbar ui-widget ui-widget-content ui-corner-all')
                    .append('<div class="pui-progressbar-value ui-widget-header ui-corner-all"></div>')
                    .append('<div class="pui-progressbar-label"></div>');
            
            this.jqValue = this.element.children('.pui-progressbar-value');
            this.jqLabel = this.element.children('.pui-progressbar-label');
            
            if(this.options.value !==0) {
                this._setValue(this.options.value, false);
            }

            this.enableARIA();
        },
        
        _setValue: function(value, animate) {
            var anim = (animate === undefined || animate) ? true : false; 
            
            if(value >= 0 && value <= 100) {
                if(value === 0) {
                    this.jqValue.hide().css('width', '0%').removeClass('ui-corner-right');

                    this.jqLabel.hide();
                }
                else {
                    if(anim) {
                        this.jqValue.show().animate({
                            'width': value + '%' 
                        }, this.options.effectSpeed, this.options.easing);
                    }
                    else {
                        this.jqValue.show().css('width', value + '%');
                    }

                    if(this.options.labelTemplate && this.options.showLabel) {
                        var formattedLabel = this.options.labelTemplate.replace(/{value}/gi, value);

                        this.jqLabel.html(formattedLabel).show();
                    }
                    
                    if(value === 100) {
                        this._trigger('complete');
                    }
                }

                this.options.value = value;
                this.element.attr('aria-valuenow', value);
            }
        },

        _getValue: function() {
            return this.options.value;
        },

        enableARIA: function() {
            this.element.attr('role', 'progressbar')
                    .attr('aria-valuemin', 0)
                    .attr('aria-valuenow', this.options.value)
                    .attr('aria-valuemax', 100);
        },
                
        _setOption: function(key, value) {
            if(key === 'value') {
                this._setValue(value);
            }
            
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        
        _destroy: function() {
            
        }
        
    });
    
})();/**
 * PrimeUI radiobutton widget
 */
(function() {

    var checkedRadios = {};

    $.widget("primeui.puiradiobutton", {
       
        _create: function() {
            this.element.wrap('<div class="pui-radiobutton ui-widget"><div class="ui-helper-hidden-accessible"></div></div>');
            this.container = this.element.parent().parent();
            this.box = $('<div class="pui-radiobutton-box ui-widget pui-radiobutton-relative ui-state-default">').appendTo(this.container);
            this.icon = $('<span class="pui-radiobutton-icon pui-icon"></span>').appendTo(this.box);
            this.disabled = this.element.prop('disabled');
            this.label = $('label[for="' + this.element.attr('id') + '"]');
            
            if(this.element.prop('checked')) {
                this.box.addClass('ui-state-active');
                this.icon.addClass('fa fa-fw fa-circle');
                checkedRadios[this.element.attr('name')] = this.box;
            }
            
            if(this.disabled) {
                this.box.addClass('ui-state-disabled');
            } else {
                this._bindEvents();
            }
        },
        
        _bindEvents: function() {
            var $this = this;
        
            this.box.on('mouseover.puiradiobutton', function() {
                if(!$this._isChecked()) 
                    $this.box.addClass('ui-state-hover');
            }).on('mouseout.puiradiobutton', function() {
                if(!$this._isChecked())
                    $this.box.removeClass('ui-state-hover');
            }).on('click.puiradiobutton', function() {
                if(!$this._isChecked()) {
                    $this.element.trigger('click');

                    if(PUI.browser.msie && parseInt(PUI.browser.version, 10) < 9) {
                        $this.element.trigger('change');
                    }
                }
            });
            
            if(this.label.length > 0) {
                this.label.on('click.puiradiobutton', function(e) {
                    $this.element.trigger('click');

                    e.preventDefault();
                });
            }
            
            this.element.focus(function() {
                if($this._isChecked()) {
                    $this.box.removeClass('ui-state-active');
                }

                $this.box.addClass('ui-state-focus');
            })
            .blur(function() {
                if($this._isChecked()) {
                    $this.box.addClass('ui-state-active');
                }

                $this.box.removeClass('ui-state-focus');
            })
            .change(function(e) {
                var name = $this.element.attr('name');
                if(checkedRadios[name]) {
                    checkedRadios[name].removeClass('ui-state-active ui-state-focus ui-state-hover').children('.pui-radiobutton-icon').removeClass('fa fa-fw fa-circle');
                }

                $this.icon.addClass('fa fa-fw fa-circle');
                if(!$this.element.is(':focus')) {
                    $this.box.addClass('ui-state-active');
                }

                checkedRadios[name] = $this.box;
                
                $this._trigger('change', null);
            });
        },
        
        _isChecked: function() {
            return this.element.prop('checked');
        },

        _unbindEvents: function () {
            this.box.off();

            if (this.label.length > 0) {
                this.label.off();
            }
        },

        enable: function () {
            this._bindEvents();
            this.box.removeClass('ui-state-disabled');
        },

        disable: function () {
            this._unbindEvents();
            this.box.addClass('ui-state-disabled');
        }
    });
    
})();/**
 * PrimeUI rating widget
 */
(function() {

    $.widget("primeui.puirating", {
       
        options: {
            stars: 5,
            cancel: true,
            readonly: false,
            disabled: false,
            value: 0
        },
        
        _create: function() {
            var input = this.element;
            
            input.wrap('<div />');
            this.container = input.parent();
            this.container.addClass('pui-rating');
            
            var inputVal = input.val(),
            value = inputVal === '' ? this.options.value : parseInt(inputVal, 10);
            
            if(this.options.cancel) {
                this.container.append('<div class="pui-rating-cancel"><a></a></div>');
            }

            for(var i = 0; i < this.options.stars; i++) {
                var styleClass = (value > i) ? "pui-rating-star pui-rating-star-on" : "pui-rating-star";

                this.container.append('<div class="' + styleClass + '"><a></a></div>');
            }
            
            this.stars = this.container.children('.pui-rating-star');

            if(input.prop('disabled')||this.options.disabled) {
                this.container.addClass('ui-state-disabled');
            }
            else if(!input.prop('readonly')&&!this.options.readonly){
                this._bindEvents();
            }
        },
        
        _bindEvents: function() {
            var $this = this;

            this.stars.click(function() {
                var value = $this.stars.index(this) + 1;   //index starts from zero

                $this.setValue(value);
            });

            this.container.children('.pui-rating-cancel').hover(function() {
                $(this).toggleClass('pui-rating-cancel-hover');
            })
            .click(function() {
                $this.cancel();
            });
        },
        
        cancel: function() {
            this.element.val('');
        
            this.stars.filter('.pui-rating-star-on').removeClass('pui-rating-star-on');
            
            this._trigger('oncancel', null);
        },
        
        getValue: function() {
            var inputVal = this.element.val();

            return inputVal === '' ? null : parseInt(inputVal, 10);
        },

        setValue: function(value) {
            this.element.val(value);

            //update visuals
            this.stars.removeClass('pui-rating-star-on');
            for(var i = 0; i < value; i++) {
                this.stars.eq(i).addClass('pui-rating-star-on');
            }
            
            this._trigger('rate', null, value);
        },

        enable: function() {
            this.container.removeClass('ui-state-disabled');
            this._bindEvents();
        },

        disable: function() {
            this.container.addClass('ui-state-disabled');
            this._unbindEvents();
        },

        _unbindEvents: function() {
            this.stars.off('click');

            this.container.children('.pui-rating-cancel').off('hover click');
        },

        _updateValue: function(value) {
            var stars = this.container.children('div.pui-rating-star');
            stars.removeClass('pui-rating-star-on');
            for(var i = 0; i < stars.length; i++) {
                if(i < value) {
                    stars.eq(i).addClass('pui-rating-star-on');
                }
            }

            this.element.val(value);
        },

        _setOption: function(key, value) {
            if(key === 'value') {
                this.options.value = value;
                this._updateValue(value);
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }
    });
    
})();(function() {

    $.widget("primeui.puiselectbutton", {
       
       options: {
            choices: null,
            formfield: null,
            unselectable: false,
            tabindex: '0',
            multiple: false
        },
        
        _create: function() {
            this.element.addClass('pui-selectbutton pui-buttonset ui-widget ui-corner-all').attr('tabindex');
            
            //create buttons
            if(this.options.choices) {
                this.element.addClass('pui-buttonset-' + this.options.choices.length);
                for(var i = 0; i < this.options.choices.length; i++) {
                    this.element.append('<div class="pui-button ui-widget ui-state-default pui-button-text-only" tabindex="' + this.options.tabindex + '" data-value="' 
                                        + this.options.choices[i].value + '">' +
                                        '<span class="pui-button-text ui-c">' + 
                                        this.options.choices[i].label + 
                                        '</span></div>');
                }
            }
            
            //cornering
            this.buttons = this.element.children('div.pui-button');
            this.buttons.filter(':first-child').addClass('ui-corner-left');
            this.buttons.filter(':last-child').addClass('ui-corner-right');
            
            //Single Select Button Or Multiple Select Button Decision
            if(!this.options.multiple)  {         
                this.input = $('<input type="hidden"></input>').appendTo(this.element);
            } 
            else {
                this.input = $('<select class="ui-helper-hidden-accessible" multiple></select>').appendTo(this.element);
                for (var i = 0; i < this.options.choices.length; i++) {
                    var selectOption = '<option value = "'+ this.options.choices[i].value +'"></option>';
                    this.input.append(selectOption);
                }
                this.selectOptions = this.input.children('option');
            }
            
            if(this.options.formfield) {
                this.input.attr('name', this.options.formfield);
            }

            this._bindEvents();
        },
        
        _bindEvents: function() {
            var $this = this;
            
            this.buttons.on('mouseover', function() {
                var btn = $(this);
                if(!btn.hasClass('ui-state-active')) {
                    btn.addClass('ui-state-hover');
                }
            })
            .on('mouseout', function() {
                $(this).removeClass('ui-state-hover');
            })
            .on('click', function(e) {
                var btn = $(this);
                if($(this).hasClass("ui-state-active")) {
                    if($this.options.unselectable) {
                        $this.unselectOption(btn);
                        $this._trigger('change', e);
                    }
                }
                else {
                    if($this.options.multiple) {
                        $this.selectOption(btn);
                    }
                    else {
                        $this.unselectOption(btn.siblings('.ui-state-active'));
                        $this.selectOption(btn);
                    } 
                    
                    $this._trigger('change', e);
                }
            })
            .on('focus', function() {            
                $(this).addClass('ui-state-focus');
            })
            .on('blur', function() {            
                $(this).removeClass('ui-state-focus');
            })
            .on('keydown', function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which === keyCode.ENTER) {
                    $this.element.trigger('click');
                    e.preventDefault();
                }
            })
            .on('keydown', function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which === keyCode.SPACE||e.which === keyCode.ENTER||e.which === keyCode.NUMPAD_ENTER) {
                    $(this).trigger('click');
                    e.preventDefault();
                }
            });
        },
        
        selectOption: function(value) {
            var btn = $.isNumeric(value) ? this.element.children('.pui-button').eq(value) : value;
            
            if(this.options.multiple)
                this.selectOptions.eq(btn.index()).prop('selected',true);
            else
                this.input.val(btn.data('value'));
            
            btn.addClass('ui-state-active');
        },
        
        unselectOption: function(value){
            var btn = $.isNumeric(value) ? this.element.children('.pui-button').eq(value) : value;
            
            if(this.options.multiple)
                this.selectOptions.eq(btn.index()).prop('selected',false);
            else
                this.input.val('');

            btn.removeClass('ui-state-active');   
            btn.removeClass('ui-state-focus');         
        }
        
    });
    
})();

/**
 * PrimeUI spinner widget
 */
(function() {

    $.widget("primeui.puispinner", {
       
        options: {
            step: 1.0,
            min: undefined,
            max: undefined,
            prefix: null,
            suffix: null
        },
        
        _create: function() {
            var input = this.element,
            disabled = input.prop('disabled');
            
            input.puiinputtext().addClass('pui-spinner-input').wrap('<span class="pui-spinner ui-widget ui-corner-all" />');
            this.wrapper = input.parent();
            this.wrapper.append('<a class="pui-spinner-button pui-spinner-up ui-corner-tr pui-button ui-widget ui-state-default pui-button-text-only"><span class="pui-button-text"><span class="pui-icon fa fa-fw fa-caret-up"></span></span></a><a class="pui-spinner-button pui-spinner-down ui-corner-br pui-button ui-widget ui-state-default pui-button-text-only"><span class="pui-button-text"><span class="pui-icon fa fa-fw fa-caret-down"></span></span></a>');
            this.upButton = this.wrapper.children('a.pui-spinner-up');
            this.downButton = this.wrapper.children('a.pui-spinner-down');
            this.options.step = this.options.step||1;
            
            if(parseInt(this.options.step, 10) === 0) {
                this.options.precision = this.options.step.toString().split(/[,]|[.]/)[1].length;
            }
            
            this._initValue();
    
            if(!disabled&&!input.prop('readonly')) {
                this._bindEvents();
            }
            
            if(disabled) {
                this.wrapper.addClass('ui-state-disabled');
            }

            //aria
            input.attr({
                'role': 'spinner',
                'aria-multiline': false,
                'aria-valuenow': this.value
            });
            
            if(this.options.min !== undefined) {
                input.attr('aria-valuemin', this.options.min);
            }
            if(this.options.max !== undefined){
                input.attr('aria-valuemax', this.options.max);
            }
            if(input.prop('disabled')) {
                input.attr('aria-disabled', true);
            }
            if(input.prop('readonly')) {
                input.attr('aria-readonly', true);
            }
        },
        

        _bindEvents: function() {
            var $this = this;
            
            //visuals for spinner buttons
            this.wrapper.children('.pui-spinner-button')
                .mouseover(function() {
                    $(this).addClass('ui-state-hover');
                }).mouseout(function() {
                    $(this).removeClass('ui-state-hover ui-state-active');

                    if($this.timer) {
                        window.clearInterval($this.timer);
                    }
                }).mouseup(function() {
                    window.clearInterval($this.timer);
                    $(this).removeClass('ui-state-active').addClass('ui-state-hover');
                }).mousedown(function(e) {
                    var element = $(this),
                    dir = element.hasClass('pui-spinner-up') ? 1 : -1;

                    element.removeClass('ui-state-hover').addClass('ui-state-active');

                    if($this.element.is(':not(:focus)')) {
                        $this.element.focus();
                    }

                    $this._repeat(null, dir);

                    //keep focused
                    e.preventDefault();
            });

            this.element.keydown(function (e) {        
                var keyCode = $.ui.keyCode;

                switch(e.which) {            
                    case keyCode.UP:
                        $this._spin($this.options.step);
                    break;

                    case keyCode.DOWN:
                        $this._spin(-1 * $this.options.step);
                    break;

                    default:
                        //do nothing
                    break;
                }
            })
            .keyup(function () { 
                $this._updateValue();
            })
            .blur(function () { 
                $this._format();
            })
            .focus(function () {
                //remove formatting
                $this.element.val($this.value);
            });

            //mousewheel
            this.element.bind('mousewheel', function(event, delta) {
                if($this.element.is(':focus')) {
                    if(delta > 0) {
                        $this._spin($this.options.step);
                    }
                    else {
                        $this._spin(-1 * $this.options.step);
                    }
                    return false;
                }
            });
        },

        _repeat: function(interval, dir) {
            var $this = this,
            i = interval || 500;

            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(function() {
                $this._repeat(40, dir);
            }, i);

            this._spin(this.options.step * dir);
        },
                
        _toFixed: function (value, precision) {
            var power = Math.pow(10, precision||0);
            return String(Math.round(value * power) / power);
        },
                
        _spin: function(step) {
            var newValue,
                currentValue = this.value ? this.value : 0;
        
            if(this.options.precision) {
                newValue = parseFloat(this._toFixed(currentValue + step, this.options.precision));
            }
            else {
                newValue = parseInt(currentValue + step, 10);
            }

            if(this.options.min !== undefined && newValue < this.options.min) {
                newValue = this.options.min;
            }

            if(this.options.max !== undefined && newValue > this.options.max) {
                newValue = this.options.max;
            }

            this.element.val(newValue).attr('aria-valuenow', newValue);
            this.value = newValue;

            this.element.trigger('change');
        },

        _updateValue: function() {
            var value = this.element.val();

            if(value === '') {
                if(this.options.min !== undefined) {
                    this.value = this.options.min;
                }
                else {
                    this.value = 0;
                }
            }
            else {
                if(this.options.step) {
                    value = parseFloat(value);
                }
                else {
                    value = parseInt(value, 10);
                }

                if(!isNaN(value)) {
                    this.value = value;
                }
            }
        },

        _initValue: function() {
            var value = this.element.val();

            if(value === '') {
                if(this.options.min !== undefined) {
                    this.value = this.options.min;
                }
                else {
                    this.value = 0;
                }
            }
            else {
                if(this.options.prefix) {
                    value = value.split(this.options.prefix)[1];
                }

                if(this.options.suffix) {
                    value = value.split(this.options.suffix)[0];
                }

                if(this.options.step) {
                    this.value = parseFloat(value);
                }
                else {
                    this.value = parseInt(value, 10);
                }
            }
        },

        _format: function() {
            var value = this.value;

            if(this.options.prefix) {
                value = this.options.prefix + value;
            }

            if(this.options.suffix) {
                value = value + this.options.suffix;
            }

            this.element.val(value);
        },

        _unbindEvents: function() {
            //visuals for spinner buttons
            this.wrapper.children('.pui-spinner-button').off();

            this.element.off();

        },

        enable: function() {
            this.wrapper.removeClass('ui-state-disabled');
            this.element.puiinputtext('enable');
            this._bindEvents();
        },

        disable: function() {
            this.wrapper.addClass('ui-state-disabled');
            this.element.puiinputtext('disable');
            this._unbindEvents();
        },

        _setOption: function(key, value) {
            if(key === 'disabled') {
                if(value)
                    this.disable();
                else
                    this.enable();
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }
    });
})();/**
 * PrimeFaces SplitButton Widget
 */
(function() {

    $.widget("primeui.puisplitbutton", {
       
        options: {
            icon: null,
            iconPos: 'left',
            items: null
        },
        
        _create: function() {
            this.element.wrap('<div class="pui-splitbutton pui-buttonset ui-widget"></div>');
            this.container = this.element.parent().uniqueId();
            this.menuButton = this.container.append('<button class="pui-splitbutton-menubutton" type="button"></button>').children('.pui-splitbutton-menubutton');
            this.options.disabled = this.element.prop('disabled');
            
            if(this.options.disabled) {
                this.menuButton.prop('disabled', true);
            }
            
            this.element.puibutton(this.options).removeClass('ui-corner-all').addClass('ui-corner-left');
            this.menuButton.puibutton({
                icon: 'fa-caret-down'
            }).removeClass('ui-corner-all').addClass('ui-corner-right');
            
            if(this.options.items && this.options.items.length) {            
                this._renderPanel();
                this._bindEvents();
            }

        },
                
        _renderPanel: function() {
            this.menu = $('<div class="pui-menu pui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix pui-shadow"></div>').
                    append('<ul class="pui-menu-list ui-helper-reset"></ul>');
            this.menuList = this.menu.children('.pui-menu-list');
            
            for(var i = 0; i < this.options.items.length; i++) {
                var item = this.options.items[i],
                menuitem = $('<li class="pui-menuitem ui-widget ui-corner-all" role="menuitem"></li>'),
                link = $('<a class="pui-menuitem-link ui-corner-all"><span class="pui-menuitem-icon fa fa-fw ' + item.icon +'"></span><span class="pui-menuitem-text">' + item.text +'</span></a>');
                
                if(item.url) {
                    link.attr('href', item.url);
                }
                
                if(item.click) {
                    link.on('click.puisplitbutton', item.click);
                }
                
                menuitem.append(link).appendTo(this.menuList);
            }
            
            this.menu.appendTo(this.options.appendTo||this.container);
            
            this.options.position = {
                my: 'left top',
                at: 'left bottom',
                of: this.element.parent()
            };
        },
                
        _bindEvents: function() {  
            var $this = this;

            this.menuButton.on('click.puisplitbutton', function() {
                if($this.menu.is(':hidden'))
                    $this.show();
                else
                    $this.hide();
            });

            this.menuList.children().on('mouseover.puisplitbutton', function(e) {
                $(this).addClass('ui-state-hover');
            }).on('mouseout.puisplitbutton', function(e) {
                $(this).removeClass('ui-state-hover');
            }).on('click.puisplitbutton', function() {
                $this.hide();
            });
            
            $(document.body).bind('mousedown.' + this.container.attr('id'), function (e) {
                if($this.menu.is(":hidden")) {
                    return;
                }

                var target = $(e.target);
                if(target.is($this.element)||$this.element.has(target).length > 0) {
                    return;
                }

                var offset = $this.menu.offset();
                if(e.pageX < offset.left ||
                    e.pageX > offset.left + $this.menu.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + $this.menu.height()) {

                    $this.element.removeClass('ui-state-focus ui-state-hover');
                    $this.hide();
                }
            });

            var resizeNS = 'resize.' + this.container.attr('id');
            $(window).unbind(resizeNS).bind(resizeNS, function() {
                if($this.menu.is(':visible')) {
                    $this._alignPanel();
                }
            });
        },
                
        show: function() {
            this.menuButton.trigger('focus');
            this.menu.show();
            this._alignPanel();
            this._trigger('show', null);
        },

        hide: function() {
            this.menuButton.removeClass('ui-state-focus');
            this.menu.fadeOut('fast');
            this._trigger('hide', null);
        },

        _alignPanel: function() {
            this.menu.css({left:'', top:'','z-index': ++PUI.zindex}).position(this.options.position);
        },

        disable: function() {
            this.element.puibutton('disable');
            this.menuButton.puibutton('disable');
        },

        enable: function() {
            this.element.puibutton('enable');
            this.menuButton.puibutton('enable');
        }
    });
})();/**
 * PrimeUI sticky widget
 */
(function() {

    $.widget("primeui.puisticky", {
       
        _create: function() {
            this.initialState = {
                top: this.element.offset().top,
                height: this.element.height()
            };
                        
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
            
            this._bindEvents();          
        },
        
        _bindEvents: function() {
            var $this = this,
            win = $(window),
            scrollNS = 'scroll.' + this.id,
            resizeNS = 'resize.' + this.id;

            win.off(scrollNS).on(scrollNS, function() {
                if(win.scrollTop() > $this.initialState.top)
                    $this._fix();
                else
                    $this._restore();
            })
            .off(resizeNS).on(resizeNS, function() {
                if($this.fixed) {
                    $this.element.width($this.ghost.outerWidth() - ($this.element.outerWidth() - $this.element.width()));
                }
            });
        },
                
        _fix: function() {
            if(!this.fixed) {
                this.element.css({
                    'position': 'fixed',
                    'top': 0,
                    'z-index': 10000
                })
                .addClass('pui-shadow pui-sticky');
        
                this.ghost = $('<div class="pui-sticky-ghost"></div>').height(this.initialState.height).insertBefore(this.element);
                this.element.width(this.ghost.outerWidth() - (this.element.outerWidth() - this.element.width()));
                this.fixed = true;
            }
        },

        _restore: function() {
                if(this.fixed) {
                    this.element.css({
                    position: 'static',
                    top: 'auto',
                    width: 'auto'
                })
                .removeClass('pui-shadow pui-sticky');

                this.ghost.remove();
                this.fixed = false;
            }

          }
        
    });
    
})();(function() {

    $.widget("primeui.puiswitch", {
       
       options: {
            onLabel: 'On',
            offLabel: 'Off',
            change: null
        },
        
        _create: function() {
            this.element.wrap('<div class="pui-inputswitch ui-widget ui-widget-content ui-corner-all"></div>');
            this.container = this.element.parent();

            this.element.wrap('<div class="ui-helper-hidden-accessible"></div>');
            this.container.prepend('<div class="pui-inputswitch-off"></div>' + 
                                    '<div class="pui-inputswitch-on ui-state-active"></div>' + 
                                    '<div class="pui-inputswitch-handle ui-state-default"></div>');
            
            this.onContainer = this.container.children('.pui-inputswitch-on');
            this.offContainer = this.container.children('.pui-inputswitch-off');            
            this.onContainer.append('<span>'+ this.options.onLabel +'</span>');
            this.offContainer.append('<span>'+ this.options.offLabel +'</span>');
            this.onLabel = this.onContainer.children('span');
            this.offLabel = this.offContainer.children('span');
            this.handle = this.container.children('.pui-inputswitch-handle');

            var onContainerWidth = this.onContainer.width(),
            offContainerWidth = this.offContainer.width(),
            spanPadding = this.offLabel.innerWidth() - this.offLabel.width(),
            handleMargins = this.handle.outerWidth() - this.handle.innerWidth();

            var containerWidth = (onContainerWidth > offContainerWidth) ? onContainerWidth : offContainerWidth,
            handleWidth = containerWidth;

            this.handle.css({'width':handleWidth});
            handleWidth = this.handle.width();

            containerWidth = containerWidth + handleWidth + 6;

            var labelWidth = containerWidth - handleWidth - spanPadding - handleMargins;

            this.container.css({'width': containerWidth });
            this.onLabel.width(labelWidth);
            this.offLabel.width(labelWidth);

            //position
            this.offContainer.css({ width: this.container.width() - 5 });
            this.offset = this.container.width() - this.handle.outerWidth();

            if(this.element.prop('checked')) {
                this.handle.css({ 'left': this.offset});
                this.onContainer.css({ 'width': this.offset});
                this.offLabel.css({ 'margin-right': -this.offset});
            }
            else {
                this.onContainer.css({ 'width': 0 });
                this.onLabel.css({'margin-left': -this.offset});
            }

            if(!this.element.prop('disabled')) {
                this._bindEvents();
            }
        },
        
        _bindEvents: function() {
            var $this = this;
        
            this.container.on('click.inputSwitch', function(e) {
                $this.toggle();
                $this.element.trigger('focus');
            });

            this.element.on('focus.inputSwitch', function(e) {
                $this.handle.addClass('ui-state-focus');
            })
            .on('blur.inputSwitch', function(e) {
                $this.handle.removeClass('ui-state-focus');
            })
            .on('keydown.inputSwitch', function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which === keyCode.SPACE) {
                    e.preventDefault();
                }
            })
            .on('keyup.inputSwitch', function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which === keyCode.SPACE) {
                    $this.toggle();

                    e.preventDefault();
                }
            })
            .on('change.inputSwitch', function(e) {
                if($this.element.prop('checked'))
                    $this._checkUI();
                else
                    $this._uncheckUI();
                
                $this._trigger('change', e);
            });
        },
        
        toggle: function() {
            if(this.element.prop('checked'))
                this.uncheck();
            else
                this.check();
        },

        check: function() {
            this.element.prop('checked', true).trigger('change');
        },

        uncheck: function() {
            this.element.prop('checked', false).trigger('change');
        },

        _checkUI: function() {
            this.onContainer.animate({width:this.offset}, 200);
            this.onLabel.animate({marginLeft:0}, 200);
            this.offLabel.animate({marginRight:-this.offset}, 200);
            this.handle.animate({left:this.offset}, 200);
        },

        _uncheckUI: function() {
            this.onContainer.animate({width:0}, 200);
            this.onLabel.animate({marginLeft:-this.offset}, 200);
            this.offLabel.animate({marginRight:0}, 200);
            this.handle.animate({left:0}, 200);
        }     
    });
    
})();

/**
 * PrimeUI tabview widget
 */
(function() {

    $.widget("primeui.puitabview", {
       
        options: {
            activeIndex:0,
            orientation:'top'
        },
        
        _create: function() {
            var element = this.element;
            this.navContainer = element.children('ul');
            this.tabHeaders = this.navContainer.children('li');
            this.panelContainer = element.children('div');
            this.panels = this._findPanels();

            element.addClass('pui-tabview ui-widget ui-widget-content ui-corner-all ui-hidden-container pui-tabview-' + this.options.orientation);
            this.navContainer.addClass('pui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')
            this.tabHeaders.addClass('ui-state-default ui-corner-top');
            this.panelContainer.addClass('pui-tabview-panels')
            this.panels.addClass('pui-tabview-panel ui-widget-content ui-corner-bottom');

            this.tabHeaders.eq(this.options.activeIndex).addClass('pui-tabview-selected ui-state-active');
            this.panels.filter(':not(:eq(' + this.options.activeIndex + '))').addClass('ui-helper-hidden');
            
            this._bindEvents();
        },
        
        _bindEvents: function() {
            var $this = this;

            //Tab header events
            this.tabHeaders.on('mouseover.tabview', function(e) {
                        var element = $(this);
                        if(!element.hasClass('ui-state-disabled')&&!element.hasClass('ui-state-active')) {
                            element.addClass('ui-state-hover');
                        }
                    })
                    .on('mouseout.tabview', function(e) {
                        var element = $(this);
                        if(!element.hasClass('ui-state-disabled')&&!element.hasClass('ui-state-active')) {
                            element.removeClass('ui-state-hover');
                        }
                    })
                    .on('click.tabview', function(e) {
                        var element = $(this);

                        if($(e.target).is(':not(.fa-close)')) {
                            var index = element.index();

                            if(!element.hasClass('ui-state-disabled') && index != $this.options.selected) {
                                $this.select(index);
                            }
                        }

                        e.preventDefault();
                    });

            //Closable tabs
            this.navContainer.find('li .fa-close')
                .on('click.tabview', function(e) {
                    var index = $(this).parent().index();

                    $this.remove(index);

                    e.preventDefault();
                });
        },
        
        select: function(index) {
           this.options.selected = index;

           var newPanel = this.panels.eq(index),
           oldHeader = this.tabHeaders.filter('.ui-state-active'),
           newHeader = this._getHeaderOfPanel(newPanel),
           oldPanel = this.panels.filter('.pui-tabview-panel:visible'),
           $this = this;

           //aria
           oldPanel.attr('aria-hidden', true);
           oldHeader.attr('aria-expanded', false);
           newPanel.attr('aria-hidden', false);
           newHeader.attr('aria-expanded', true);

           if(this.options.effect) {
                oldPanel.hide(this.options.effect.name, null, this.options.effect.duration, function() {
                   oldHeader.removeClass('pui-tabview-selected ui-state-active');

                   newHeader.removeClass('ui-state-hover').addClass('pui-tabview-selected ui-state-active');
                   newPanel.show($this.options.name, null, $this.options.effect.duration, function() {
                       $this._trigger('change', null, {'index':index});
                   });
               });
           }
           else {
               oldHeader.removeClass('pui-tabview-selected ui-state-active');
               oldPanel.hide();

               newHeader.removeClass('ui-state-hover').addClass('pui-tabview-selected ui-state-active');
               newPanel.show();

               $this._trigger('change', null, {'index':index});
           }
       },

       remove: function(index) {    
           var header = this.tabHeaders.eq(index),
           panel = this.panels.eq(index);

           this._trigger('close', null, {'index':index});

           header.remove();
           panel.remove();

           //active next tab if active tab is removed
           if(index == this.options.selected) {
               var newIndex = this.options.selected == this.getLength() ? this.options.selected - 1: this.options.selected;
               this.select(newIndex);
           }
       },

       getLength: function() {
           return this.tabHeaders.length;
       },

       getActiveIndex: function() {
           return this.options.selected;
       },

       _markAsLoaded: function(panel) {
           panel.data('loaded', true);
       },

       _isLoaded: function(panel) {
           return panel.data('loaded') === true;
       },

       disable: function(index) {
           this.tabHeaders.eq(index).addClass('ui-state-disabled');
       },

       enable: function(index) {
           this.tabHeaders.eq(index).removeClass('ui-state-disabled');
       },

       _findPanels: function() {
            var containers = this.panelContainer.children();

            //primeui
            if(containers.is('div')) {
                this.panelMode = 'native';
                return containers;
            }
            //primeng
            else {
                this.panelMode = 'wrapped';
                return containers.find(':first-child');
            }
       },

       _getHeaderOfPanel: function(panel) {
            if(this.panelMode === 'native')
                return this.tabHeaders.eq(panel.index());
            else if(this.panelMode === 'wrapped')
                return this.tabHeaders.eq(panel.parent().index());
       },

       _setOption: function(key, value) {
            if(key === 'activeIndex') {
                this.select(value);
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }

    });
})();/**
 * PrimeUI Terminal widget
 */
(function() {

    $.widget("primeui.puiterminal", {
       
        options: {
            welcomeMessage: '',
            prompt:'prime $',
            handler: null
        },
        
        _create: function() {
            this.element.addClass('pui-terminal ui-widget ui-widget-content ui-corner-all')
                        .append('<div>' + this.options.welcomeMessage + '</div>')
                        .append('<div class="pui-terminal-content"></div>')
                        .append('<div><span class="pui-terminal-prompt">' + this.options.prompt + '</span>' +
                                 '<input type="text" class="pui-terminal-input" autocomplete="off"></div>' );
                         
            this.promptContainer = this.element.find('> div:last-child > span.pui-terminal-prompt');
            this.content = this.element.children('.pui-terminal-content');
            this.input = this.promptContainer.next();
            this.commands = [];
            this.commandIndex = 0;
            
            this._bindEvents();
        },
                
        _bindEvents: function() {
            var $this = this;

            this.input.on('keydown.terminal', function(e) {
                var keyCode = $.ui.keyCode;

                switch(e.which) {
                    case keyCode.UP:
                        if($this.commandIndex > 0) {
                            $this.input.val($this.commands[--$this.commandIndex]);
                        }

                        e.preventDefault();
                    break;

                    case keyCode.DOWN:
                        if($this.commandIndex < ($this.commands.length - 1)) {
                            $this.input.val($this.commands[++$this.commandIndex]);
                        }
                        else {
                            $this.commandIndex = $this.commands.length;
                            $this.input.val('');
                        }

                        e.preventDefault();
                    break;

                    case keyCode.ENTER:
                    case keyCode.NUMPAD_ENTER:
                        $this._processCommand();

                        e.preventDefault();
                    break;
                }
            });
            
            this.element.on('click', function() {
                $this.input.trigger('focus');
            });
        },
                
        _processCommand: function() {
            var command = this.input.val();
            this.commands.push();
            this.commandIndex++;

            if(this.options.handler && $.type(this.options.handler) === 'function') {
                this.options.handler.call(this, command, this._updateContent); 
            }
        },

        _updateContent: function(content) {
            var commandResponseContainer = $('<div></div>');
            commandResponseContainer.append('<span>' + this.options.prompt + '</span><span class="pui-terminal-command">' +  this.input.val() + '</span>')
                                    .append('<div>' + content + '</div>').appendTo(this.content);

            this.input.val('');
            this.element.scrollTop(this.content.height());
        },

        clear: function() {
            this.content.html('');
            this.input.val('');
        }                       
    });
})();/**
 * PrimeUI togglebutton widget
 */
(function() {

    $.widget("primeui.puitogglebutton", {
       
        options: {
            onLabel: 'Yes',
            offLabel: 'No',
            onIcon: null,
            offIcon: null,
            checked: false
        },
       
        _create: function() {
            this.element.wrap('<div class="pui-button pui-togglebutton ui-widget ui-state-default ui-corner-all" />');
            this.container = this.element.parent();
            
            this.element.addClass('ui-helper-hidden-accessible');
            if(this.options.onIcon && this.options.offIcon) {
                this.container.addClass('pui-button-text-icon-left');
                this.container.append('<span class="pui-button-icon-left pui-icon fa fa-fw"></span>');
            }
            else {
                this.container.addClass('pui-button-text-only');
            }
            this.container.append('<span class="pui-button-text"></span>');
            
            if(this.options.style) {
                this.container.attr('style', this.options.style);
            }
            
            if(this.options.styleClass) {
                this.container.attr('class', this.options.styleClass);
            }
            
            this.label = this.container.children('.pui-button-text');
            this.icon = this.container.children('.pui-icon');
            
            //initial state
            if(this.element.prop('checked')||this.options.checked) {
                this.check(true);
            } else {
                this.uncheck(true);
            }
            
            if(!this.element.prop('disabled')) {
                this._bindEvents();
            }
        },
        
        _bindEvents: function() {
            var $this = this;
            
            this.container.on('mouseover', function() {
                if(!$this.container.hasClass('ui-state-active')) {
                    $this.container.addClass('ui-state-hover');
                }
            }).on('mouseout', function() {
                $this.container.removeClass('ui-state-hover');
            })
            .on('click', function() {
                $this.toggle();
                $this.element.trigger('focus');
            });
            
            this.element.on('focus', function() {            
                $this.container.addClass('ui-state-focus');
            })
            .on('blur', function() {            
                $this.container.removeClass('ui-state-focus');
            })
            .on('keydown', function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which === keyCode.SPACE) {
                    e.preventDefault();
                }
            })
            .on('keyup', function(e) {
                var keyCode = $.ui.keyCode;
                if(e.which === keyCode.SPACE) {
                    $this.toggle();

                    e.preventDefault();
                }
            });
        },
        
        _unbindEvents: function() {
            this.container.off('mouseover mouseout click');
            this.element.off('focus blur keydown keyup');
        },
        
        toggle: function() {
            if(this.element.prop('checked'))
                this.uncheck();
            else
                this.check();
        },

        check: function(silent) {
            this.container.addClass('ui-state-active');
            this.label.text(this.options.onLabel);
            this.element.prop('checked', true);

            if(this.options.onIcon) {
                this.icon.removeClass(this.options.offIcon).addClass(this.options.onIcon);
            }

            if(!silent) {
                this._trigger('change', null, {checked: true});
            }
        },

        uncheck: function(silent) {
            this.container.removeClass('ui-state-active')
            this.label.text(this.options.offLabel);
            this.element.prop('checked', false);

            if(this.options.offIcon) {
                this.icon.removeClass(this.options.onIcon).addClass(this.options.offIcon);
            }

            if(!silent) {
                this._trigger('change', null, {checked: false});
            }
        },
        
        disable: function () {
            this.element.prop('disabled', true);
            this.container.attr('aria-disabled', true);
            this.container.addClass('ui-state-disabled').removeClass('ui-state-focus ui-state-hover');
            this._unbindEvents();
        },

        enable: function () {
            this.element.prop('disabled', false);
            this.container.attr('aria-disabled', false);
            this.container.removeClass('ui-state-disabled');
            this._bindEvents();
        },
        
        isChecked: function() {
            return this.element.prop('checked');
        },

        _setOption: function(key, value) {
            if(key === 'checked') {
                this.options.checked = value;
                if(value)
                    this.check(true);
                else
                    this.uncheck(true);
            }
            else {
                $.Widget.prototype._setOption.apply(this, arguments);
            }
        }
        
    });
    
})();/**
 * PrimeFaces Tooltip Widget
 */
(function() {

    $.widget("primeui.puitooltip", {
       
        options: {
            showEvent: 'mouseover',
            hideEvent: 'mouseout',
            showEffect: 'fade',
            hideEffect: null,
            showEffectSpeed: 'normal',
            hideEffectSpeed: 'normal',
            my: 'left top',
            at: 'right bottom',
            showDelay: 150,
            content: null
        },
        
        _create: function() {
            this.options.showEvent = this.options.showEvent + '.puitooltip';
            this.options.hideEvent = this.options.hideEvent + '.puitooltip';
            
            if(this.element.get(0) === document) {
                this._bindGlobal();
            }
            else {
                this._bindTarget();
            }
        },
        
        _bindGlobal: function() {
            this.container = $('<div class="pui-tooltip pui-tooltip-global ui-widget ui-widget-content ui-corner-all pui-shadow" />').appendTo(document.body);
            this.globalSelector = 'a,:input,:button,img';
            var $this = this;

            $(document).off(this.options.showEvent + ' ' + this.options.hideEvent, this.globalSelector)
                        .on(this.options.showEvent, this.globalSelector, null, function() {
                            var target = $(this),
                            title = target.attr('title');

                            if(title) {
                                $this.container.text(title);
                                $this.globalTitle = title;
                                $this.target = target;
                                target.attr('title', '');
                                $this.show();
                            }
                        })
                        .on(this.options.hideEvent, this.globalSelector, null, function() {
                            var target = $(this);

                            if($this.globalTitle) {
                                $this.container.hide();
                                target.attr('title', $this.globalTitle);
                                $this.globalTitle = null;
                                $this.target = null;
                            }
                        });

            var resizeNS = 'resize.puitooltip';
            $(window).unbind(resizeNS).bind(resizeNS, function() {
                if($this.container.is(':visible')) {
                    $this._align();
                }
            });
        },
        
        _bindTarget: function() {
            this.container = $('<div class="pui-tooltip ui-widget ui-widget-content ui-corner-all pui-shadow" />').appendTo(document.body);

            var $this = this;
            this.element.off(this.options.showEvent + ' ' + this.options.hideEvent)
                        .on(this.options.showEvent, function() {
                            $this.show();
                        })
                        .on(this.options.hideEvent, function() {
                            $this.hide();
                        });

            this.container.html(this.options.content);

            this.element.removeAttr('title');
            this.target = this.element;

            var resizeNS = 'resize.' + this.element.attr('id');
            $(window).unbind(resizeNS).bind(resizeNS, function() {
                if($this.container.is(':visible')) {
                    $this._align();
                }
            });
        },
        
        _align: function() {
            this.container.css({
                left:'', 
                top:'',
                'z-index': ++PUI.zindex
            })
            .position({
                my: this.options.my,
                at: this.options.at,
                of: this.target
            });
        },

        show: function() {
            var $this = this;

            this.timeout = window.setTimeout(function() {
                $this._align();
                $this.container.show($this.options.showEffect, {}, $this.options.showEffectSpeed);
            }, this.options.showDelay);
        },

        hide: function() {
            window.clearTimeout(this.timeout);

            this.container.hide(this.options.hideEffect, {}, this.options.hideEffectSpeed, function() {
                $(this).css('z-index', '');
            });
        }
    });
})();/**
 * PrimeUI Tree widget
 */
(function() {

    $.widget("primeui.puitree", {
       
        options: {
             nodes: null,
             lazy: false,
             animate: false,
             selectionMode: null,
             icons: null
        },
        
        _create: function() {
            this.element.uniqueId().addClass('pui-tree ui-widget ui-widget-content ui-corner-all')
                    .append('<ul class="pui-tree-container"></ul>');
            this.rootContainer = this.element.children('.pui-tree-container');
            
            if(this.options.selectionMode) {
                this.selection = [];
            }
            
            this._bindEvents();
               
            if($.type(this.options.nodes) === 'array') {
                this._renderNodes(this.options.nodes, this.rootContainer);
            }
            else if($.type(this.options.nodes) === 'function') {
                this.options.nodes.call(this, {}, this._initData);
            }
            else {
                throw 'Unsupported type. nodes option can be either an array or a function';
            }
        },
                
        _renderNodes: function(nodes, container) {
            for(var i = 0; i < nodes.length; i++) {
                this._renderNode(nodes[i], container);
            }
        },
                
        _renderNode: function(node, container) {
            var leaf = this.options.lazy ? node.leaf : !(node.children && node.children.length),
            iconType = node.iconType||'def',
            expanded = node.expanded,
            selectable = this.options.selectionMode ? (node.selectable === false ? false : true) : false,
            toggleIcon = leaf ? 'pui-treenode-leaf-icon' : 
                        (node.expanded ? 'pui-tree-toggler fa fa-fw fa-caret-down' : 'pui-tree-toggler fa fa-fw fa-caret-right'),
            styleClass = leaf ? 'pui-treenode pui-treenode-leaf' : 'pui-treenode pui-treenode-parent',
            nodeElement = $('<li class="' + styleClass + '"></li>'),
            contentElement = $('<span class="pui-treenode-content"></span>');
    
            nodeElement.data('puidata', node.data).appendTo(container);

            if(selectable) {
                contentElement.addClass('pui-treenode-selectable');
            }
       
            contentElement.append('<span class="' + toggleIcon + '"></span>')
                            .append('<span class="pui-treenode-icon"></span>')
                            .append('<span class="pui-treenode-label ui-corner-all">' + node.label + '</span>')
                            .appendTo(nodeElement);
                    
            var iconConfig = this.options.icons && this.options.icons[iconType];
            if(iconConfig) {
                var iconContainer = contentElement.children('.pui-treenode-icon'),
                icon = ($.type(iconConfig) === 'string') ? iconConfig : (expanded ? iconConfig.expanded : iconConfig.collapsed);
                iconContainer.addClass('fa fa-fw ' + icon);
            }
                    
            if(!leaf) {
                var childrenContainer = $('<ul class="pui-treenode-children"></ul>');
                if(!node.expanded) {
                    childrenContainer.hide();
                }
                
                childrenContainer.appendTo(nodeElement);
                
                if(node.children) {
                    for(var i = 0; i < node.children.length; i++) {
                        this._renderNode(node.children[i], childrenContainer);
                    }
                }
            }
        },
                
        _initData: function(data) {
            this._renderNodes(data, this.rootContainer);          
        },
                
        _handleNodeData: function(data, node) {
            this._renderNodes(data, node.children('.pui-treenode-children'));    
            this._showNodeChildren(node);
            node.data('puiloaded', true);
        },
      
        _bindEvents: function() {
            var $this = this,
            elementId = this.element.attr('id'),
            togglerSelector = '#' + elementId + ' .pui-tree-toggler';
    
            $(document).off('click.puitree-' + elementId, togglerSelector)
                .on('click.puitree-' + elementId, togglerSelector, null, function(e) {
                    var toggleIcon = $(this),
                    node = toggleIcon.closest('li');

                    if(node.hasClass('pui-treenode-expanded'))
                        $this.collapseNode(node);
                    else
                        $this.expandNode(node);
                });
                
            if(this.options.selectionMode) {
                var nodeLabelSelector = '#' + elementId + ' .pui-treenode-selectable .pui-treenode-label',
                nodeContentSelector = '#' + elementId + ' .pui-treenode-selectable.pui-treenode-content';

                $(document).off('mouseout.puitree-' + elementId + ' mouseover.puitree-' + elementId, nodeLabelSelector)
                        .on('mouseout.puitree-' + elementId, nodeLabelSelector, null, function() {
                            $(this).removeClass('ui-state-hover');
                        })
                        .on('mouseover.puitree-' + elementId, nodeLabelSelector, null, function() {
                            $(this).addClass('ui-state-hover');
                        })
                        .off('click.puitree-' + elementId, nodeContentSelector)
                        .on('click.puitree-' + elementId, nodeContentSelector, null, function(e) {
                            $this._nodeClick(e, $(this));
                        });
            }
        },
        
        expandNode: function(node) {
            this._trigger('beforeExpand', null, {'node': node, 'data': node.data('puidata')});
    
            if(this.options.lazy && !node.data('puiloaded')) {
                this.options.nodes.call(this, {
                    'node': node,
                    'data': node.data('puidata')
                }, this._handleNodeData);
            }
            else {
                this._showNodeChildren(node);
            }
            
        },
                
        collapseNode: function(node) {
            this._trigger('beforeCollapse', null, {'node': node, 'data': node.data('puidata')});
    
            node.removeClass('pui-treenode-expanded');
            
            var iconType = node.iconType||'def',
            iconConfig = this.options.icons && this.options.icons[iconType];
            if(iconConfig && $.type(iconConfig) !== 'string') {
                node.find('> .pui-treenode-content > .pui-treenode-icon').removeClass(iconConfig.expanded).addClass(iconConfig.collapsed);
            }
            
            var toggleIcon = node.find('> .pui-treenode-content > .pui-tree-toggler'),
            childrenContainer = node.children('.pui-treenode-children');

            toggleIcon.addClass('fa-caret-right').removeClass('fa-caret-down');

            if(this.options.animate) {
                childrenContainer.slideUp('fast');
            }
            else {
                childrenContainer.hide();
            }
            
            this._trigger('afterCollapse', null, {'node': node, 'data': node.data('puidata')});
        },
                
        _showNodeChildren: function(node) {
            node.addClass('pui-treenode-expanded').attr('aria-expanded', true);
            
            var iconType = node.iconType||'def',
            iconConfig = this.options.icons && this.options.icons[iconType];
            if(iconConfig && $.type(iconConfig) !== 'string') {
                node.find('> .pui-treenode-content > .pui-treenode-icon').removeClass(iconConfig.collapsed).addClass(iconConfig.expanded);
            }

            var toggleIcon = node.find('> .pui-treenode-content > .pui-tree-toggler');
            toggleIcon.addClass('fa-caret-down').removeClass('fa-caret-right');

            if(this.options.animate) {
                node.children('.pui-treenode-children').slideDown('fast');
            }
            else {
                node.children('.pui-treenode-children').show();
            }
            
            this._trigger('afterExpand', null, {'node': node, 'data': node.data('puidata')});
        },
                
        _nodeClick: function(event, nodeContent) {
            PUI.clearSelection();
        
            if($(event.target).is(':not(.pui-tree-toggler)')) {
                var node = nodeContent.parent();

                var selected = this._isNodeSelected(node.data('puidata')),
                metaKey = event.metaKey||event.ctrlKey;

                if(selected && metaKey) {
                    this.unselectNode(node);
                }
                else {
                    if(this._isSingleSelection()||(this._isMultipleSelection() && !metaKey)) {
                        this.unselectAllNodes();
                    }

                    this.selectNode(node);
                }
            }
        },
                
        selectNode: function(node) {
            node.attr('aria-selected', true).find('> .pui-treenode-content > .pui-treenode-label').removeClass('ui-state-hover').addClass('ui-state-highlight');
            this._addToSelection(node.data('puidata'));
            this._trigger('nodeSelect', null, {'node': node, 'data': node.data('puidata')});
        },
                
        unselectNode: function(node) {           
            node.attr('aria-selected', false).find('> .pui-treenode-content > .pui-treenode-label').removeClass('ui-state-highlight ui-state-hover');
            this._removeFromSelection(node.data('puidata'));
            this._trigger('nodeUnselect', null, {'node': node, 'data': node.data('puidata')});
        },
                
        unselectAllNodes: function() {
            this.selection = [];
            this.element.find('.pui-treenode-label.ui-state-highlight').each(function() {
                $(this).removeClass('ui-state-highlight').closest('.ui-treenode').attr('aria-selected', false);
            });
        },
                
        _addToSelection: function(nodedata) {
            if(nodedata) {
                var selected = this._isNodeSelected(nodedata);                
                if(!selected) {
                    this.selection.push(nodedata);
                }
            }            
        },

        _removeFromSelection: function(nodedata) {
            if(nodedata) {
                var index = -1;
    
                for(var i = 0; i < this.selection.length; i++) {
                    var data = this.selection[i];
                    if(data && (JSON.stringify(data) === JSON.stringify(nodedata))) {
                        index = i;
                        break;
                    }
                }
                
                if(index >= 0) {
                    this.selection.splice(index, 1);
                }
            }            
        },
                
        _isNodeSelected: function(nodedata) {
            var selected = false;

            if(nodedata) {
                for(var i = 0; i < this.selection.length; i++) {
                    var data = this.selection[i];
                    if(data && (JSON.stringify(data) === JSON.stringify(nodedata))) {
                        selected = true;
                        break;
                    }
                }
            }
            
            return selected;
        },
                
        _isSingleSelection: function() {
            return this.options.selectionMode && this.options.selectionMode === 'single';
        },
                
        _isMultipleSelection: function() {
            return this.options.selectionMode && this.options.selectionMode === 'multiple';
        }
    });
    
})();/**
 * PrimeUI TreeTable widget
 */
(function() {

    $.widget("primeui.puitreetable", {
       
        options: {
             nodes: null,
             lazy: false,
             selectionMode: null,
             header: null
        },
        
        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }
            
            this.element.addClass('pui-treetable ui-widget');
            this.tableWrapper = $('<div class="pui-treetable-tablewrapper" />').appendTo(this.element);
            this.table = $('<table><thead></thead><tbody></tbody></table>').appendTo(this.tableWrapper);
            this.thead = this.table.children('thead');
            this.tbody = this.table.children('tbody').addClass('pui-treetable-data');
            
            var $this = this;
            
            if(this.options.columns) {
                var headerRow = $('<tr></tr>').appendTo(this.thead);
                
                $.each(this.options.columns, function(i, col) {
                    var header = $('<th class="ui-state-default"></th>').data('field', col.field).appendTo(headerRow);
                    
                    if(col.headerClass) {
                        header.addClass(col.headerClass);
                    } 
                    
                    if(col.headerStyle) {
                        header.attr('style', col.headerStyle);
                    }
                    
                    if(col.headerText) {
                        header.text(col.headerText);
                    }
                });
            }
            
            if(this.options.header) {
                this.element.prepend('<div class="pui-treetable-header ui-widget-header ui-corner-top">' + this.options.header + '</div>');
            }
            
            if(this.options.footer) {
                this.element.append('<div class="pui-treetable-footer ui-widget-header ui-corner-bottom">' + this.options.footer + '</div>');
            }
            
            if($.isArray(this.options.nodes)) {
                this._renderNodes(this.options.nodes, null, true);
            }
            else if($.type(this.options.nodes) === 'function') {
                this.options.nodes.call(this, {}, this._initData);
            }
            else {
                throw 'Unsupported type. nodes option can be either an array or a function';
            }
            
            this._bindEvents();
        },
        
        _initData: function(data) {
            this._renderNodes(data, null, true);       
        },
                
        _renderNodes: function(nodes, rootRow, expanded) {
            for(var i = 0; i < nodes.length; i++) {
                var node = nodes[i],
                nodeData = node.data,
                leaf = this.options.lazy ? node.leaf : !(node.children && node.children.length),
                row = $('<tr class="ui-widget-content"></tr>'),
                depth = rootRow ? rootRow.data('depth') + 1 : 0,
                parentRowkey = rootRow ? rootRow.data('rowkey'): null,
                rowkey = parentRowkey ? parentRowkey + '_' + i : i.toString();
                        
                row.data({
                   'depth': depth, 
                   'rowkey': rowkey,
                   'parentrowkey': parentRowkey,
                   'puidata': nodeData
                });
                
                if(!expanded) {
                    row.addClass('ui-helper-hidden');
                }
                
                for(var j = 0; j < this.options.columns.length; j++) {
                    var column = $('<td />').appendTo(row),
                    columnOptions = this.options.columns[j];

                    if(columnOptions.bodyClass) {
                        column.addClass(columnOptions.bodyClass);
                    } 

                    if(columnOptions.bodyStyle) {
                        column.attr('style', columnOptions.bodyStyle);
                    }
                    
                    if(j === 0) {
                        var toggler = $('<span class="pui-treetable-toggler pui-icon fa fa-fw fa-caret-right pui-c"></span>');
                        
                        toggler.css('margin-left', depth * 16 + 'px');
                        if(leaf) {
                            toggler.css('visibility', 'hidden');
                        }
                        
                        toggler.appendTo(column);
                    }

                    if(columnOptions.content) {
                        var content = columnOptions.content.call(this, nodeData);
                        if($.type(content) === 'string')
                            column.text(content);
                        else
                            column.append(content);
                    }
                    else {
                        column.append(nodeData[columnOptions.field]);
                    }     
                }
                
                if(rootRow)
                    row.insertAfter(rootRow);
                else
                    row.appendTo(this.tbody);
                
                if(!leaf) {
                    this._renderNodes(node.children, row, node.expanded);
                }
            }
        },
        
        _bindEvents: function() {
            var $this = this,
            togglerSelector = '> tr > td:first-child > .pui-treetable-toggler';

            //expand and collapse
            this.tbody.off('click.puitreetable', togglerSelector)
                        .on('click.puitreetable', togglerSelector, null, function(e) {
                            var toggler = $(this),
                            row = toggler.closest('tr');

                            if(!row.data('processing')) {
                                row.data('processing', true);

                                if(toggler.hasClass('fa-caret-right'))
                                    $this.expandNode(row);
                                else
                                    $this.collapseNode(row);
                            }
                        });
                        
            //selection
            if(this.options.selectionMode) {
                this.selection = [];
                var rowSelector = '> tr';
        
                this.tbody.off('mouseover.puitreetable mouseout.puitreetable click.puitreetable', rowSelector)
                    .on('mouseover.puitreetable', rowSelector, null, function(e) {
                        var element = $(this);
                        if(!element.hasClass('ui-state-highlight')) {
                            element.addClass('ui-state-hover');
                        }
                    })
                    .on('mouseout.puitreetable', rowSelector, null, function(e) {
                        var element = $(this);
                        if(!element.hasClass('ui-state-highlight')) {
                            element.removeClass('ui-state-hover');
                        }
                    })
                    .on('click.puitreetable', rowSelector, null, function(e) {
                        $this.onRowClick(e, $(this));
                    });
            }
        },
        
        expandNode: function(row) {
            this._trigger('beforeExpand', null, {'node': row, 'data': row.data('puidata')});
    
            if(this.options.lazy && !row.data('puiloaded')) {
                this.options.nodes.call(this, {
                    'node': row,
                    'data': row.data('puidata')
                }, this._handleNodeData);
            }
            else {
                this._showNodeChildren(row, false);
                this._trigger('afterExpand', null, {'node': row, 'data': row.data('puidata')});
            }
        },
        
        _handleNodeData: function(data, node) {
            this._renderNodes(data, node, true);    
            this._showNodeChildren(node, false);
            node.data('puiloaded', true);
            this._trigger('afterExpand', null, {'node': node, 'data': node.data('puidata')});
        },
        
        _showNodeChildren: function(row, showOnly) {
            if(!showOnly) {
                row.data('expanded', true).attr('aria-expanded', true)
                        .find('.pui-treetable-toggler:first').addClass('fa-caret-down').removeClass('fa-caret-right');
            }
            
            var children = this._getChildren(row);
            for(var i = 0; i < children.length; i++) {
                var child = children[i];
                child.removeClass('ui-helper-hidden');
                    
                if(child.data('expanded')) {
                    this._showNodeChildren(child, true);
                }
            }
            
            row.data('processing', false);
        },
    
        collapseNode: function(row) {
            this._trigger('beforeCollapse', null, {'node': row, 'data': row.data('puidata')});
    
            this._hideNodeChildren(row, false);
            
            row.data('processing', false);
            
            this._trigger('afterCollapse', null, {'node': row, 'data': row.data('puidata')});
        },
        
        _hideNodeChildren: function(row, hideOnly) {
            if(!hideOnly) {
                row.data('expanded', false).attr('aria-expanded', false)
                        .find('.pui-treetable-toggler:first').addClass('fa-caret-right').removeClass('fa-caret-down');
            }
            
            var children = this._getChildren(row);
            for(var i = 0; i < children.length; i++) {
                var child = children[i];
                child.addClass('ui-helper-hidden');
                    
                if(child.data('expanded')) {
                    this._hideNodeChildren(child, true);
                }
            }
        },
        
        onRowClick: function(event, row) {
            if(!$(event.target).is(':input,:button,a,.pui-c')) {
                var selected = row.hasClass('ui-state-highlight'),
                metaKey = event.metaKey||event.ctrlKey;

                if(selected && metaKey) {
                    this.unselectNode(row);
                }
                else {
                    if(this.isSingleSelection()||(this.isMultipleSelection() && !metaKey)) {
                        this.unselectAllNodes();
                    }

                    this.selectNode(row);
                }

                PUI.clearSelection();
            }
        },

        selectNode: function(row, silent) {
            row.removeClass('ui-state-hover').addClass('ui-state-highlight').attr('aria-selected', true);

            if(!silent) {
                this._trigger('nodeSelect', {}, {'node': row, 'data': row.data('puidata')});
            }
        },

        unselectNode: function(row, silent) {
            row.removeClass('ui-state-highlight').attr('aria-selected', false);

            if(!silent) {
                this._trigger('nodeUnselect', {}, {'node': row, 'data': row.data('puidata')});
            }
        },

        unselectAllNodes: function() {
            var selectedNodes = this.tbody.children('tr.ui-state-highlight'); 
            for(var i = 0; i < selectedNodes.length; i++) {
                this.unselectNode(selectedNodes.eq(i), true);
            }
        },
        
        isSingleSelection: function() {
            return this.options.selectionMode === 'single';
        },

        isMultipleSelection: function() {
            return this.options.selectionMode === 'multiple';
        },
        
        _getChildren: function(node) {
            var nodeKey = node.data('rowkey'),
            nextNodes = node.nextAll(),
            children = [];

            for(var i = 0; i < nextNodes.length; i++) {
                var nextNode = nextNodes.eq(i),
                nextNodeParentKey = nextNode.data('parentrowkey');

                if(nextNodeParentKey === nodeKey) {
                    children.push(nextNode);
                }
            }

            return children;
        }
    });
    
})();
            