(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('primeng/dom'), require('primeng/paginator'), require('primeng/api'), require('primeng/utils'), require('primeng/ripple'), require('@angular/cdk/scrolling')) :
    typeof define === 'function' && define.amd ? define('primeng/treetable', ['exports', '@angular/core', '@angular/common', 'rxjs', 'primeng/dom', 'primeng/paginator', 'primeng/api', 'primeng/utils', 'primeng/ripple', '@angular/cdk/scrolling'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.treetable = {}), global.ng.core, global.ng.common, global.rxjs, global.primeng.dom, global.primeng.paginator, global.primeng.api, global.primeng.utils, global.primeng.ripple, global.ng.cdk.scrolling));
}(this, (function (exports, core, common, rxjs, dom, paginator, api, utils, ripple, scrolling) { 'use strict';

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

    var TreeTableService = /** @class */ (function () {
        function TreeTableService() {
            this.sortSource = new rxjs.Subject();
            this.selectionSource = new rxjs.Subject();
            this.contextMenuSource = new rxjs.Subject();
            this.uiUpdateSource = new rxjs.Subject();
            this.totalRecordsSource = new rxjs.Subject();
            this.sortSource$ = this.sortSource.asObservable();
            this.selectionSource$ = this.selectionSource.asObservable();
            this.contextMenuSource$ = this.contextMenuSource.asObservable();
            this.uiUpdateSource$ = this.uiUpdateSource.asObservable();
            this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
        }
        TreeTableService.prototype.onSort = function (sortMeta) {
            this.sortSource.next(sortMeta);
        };
        TreeTableService.prototype.onSelectionChange = function () {
            this.selectionSource.next();
        };
        TreeTableService.prototype.onContextMenu = function (node) {
            this.contextMenuSource.next(node);
        };
        TreeTableService.prototype.onUIUpdate = function (value) {
            this.uiUpdateSource.next(value);
        };
        TreeTableService.prototype.onTotalRecordsChange = function (value) {
            this.totalRecordsSource.next(value);
        };
        return TreeTableService;
    }());
    TreeTableService.decorators = [
        { type: core.Injectable }
    ];
    var TreeTable = /** @class */ (function () {
        function TreeTable(el, zone, tableService, filterService) {
            this.el = el;
            this.zone = zone;
            this.tableService = tableService;
            this.filterService = filterService;
            this.lazy = false;
            this.lazyLoadOnInit = true;
            this.first = 0;
            this.pageLinks = 5;
            this.alwaysShowPaginator = true;
            this.paginatorPosition = 'bottom';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.showFirstLastIcon = true;
            this.showPageLinks = true;
            this.defaultSortOrder = 1;
            this.sortMode = 'single';
            this.resetPageOnSort = true;
            this.selectionChange = new core.EventEmitter();
            this.contextMenuSelectionChange = new core.EventEmitter();
            this.contextMenuSelectionMode = "separate";
            this.compareSelectionBy = 'deepEquals';
            this.loadingIcon = 'pi pi-spinner';
            this.showLoader = true;
            this.virtualScrollDelay = 150;
            this.virtualRowHeight = 28;
            this.columnResizeMode = 'fit';
            this.rowTrackBy = function (index, item) { return item; };
            this.filters = {};
            this.filterDelay = 300;
            this.filterMode = 'lenient';
            this.onFilter = new core.EventEmitter();
            this.onNodeExpand = new core.EventEmitter();
            this.onNodeCollapse = new core.EventEmitter();
            this.onPage = new core.EventEmitter();
            this.onSort = new core.EventEmitter();
            this.onLazyLoad = new core.EventEmitter();
            this.sortFunction = new core.EventEmitter();
            this.onColResize = new core.EventEmitter();
            this.onColReorder = new core.EventEmitter();
            this.onNodeSelect = new core.EventEmitter();
            this.onNodeUnselect = new core.EventEmitter();
            this.onContextMenuSelect = new core.EventEmitter();
            this.onHeaderCheckboxToggle = new core.EventEmitter();
            this.onEditInit = new core.EventEmitter();
            this.onEditComplete = new core.EventEmitter();
            this.onEditCancel = new core.EventEmitter();
            this._value = [];
            this._totalRecords = 0;
            this._sortOrder = 1;
            this.selectionKeys = {};
        }
        TreeTable.prototype.ngOnInit = function () {
            if (this.lazy && this.lazyLoadOnInit) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.initialized = true;
        };
        TreeTable.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'caption':
                        _this.captionTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'body':
                        _this.bodyTemplate = item.template;
                        break;
                    case 'loadingbody':
                        _this.loadingBodyTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    case 'summary':
                        _this.summaryTemplate = item.template;
                        break;
                    case 'colgroup':
                        _this.colGroupTemplate = item.template;
                        break;
                    case 'emptymessage':
                        _this.emptyMessageTemplate = item.template;
                        break;
                    case 'paginatorleft':
                        _this.paginatorLeftTemplate = item.template;
                        break;
                    case 'paginatorright':
                        _this.paginatorRightTemplate = item.template;
                        break;
                    case 'paginatordropdownitem':
                        _this.paginatorDropdownItemTemplate = item.template;
                        break;
                    case 'frozenheader':
                        _this.frozenHeaderTemplate = item.template;
                        break;
                    case 'frozenbody':
                        _this.frozenBodyTemplate = item.template;
                        break;
                    case 'frozenfooter':
                        _this.frozenFooterTemplate = item.template;
                        break;
                    case 'frozencolgroup':
                        _this.frozenColGroupTemplate = item.template;
                        break;
                }
            });
        };
        TreeTable.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.value) {
                this._value = simpleChange.value.currentValue;
                if (!this.lazy) {
                    this.totalRecords = (this._value ? this._value.length : 0);
                    if (this.sortMode == 'single' && this.sortField)
                        this.sortSingle();
                    else if (this.sortMode == 'multiple' && this.multiSortMeta)
                        this.sortMultiple();
                    else if (this.hasFilter()) //sort already filters
                        this._filter();
                }
                this.updateSerializedValue();
                this.tableService.onUIUpdate(this.value);
            }
            if (simpleChange.sortField) {
                this._sortField = simpleChange.sortField.currentValue;
                //avoid triggering lazy load prior to lazy initialization at onInit
                if (!this.lazy || this.initialized) {
                    if (this.sortMode === 'single') {
                        this.sortSingle();
                    }
                }
            }
            if (simpleChange.sortOrder) {
                this._sortOrder = simpleChange.sortOrder.currentValue;
                //avoid triggering lazy load prior to lazy initialization at onInit
                if (!this.lazy || this.initialized) {
                    if (this.sortMode === 'single') {
                        this.sortSingle();
                    }
                }
            }
            if (simpleChange.multiSortMeta) {
                this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
                if (this.sortMode === 'multiple') {
                    this.sortMultiple();
                }
            }
            if (simpleChange.selection) {
                this._selection = simpleChange.selection.currentValue;
                if (!this.preventSelectionSetterPropagation) {
                    this.updateSelectionKeys();
                    this.tableService.onSelectionChange();
                }
                this.preventSelectionSetterPropagation = false;
            }
        };
        Object.defineProperty(TreeTable.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
            },
            enumerable: false,
            configurable: true
        });
        TreeTable.prototype.updateSerializedValue = function () {
            this.serializedValue = [];
            if (this.paginator)
                this.serializePageNodes();
            else
                this.serializeNodes(null, this.filteredNodes || this.value, 0, true);
        };
        TreeTable.prototype.serializeNodes = function (parent, nodes, level, visible) {
            var e_1, _a;
            if (nodes && nodes.length) {
                try {
                    for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                        var node = nodes_1_1.value;
                        node.parent = parent;
                        var rowNode = {
                            node: node,
                            parent: parent,
                            level: level,
                            visible: visible && (parent ? parent.expanded : true)
                        };
                        this.serializedValue.push(rowNode);
                        if (rowNode.visible && node.expanded) {
                            this.serializeNodes(node, node.children, level + 1, rowNode.visible);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        TreeTable.prototype.serializePageNodes = function () {
            var data = this.filteredNodes || this.value;
            this.serializedValue = [];
            if (data && data.length) {
                var first = this.lazy ? 0 : this.first;
                for (var i = first; i < (first + this.rows); i++) {
                    var node = data[i];
                    if (node) {
                        this.serializedValue.push({
                            node: node,
                            parent: null,
                            level: 0,
                            visible: true
                        });
                        this.serializeNodes(node, node.children, 1, true);
                    }
                }
            }
        };
        Object.defineProperty(TreeTable.prototype, "totalRecords", {
            get: function () {
                return this._totalRecords;
            },
            set: function (val) {
                this._totalRecords = val;
                this.tableService.onTotalRecordsChange(this._totalRecords);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeTable.prototype, "sortField", {
            get: function () {
                return this._sortField;
            },
            set: function (val) {
                this._sortField = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeTable.prototype, "sortOrder", {
            get: function () {
                return this._sortOrder;
            },
            set: function (val) {
                this._sortOrder = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeTable.prototype, "multiSortMeta", {
            get: function () {
                return this._multiSortMeta;
            },
            set: function (val) {
                this._multiSortMeta = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeTable.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            set: function (val) {
                this._selection = val;
            },
            enumerable: false,
            configurable: true
        });
        TreeTable.prototype.updateSelectionKeys = function () {
            var e_2, _a;
            if (this.dataKey && this._selection) {
                this.selectionKeys = {};
                if (Array.isArray(this._selection)) {
                    try {
                        for (var _b = __values(this._selection), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var node = _c.value;
                            this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(node.data, this.dataKey))] = 1;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                else {
                    this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(this._selection.data, this.dataKey))] = 1;
                }
            }
        };
        TreeTable.prototype.onPageChange = function (event) {
            this.first = event.first;
            this.rows = event.rows;
            if (this.lazy)
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            else
                this.serializePageNodes();
            this.onPage.emit({
                first: this.first,
                rows: this.rows
            });
            this.tableService.onUIUpdate(this.value);
            if (this.scrollable) {
                this.resetScrollTop();
            }
        };
        TreeTable.prototype.sort = function (event) {
            var originalEvent = event.originalEvent;
            if (this.sortMode === 'single') {
                this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
                this._sortField = event.field;
                this.sortSingle();
                if (this.resetPageOnSort && this.scrollable) {
                    this.resetScrollTop();
                }
            }
            if (this.sortMode === 'multiple') {
                var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
                var sortMeta = this.getSortMeta(event.field);
                if (sortMeta) {
                    if (!metaKey) {
                        this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                        if (this.resetPageOnSort && this.scrollable) {
                            this.resetScrollTop();
                        }
                    }
                    else {
                        sortMeta.order = sortMeta.order * -1;
                    }
                }
                else {
                    if (!metaKey || !this.multiSortMeta) {
                        this._multiSortMeta = [];
                        if (this.resetPageOnSort && this.scrollable) {
                            this.resetScrollTop();
                        }
                    }
                    this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
                }
                this.sortMultiple();
            }
        };
        TreeTable.prototype.sortSingle = function () {
            if (this.sortField && this.sortOrder) {
                if (this.lazy) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                }
                else if (this.value) {
                    this.sortNodes(this.value);
                    if (this.hasFilter()) {
                        this._filter();
                    }
                }
                var sortMeta = {
                    field: this.sortField,
                    order: this.sortOrder
                };
                this.onSort.emit(sortMeta);
                this.tableService.onSort(sortMeta);
                this.updateSerializedValue();
            }
        };
        TreeTable.prototype.sortNodes = function (nodes) {
            var e_3, _a;
            var _this = this;
            if (!nodes || nodes.length === 0) {
                return;
            }
            if (this.customSort) {
                this.sortFunction.emit({
                    data: nodes,
                    mode: this.sortMode,
                    field: this.sortField,
                    order: this.sortOrder
                });
            }
            else {
                nodes.sort(function (node1, node2) {
                    var value1 = utils.ObjectUtils.resolveFieldData(node1.data, _this.sortField);
                    var value2 = utils.ObjectUtils.resolveFieldData(node2.data, _this.sortField);
                    var result = null;
                    if (value1 == null && value2 != null)
                        result = -1;
                    else if (value1 != null && value2 == null)
                        result = 1;
                    else if (value1 == null && value2 == null)
                        result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string')
                        result = value1.localeCompare(value2, undefined, { numeric: true });
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return (_this.sortOrder * result);
                });
            }
            try {
                for (var nodes_2 = __values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                    var node = nodes_2_1.value;
                    this.sortNodes(node.children);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2.return)) _a.call(nodes_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        TreeTable.prototype.sortMultiple = function () {
            if (this.multiSortMeta) {
                if (this.lazy) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                }
                else if (this.value) {
                    this.sortMultipleNodes(this.value);
                    if (this.hasFilter()) {
                        this._filter();
                    }
                }
                this.onSort.emit({
                    multisortmeta: this.multiSortMeta
                });
                this.updateSerializedValue();
                this.tableService.onSort(this.multiSortMeta);
            }
        };
        TreeTable.prototype.sortMultipleNodes = function (nodes) {
            var e_4, _a;
            var _this = this;
            if (!nodes || nodes.length === 0) {
                return;
            }
            if (this.customSort) {
                this.sortFunction.emit({
                    data: this.value,
                    mode: this.sortMode,
                    multiSortMeta: this.multiSortMeta
                });
            }
            else {
                nodes.sort(function (node1, node2) {
                    return _this.multisortField(node1, node2, _this.multiSortMeta, 0);
                });
            }
            try {
                for (var nodes_3 = __values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
                    var node = nodes_3_1.value;
                    this.sortMultipleNodes(node.children);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3.return)) _a.call(nodes_3);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        TreeTable.prototype.multisortField = function (node1, node2, multiSortMeta, index) {
            var value1 = utils.ObjectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
            var value2 = utils.ObjectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);
            var result = null;
            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            if (typeof value1 == 'string' || value1 instanceof String) {
                if (value1.localeCompare && (value1 != value2)) {
                    return (multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true }));
                }
            }
            else {
                result = (value1 < value2) ? -1 : 1;
            }
            if (value1 == value2) {
                return (multiSortMeta.length - 1) > (index) ? (this.multisortField(node1, node2, multiSortMeta, index + 1)) : 0;
            }
            return (multiSortMeta[index].order * result);
        };
        TreeTable.prototype.getSortMeta = function (field) {
            if (this.multiSortMeta && this.multiSortMeta.length) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field === field) {
                        return this.multiSortMeta[i];
                    }
                }
            }
            return null;
        };
        TreeTable.prototype.isSorted = function (field) {
            if (this.sortMode === 'single') {
                return (this.sortField && this.sortField === field);
            }
            else if (this.sortMode === 'multiple') {
                var sorted = false;
                if (this.multiSortMeta) {
                    for (var i = 0; i < this.multiSortMeta.length; i++) {
                        if (this.multiSortMeta[i].field == field) {
                            sorted = true;
                            break;
                        }
                    }
                }
                return sorted;
            }
        };
        TreeTable.prototype.createLazyLoadMetadata = function () {
            return {
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: this.filters,
                globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
                multiSortMeta: this.multiSortMeta
            };
        };
        TreeTable.prototype.resetScrollTop = function () {
            if (this.virtualScroll)
                this.scrollToVirtualIndex(0);
            else
                this.scrollTo({ top: 0 });
        };
        TreeTable.prototype.scrollToVirtualIndex = function (index) {
            if (this.scrollableViewChild) {
                this.scrollableViewChild.scrollToVirtualIndex(index);
            }
            if (this.scrollableFrozenViewChild) {
                this.scrollableFrozenViewChild.scrollToVirtualIndex(index);
            }
        };
        TreeTable.prototype.scrollTo = function (options) {
            if (this.scrollableViewChild) {
                this.scrollableViewChild.scrollTo(options);
            }
            if (this.scrollableFrozenViewChild) {
                this.scrollableFrozenViewChild.scrollTo(options);
            }
        };
        TreeTable.prototype.isEmpty = function () {
            var data = this.filteredNodes || this.value;
            return data == null || data.length == 0;
        };
        TreeTable.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        TreeTable.prototype.onColumnResizeBegin = function (event) {
            var containerLeft = dom.DomHandler.getOffset(this.containerViewChild.nativeElement).left;
            this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
            event.preventDefault();
        };
        TreeTable.prototype.onColumnResize = function (event) {
            var containerLeft = dom.DomHandler.getOffset(this.containerViewChild.nativeElement).left;
            dom.DomHandler.addClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
            this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
            this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
            this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
            this.resizeHelperViewChild.nativeElement.style.display = 'block';
        };
        TreeTable.prototype.onColumnResizeEnd = function (event, column) {
            var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
            var columnWidth = column.offsetWidth;
            var newColumnWidth = columnWidth + delta;
            var minWidth = column.style.minWidth || 15;
            if (columnWidth + delta > parseInt(minWidth)) {
                if (this.columnResizeMode === 'fit') {
                    var nextColumn = column.nextElementSibling;
                    while (!nextColumn.offsetParent) {
                        nextColumn = nextColumn.nextElementSibling;
                    }
                    if (nextColumn) {
                        var nextColumnWidth = nextColumn.offsetWidth - delta;
                        var nextColumnMinWidth = nextColumn.style.minWidth || 15;
                        if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                            if (this.scrollable) {
                                var scrollableView = this.findParentScrollableView(column);
                                var scrollableBodyTable = dom.DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-body table') || dom.DomHandler.findSingle(scrollableView, '.p-treetable-virtual-scrollable-body table');
                                var scrollableHeaderTable = dom.DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
                                var scrollableFooterTable = dom.DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
                                var resizeColumnIndex = dom.DomHandler.index(column);
                                this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                                this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                                this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            }
                            else {
                                column.style.width = newColumnWidth + 'px';
                                if (nextColumn) {
                                    nextColumn.style.width = nextColumnWidth + 'px';
                                }
                            }
                        }
                    }
                }
                else if (this.columnResizeMode === 'expand') {
                    if (this.scrollable) {
                        var scrollableView = this.findParentScrollableView(column);
                        var scrollableBody_1 = dom.DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-body') || dom.DomHandler.findSingle(scrollableView, 'cdk-virtual-scroll-viewport');
                        var scrollableHeader = dom.DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-header');
                        var scrollableFooter = dom.DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-footer');
                        var scrollableBodyTable = dom.DomHandler.findSingle(scrollableView, '.p-treetable-scrollable-body table') || dom.DomHandler.findSingle(scrollableView, 'cdk-virtual-scroll-viewport table');
                        var scrollableHeaderTable = dom.DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-header-table');
                        var scrollableFooterTable = dom.DomHandler.findSingle(scrollableView, 'table.p-treetable-scrollable-footer-table');
                        scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                        scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                        if (scrollableFooterTable) {
                            scrollableFooterTable.style.width = scrollableFooterTable.offsetWidth + delta + 'px';
                        }
                        var resizeColumnIndex = dom.DomHandler.index(column);
                        var scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
                        var scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
                        var isContainerInViewport = this.containerViewChild.nativeElement.offsetWidth >= scrollableBodyTableWidth;
                        var setWidth = function (container, table, width, isContainerInViewport) {
                            if (container && table) {
                                container.style.width = isContainerInViewport ? width + dom.DomHandler.calculateScrollbarWidth(scrollableBody_1) + 'px' : 'auto';
                                table.style.width = width + 'px';
                            }
                        };
                        setWidth(scrollableBody_1, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
                        setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
                        setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);
                        this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                        this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                        this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                    }
                    else {
                        this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                        column.style.width = newColumnWidth + 'px';
                        var containerWidth = this.tableViewChild.nativeElement.style.width;
                        this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                    }
                }
                this.onColResize.emit({
                    element: column,
                    delta: delta
                });
            }
            this.resizeHelperViewChild.nativeElement.style.display = 'none';
            dom.DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-unselectable-text');
        };
        TreeTable.prototype.findParentScrollableView = function (column) {
            if (column) {
                var parent = column.parentElement;
                while (parent && !dom.DomHandler.hasClass(parent, 'p-treetable-scrollable-view')) {
                    parent = parent.parentElement;
                }
                return parent;
            }
            else {
                return null;
            }
        };
        TreeTable.prototype.resizeColGroup = function (table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
            if (table) {
                var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
                if (colGroup) {
                    var col = colGroup.children[resizeColumnIndex];
                    var nextCol = col.nextElementSibling;
                    col.style.width = newColumnWidth + 'px';
                    if (nextCol && nextColumnWidth) {
                        nextCol.style.width = nextColumnWidth + 'px';
                    }
                }
                else {
                    throw "Scrollable tables require a colgroup to support resizable columns";
                }
            }
        };
        TreeTable.prototype.onColumnDragStart = function (event, columnElement) {
            this.reorderIconWidth = dom.DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
            this.reorderIconHeight = dom.DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
            this.draggedColumn = columnElement;
            event.dataTransfer.setData('text', 'b'); // For firefox
        };
        TreeTable.prototype.onColumnDragEnter = function (event, dropHeader) {
            if (this.reorderableColumns && this.draggedColumn && dropHeader) {
                event.preventDefault();
                var containerOffset = dom.DomHandler.getOffset(this.containerViewChild.nativeElement);
                var dropHeaderOffset = dom.DomHandler.getOffset(dropHeader);
                if (this.draggedColumn != dropHeader) {
                    var targetLeft = dropHeaderOffset.left - containerOffset.left;
                    var targetTop = containerOffset.top - dropHeaderOffset.top;
                    var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                    this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                    if (event.pageX > columnCenter) {
                        this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.dropPosition = 1;
                    }
                    else {
                        this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                        this.dropPosition = -1;
                    }
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
                }
                else {
                    event.dataTransfer.dropEffect = 'none';
                }
            }
        };
        TreeTable.prototype.onColumnDragLeave = function (event) {
            if (this.reorderableColumns && this.draggedColumn) {
                event.preventDefault();
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            }
        };
        TreeTable.prototype.onColumnDrop = function (event, dropColumn) {
            event.preventDefault();
            if (this.draggedColumn) {
                var dragIndex = dom.DomHandler.indexWithinGroup(this.draggedColumn, 'ttreorderablecolumn');
                var dropIndex = dom.DomHandler.indexWithinGroup(dropColumn, 'ttreorderablecolumn');
                var allowDrop = (dragIndex != dropIndex);
                if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                    allowDrop = false;
                }
                if (allowDrop && ((dropIndex < dragIndex && this.dropPosition === 1))) {
                    dropIndex = dropIndex + 1;
                }
                if (allowDrop && ((dropIndex > dragIndex && this.dropPosition === -1))) {
                    dropIndex = dropIndex - 1;
                }
                if (allowDrop) {
                    utils.ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                    this.onColReorder.emit({
                        dragIndex: dragIndex,
                        dropIndex: dropIndex,
                        columns: this.columns
                    });
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                this.draggedColumn.draggable = false;
                this.draggedColumn = null;
                this.dropPosition = null;
            }
        };
        TreeTable.prototype.handleRowClick = function (event) {
            var targetNode = event.originalEvent.target.nodeName;
            if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (dom.DomHandler.hasClass(event.originalEvent.target, 'p-clickable'))) {
                return;
            }
            if (this.selectionMode) {
                this.preventSelectionSetterPropagation = true;
                var rowNode = event.rowNode;
                var selected = this.isSelected(rowNode.node);
                var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rowNode.node.data, this.dataKey)) : null;
                if (metaSelection) {
                    var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            var selectionIndex_1 = this.findIndexInSelection(rowNode.node);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowNode.node;
                            this.selectionChange.emit(rowNode.node);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = __spread(this.selection, [rowNode.node]);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                        }
                        else {
                            this._selection = rowNode.node;
                            this.selectionChange.emit(this.selection);
                            this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            var selectionIndex_2 = this.findIndexInSelection(rowNode.node);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                            this.selectionChange.emit(this.selection);
                            this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? __spread(this.selection, [rowNode.node]) : [rowNode.node];
                            this.selectionChange.emit(this.selection);
                            this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
                this.tableService.onSelectionChange();
            }
            this.rowTouched = false;
        };
        TreeTable.prototype.handleRowTouchEnd = function (event) {
            this.rowTouched = true;
        };
        TreeTable.prototype.handleRowRightClick = function (event) {
            if (this.contextMenu) {
                var node = event.rowNode.node;
                if (this.contextMenuSelectionMode === 'separate') {
                    this.contextMenuSelection = node;
                    this.contextMenuSelectionChange.emit(node);
                    this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
                    this.contextMenu.show(event.originalEvent);
                    this.tableService.onContextMenu(node);
                }
                else if (this.contextMenuSelectionMode === 'joint') {
                    this.preventSelectionSetterPropagation = true;
                    var selected = this.isSelected(node);
                    var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;
                    if (!selected) {
                        if (this.isSingleSelectionMode()) {
                            this.selection = node;
                            this.selectionChange.emit(node);
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this.selection = [node];
                            this.selectionChange.emit(this.selection);
                        }
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    this.contextMenu.show(event.originalEvent);
                    this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
                }
            }
        };
        TreeTable.prototype.toggleNodeWithCheckbox = function (event) {
            this.selection = this.selection || [];
            this.preventSelectionSetterPropagation = true;
            var node = event.rowNode.node;
            var selected = this.isSelected(node);
            if (selected) {
                this.propagateSelectionDown(node, false);
                if (event.rowNode.parent) {
                    this.propagateSelectionUp(node.parent, false);
                }
                this.selectionChange.emit(this.selection);
                this.onNodeUnselect.emit({ originalEvent: event, node: node });
            }
            else {
                this.propagateSelectionDown(node, true);
                if (event.rowNode.parent) {
                    this.propagateSelectionUp(node.parent, true);
                }
                this.selectionChange.emit(this.selection);
                this.onNodeSelect.emit({ originalEvent: event, node: node });
            }
            this.tableService.onSelectionChange();
        };
        TreeTable.prototype.toggleNodesWithCheckbox = function (event, check) {
            var e_5, _a;
            var data = this.filteredNodes || this.value;
            this._selection = check && data ? data.slice() : [];
            if (check) {
                if (data && data.length) {
                    try {
                        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                            var node = data_1_1.value;
                            this.propagateSelectionDown(node, true);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            else {
                this._selection = [];
                this.selectionKeys = {};
            }
            this.preventSelectionSetterPropagation = true;
            this.selectionChange.emit(this._selection);
            this.tableService.onSelectionChange();
            this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
        };
        TreeTable.prototype.propagateSelectionUp = function (node, select) {
            var e_6, _a;
            if (node.children && node.children.length) {
                var selectedChildCount = 0;
                var childPartialSelected = false;
                var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;
                try {
                    for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        if (this.isSelected(child))
                            selectedChildCount++;
                        else if (child.partialSelected)
                            childPartialSelected = true;
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                if (select && selectedChildCount == node.children.length) {
                    this._selection = __spread(this.selection || [], [node]);
                    node.partialSelected = false;
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
                else {
                    if (!select) {
                        var index_1 = this.findIndexInSelection(node);
                        if (index_1 >= 0) {
                            this._selection = this.selection.filter(function (val, i) { return i != index_1; });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                    }
                    if (childPartialSelected || selectedChildCount > 0 && selectedChildCount != node.children.length)
                        node.partialSelected = true;
                    else
                        node.partialSelected = false;
                }
            }
            var parent = node.parent;
            if (parent) {
                this.propagateSelectionUp(parent, select);
            }
        };
        TreeTable.prototype.propagateSelectionDown = function (node, select) {
            var e_7, _a;
            var index = this.findIndexInSelection(node);
            var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;
            if (select && index == -1) {
                this._selection = __spread(this.selection || [], [node]);
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
            else if (!select && index > -1) {
                this._selection = this.selection.filter(function (val, i) { return i != index; });
                if (dataKeyValue) {
                    delete this.selectionKeys[dataKeyValue];
                }
            }
            node.partialSelected = false;
            if (node.children && node.children.length) {
                try {
                    for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        this.propagateSelectionDown(child, select);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        };
        TreeTable.prototype.isSelected = function (node) {
            if (node && this.selection) {
                if (this.dataKey) {
                    return this.selectionKeys[utils.ObjectUtils.resolveFieldData(node.data, this.dataKey)] !== undefined;
                }
                else {
                    if (this.selection instanceof Array)
                        return this.findIndexInSelection(node) > -1;
                    else
                        return this.equals(node, this.selection);
                }
            }
            return false;
        };
        TreeTable.prototype.findIndexInSelection = function (node) {
            var index = -1;
            if (this.selection && this.selection.length) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.equals(node, this.selection[i])) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        TreeTable.prototype.isSingleSelectionMode = function () {
            return this.selectionMode === 'single';
        };
        TreeTable.prototype.isMultipleSelectionMode = function () {
            return this.selectionMode === 'multiple';
        };
        TreeTable.prototype.equals = function (node1, node2) {
            return this.compareSelectionBy === 'equals' ? (node1 === node2) : utils.ObjectUtils.equals(node1.data, node2.data, this.dataKey);
        };
        TreeTable.prototype.filter = function (value, field, matchMode) {
            var _this = this;
            if (this.filterTimeout) {
                clearTimeout(this.filterTimeout);
            }
            if (!this.isFilterBlank(value)) {
                this.filters[field] = { value: value, matchMode: matchMode };
            }
            else if (this.filters[field]) {
                delete this.filters[field];
            }
            this.filterTimeout = setTimeout(function () {
                _this._filter();
                _this.filterTimeout = null;
            }, this.filterDelay);
        };
        TreeTable.prototype.filterGlobal = function (value, matchMode) {
            this.filter(value, 'global', matchMode);
        };
        TreeTable.prototype.isFilterBlank = function (filter) {
            if (filter !== null && filter !== undefined) {
                if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                    return true;
                else
                    return false;
            }
            return true;
        };
        TreeTable.prototype._filter = function () {
            var e_8, _a;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                if (!this.value) {
                    return;
                }
                if (!this.hasFilter()) {
                    this.filteredNodes = null;
                    if (this.paginator) {
                        this.totalRecords = this.value ? this.value.length : 0;
                    }
                }
                else {
                    var globalFilterFieldsArray = void 0;
                    if (this.filters['global']) {
                        if (!this.columns && !this.globalFilterFields)
                            throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                        else
                            globalFilterFieldsArray = this.globalFilterFields || this.columns;
                    }
                    this.filteredNodes = [];
                    var isStrictMode = this.filterMode === 'strict';
                    var isValueChanged = false;
                    try {
                        for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var node = _c.value;
                            var copyNode = Object.assign({}, node);
                            var localMatch = true;
                            var globalMatch = false;
                            var paramsWithoutNode = void 0;
                            for (var prop in this.filters) {
                                if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                                    var filterMeta = this.filters[prop];
                                    var filterField = prop;
                                    var filterValue = filterMeta.value;
                                    var filterMatchMode = filterMeta.matchMode || 'startsWith';
                                    var filterConstraint = this.filterService.filters[filterMatchMode];
                                    paramsWithoutNode = { filterField: filterField, filterValue: filterValue, filterConstraint: filterConstraint, isStrictMode: isStrictMode };
                                    if ((isStrictMode && !(this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                                        (!isStrictMode && !(this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                                        localMatch = false;
                                    }
                                    if (!localMatch) {
                                        break;
                                    }
                                }
                            }
                            if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                                for (var j = 0; j < globalFilterFieldsArray.length; j++) {
                                    var copyNodeForGlobal = Object.assign({}, copyNode);
                                    var filterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                                    var filterValue = this.filters['global'].value;
                                    var filterConstraint = this.filterService.filters[this.filters['global'].matchMode];
                                    paramsWithoutNode = { filterField: filterField, filterValue: filterValue, filterConstraint: filterConstraint, isStrictMode: isStrictMode };
                                    if ((isStrictMode && (this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode) || this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode))) ||
                                        (!isStrictMode && (this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode) || this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode)))) {
                                        globalMatch = true;
                                        copyNode = copyNodeForGlobal;
                                    }
                                }
                            }
                            var matches = localMatch;
                            if (this.filters['global']) {
                                matches = localMatch && globalMatch;
                            }
                            if (matches) {
                                this.filteredNodes.push(copyNode);
                            }
                            isValueChanged = isValueChanged || !localMatch || globalMatch || (localMatch && this.filteredNodes.length > 0) || (!globalMatch && this.filteredNodes.length === 0);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                    if (!isValueChanged) {
                        this.filteredNodes = null;
                    }
                    if (this.paginator) {
                        this.totalRecords = this.filteredNodes ? this.filteredNodes.length : this.value ? this.value.length : 0;
                    }
                }
            }
            this.first = 0;
            var filteredValue = this.filteredNodes || this.value;
            this.onFilter.emit({
                filters: this.filters,
                filteredValue: filteredValue
            });
            this.tableService.onUIUpdate(filteredValue);
            this.updateSerializedValue();
            if (this.scrollable) {
                this.resetScrollTop();
            }
        };
        TreeTable.prototype.findFilteredNodes = function (node, paramsWithoutNode) {
            var e_9, _a;
            if (node) {
                var matched = false;
                if (node.children) {
                    var childNodes = __spread(node.children);
                    node.children = [];
                    try {
                        for (var childNodes_1 = __values(childNodes), childNodes_1_1 = childNodes_1.next(); !childNodes_1_1.done; childNodes_1_1 = childNodes_1.next()) {
                            var childNode = childNodes_1_1.value;
                            var copyChildNode = Object.assign({}, childNode);
                            if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                                matched = true;
                                node.children.push(copyChildNode);
                            }
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (childNodes_1_1 && !childNodes_1_1.done && (_a = childNodes_1.return)) _a.call(childNodes_1);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                }
                if (matched) {
                    return true;
                }
            }
        };
        TreeTable.prototype.isFilterMatched = function (node, _a) {
            var filterField = _a.filterField, filterValue = _a.filterValue, filterConstraint = _a.filterConstraint, isStrictMode = _a.isStrictMode;
            var matched = false;
            var dataFieldValue = utils.ObjectUtils.resolveFieldData(node.data, filterField);
            if (filterConstraint(dataFieldValue, filterValue, this.filterLocale)) {
                matched = true;
            }
            if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
                matched = this.findFilteredNodes(node, { filterField: filterField, filterValue: filterValue, filterConstraint: filterConstraint, isStrictMode: isStrictMode }) || matched;
            }
            return matched;
        };
        TreeTable.prototype.isNodeLeaf = function (node) {
            return node.leaf === false ? false : !(node.children && node.children.length);
        };
        TreeTable.prototype.hasFilter = function () {
            var empty = true;
            for (var prop in this.filters) {
                if (this.filters.hasOwnProperty(prop)) {
                    empty = false;
                    break;
                }
            }
            return !empty;
        };
        TreeTable.prototype.reset = function () {
            this._sortField = null;
            this._sortOrder = 1;
            this._multiSortMeta = null;
            this.tableService.onSort(null);
            this.filteredNodes = null;
            this.filters = {};
            this.first = 0;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                this.totalRecords = (this._value ? this._value.length : 0);
            }
        };
        TreeTable.prototype.updateEditingCell = function (cell, data, field) {
            this.editingCell = cell;
            this.editingCellData = data;
            this.editingCellField = field;
            this.bindDocumentEditListener();
        };
        TreeTable.prototype.isEditingCellValid = function () {
            return (this.editingCell && dom.DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
        };
        TreeTable.prototype.bindDocumentEditListener = function () {
            var _this = this;
            if (!this.documentEditListener) {
                this.documentEditListener = function (event) {
                    if (_this.editingCell && !_this.editingCellClick && _this.isEditingCellValid()) {
                        dom.DomHandler.removeClass(_this.editingCell, 'p-cell-editing');
                        _this.editingCell = null;
                        _this.onEditComplete.emit({ field: _this.editingCellField, data: _this.editingCellData });
                        _this.editingCellField = null;
                        _this.editingCellData = null;
                        _this.unbindDocumentEditListener();
                    }
                    _this.editingCellClick = false;
                };
                document.addEventListener('click', this.documentEditListener);
            }
        };
        TreeTable.prototype.unbindDocumentEditListener = function () {
            if (this.documentEditListener) {
                document.removeEventListener('click', this.documentEditListener);
                this.documentEditListener = null;
            }
        };
        TreeTable.prototype.ngOnDestroy = function () {
            this.unbindDocumentEditListener();
            this.editingCell = null;
            this.editingCellField = null;
            this.editingCellData = null;
            this.initialized = null;
        };
        return TreeTable;
    }());
    TreeTable.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-treeTable',
                    template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\" data-scrollselectors=\".p-treetable-scrollable-body\"\n                [ngClass]=\"{'p-treetable p-component': true,\n                'p-treetable-hoverable-rows': (rowHover||(selectionMode === 'single' || selectionMode === 'multiple')),\n                'p-treetable-auto-layout': autoLayout,\n                'p-treetable-resizable': resizableColumns,\n                'p-treetable-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'p-treetable-flex-scrollable': (scrollable && scrollHeight === 'flex')}\">\n            <div class=\"p-treetable-loading\" *ngIf=\"loading && showLoader\">\n                <div class=\"p-treetable-loading-overlay p-component-overlay\">\n                    <i [class]=\"'p-treetable-loading-icon pi-spin ' + loadingIcon\"></i>\n                </div>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"p-treetable-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"p-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n\n            <div class=\"p-treetable-wrapper\" *ngIf=\"!scrollable\">\n                <table #table [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"p-treetable-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"p-treetable-tbody\" [pTreeTableBody]=\"columns\" [pTreeTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                    <tfoot class=\"p-treetable-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n\n            <div class=\"p-treetable-scrollable-wrapper\" *ngIf=\"scrollable\">\n               <div class=\"p-treetable-scrollable-view p-treetable-frozen-view\" *ngIf=\"frozenColumns||frozenBodyTemplate\" #scrollableFrozenView [ttScrollableView]=\"frozenColumns\" [frozen]=\"true\" [ngStyle]=\"{width: frozenWidth}\" [scrollHeight]=\"scrollHeight\"></div>\n               <div class=\"p-treetable-scrollable-view\" #scrollableView [ttScrollableView]=\"columns\" [frozen]=\"false\" [scrollHeight]=\"scrollHeight\" [ngStyle]=\"{left: frozenWidth, width: 'calc(100% - '+frozenWidth+')'}\"></div>\n            </div>\n\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"p-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showFirstLastIcon]=\"showFirstLastIcon\" [dropdownItemTemplate]=\"paginatorDropdownItemTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\" [showJumpToPageDropdown]=\"showJumpToPageDropdown\" [showPageLinks]=\"showPageLinks\"></p-paginator>\n            <div *ngIf=\"summaryTemplate\" class=\"p-treetable-footer\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"p-column-resizer-helper\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down p-treetable-reorder-indicator-up\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up p-treetable-reorder-indicator-down\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
                    providers: [TreeTableService],
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-treetable{position:relative}.p-treetable table{border-collapse:collapse;table-layout:fixed;width:100%}.p-treetable .p-sortable-column{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;user-select:none}.p-treetable .p-sortable-column .p-column-title,.p-treetable .p-sortable-column .p-sortable-column-badge,.p-treetable .p-sortable-column .p-sortable-column-icon{vertical-align:middle}.p-treetable .p-sortable-column .p-sortable-column-badge{align-items:center;display:inline-flex;justify-content:center}.p-treetable-auto-layout>.p-treetable-wrapper{overflow-x:auto}.p-treetable-auto-layout>.p-treetable-wrapper>table{table-layout:auto}.p-treetable-hoverable-rows .p-treetable-tbody>tr{cursor:pointer}.p-treetable-toggler{-ms-user-select:none;-webkit-user-select:none;align-items:center;cursor:pointer;display:inline-flex;justify-content:center;overflow:hidden;position:relative;user-select:none}.p-treetable-toggler,p-treetabletoggler+p-treetablecheckbox+span,p-treetabletoggler+p-treetablecheckbox .p-checkbox{vertical-align:middle}.p-treetable-scrollable-wrapper{position:relative}.p-treetable-scrollable-footer,.p-treetable-scrollable-header{overflow:hidden}.p-treetable-scrollable-body{overflow:auto;position:relative}.p-treetable-scrollable-body>table>.p-treetable-tbody>tr:first-child>td{border-top:0}.p-treetable-virtual-table{position:absolute}.p-treetable-frozen-view .p-treetable-scrollable-body{overflow:hidden}.p-treetable-frozen-view>.p-treetable-scrollable-body>table>.p-treetable-tbody>tr>td:last-child{border-right:0}.p-treetable-unfrozen-view{position:absolute;top:0}.p-treetable-flex-scrollable,.p-treetable-flex-scrollable .p-treetable-scrollable-view,.p-treetable-flex-scrollable .p-treetable-scrollable-wrapper{display:flex;flex:1;flex-direction:column;height:100%}.p-treetable-flex-scrollable .p-treetable-scrollable-body{flex:1}.p-treetable-resizable>.p-treetable-wrapper{overflow-x:auto}.p-treetable-resizable .p-treetable-tbody>tr>td,.p-treetable-resizable .p-treetable-tfoot>tr>td,.p-treetable-resizable .p-treetable-thead>tr>th{overflow:hidden}.p-treetable-resizable .p-resizable-column{background-clip:padding-box;position:relative}.p-treetable-resizable-fit .p-resizable-column:last-child .p-column-resizer{display:none}.p-treetable .p-column-resizer{border:1px solid transparent;cursor:col-resize;display:block;height:100%;margin:0;padding:0;position:absolute!important;right:0;top:0;width:.5rem}.p-treetable .p-column-resizer-helper{display:none;position:absolute;width:1px;z-index:10}.p-treetable .p-row-editor-cancel,.p-treetable .p-row-editor-init,.p-treetable .p-row-editor-save,.p-treetable .p-row-toggler{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;position:relative}.p-treetable-reorder-indicator-down,.p-treetable-reorder-indicator-up{display:none;position:absolute}[ttReorderableColumn]{cursor:move}.p-treetable .p-treetable-loading-overlay{align-items:center;display:flex;justify-content:center;position:absolute;z-index:2}"]
                },] }
    ];
    TreeTable.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: TreeTableService },
        { type: api.FilterService }
    ]; };
    TreeTable.propDecorators = {
        columns: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        tableStyle: [{ type: core.Input }],
        tableStyleClass: [{ type: core.Input }],
        autoLayout: [{ type: core.Input }],
        lazy: [{ type: core.Input }],
        lazyLoadOnInit: [{ type: core.Input }],
        paginator: [{ type: core.Input }],
        rows: [{ type: core.Input }],
        first: [{ type: core.Input }],
        pageLinks: [{ type: core.Input }],
        rowsPerPageOptions: [{ type: core.Input }],
        alwaysShowPaginator: [{ type: core.Input }],
        paginatorPosition: [{ type: core.Input }],
        paginatorDropdownAppendTo: [{ type: core.Input }],
        currentPageReportTemplate: [{ type: core.Input }],
        showCurrentPageReport: [{ type: core.Input }],
        showJumpToPageDropdown: [{ type: core.Input }],
        showFirstLastIcon: [{ type: core.Input }],
        showPageLinks: [{ type: core.Input }],
        defaultSortOrder: [{ type: core.Input }],
        sortMode: [{ type: core.Input }],
        resetPageOnSort: [{ type: core.Input }],
        customSort: [{ type: core.Input }],
        selectionMode: [{ type: core.Input }],
        selectionChange: [{ type: core.Output }],
        contextMenuSelection: [{ type: core.Input }],
        contextMenuSelectionChange: [{ type: core.Output }],
        contextMenuSelectionMode: [{ type: core.Input }],
        dataKey: [{ type: core.Input }],
        metaKeySelection: [{ type: core.Input }],
        compareSelectionBy: [{ type: core.Input }],
        rowHover: [{ type: core.Input }],
        loading: [{ type: core.Input }],
        loadingIcon: [{ type: core.Input }],
        showLoader: [{ type: core.Input }],
        scrollable: [{ type: core.Input }],
        scrollHeight: [{ type: core.Input }],
        virtualScroll: [{ type: core.Input }],
        virtualScrollDelay: [{ type: core.Input }],
        virtualRowHeight: [{ type: core.Input }],
        minBufferPx: [{ type: core.Input }],
        maxBufferPx: [{ type: core.Input }],
        frozenWidth: [{ type: core.Input }],
        frozenColumns: [{ type: core.Input }],
        resizableColumns: [{ type: core.Input }],
        columnResizeMode: [{ type: core.Input }],
        reorderableColumns: [{ type: core.Input }],
        contextMenu: [{ type: core.Input }],
        rowTrackBy: [{ type: core.Input }],
        filters: [{ type: core.Input }],
        globalFilterFields: [{ type: core.Input }],
        filterDelay: [{ type: core.Input }],
        filterMode: [{ type: core.Input }],
        filterLocale: [{ type: core.Input }],
        onFilter: [{ type: core.Output }],
        onNodeExpand: [{ type: core.Output }],
        onNodeCollapse: [{ type: core.Output }],
        onPage: [{ type: core.Output }],
        onSort: [{ type: core.Output }],
        onLazyLoad: [{ type: core.Output }],
        sortFunction: [{ type: core.Output }],
        onColResize: [{ type: core.Output }],
        onColReorder: [{ type: core.Output }],
        onNodeSelect: [{ type: core.Output }],
        onNodeUnselect: [{ type: core.Output }],
        onContextMenuSelect: [{ type: core.Output }],
        onHeaderCheckboxToggle: [{ type: core.Output }],
        onEditInit: [{ type: core.Output }],
        onEditComplete: [{ type: core.Output }],
        onEditCancel: [{ type: core.Output }],
        containerViewChild: [{ type: core.ViewChild, args: ['container',] }],
        resizeHelperViewChild: [{ type: core.ViewChild, args: ['resizeHelper',] }],
        reorderIndicatorUpViewChild: [{ type: core.ViewChild, args: ['reorderIndicatorUp',] }],
        reorderIndicatorDownViewChild: [{ type: core.ViewChild, args: ['reorderIndicatorDown',] }],
        tableViewChild: [{ type: core.ViewChild, args: ['table',] }],
        scrollableViewChild: [{ type: core.ViewChild, args: ['scrollableView',] }],
        scrollableFrozenViewChild: [{ type: core.ViewChild, args: ['scrollableFrozenView',] }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        value: [{ type: core.Input }],
        totalRecords: [{ type: core.Input }],
        sortField: [{ type: core.Input }],
        sortOrder: [{ type: core.Input }],
        multiSortMeta: [{ type: core.Input }],
        selection: [{ type: core.Input }]
    };
    var TTBody = /** @class */ (function () {
        function TTBody(tt, treeTableService, cd) {
            var _this = this;
            this.tt = tt;
            this.treeTableService = treeTableService;
            this.cd = cd;
            this.subscription = this.tt.tableService.uiUpdateSource$.subscribe(function () {
                if (_this.tt.virtualScroll) {
                    _this.cd.detectChanges();
                }
            });
        }
        TTBody.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TTBody;
    }());
    TTBody.decorators = [
        { type: core.Component, args: [{
                    selector: '[pTreeTableBody]',
                    template: "\n        <ng-container *ngIf=\"!tt.virtualScroll\">\n            <ng-template ngFor let-serializedNode let-rowIndex=\"index\" [ngForOf]=\"tt.serializedValue\" [ngForTrackBy]=\"tt.rowTrackBy\">\n                <ng-container *ngIf=\"serializedNode.visible\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: serializedNode, node: serializedNode.node, rowData: serializedNode.node.data, columns: columns}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"tt.virtualScroll\">\n            <ng-template cdkVirtualFor let-serializedNode let-rowIndex=\"index\" [cdkVirtualForOf]=\"tt.serializedValue\" [cdkVirtualForTrackBy]=\"tt.rowTrackBy\" [cdkVirtualForTemplateCacheSize]=\"0\">\n                <ng-container *ngIf=\"serializedNode.visible\">\n                    <ng-container *ngTemplateOutlet=\"template; context: {$implicit: serializedNode, node: serializedNode.node, rowData: serializedNode.node.data, columns: columns}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"tt.isEmpty()\">\n            <ng-container *ngTemplateOutlet=\"tt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    TTBody.ctorParameters = function () { return [
        { type: TreeTable },
        { type: TreeTableService },
        { type: core.ChangeDetectorRef }
    ]; };
    TTBody.propDecorators = {
        columns: [{ type: core.Input, args: ["pTreeTableBody",] }],
        template: [{ type: core.Input, args: ["pTreeTableBodyTemplate",] }],
        frozen: [{ type: core.Input }]
    };
    var TTScrollableView = /** @class */ (function () {
        function TTScrollableView(tt, el, zone) {
            this.tt = tt;
            this.el = el;
            this.zone = zone;
        }
        Object.defineProperty(TTScrollableView.prototype, "scrollHeight", {
            get: function () {
                return this._scrollHeight;
            },
            set: function (val) {
                this._scrollHeight = val;
                if (val != null && (val.includes('%') || val.includes('calc'))) {
                    console.log('Percentage scroll height calculation is removed in favor of the more performant CSS based flex mode, use scrollHeight="flex" instead.');
                }
                if (this.tt.virtualScroll && this.virtualScrollBody) {
                    this.virtualScrollBody.ngOnInit();
                }
            },
            enumerable: false,
            configurable: true
        });
        TTScrollableView.prototype.ngAfterViewInit = function () {
            if (!this.frozen) {
                if (this.tt.frozenColumns || this.tt.frozenBodyTemplate) {
                    dom.DomHandler.addClass(this.el.nativeElement, 'p-treetable-unfrozen-view');
                }
                var frozenView = this.el.nativeElement.previousElementSibling;
                if (frozenView) {
                    if (this.tt.virtualScroll)
                        this.frozenSiblingBody = dom.DomHandler.findSingle(frozenView, '.p-treetable-virtual-scrollable-body');
                    else
                        this.frozenSiblingBody = dom.DomHandler.findSingle(frozenView, '.p-treetable-scrollable-body');
                }
                var scrollBarWidth = dom.DomHandler.calculateScrollbarWidth();
                this.scrollHeaderBoxViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
                if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                    this.scrollFooterBoxViewChild.nativeElement.style.paddingRight = scrollBarWidth + 'px';
                }
            }
            else {
                if (this.scrollableAlignerViewChild && this.scrollableAlignerViewChild.nativeElement) {
                    this.scrollableAlignerViewChild.nativeElement.style.height = dom.DomHandler.calculateScrollbarHeight() + 'px';
                }
            }
            this.bindEvents();
        };
        TTScrollableView.prototype.bindEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                if (_this.scrollHeaderViewChild && _this.scrollHeaderViewChild.nativeElement) {
                    _this.headerScrollListener = _this.onHeaderScroll.bind(_this);
                    _this.scrollHeaderBoxViewChild.nativeElement.addEventListener('scroll', _this.headerScrollListener);
                }
                if (_this.scrollFooterViewChild && _this.scrollFooterViewChild.nativeElement) {
                    _this.footerScrollListener = _this.onFooterScroll.bind(_this);
                    _this.scrollFooterViewChild.nativeElement.addEventListener('scroll', _this.footerScrollListener);
                }
                if (!_this.frozen) {
                    _this.bodyScrollListener = _this.onBodyScroll.bind(_this);
                    if (_this.tt.virtualScroll)
                        _this.virtualScrollBody.getElementRef().nativeElement.addEventListener('scroll', _this.bodyScrollListener);
                    else
                        _this.scrollBodyViewChild.nativeElement.addEventListener('scroll', _this.bodyScrollListener);
                }
            });
        };
        TTScrollableView.prototype.unbindEvents = function () {
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.scrollHeaderBoxViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
            }
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
            }
            if (this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
                this.scrollBodyViewChild.nativeElement.removeEventListener('scroll', this.bodyScrollListener);
            }
            if (this.virtualScrollBody && this.virtualScrollBody.getElementRef()) {
                this.virtualScrollBody.getElementRef().nativeElement.removeEventListener('scroll', this.bodyScrollListener);
            }
        };
        TTScrollableView.prototype.onHeaderScroll = function () {
            var scrollLeft = this.scrollHeaderViewChild.nativeElement.scrollLeft;
            this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.scrollFooterViewChild.nativeElement.scrollLeft = scrollLeft;
            }
            this.preventBodyScrollPropagation = true;
        };
        TTScrollableView.prototype.onFooterScroll = function () {
            var scrollLeft = this.scrollFooterViewChild.nativeElement.scrollLeft;
            this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.scrollHeaderViewChild.nativeElement.scrollLeft = scrollLeft;
            }
            this.preventBodyScrollPropagation = true;
        };
        TTScrollableView.prototype.onBodyScroll = function (event) {
            if (this.preventBodyScrollPropagation) {
                this.preventBodyScrollPropagation = false;
                return;
            }
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
            }
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * event.target.scrollLeft + 'px';
            }
            if (this.frozenSiblingBody) {
                this.frozenSiblingBody.scrollTop = event.target.scrollTop;
            }
        };
        TTScrollableView.prototype.scrollToVirtualIndex = function (index) {
            if (this.virtualScrollBody) {
                this.virtualScrollBody.scrollToIndex(index);
            }
        };
        TTScrollableView.prototype.scrollTo = function (options) {
            if (this.virtualScrollBody) {
                this.virtualScrollBody.scrollTo(options);
            }
            else {
                if (this.scrollBodyViewChild.nativeElement.scrollTo) {
                    this.scrollBodyViewChild.nativeElement.scrollTo(options);
                }
                else {
                    this.scrollBodyViewChild.nativeElement.scrollLeft = options.left;
                    this.scrollBodyViewChild.nativeElement.scrollTop = options.top;
                }
            }
        };
        TTScrollableView.prototype.ngOnDestroy = function () {
            this.unbindEvents();
            this.frozenSiblingBody = null;
        };
        return TTScrollableView;
    }());
    TTScrollableView.decorators = [
        { type: core.Component, args: [{
                    selector: '[ttScrollableView]',
                    template: "\n        <div #scrollHeader class=\"p-treetable-scrollable-header\">\n            <div #scrollHeaderBox class=\"p-treetable-scrollable-header-box\">\n                <table class=\"p-treetable-scrollable-header-table\" [ngClass]=\"tt.tableStyleClass\" [ngStyle]=\"tt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"p-treetable-thead\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenHeaderTemplate||tt.headerTemplate : tt.headerTemplate; context {$implicit: columns}\"></ng-container>\n                    </thead>\n                </table>\n            </div>\n        </div>\n        <ng-container *ngIf=\"!tt.virtualScroll; else virtualScrollTemplate\">\n            <div #scrollBody class=\"p-treetable-scrollable-body\" [ngStyle]=\"{'max-height': tt.scrollHeight !== 'flex' ? scrollHeight : undefined, 'overflow-y': !frozen && tt.scrollHeight ? 'scroll' : undefined}\">\n                <table #scrollTable [class]=\"tt.tableStyleClass\" [ngStyle]=\"tt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tbody class=\"p-treetable-tbody\" [pTreeTableBody]=\"columns\" [pTreeTableBodyTemplate]=\"frozen ? tt.frozenBodyTemplate||tt.bodyTemplate : tt.bodyTemplate\" [frozen]=\"frozen\"></tbody>\n                </table>\n                <div #scrollableAligner style=\"background-color:transparent\" *ngIf=\"frozen\"></div>\n            </div>\n        </ng-container>\n        <ng-template #virtualScrollTemplate>\n            <cdk-virtual-scroll-viewport [itemSize]=\"tt.virtualRowHeight\" [style.height]=\"tt.scrollHeight !== 'flex' ? scrollHeight : undefined\"\n                    [minBufferPx]=\"tt.minBufferPx\" [maxBufferPx]=\"tt.maxBufferPx\" class=\"p-treetable-virtual-scrollable-body\">\n                <table #scrollTable [class]=\"tt.tableStyleClass\" [ngStyle]=\"tt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tbody class=\"p-treetable-tbody\" [pTreeTableBody]=\"columns\" [pTreeTableBodyTemplate]=\"frozen ? tt.frozenBodyTemplate||tt.bodyTemplate : tt.bodyTemplate\" [frozen]=\"frozen\"></tbody>\n                </table>\n                <div #scrollableAligner style=\"background-color:transparent\" *ngIf=\"frozen\"></div>\n            </cdk-virtual-scroll-viewport>\n        </ng-template>\n        <div #scrollFooter *ngIf=\"tt.footerTemplate\" class=\"p-treetable-scrollable-footer\">\n            <div #scrollFooterBox class=\"p-treetable-scrollable-footer-box\">\n                <table class=\"p-treetable-scrollable-footer-table\" [ngClass]=\"tt.tableStyleClass\" [ngStyle]=\"tt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tfoot class=\"p-treetable-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? tt.frozenFooterTemplate||tt.footerTemplate : tt.footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    TTScrollableView.ctorParameters = function () { return [
        { type: TreeTable },
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    TTScrollableView.propDecorators = {
        columns: [{ type: core.Input, args: ["ttScrollableView",] }],
        frozen: [{ type: core.Input }],
        scrollHeaderViewChild: [{ type: core.ViewChild, args: ['scrollHeader',] }],
        scrollHeaderBoxViewChild: [{ type: core.ViewChild, args: ['scrollHeaderBox',] }],
        scrollBodyViewChild: [{ type: core.ViewChild, args: ['scrollBody',] }],
        scrollTableViewChild: [{ type: core.ViewChild, args: ['scrollTable',] }],
        scrollLoadingTableViewChild: [{ type: core.ViewChild, args: ['loadingTable',] }],
        scrollFooterViewChild: [{ type: core.ViewChild, args: ['scrollFooter',] }],
        scrollFooterBoxViewChild: [{ type: core.ViewChild, args: ['scrollFooterBox',] }],
        scrollableAlignerViewChild: [{ type: core.ViewChild, args: ['scrollableAligner',] }],
        virtualScrollBody: [{ type: core.ViewChild, args: [scrolling.CdkVirtualScrollViewport,] }],
        scrollHeight: [{ type: core.Input }]
    };
    var TTSortableColumn = /** @class */ (function () {
        function TTSortableColumn(tt) {
            var _this = this;
            this.tt = tt;
            if (this.isEnabled()) {
                this.subscription = this.tt.tableService.sortSource$.subscribe(function (sortMeta) {
                    _this.updateSortState();
                });
            }
        }
        TTSortableColumn.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.updateSortState();
            }
        };
        TTSortableColumn.prototype.updateSortState = function () {
            this.sorted = this.tt.isSorted(this.field);
        };
        TTSortableColumn.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.updateSortState();
                this.tt.sort({
                    originalEvent: event,
                    field: this.field
                });
                dom.DomHandler.clearSelection();
            }
        };
        TTSortableColumn.prototype.onEnterKey = function (event) {
            this.onClick(event);
        };
        TTSortableColumn.prototype.isEnabled = function () {
            return this.ttSortableColumnDisabled !== true;
        };
        TTSortableColumn.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TTSortableColumn;
    }());
    TTSortableColumn.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttSortableColumn]',
                    host: {
                        '[class.p-sortable-column]': 'isEnabled()',
                        '[class.p-highlight]': 'sorted',
                        '[attr.tabindex]': 'isEnabled() ? "0" : null',
                        '[attr.role]': '"columnheader"'
                    }
                },] }
    ];
    TTSortableColumn.ctorParameters = function () { return [
        { type: TreeTable }
    ]; };
    TTSortableColumn.propDecorators = {
        field: [{ type: core.Input, args: ["ttSortableColumn",] }],
        ttSortableColumnDisabled: [{ type: core.Input }],
        onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }],
        onEnterKey: [{ type: core.HostListener, args: ['keydown.enter', ['$event'],] }]
    };
    var TTSortIcon = /** @class */ (function () {
        function TTSortIcon(tt, cd) {
            var _this = this;
            this.tt = tt;
            this.cd = cd;
            this.subscription = this.tt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
                _this.cd.markForCheck();
            });
        }
        TTSortIcon.prototype.ngOnInit = function () {
            this.updateSortState();
        };
        TTSortIcon.prototype.onClick = function (event) {
            event.preventDefault();
        };
        TTSortIcon.prototype.updateSortState = function () {
            if (this.tt.sortMode === 'single') {
                this.sortOrder = this.tt.isSorted(this.field) ? this.tt.sortOrder : 0;
            }
            else if (this.tt.sortMode === 'multiple') {
                var sortMeta = this.tt.getSortMeta(this.field);
                this.sortOrder = sortMeta ? sortMeta.order : 0;
            }
        };
        TTSortIcon.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TTSortIcon;
    }());
    TTSortIcon.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-treeTableSortIcon',
                    template: "\n        <i class=\"p-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-amount-up-alt': sortOrder === 1, 'pi-sort-amount-down': sortOrder === -1, 'pi-sort-alt': sortOrder === 0}\"></i>\n    ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    TTSortIcon.ctorParameters = function () { return [
        { type: TreeTable },
        { type: core.ChangeDetectorRef }
    ]; };
    TTSortIcon.propDecorators = {
        field: [{ type: core.Input }],
        ariaLabelDesc: [{ type: core.Input }],
        ariaLabelAsc: [{ type: core.Input }]
    };
    var TTResizableColumn = /** @class */ (function () {
        function TTResizableColumn(tt, el, zone) {
            this.tt = tt;
            this.el = el;
            this.zone = zone;
        }
        TTResizableColumn.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.isEnabled()) {
                dom.DomHandler.addClass(this.el.nativeElement, 'p-resizable-column');
                this.resizer = document.createElement('span');
                this.resizer.className = 'p-column-resizer';
                this.el.nativeElement.appendChild(this.resizer);
                this.zone.runOutsideAngular(function () {
                    _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                    _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
                });
            }
        };
        TTResizableColumn.prototype.bindDocumentEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
                document.addEventListener('mousemove', _this.documentMouseMoveListener);
                _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
                document.addEventListener('mouseup', _this.documentMouseUpListener);
            });
        };
        TTResizableColumn.prototype.unbindDocumentEvents = function () {
            if (this.documentMouseMoveListener) {
                document.removeEventListener('mousemove', this.documentMouseMoveListener);
                this.documentMouseMoveListener = null;
            }
            if (this.documentMouseUpListener) {
                document.removeEventListener('mouseup', this.documentMouseUpListener);
                this.documentMouseUpListener = null;
            }
        };
        TTResizableColumn.prototype.onMouseDown = function (event) {
            this.tt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        };
        TTResizableColumn.prototype.onDocumentMouseMove = function (event) {
            this.tt.onColumnResize(event);
        };
        TTResizableColumn.prototype.onDocumentMouseUp = function (event) {
            this.tt.onColumnResizeEnd(event, this.el.nativeElement);
            this.unbindDocumentEvents();
        };
        TTResizableColumn.prototype.isEnabled = function () {
            return this.ttResizableColumnDisabled !== true;
        };
        TTResizableColumn.prototype.ngOnDestroy = function () {
            if (this.resizerMouseDownListener) {
                this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
            }
            this.unbindDocumentEvents();
        };
        return TTResizableColumn;
    }());
    TTResizableColumn.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttResizableColumn]'
                },] }
    ];
    TTResizableColumn.ctorParameters = function () { return [
        { type: TreeTable },
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    TTResizableColumn.propDecorators = {
        ttResizableColumnDisabled: [{ type: core.Input }]
    };
    var TTReorderableColumn = /** @class */ (function () {
        function TTReorderableColumn(tt, el, zone) {
            this.tt = tt;
            this.el = el;
            this.zone = zone;
        }
        TTReorderableColumn.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                this.bindEvents();
            }
        };
        TTReorderableColumn.prototype.bindEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.mouseDownListener = _this.onMouseDown.bind(_this);
                _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                _this.dragStartListener = _this.onDragStart.bind(_this);
                _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
                _this.dragOverListener = _this.onDragEnter.bind(_this);
                _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
                _this.dragEnterListener = _this.onDragEnter.bind(_this);
                _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
                _this.dragLeaveListener = _this.onDragLeave.bind(_this);
                _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
            });
        };
        TTReorderableColumn.prototype.unbindEvents = function () {
            if (this.mouseDownListener) {
                document.removeEventListener('mousedown', this.mouseDownListener);
                this.mouseDownListener = null;
            }
            if (this.dragOverListener) {
                document.removeEventListener('dragover', this.dragOverListener);
                this.dragOverListener = null;
            }
            if (this.dragEnterListener) {
                document.removeEventListener('dragenter', this.dragEnterListener);
                this.dragEnterListener = null;
            }
            if (this.dragEnterListener) {
                document.removeEventListener('dragenter', this.dragEnterListener);
                this.dragEnterListener = null;
            }
            if (this.dragLeaveListener) {
                document.removeEventListener('dragleave', this.dragLeaveListener);
                this.dragLeaveListener = null;
            }
        };
        TTReorderableColumn.prototype.onMouseDown = function (event) {
            if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || dom.DomHandler.hasClass(event.target, 'p-column-resizer'))
                this.el.nativeElement.draggable = false;
            else
                this.el.nativeElement.draggable = true;
        };
        TTReorderableColumn.prototype.onDragStart = function (event) {
            this.tt.onColumnDragStart(event, this.el.nativeElement);
        };
        TTReorderableColumn.prototype.onDragOver = function (event) {
            event.preventDefault();
        };
        TTReorderableColumn.prototype.onDragEnter = function (event) {
            this.tt.onColumnDragEnter(event, this.el.nativeElement);
        };
        TTReorderableColumn.prototype.onDragLeave = function (event) {
            this.tt.onColumnDragLeave(event);
        };
        TTReorderableColumn.prototype.onDrop = function (event) {
            if (this.isEnabled()) {
                this.tt.onColumnDrop(event, this.el.nativeElement);
            }
        };
        TTReorderableColumn.prototype.isEnabled = function () {
            return this.ttReorderableColumnDisabled !== true;
        };
        TTReorderableColumn.prototype.ngOnDestroy = function () {
            this.unbindEvents();
        };
        return TTReorderableColumn;
    }());
    TTReorderableColumn.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttReorderableColumn]'
                },] }
    ];
    TTReorderableColumn.ctorParameters = function () { return [
        { type: TreeTable },
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    TTReorderableColumn.propDecorators = {
        ttReorderableColumnDisabled: [{ type: core.Input }],
        onDrop: [{ type: core.HostListener, args: ['drop', ['$event'],] }]
    };
    var TTSelectableRow = /** @class */ (function () {
        function TTSelectableRow(tt, tableService) {
            var _this = this;
            this.tt = tt;
            this.tableService = tableService;
            if (this.isEnabled()) {
                this.subscription = this.tt.tableService.selectionSource$.subscribe(function () {
                    _this.selected = _this.tt.isSelected(_this.rowNode.node);
                });
            }
        }
        TTSelectableRow.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.selected = this.tt.isSelected(this.rowNode.node);
            }
        };
        TTSelectableRow.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.tt.handleRowClick({
                    originalEvent: event,
                    rowNode: this.rowNode
                });
            }
        };
        TTSelectableRow.prototype.onEnterKey = function (event) {
            if (event.which === 13) {
                this.onClick(event);
            }
        };
        TTSelectableRow.prototype.onTouchEnd = function (event) {
            if (this.isEnabled()) {
                this.tt.handleRowTouchEnd(event);
            }
        };
        TTSelectableRow.prototype.isEnabled = function () {
            return this.ttSelectableRowDisabled !== true;
        };
        TTSelectableRow.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TTSelectableRow;
    }());
    TTSelectableRow.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttSelectableRow]',
                    host: {
                        '[class.p-highlight]': 'selected'
                    }
                },] }
    ];
    TTSelectableRow.ctorParameters = function () { return [
        { type: TreeTable },
        { type: TreeTableService }
    ]; };
    TTSelectableRow.propDecorators = {
        rowNode: [{ type: core.Input, args: ["ttSelectableRow",] }],
        ttSelectableRowDisabled: [{ type: core.Input }],
        onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }],
        onEnterKey: [{ type: core.HostListener, args: ['keydown', ['$event'],] }],
        onTouchEnd: [{ type: core.HostListener, args: ['touchend', ['$event'],] }]
    };
    var TTSelectableRowDblClick = /** @class */ (function () {
        function TTSelectableRowDblClick(tt, tableService) {
            var _this = this;
            this.tt = tt;
            this.tableService = tableService;
            if (this.isEnabled()) {
                this.subscription = this.tt.tableService.selectionSource$.subscribe(function () {
                    _this.selected = _this.tt.isSelected(_this.rowNode.node);
                });
            }
        }
        TTSelectableRowDblClick.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.selected = this.tt.isSelected(this.rowNode.node);
            }
        };
        TTSelectableRowDblClick.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.tt.handleRowClick({
                    originalEvent: event,
                    rowNode: this.rowNode
                });
            }
        };
        TTSelectableRowDblClick.prototype.isEnabled = function () {
            return this.ttSelectableRowDisabled !== true;
        };
        TTSelectableRowDblClick.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TTSelectableRowDblClick;
    }());
    TTSelectableRowDblClick.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttSelectableRowDblClick]',
                    host: {
                        '[class.p-highlight]': 'selected'
                    }
                },] }
    ];
    TTSelectableRowDblClick.ctorParameters = function () { return [
        { type: TreeTable },
        { type: TreeTableService }
    ]; };
    TTSelectableRowDblClick.propDecorators = {
        rowNode: [{ type: core.Input, args: ["ttSelectableRowDblClick",] }],
        ttSelectableRowDisabled: [{ type: core.Input }],
        onClick: [{ type: core.HostListener, args: ['dblclick', ['$event'],] }]
    };
    var TTContextMenuRow = /** @class */ (function () {
        function TTContextMenuRow(tt, tableService, el) {
            var _this = this;
            this.tt = tt;
            this.tableService = tableService;
            this.el = el;
            if (this.isEnabled()) {
                this.subscription = this.tt.tableService.contextMenuSource$.subscribe(function (node) {
                    _this.selected = _this.tt.equals(_this.rowNode.node, node);
                });
            }
        }
        TTContextMenuRow.prototype.onContextMenu = function (event) {
            if (this.isEnabled()) {
                this.tt.handleRowRightClick({
                    originalEvent: event,
                    rowNode: this.rowNode
                });
                this.el.nativeElement.focus();
                event.preventDefault();
            }
        };
        TTContextMenuRow.prototype.isEnabled = function () {
            return this.ttContextMenuRowDisabled !== true;
        };
        TTContextMenuRow.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TTContextMenuRow;
    }());
    TTContextMenuRow.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttContextMenuRow]',
                    host: {
                        '[class.p-highlight-contextmenu]': 'selected',
                        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                    }
                },] }
    ];
    TTContextMenuRow.ctorParameters = function () { return [
        { type: TreeTable },
        { type: TreeTableService },
        { type: core.ElementRef }
    ]; };
    TTContextMenuRow.propDecorators = {
        rowNode: [{ type: core.Input, args: ["ttContextMenuRow",] }],
        ttContextMenuRowDisabled: [{ type: core.Input }],
        onContextMenu: [{ type: core.HostListener, args: ['contextmenu', ['$event'],] }]
    };
    var TTCheckbox = /** @class */ (function () {
        function TTCheckbox(tt, tableService, cd) {
            var _this = this;
            this.tt = tt;
            this.tableService = tableService;
            this.cd = cd;
            this.subscription = this.tt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.tt.isSelected(_this.rowNode.node);
                _this.cd.markForCheck();
            });
        }
        TTCheckbox.prototype.ngOnInit = function () {
            this.checked = this.tt.isSelected(this.rowNode.node);
        };
        TTCheckbox.prototype.onClick = function (event) {
            if (!this.disabled) {
                this.tt.toggleNodeWithCheckbox({
                    originalEvent: event,
                    rowNode: this.rowNode
                });
            }
            dom.DomHandler.clearSelection();
        };
        TTCheckbox.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TTCheckbox.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TTCheckbox.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        return TTCheckbox;
    }());
    TTCheckbox.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-treeTableCheckbox',
                    template: "\n        <div class=\"p-checkbox p-component\" (click)=\"onClick($event)\">\n            <div class=\"p-hidden-accessible\">\n                <input type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n            </div>\n            <div #box [ngClass]=\"{'p-checkbox-box':true,\n                'p-highlight':checked, 'p-disabled':disabled}\"  role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"p-checkbox-icon pi\" [ngClass]=\"{'pi-check':checked, 'pi-minus': rowNode.node.partialSelected}\"></span>\n            </div>\n        </div>\n    ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    TTCheckbox.ctorParameters = function () { return [
        { type: TreeTable },
        { type: TreeTableService },
        { type: core.ChangeDetectorRef }
    ]; };
    TTCheckbox.propDecorators = {
        disabled: [{ type: core.Input }],
        rowNode: [{ type: core.Input, args: ["value",] }],
        boxViewChild: [{ type: core.ViewChild, args: ['box',] }]
    };
    var TTHeaderCheckbox = /** @class */ (function () {
        function TTHeaderCheckbox(tt, tableService, cd) {
            var _this = this;
            this.tt = tt;
            this.tableService = tableService;
            this.cd = cd;
            this.valueChangeSubscription = this.tt.tableService.uiUpdateSource$.subscribe(function () {
                _this.checked = _this.updateCheckedState();
            });
            this.selectionChangeSubscription = this.tt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.updateCheckedState();
            });
        }
        TTHeaderCheckbox.prototype.ngOnInit = function () {
            this.checked = this.updateCheckedState();
        };
        TTHeaderCheckbox.prototype.onClick = function (event, checked) {
            if (this.tt.value && this.tt.value.length > 0) {
                this.tt.toggleNodesWithCheckbox(event, !checked);
            }
            dom.DomHandler.clearSelection();
        };
        TTHeaderCheckbox.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TTHeaderCheckbox.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'p-focus');
        };
        TTHeaderCheckbox.prototype.ngOnDestroy = function () {
            if (this.selectionChangeSubscription) {
                this.selectionChangeSubscription.unsubscribe();
            }
            if (this.valueChangeSubscription) {
                this.valueChangeSubscription.unsubscribe();
            }
        };
        TTHeaderCheckbox.prototype.updateCheckedState = function () {
            var e_10, _a;
            this.cd.markForCheck();
            var checked;
            var data = this.tt.filteredNodes || this.tt.value;
            if (data) {
                try {
                    for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                        var node = data_2_1.value;
                        if (this.tt.isSelected(node)) {
                            checked = true;
                        }
                        else {
                            checked = false;
                            break;
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
            else {
                checked = false;
            }
            return checked;
        };
        return TTHeaderCheckbox;
    }());
    TTHeaderCheckbox.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-treeTableHeaderCheckbox',
                    template: "\n        <div class=\"p-checkbox p-component\" (click)=\"onClick($event, cb.checked)\">\n            <div class=\"p-hidden-accessible\">\n                <input #cb type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"!tt.value||tt.value.length === 0\">\n            </div>\n            <div #box [ngClass]=\"{'p-checkbox-box':true,\n                'p-highlight':checked, 'p-disabled': (!tt.value || tt.value.length === 0)}\"  role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"p-checkbox-icon\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    ",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    TTHeaderCheckbox.ctorParameters = function () { return [
        { type: TreeTable },
        { type: TreeTableService },
        { type: core.ChangeDetectorRef }
    ]; };
    TTHeaderCheckbox.propDecorators = {
        boxViewChild: [{ type: core.ViewChild, args: ['box',] }]
    };
    var TTEditableColumn = /** @class */ (function () {
        function TTEditableColumn(tt, el, zone) {
            this.tt = tt;
            this.el = el;
            this.zone = zone;
        }
        TTEditableColumn.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                dom.DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
            }
        };
        TTEditableColumn.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.tt.editingCellClick = true;
                if (this.tt.editingCell) {
                    if (this.tt.editingCell !== this.el.nativeElement) {
                        if (!this.tt.isEditingCellValid()) {
                            return;
                        }
                        dom.DomHandler.removeClass(this.tt.editingCell, 'p-cell-editing');
                        this.openCell();
                    }
                }
                else {
                    this.openCell();
                }
            }
        };
        TTEditableColumn.prototype.openCell = function () {
            var _this = this;
            this.tt.updateEditingCell(this.el.nativeElement, this.data, this.field);
            dom.DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
            this.tt.onEditInit.emit({ field: this.field, data: this.data });
            this.tt.editingCellClick = true;
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    var focusable = dom.DomHandler.findSingle(_this.el.nativeElement, 'input, textarea');
                    if (focusable) {
                        focusable.focus();
                    }
                }, 50);
            });
        };
        TTEditableColumn.prototype.closeEditingCell = function () {
            dom.DomHandler.removeClass(this.tt.editingCell, 'p-checkbox-icon');
            this.tt.editingCell = null;
            this.tt.unbindDocumentEditListener();
        };
        TTEditableColumn.prototype.onKeyDown = function (event) {
            if (this.isEnabled()) {
                //enter
                if (event.keyCode == 13) {
                    if (this.tt.isEditingCellValid()) {
                        dom.DomHandler.removeClass(this.tt.editingCell, 'p-cell-editing');
                        this.closeEditingCell();
                        this.tt.onEditComplete.emit({ field: this.field, data: this.data });
                    }
                    event.preventDefault();
                }
                //escape
                else if (event.keyCode == 27) {
                    if (this.tt.isEditingCellValid()) {
                        dom.DomHandler.removeClass(this.tt.editingCell, 'p-cell-editing');
                        this.closeEditingCell();
                        this.tt.onEditCancel.emit({ field: this.field, data: this.data });
                    }
                    event.preventDefault();
                }
                //tab
                else if (event.keyCode == 9) {
                    this.tt.onEditComplete.emit({ field: this.field, data: this.data });
                    if (event.shiftKey)
                        this.moveToPreviousCell(event);
                    else
                        this.moveToNextCell(event);
                }
            }
        };
        TTEditableColumn.prototype.findCell = function (element) {
            if (element) {
                var cell = element;
                while (cell && !dom.DomHandler.hasClass(cell, 'p-cell-editing')) {
                    cell = cell.parentElement;
                }
                return cell;
            }
            else {
                return null;
            }
        };
        TTEditableColumn.prototype.moveToPreviousCell = function (event) {
            var currentCell = this.findCell(event.target);
            var row = currentCell.parentElement;
            var targetCell = this.findPreviousEditableColumn(currentCell);
            if (targetCell) {
                dom.DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        };
        TTEditableColumn.prototype.moveToNextCell = function (event) {
            var currentCell = this.findCell(event.target);
            var row = currentCell.parentElement;
            var targetCell = this.findNextEditableColumn(currentCell);
            if (targetCell) {
                dom.DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        };
        TTEditableColumn.prototype.findPreviousEditableColumn = function (cell) {
            var prevCell = cell.previousElementSibling;
            if (!prevCell) {
                var previousRow = cell.parentElement ? cell.parentElement.previousElementSibling : null;
                if (previousRow) {
                    prevCell = previousRow.lastElementChild;
                }
            }
            if (prevCell) {
                if (dom.DomHandler.hasClass(prevCell, 'p-editable-column'))
                    return prevCell;
                else
                    return this.findPreviousEditableColumn(prevCell);
            }
            else {
                return null;
            }
        };
        TTEditableColumn.prototype.findNextEditableColumn = function (cell) {
            var nextCell = cell.nextElementSibling;
            if (!nextCell) {
                var nextRow = cell.parentElement ? cell.parentElement.nextElementSibling : null;
                if (nextRow) {
                    nextCell = nextRow.firstElementChild;
                }
            }
            if (nextCell) {
                if (dom.DomHandler.hasClass(nextCell, 'p-editable-column'))
                    return nextCell;
                else
                    return this.findNextEditableColumn(nextCell);
            }
            else {
                return null;
            }
        };
        TTEditableColumn.prototype.isEnabled = function () {
            return this.ttEditableColumnDisabled !== true;
        };
        return TTEditableColumn;
    }());
    TTEditableColumn.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttEditableColumn]'
                },] }
    ];
    TTEditableColumn.ctorParameters = function () { return [
        { type: TreeTable },
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    TTEditableColumn.propDecorators = {
        data: [{ type: core.Input, args: ["ttEditableColumn",] }],
        field: [{ type: core.Input, args: ["ttEditableColumnField",] }],
        ttEditableColumnDisabled: [{ type: core.Input }],
        onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }],
        onKeyDown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
    };
    var TreeTableCellEditor = /** @class */ (function () {
        function TreeTableCellEditor(tt, editableColumn) {
            this.tt = tt;
            this.editableColumn = editableColumn;
        }
        TreeTableCellEditor.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'input':
                        _this.inputTemplate = item.template;
                        break;
                    case 'output':
                        _this.outputTemplate = item.template;
                        break;
                }
            });
        };
        return TreeTableCellEditor;
    }());
    TreeTableCellEditor.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-treeTableCellEditor',
                    template: "\n        <ng-container *ngIf=\"tt.editingCell === editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!tt.editingCell || tt.editingCell !== editableColumn.el.nativeElement\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    TreeTableCellEditor.ctorParameters = function () { return [
        { type: TreeTable },
        { type: TTEditableColumn }
    ]; };
    TreeTableCellEditor.propDecorators = {
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }]
    };
    var TTRow = /** @class */ (function () {
        function TTRow(tt, el, zone) {
            this.tt = tt;
            this.el = el;
            this.zone = zone;
        }
        TTRow.prototype.onKeyDown = function (event) {
            switch (event.which) {
                //down arrow
                case 40:
                    var nextRow = this.el.nativeElement.nextElementSibling;
                    if (nextRow) {
                        nextRow.focus();
                    }
                    event.preventDefault();
                    break;
                //down arrow
                case 38:
                    var prevRow = this.el.nativeElement.previousElementSibling;
                    if (prevRow) {
                        prevRow.focus();
                    }
                    event.preventDefault();
                    break;
                //left arrow
                case 37:
                    if (this.rowNode.node.expanded) {
                        this.tt.toggleRowIndex = dom.DomHandler.index(this.el.nativeElement);
                        this.rowNode.node.expanded = false;
                        this.tt.onNodeCollapse.emit({
                            originalEvent: event,
                            node: this.rowNode.node
                        });
                        this.tt.updateSerializedValue();
                        this.tt.tableService.onUIUpdate(this.tt.value);
                        this.restoreFocus();
                    }
                    break;
                //right arrow
                case 39:
                    if (!this.rowNode.node.expanded) {
                        this.tt.toggleRowIndex = dom.DomHandler.index(this.el.nativeElement);
                        this.rowNode.node.expanded = true;
                        this.tt.onNodeExpand.emit({
                            originalEvent: event,
                            node: this.rowNode.node
                        });
                        this.tt.updateSerializedValue();
                        this.tt.tableService.onUIUpdate(this.tt.value);
                        this.restoreFocus();
                    }
                    break;
            }
        };
        TTRow.prototype.restoreFocus = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    var row = dom.DomHandler.findSingle(_this.tt.containerViewChild.nativeElement, '.p-treetable-tbody').children[_this.tt.toggleRowIndex];
                    if (row) {
                        row.focus();
                    }
                }, 25);
            });
        };
        return TTRow;
    }());
    TTRow.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ttRow]',
                    host: {
                        '[attr.tabindex]': '"0"'
                    }
                },] }
    ];
    TTRow.ctorParameters = function () { return [
        { type: TreeTable },
        { type: core.ElementRef },
        { type: core.NgZone }
    ]; };
    TTRow.propDecorators = {
        rowNode: [{ type: core.Input, args: ['ttRow',] }],
        onKeyDown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
    };
    var TreeTableToggler = /** @class */ (function () {
        function TreeTableToggler(tt) {
            this.tt = tt;
        }
        TreeTableToggler.prototype.onClick = function (event) {
            this.rowNode.node.expanded = !this.rowNode.node.expanded;
            if (this.rowNode.node.expanded) {
                this.tt.onNodeExpand.emit({
                    originalEvent: event,
                    node: this.rowNode.node
                });
            }
            else {
                this.tt.onNodeCollapse.emit({
                    originalEvent: event,
                    node: this.rowNode.node
                });
            }
            this.tt.updateSerializedValue();
            this.tt.tableService.onUIUpdate(this.tt.value);
            event.preventDefault();
        };
        return TreeTableToggler;
    }());
    TreeTableToggler.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-treeTableToggler',
                    template: "\n        <button type=\"button\" class=\"p-treetable-toggler p-link\" (click)=\"onClick($event)\" tabindex=\"-1\" pRipple\n            [style.visibility]=\"rowNode.node.leaf === false || (rowNode.node.children && rowNode.node.children.length) ? 'visible' : 'hidden'\" [style.marginLeft]=\"rowNode.level * 16 + 'px'\">\n            <i [ngClass]=\"rowNode.node.expanded ? 'pi pi-fw pi-chevron-down' : 'pi pi-fw pi-chevron-right'\"></i>\n        </button>\n    ",
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    TreeTableToggler.ctorParameters = function () { return [
        { type: TreeTable }
    ]; };
    TreeTableToggler.propDecorators = {
        rowNode: [{ type: core.Input }]
    };
    var TreeTableModule = /** @class */ (function () {
        function TreeTableModule() {
        }
        return TreeTableModule;
    }());
    TreeTableModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, paginator.PaginatorModule, scrolling.ScrollingModule, ripple.RippleModule],
                    exports: [TreeTable, api.SharedModule, TreeTableToggler, TTSortableColumn, TTSortIcon, TTResizableColumn, TTRow, TTReorderableColumn, TTSelectableRow, TTSelectableRowDblClick, TTContextMenuRow, TTCheckbox, TTHeaderCheckbox, TTEditableColumn, TreeTableCellEditor, scrolling.ScrollingModule],
                    declarations: [TreeTable, TreeTableToggler, TTScrollableView, TTBody, TTSortableColumn, TTSortIcon, TTResizableColumn, TTRow, TTReorderableColumn, TTSelectableRow, TTSelectableRowDblClick, TTContextMenuRow, TTCheckbox, TTHeaderCheckbox, TTEditableColumn, TreeTableCellEditor]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TTBody = TTBody;
    exports.TTCheckbox = TTCheckbox;
    exports.TTContextMenuRow = TTContextMenuRow;
    exports.TTEditableColumn = TTEditableColumn;
    exports.TTHeaderCheckbox = TTHeaderCheckbox;
    exports.TTReorderableColumn = TTReorderableColumn;
    exports.TTResizableColumn = TTResizableColumn;
    exports.TTRow = TTRow;
    exports.TTScrollableView = TTScrollableView;
    exports.TTSelectableRow = TTSelectableRow;
    exports.TTSelectableRowDblClick = TTSelectableRowDblClick;
    exports.TTSortIcon = TTSortIcon;
    exports.TTSortableColumn = TTSortableColumn;
    exports.TreeTable = TreeTable;
    exports.TreeTableCellEditor = TreeTableCellEditor;
    exports.TreeTableModule = TreeTableModule;
    exports.TreeTableService = TreeTableService;
    exports.TreeTableToggler = TreeTableToggler;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-treetable.umd.js.map
