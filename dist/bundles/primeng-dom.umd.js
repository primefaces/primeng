(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('primeng/dom', ['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.dom = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    /**
     * @dynamic is for runtime initializing DomHandler.browser
     *
     * If delete below comment, we can see this error message:
     *  Metadata collected contains an error that will be reported at runtime:
     *  Only initialized variables and constants can be referenced
     *  because the value of this variable is needed by the template compiler.
     */
    // @dynamic
    var DomHandler = /** @class */ (function () {
        function DomHandler() {
        }
        DomHandler.addClass = function (element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        };
        DomHandler.addMultipleClasses = function (element, className) {
            if (element.classList) {
                var styles = className.trim().split(' ');
                for (var i = 0; i < styles.length; i++) {
                    element.classList.add(styles[i]);
                }
            }
            else {
                var styles = className.split(' ');
                for (var i = 0; i < styles.length; i++) {
                    element.className += ' ' + styles[i];
                }
            }
        };
        DomHandler.removeClass = function (element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        };
        DomHandler.hasClass = function (element, className) {
            if (element.classList)
                return element.classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        };
        DomHandler.siblings = function (element) {
            return Array.prototype.filter.call(element.parentNode.children, function (child) {
                return child !== element;
            });
        };
        DomHandler.find = function (element, selector) {
            return Array.from(element.querySelectorAll(selector));
        };
        DomHandler.findSingle = function (element, selector) {
            if (element) {
                return element.querySelector(selector);
            }
            return null;
        };
        DomHandler.index = function (element) {
            var children = element.parentNode.childNodes;
            var num = 0;
            for (var i = 0; i < children.length; i++) {
                if (children[i] == element)
                    return num;
                if (children[i].nodeType == 1)
                    num++;
            }
            return -1;
        };
        DomHandler.indexWithinGroup = function (element, attributeName) {
            var children = element.parentNode ? element.parentNode.childNodes : [];
            var num = 0;
            for (var i = 0; i < children.length; i++) {
                if (children[i] == element)
                    return num;
                if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1)
                    num++;
            }
            return -1;
        };
        DomHandler.relativePosition = function (element, target) {
            var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
            var targetHeight = target.offsetHeight;
            var targetOffset = target.getBoundingClientRect();
            var viewport = this.getViewport();
            var top, left;
            if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
                top = -1 * (elementDimensions.height);
                element.style.transformOrigin = 'bottom';
                if (targetOffset.top + top < 0) {
                    top = -1 * targetOffset.top;
                }
            }
            else {
                top = targetHeight;
                element.style.transformOrigin = 'top';
            }
            if (elementDimensions.width > viewport.width) {
                // element wider then viewport and cannot fit on screen (align at left side of viewport)
                left = targetOffset.left * -1;
            }
            else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
                // element wider then viewport but can be fit on screen (align at right side of viewport)
                left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
            }
            else {
                // element fits on screen (align with target)
                left = 0;
            }
            element.style.top = top + 'px';
            element.style.left = left + 'px';
        };
        DomHandler.absolutePosition = function (element, target) {
            var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
            var elementOuterHeight = elementDimensions.height;
            var elementOuterWidth = elementDimensions.width;
            var targetOuterHeight = target.offsetHeight;
            var targetOuterWidth = target.offsetWidth;
            var targetOffset = target.getBoundingClientRect();
            var windowScrollTop = this.getWindowScrollTop();
            var windowScrollLeft = this.getWindowScrollLeft();
            var viewport = this.getViewport();
            var top, left;
            if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
                top = targetOffset.top + windowScrollTop - elementOuterHeight;
                element.style.transformOrigin = 'bottom';
                if (top < 0) {
                    top = windowScrollTop;
                }
            }
            else {
                top = targetOuterHeight + targetOffset.top + windowScrollTop;
                element.style.transformOrigin = 'top';
            }
            if (targetOffset.left + elementOuterWidth > viewport.width)
                left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
            else
                left = targetOffset.left + windowScrollLeft;
            element.style.top = top + 'px';
            element.style.left = left + 'px';
        };
        DomHandler.getParents = function (element, parents) {
            if (parents === void 0) { parents = []; }
            return element['parentNode'] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
        };
        DomHandler.getScrollableParents = function (element) {
            var e_1, _a, e_2, _b;
            var scrollableParents = [];
            if (element) {
                var parents = this.getParents(element);
                var overflowRegex_1 = /(auto|scroll)/;
                var overflowCheck = function (node) {
                    var styleDeclaration = window['getComputedStyle'](node, null);
                    return overflowRegex_1.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex_1.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex_1.test(styleDeclaration.getPropertyValue('overflowY'));
                };
                try {
                    for (var parents_1 = __values(parents), parents_1_1 = parents_1.next(); !parents_1_1.done; parents_1_1 = parents_1.next()) {
                        var parent = parents_1_1.value;
                        var scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];
                        if (scrollSelectors) {
                            var selectors = scrollSelectors.split(',');
                            try {
                                for (var selectors_1 = (e_2 = void 0, __values(selectors)), selectors_1_1 = selectors_1.next(); !selectors_1_1.done; selectors_1_1 = selectors_1.next()) {
                                    var selector = selectors_1_1.value;
                                    var el = this.findSingle(parent, selector);
                                    if (el && overflowCheck(el)) {
                                        scrollableParents.push(el);
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (selectors_1_1 && !selectors_1_1.done && (_b = selectors_1.return)) _b.call(selectors_1);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        if (parent.nodeType !== 9 && overflowCheck(parent)) {
                            scrollableParents.push(parent);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (parents_1_1 && !parents_1_1.done && (_a = parents_1.return)) _a.call(parents_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return scrollableParents;
        };
        DomHandler.getHiddenElementOuterHeight = function (element) {
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            var elementHeight = element.offsetHeight;
            element.style.display = 'none';
            element.style.visibility = 'visible';
            return elementHeight;
        };
        DomHandler.getHiddenElementOuterWidth = function (element) {
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            var elementWidth = element.offsetWidth;
            element.style.display = 'none';
            element.style.visibility = 'visible';
            return elementWidth;
        };
        DomHandler.getHiddenElementDimensions = function (element) {
            var dimensions = {};
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            dimensions.width = element.offsetWidth;
            dimensions.height = element.offsetHeight;
            element.style.display = 'none';
            element.style.visibility = 'visible';
            return dimensions;
        };
        DomHandler.scrollInView = function (container, item) {
            var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
            var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
            var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
            var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
            var containerRect = container.getBoundingClientRect();
            var itemRect = item.getBoundingClientRect();
            var offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
            var scroll = container.scrollTop;
            var elementHeight = container.clientHeight;
            var itemHeight = this.getOuterHeight(item);
            if (offset < 0) {
                container.scrollTop = scroll + offset;
            }
            else if ((offset + itemHeight) > elementHeight) {
                container.scrollTop = scroll + offset - elementHeight + itemHeight;
            }
        };
        DomHandler.fadeIn = function (element, duration) {
            element.style.opacity = 0;
            var last = +new Date();
            var opacity = 0;
            var tick = function () {
                opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
                element.style.opacity = opacity;
                last = +new Date();
                if (+opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            };
            tick();
        };
        DomHandler.fadeOut = function (element, ms) {
            var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
            var fading = setInterval(function () {
                opacity = opacity - gap;
                if (opacity <= 0) {
                    opacity = 0;
                    clearInterval(fading);
                }
                element.style.opacity = opacity;
            }, interval);
        };
        DomHandler.getWindowScrollTop = function () {
            var doc = document.documentElement;
            return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        };
        DomHandler.getWindowScrollLeft = function () {
            var doc = document.documentElement;
            return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        };
        DomHandler.matches = function (element, selector) {
            var p = Element.prototype;
            var f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
            return f.call(element, selector);
        };
        DomHandler.getOuterWidth = function (el, margin) {
            var width = el.offsetWidth;
            if (margin) {
                var style = getComputedStyle(el);
                width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            }
            return width;
        };
        DomHandler.getHorizontalPadding = function (el) {
            var style = getComputedStyle(el);
            return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        };
        DomHandler.getHorizontalMargin = function (el) {
            var style = getComputedStyle(el);
            return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        };
        DomHandler.innerWidth = function (el) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);
            width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            return width;
        };
        DomHandler.width = function (el) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);
            width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            return width;
        };
        DomHandler.getInnerHeight = function (el) {
            var height = el.offsetHeight;
            var style = getComputedStyle(el);
            height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
            return height;
        };
        DomHandler.getOuterHeight = function (el, margin) {
            var height = el.offsetHeight;
            if (margin) {
                var style = getComputedStyle(el);
                height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }
            return height;
        };
        DomHandler.getHeight = function (el) {
            var height = el.offsetHeight;
            var style = getComputedStyle(el);
            height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            return height;
        };
        DomHandler.getWidth = function (el) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);
            width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
            return width;
        };
        DomHandler.getViewport = function () {
            var win = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
            return { width: w, height: h };
        };
        DomHandler.getOffset = function (el) {
            var rect = el.getBoundingClientRect();
            return {
                top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
                left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
            };
        };
        DomHandler.replaceElementWith = function (element, replacementElement) {
            var parentNode = element.parentNode;
            if (!parentNode)
                throw "Can't replace element";
            return parentNode.replaceChild(replacementElement, element);
        };
        DomHandler.getUserAgent = function () {
            return navigator.userAgent;
        };
        DomHandler.isIE = function () {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return true;
            }
            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return true;
            }
            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return true;
            }
            // other browser
            return false;
        };
        DomHandler.isIOS = function () {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
        };
        DomHandler.isAndroid = function () {
            return /(android)/i.test(navigator.userAgent);
        };
        DomHandler.appendChild = function (element, target) {
            if (this.isElement(target))
                target.appendChild(element);
            else if (target.el && target.el.nativeElement)
                target.el.nativeElement.appendChild(element);
            else
                throw 'Cannot append ' + target + ' to ' + element;
        };
        DomHandler.removeChild = function (element, target) {
            if (this.isElement(target))
                target.removeChild(element);
            else if (target.el && target.el.nativeElement)
                target.el.nativeElement.removeChild(element);
            else
                throw 'Cannot remove ' + element + ' from ' + target;
        };
        DomHandler.removeElement = function (element) {
            if (!('remove' in Element.prototype))
                element.parentNode.removeChild(element);
            else
                element.remove();
        };
        DomHandler.isElement = function (obj) {
            return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
                obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
        };
        DomHandler.calculateScrollbarWidth = function (el) {
            if (el) {
                var style = getComputedStyle(el);
                return (el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth));
            }
            else {
                if (this.calculatedScrollbarWidth !== null)
                    return this.calculatedScrollbarWidth;
                var scrollDiv = document.createElement("div");
                scrollDiv.className = "p-scrollbar-measure";
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                this.calculatedScrollbarWidth = scrollbarWidth;
                return scrollbarWidth;
            }
        };
        DomHandler.calculateScrollbarHeight = function () {
            if (this.calculatedScrollbarHeight !== null)
                return this.calculatedScrollbarHeight;
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "p-scrollbar-measure";
            document.body.appendChild(scrollDiv);
            var scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
            document.body.removeChild(scrollDiv);
            this.calculatedScrollbarWidth = scrollbarHeight;
            return scrollbarHeight;
        };
        DomHandler.invokeElementMethod = function (element, methodName, args) {
            element[methodName].apply(element, args);
        };
        DomHandler.clearSelection = function () {
            if (window.getSelection) {
                if (window.getSelection().empty) {
                    window.getSelection().empty();
                }
                else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                    window.getSelection().removeAllRanges();
                }
            }
            else if (document['selection'] && document['selection'].empty) {
                try {
                    document['selection'].empty();
                }
                catch (error) {
                    //ignore IE bug
                }
            }
        };
        DomHandler.getBrowser = function () {
            if (!this.browser) {
                var matched = this.resolveUserAgent();
                this.browser = {};
                if (matched.browser) {
                    this.browser[matched.browser] = true;
                    this.browser['version'] = matched.version;
                }
                if (this.browser['chrome']) {
                    this.browser['webkit'] = true;
                }
                else if (this.browser['webkit']) {
                    this.browser['safari'] = true;
                }
            }
            return this.browser;
        };
        DomHandler.resolveUserAgent = function () {
            var ua = navigator.userAgent.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        };
        DomHandler.isInteger = function (value) {
            if (Number.isInteger) {
                return Number.isInteger(value);
            }
            else {
                return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
            }
        };
        DomHandler.isHidden = function (element) {
            return element.offsetParent === null;
        };
        DomHandler.getFocusableElements = function (element) {
            var e_3, _a;
            var focusableElements = DomHandler.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])");
            var visibleFocusableElements = [];
            try {
                for (var focusableElements_1 = __values(focusableElements), focusableElements_1_1 = focusableElements_1.next(); !focusableElements_1_1.done; focusableElements_1_1 = focusableElements_1.next()) {
                    var focusableElement = focusableElements_1_1.value;
                    if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
                        visibleFocusableElements.push(focusableElement);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (focusableElements_1_1 && !focusableElements_1_1.done && (_a = focusableElements_1.return)) _a.call(focusableElements_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return visibleFocusableElements;
        };
        DomHandler.generateZIndex = function () {
            this.zindex = this.zindex || 999;
            return ++this.zindex;
        };
        return DomHandler;
    }());
    DomHandler.zindex = 1000;
    DomHandler.calculatedScrollbarWidth = null;
    DomHandler.calculatedScrollbarHeight = null;

    var ConnectedOverlayScrollHandler = /** @class */ (function () {
        function ConnectedOverlayScrollHandler(element, listener) {
            if (listener === void 0) { listener = function () { }; }
            this.element = element;
            this.listener = listener;
        }
        ConnectedOverlayScrollHandler.prototype.bindScrollListener = function () {
            this.scrollableParents = DomHandler.getScrollableParents(this.element);
            for (var i = 0; i < this.scrollableParents.length; i++) {
                this.scrollableParents[i].addEventListener('scroll', this.listener);
            }
        };
        ConnectedOverlayScrollHandler.prototype.unbindScrollListener = function () {
            if (this.scrollableParents) {
                for (var i = 0; i < this.scrollableParents.length; i++) {
                    this.scrollableParents[i].removeEventListener('scroll', this.listener);
                }
            }
        };
        ConnectedOverlayScrollHandler.prototype.destroy = function () {
            this.unbindScrollListener();
            this.element = null;
            this.listener = null;
            this.scrollableParents = null;
        };
        return ConnectedOverlayScrollHandler;
    }());

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
    exports.DomHandler = DomHandler;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dom.umd.js.map
