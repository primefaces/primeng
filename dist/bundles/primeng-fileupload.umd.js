(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/platform-browser'), require('primeng/button'), require('primeng/messages'), require('primeng/progressbar'), require('primeng/dom'), require('primeng/api'), require('primeng/ripple'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('primeng/fileupload', ['exports', '@angular/core', '@angular/common', '@angular/platform-browser', 'primeng/button', 'primeng/messages', 'primeng/progressbar', 'primeng/dom', 'primeng/api', 'primeng/ripple', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.fileupload = {}), global.ng.core, global.ng.common, global.ng.platformBrowser, global.primeng.button, global.primeng.messages, global.primeng.progressbar, global.primeng.dom, global.primeng.api, global.primeng.ripple, global.ng.common.http));
}(this, (function (exports, core, common, platformBrowser, button, messages, progressbar, dom, api, ripple, http) { 'use strict';

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

    var FileUpload = /** @class */ (function () {
        function FileUpload(el, sanitizer, zone, http, cd, config) {
            this.el = el;
            this.sanitizer = sanitizer;
            this.zone = zone;
            this.http = http;
            this.cd = cd;
            this.config = config;
            this.method = 'post';
            this.invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
            this.invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
            this.invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
            this.invalidFileTypeMessageDetail = 'allowed file types: {0}.';
            this.invalidFileLimitMessageDetail = 'limit is {0} at most.';
            this.invalidFileLimitMessageSummary = 'Maximum number of files exceeded, ';
            this.previewWidth = 50;
            this.chooseIcon = 'pi pi-plus';
            this.uploadIcon = 'pi pi-upload';
            this.cancelIcon = 'pi pi-times';
            this.showUploadButton = true;
            this.showCancelButton = true;
            this.mode = 'advanced';
            this.onBeforeUpload = new core.EventEmitter();
            this.onSend = new core.EventEmitter();
            this.onUpload = new core.EventEmitter();
            this.onError = new core.EventEmitter();
            this.onClear = new core.EventEmitter();
            this.onRemove = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this.onProgress = new core.EventEmitter();
            this.uploadHandler = new core.EventEmitter();
            this._files = [];
            this.progress = 0;
            this.uploadedFileCount = 0;
        }
        Object.defineProperty(FileUpload.prototype, "files", {
            get: function () {
                return this._files;
            },
            set: function (files) {
                this._files = [];
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (this.validate(file)) {
                        if (this.isImage(file)) {
                            file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                        }
                        this._files.push(files[i]);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        FileUpload.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'file':
                        _this.fileTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    case 'toolbar':
                        _this.toolbarTemplate = item.template;
                        break;
                    default:
                        _this.fileTemplate = item.template;
                        break;
                }
            });
        };
        FileUpload.prototype.ngOnInit = function () {
            var _this = this;
            this.translationSubscription = this.config.translationObserver.subscribe(function () {
                _this.cd.markForCheck();
            });
        };
        FileUpload.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.mode === 'advanced') {
                this.zone.runOutsideAngular(function () {
                    if (_this.content)
                        _this.content.nativeElement.addEventListener('dragover', _this.onDragOver.bind(_this));
                });
            }
        };
        FileUpload.prototype.choose = function () {
            this.advancedFileInput.nativeElement.click();
        };
        FileUpload.prototype.onFileSelect = function (event) {
            if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
                this.duplicateIEEvent = false;
                return;
            }
            this.msgs = [];
            if (!this.multiple) {
                this.files = [];
            }
            var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!this.isFileSelected(file)) {
                    if (this.validate(file)) {
                        if (this.isImage(file)) {
                            file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                        }
                        this.files.push(files[i]);
                    }
                }
            }
            this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });
            if (this.fileLimit && this.mode == "advanced") {
                this.checkFileLimit();
            }
            if (this.hasFiles() && this.auto && (!(this.mode === "advanced") || !this.isFileLimitExceeded())) {
                this.upload();
            }
            if (event.type !== 'drop' && this.isIE11()) {
                this.clearIEInput();
            }
            else {
                this.clearInputElement();
            }
        };
        FileUpload.prototype.isFileSelected = function (file) {
            var e_1, _a;
            try {
                for (var _b = __values(this.files), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var sFile = _c.value;
                    if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        FileUpload.prototype.isIE11 = function () {
            return !!window['MSInputMethodContext'] && !!document['documentMode'];
        };
        FileUpload.prototype.validate = function (file) {
            if (this.accept && !this.isFileTypeValid(file)) {
                this.msgs.push({
                    severity: 'error',
                    summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                    detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
                });
                return false;
            }
            if (this.maxFileSize && file.size > this.maxFileSize) {
                this.msgs.push({
                    severity: 'error',
                    summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                    detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
                });
                return false;
            }
            return true;
        };
        FileUpload.prototype.isFileTypeValid = function (file) {
            var e_2, _a;
            var acceptableTypes = this.accept.split(',').map(function (type) { return type.trim(); });
            try {
                for (var acceptableTypes_1 = __values(acceptableTypes), acceptableTypes_1_1 = acceptableTypes_1.next(); !acceptableTypes_1_1.done; acceptableTypes_1_1 = acceptableTypes_1.next()) {
                    var type = acceptableTypes_1_1.value;
                    var acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                        : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
                    if (acceptable) {
                        return true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (acceptableTypes_1_1 && !acceptableTypes_1_1.done && (_a = acceptableTypes_1.return)) _a.call(acceptableTypes_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        };
        FileUpload.prototype.getTypeClass = function (fileType) {
            return fileType.substring(0, fileType.indexOf('/'));
        };
        FileUpload.prototype.isWildcard = function (fileType) {
            return fileType.indexOf('*') !== -1;
        };
        FileUpload.prototype.getFileExtension = function (file) {
            return '.' + file.name.split('.').pop();
        };
        FileUpload.prototype.isImage = function (file) {
            return /^image\//.test(file.type);
        };
        FileUpload.prototype.onImageLoad = function (img) {
            window.URL.revokeObjectURL(img.src);
        };
        FileUpload.prototype.upload = function () {
            var _this = this;
            if (this.customUpload) {
                if (this.fileLimit) {
                    this.uploadedFileCount += this.files.length;
                }
                this.uploadHandler.emit({
                    files: this.files
                });
                this.cd.markForCheck();
            }
            else {
                this.uploading = true;
                this.msgs = [];
                var formData_1 = new FormData();
                this.onBeforeUpload.emit({
                    'formData': formData_1
                });
                for (var i = 0; i < this.files.length; i++) {
                    formData_1.append(this.name, this.files[i], this.files[i].name);
                }
                this.http[this.method](this.url, formData_1, {
                    headers: this.headers, reportProgress: true, observe: 'events', withCredentials: this.withCredentials
                }).subscribe(function (event) {
                    switch (event.type) {
                        case http.HttpEventType.Sent:
                            _this.onSend.emit({
                                originalEvent: event,
                                'formData': formData_1
                            });
                            break;
                        case http.HttpEventType.Response:
                            _this.uploading = false;
                            _this.progress = 0;
                            if (event['status'] >= 200 && event['status'] < 300) {
                                if (_this.fileLimit) {
                                    _this.uploadedFileCount += _this.files.length;
                                }
                                _this.onUpload.emit({ originalEvent: event, files: _this.files });
                            }
                            else {
                                _this.onError.emit({ files: _this.files });
                            }
                            _this.clear();
                            break;
                        case http.HttpEventType.UploadProgress: {
                            if (event['loaded']) {
                                _this.progress = Math.round((event['loaded'] * 100) / event['total']);
                            }
                            _this.onProgress.emit({ originalEvent: event, progress: _this.progress });
                            break;
                        }
                    }
                    _this.cd.markForCheck();
                }, function (error) {
                    _this.uploading = false;
                    _this.onError.emit({ files: _this.files, error: error });
                });
            }
        };
        FileUpload.prototype.clear = function () {
            this.files = [];
            this.onClear.emit();
            this.clearInputElement();
            this.cd.markForCheck();
        };
        FileUpload.prototype.remove = function (event, index) {
            this.clearInputElement();
            this.onRemove.emit({ originalEvent: event, file: this.files[index] });
            this.files.splice(index, 1);
        };
        FileUpload.prototype.isFileLimitExceeded = function () {
            if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focus) {
                this.focus = false;
            }
            return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
        };
        FileUpload.prototype.isChooseDisabled = function () {
            return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
        };
        FileUpload.prototype.checkFileLimit = function () {
            if (this.isFileLimitExceeded()) {
                this.msgs.push({
                    severity: 'error',
                    summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                    detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
                });
            }
        };
        FileUpload.prototype.clearInputElement = function () {
            if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
                this.advancedFileInput.nativeElement.value = '';
            }
            if (this.basicFileInput && this.basicFileInput.nativeElement) {
                this.basicFileInput.nativeElement.value = '';
            }
        };
        FileUpload.prototype.clearIEInput = function () {
            if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
                this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
                this.advancedFileInput.nativeElement.value = '';
            }
        };
        FileUpload.prototype.hasFiles = function () {
            return this.files && this.files.length > 0;
        };
        FileUpload.prototype.onDragEnter = function (e) {
            if (!this.disabled) {
                e.stopPropagation();
                e.preventDefault();
            }
        };
        FileUpload.prototype.onDragOver = function (e) {
            if (!this.disabled) {
                dom.DomHandler.addClass(this.content.nativeElement, 'p-fileupload-highlight');
                this.dragHighlight = true;
                e.stopPropagation();
                e.preventDefault();
            }
        };
        FileUpload.prototype.onDragLeave = function (event) {
            if (!this.disabled) {
                dom.DomHandler.removeClass(this.content.nativeElement, 'p-fileupload-highlight');
            }
        };
        FileUpload.prototype.onDrop = function (event) {
            if (!this.disabled) {
                dom.DomHandler.removeClass(this.content.nativeElement, 'p-fileupload-highlight');
                event.stopPropagation();
                event.preventDefault();
                var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
                var allowDrop = this.multiple || (files && files.length === 1);
                if (allowDrop) {
                    this.onFileSelect(event);
                }
            }
        };
        FileUpload.prototype.onFocus = function () {
            this.focus = true;
        };
        FileUpload.prototype.onBlur = function () {
            this.focus = false;
        };
        FileUpload.prototype.formatSize = function (bytes) {
            if (bytes == 0) {
                return '0 B';
            }
            var k = 1024, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };
        FileUpload.prototype.onBasicUploaderClick = function () {
            if (this.hasFiles())
                this.upload();
            else
                this.basicFileInput.nativeElement.click();
        };
        FileUpload.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Object.defineProperty(FileUpload.prototype, "chooseButtonLabel", {
            get: function () {
                return this.chooseLabel || this.config.getTranslation(api.TranslationKeys.CHOOSE);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FileUpload.prototype, "uploadButtonLabel", {
            get: function () {
                return this.uploadLabel || this.config.getTranslation(api.TranslationKeys.UPLOAD);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FileUpload.prototype, "cancelButtonLabel", {
            get: function () {
                return this.cancelLabel || this.config.getTranslation(api.TranslationKeys.CANCEL);
            },
            enumerable: false,
            configurable: true
        });
        FileUpload.prototype.ngOnDestroy = function () {
            if (this.content && this.content.nativeElement) {
                this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
            }
            if (this.translationSubscription) {
                this.translationSubscription.unsubscribe();
            }
        };
        return FileUpload;
    }());
    FileUpload.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-fileUpload',
                    template: "\n        <div [ngClass]=\"'p-fileupload p-fileupload-advanced p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"mode === 'advanced'\">\n            <div class=\"p-fileupload-buttonbar\">\n                <span class=\"p-button p-component p-fileupload-choose\" [ngClass]=\"{'p-focus': focus, 'p-disabled':disabled || isChooseDisabled()}\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" pRipple\n                    (click)=\"choose()\" (keydown.enter)=\"choose()\" tabindex=\"0\"> \n                    <input #advancedfileinput type=\"file\" (change)=\"onFileSelect($event)\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled || isChooseDisabled()\" [attr.title]=\"''\">\n                    <span [ngClass]=\"'p-button-icon p-button-icon-left'\" [class]=\"chooseIcon\"></span>\n                    <span class=\"p-button-label\">{{chooseButtonLabel}}</span>\n                </span>\n\n                <p-button *ngIf=\"!auto&&showUploadButton\" type=\"button\" [label]=\"uploadButtonLabel\" [icon]=\"uploadIcon\" (onClick)=\"upload()\" [disabled]=\"!hasFiles() || isFileLimitExceeded()\"></p-button>\n                <p-button *ngIf=\"!auto&&showCancelButton\" type=\"button\" [label]=\"cancelButtonLabel\" [icon]=\"cancelIcon\" (onClick)=\"clear()\" [disabled]=\"!hasFiles() ||\u00A0uploading\"></p-button>\n\n                <ng-container *ngTemplateOutlet=\"toolbarTemplate\"></ng-container>\n            </div>\n            <div #content class=\"p-fileupload-content\" (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragLeave($event)\" (drop)=\"onDrop($event)\">\n                <p-progressBar [value]=\"progress\" [showValue]=\"false\" *ngIf=\"hasFiles()\"></p-progressBar>\n\n                <p-messages [value]=\"msgs\" [enableService]=\"false\"></p-messages>\n\n                <div class=\"p-fileupload-files\" *ngIf=\"hasFiles()\">\n                    <div *ngIf=\"!fileTemplate\">\n                        <div class=\"p-fileupload-row\" *ngFor=\"let file of files; let i = index;\">\n                            <div><img [src]=\"file.objectURL\" *ngIf=\"isImage(file)\" [width]=\"previewWidth\" /></div>\n                            <div>{{file.name}}</div>\n                            <div>{{formatSize(file.size)}}</div>\n                            <div>\n                                <button type=\"button\" icon=\"pi pi-times\" pButton (click)=\"remove($event,i)\" [disabled]=\"uploading\"></button>\n                            </div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"fileTemplate\">\n                        <ng-template ngFor [ngForOf]=\"files\" [ngForTemplate]=\"fileTemplate\"></ng-template>\n                    </div>\n                </div>\n                <ng-container *ngTemplateOutlet=\"contentTemplate; context: {$implicit: files}\"></ng-container>\n            </div>\n        </div>\n        <div class=\"p-fileupload p-fileupload-basic p-component\" *ngIf=\"mode === 'basic'\">\n            <p-messages [value]=\"msgs\" [enableService]=\"false\"></p-messages>\n            <span [ngClass]=\"{'p-button p-component p-fileupload-choose': true, 'p-button-icon-only': !chooseLabel, 'p-fileupload-choose-selected': hasFiles(),'p-focus': focus, 'p-disabled':disabled}\"\n                [ngStyle]=\"style\" [class]=\"styleClass\" (mouseup)=\"onBasicUploaderClick()\" (keydown)=\"onBasicUploaderClick()\" tabindex=\"0\" pRipple>\n                <span class=\"p-button-icon p-button-icon-left pi\" [ngClass]=\"hasFiles()&&!auto ? uploadIcon : chooseIcon\"></span>\n                <span class=\"p-button-label\">{{auto ? chooseLabel : hasFiles() ? files[0].name : chooseLabel}}</span>\n                <input #basicfileinput type=\"file\" [accept]=\"accept\" [multiple]=\"multiple\" [disabled]=\"disabled\"\n                    (change)=\"onFileSelect($event)\" *ngIf=\"!hasFiles()\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n            </span>\n        </div>\n    ",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".p-fileupload-content{position:relative}.p-fileupload-row{align-items:center;display:flex}.p-fileupload-row>div{flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{left:0;position:absolute;top:0;width:100%}.p-button.p-fileupload-choose{overflow:hidden;position:relative}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}"]
                },] }
    ];
    FileUpload.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: platformBrowser.DomSanitizer },
        { type: core.NgZone },
        { type: http.HttpClient },
        { type: core.ChangeDetectorRef },
        { type: api.PrimeNGConfig }
    ]; };
    FileUpload.propDecorators = {
        name: [{ type: core.Input }],
        url: [{ type: core.Input }],
        method: [{ type: core.Input }],
        multiple: [{ type: core.Input }],
        accept: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        auto: [{ type: core.Input }],
        withCredentials: [{ type: core.Input }],
        maxFileSize: [{ type: core.Input }],
        invalidFileSizeMessageSummary: [{ type: core.Input }],
        invalidFileSizeMessageDetail: [{ type: core.Input }],
        invalidFileTypeMessageSummary: [{ type: core.Input }],
        invalidFileTypeMessageDetail: [{ type: core.Input }],
        invalidFileLimitMessageDetail: [{ type: core.Input }],
        invalidFileLimitMessageSummary: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        previewWidth: [{ type: core.Input }],
        chooseLabel: [{ type: core.Input }],
        uploadLabel: [{ type: core.Input }],
        cancelLabel: [{ type: core.Input }],
        chooseIcon: [{ type: core.Input }],
        uploadIcon: [{ type: core.Input }],
        cancelIcon: [{ type: core.Input }],
        showUploadButton: [{ type: core.Input }],
        showCancelButton: [{ type: core.Input }],
        mode: [{ type: core.Input }],
        headers: [{ type: core.Input }],
        customUpload: [{ type: core.Input }],
        fileLimit: [{ type: core.Input }],
        onBeforeUpload: [{ type: core.Output }],
        onSend: [{ type: core.Output }],
        onUpload: [{ type: core.Output }],
        onError: [{ type: core.Output }],
        onClear: [{ type: core.Output }],
        onRemove: [{ type: core.Output }],
        onSelect: [{ type: core.Output }],
        onProgress: [{ type: core.Output }],
        uploadHandler: [{ type: core.Output }],
        templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
        advancedFileInput: [{ type: core.ViewChild, args: ['advancedfileinput',] }],
        basicFileInput: [{ type: core.ViewChild, args: ['basicfileinput',] }],
        content: [{ type: core.ViewChild, args: ['content',] }],
        files: [{ type: core.Input }]
    };
    var FileUploadModule = /** @class */ (function () {
        function FileUploadModule() {
        }
        return FileUploadModule;
    }());
    FileUploadModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, api.SharedModule, button.ButtonModule, progressbar.ProgressBarModule, messages.MessagesModule, ripple.RippleModule],
                    exports: [FileUpload, api.SharedModule, button.ButtonModule, progressbar.ProgressBarModule, messages.MessagesModule],
                    declarations: [FileUpload]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FileUpload = FileUpload;
    exports.FileUploadModule = FileUploadModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-fileupload.umd.js.map
