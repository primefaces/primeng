"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var button_1 = require("../button/button");
var messages_1 = require("../messages/messages");
var progressbar_1 = require("../progressbar/progressbar");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var FileUpload = (function () {
    function FileUpload(domHandler, sanitizer, zone) {
        this.domHandler = domHandler;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.method = 'POST';
        this.invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
        this.invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
        this.invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
        this.invalidFileTypeMessageDetail = 'allowed file types: {0}.';
        this.previewWidth = 50;
        this.chooseLabel = 'Choose';
        this.uploadLabel = 'Upload';
        this.cancelLabel = 'Cancel';
        this.showUploadButton = true;
        this.showCancelButton = true;
        this.mode = 'advanced';
        this.onBeforeUpload = new core_1.EventEmitter();
        this.onBeforeSend = new core_1.EventEmitter();
        this.onUpload = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.onClear = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onProgress = new core_1.EventEmitter();
        this.uploadHandler = new core_1.EventEmitter();
        this.progress = 0;
    }
    FileUpload.prototype.ngOnInit = function () {
        this.files = [];
    };
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
    FileUpload.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.mode === 'advanced') {
            this.zone.runOutsideAngular(function () {
                _this.content.nativeElement.addEventListener('dragover', _this.onDragOver.bind(_this));
            });
        }
    };
    FileUpload.prototype.onFileSelect = function (event) {
        if (this.isIE11() && this.selfInputChange) {
            this.selfInputChange = false;
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
        this.onSelect.emit({ originalEvent: event, files: files });
        if (this.hasFiles() && this.auto) {
            this.upload();
        }
        this.clearInputElement();
    };
    FileUpload.prototype.isFileSelected = function (file) {
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var sFile = _a[_i];
            if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
                return true;
            }
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
        var acceptableTypes = this.accept.split(',');
        for (var _i = 0, acceptableTypes_1 = acceptableTypes; _i < acceptableTypes_1.length; _i++) {
            var type = acceptableTypes_1[_i];
            var acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                : file.type == type || this.getFileExtension(file) === type;
            if (acceptable) {
                return true;
            }
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
            this.uploadHandler.emit({
                files: this.files
            });
        }
        else {
            this.msgs = [];
            var xhr_1 = new XMLHttpRequest(), formData = new FormData();
            this.onBeforeUpload.emit({
                'xhr': xhr_1,
                'formData': formData
            });
            for (var i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }
            xhr_1.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    _this.progress = Math.round((e.loaded * 100) / e.total);
                }
                _this.onProgress.emit({ originalEvent: e, progress: _this.progress });
            }, false);
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState == 4) {
                    _this.progress = 0;
                    if (xhr_1.status >= 200 && xhr_1.status < 300)
                        _this.onUpload.emit({ xhr: xhr_1, files: _this.files });
                    else
                        _this.onError.emit({ xhr: xhr_1, files: _this.files });
                    _this.clear();
                }
            };
            xhr_1.open(this.method, this.url, true);
            this.onBeforeSend.emit({
                'xhr': xhr_1,
                'formData': formData
            });
            xhr_1.withCredentials = this.withCredentials;
            xhr_1.send(formData);
        }
    };
    FileUpload.prototype.clear = function () {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
    };
    FileUpload.prototype.remove = function (event, index) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
    };
    FileUpload.prototype.clearInputElement = function () {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            if (this.isIE11()) {
                this.selfInputChange = true; //IE11 fix to prevent onFileChange trigger again
            }
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
            this.domHandler.addClass(this.content.nativeElement, 'ui-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FileUpload.prototype.onDragLeave = function (event) {
        if (!this.disabled) {
            this.domHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
        }
    };
    FileUpload.prototype.onDrop = function (event) {
        if (!this.disabled) {
            this.domHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
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
        var k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    FileUpload.prototype.onSimpleUploaderClick = function (event) {
        if (this.hasFiles()) {
            this.upload();
        }
    };
    FileUpload.prototype.ngOnDestroy = function () {
        if (this.content && this.content.nativeElement) {
            this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
        }
    };
    return FileUpload;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "url", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "method", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "accept", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "auto", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "withCredentials", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FileUpload.prototype, "maxFileSize", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "invalidFileSizeMessageSummary", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "invalidFileSizeMessageDetail", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "invalidFileTypeMessageSummary", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "invalidFileTypeMessageDetail", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FileUpload.prototype, "previewWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "chooseLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "uploadLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "cancelLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "showUploadButton", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "showCancelButton", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileUpload.prototype, "mode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileUpload.prototype, "customUpload", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onBeforeUpload", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onBeforeSend", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onUpload", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onError", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onClear", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onRemove", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onSelect", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "onProgress", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileUpload.prototype, "uploadHandler", void 0);
__decorate([
    core_1.ContentChildren(shared_1.PrimeTemplate),
    __metadata("design:type", core_1.QueryList)
], FileUpload.prototype, "templates", void 0);
__decorate([
    core_1.ViewChild('advancedfileinput'),
    __metadata("design:type", core_1.ElementRef)
], FileUpload.prototype, "advancedFileInput", void 0);
__decorate([
    core_1.ViewChild('basicfileinput'),
    __metadata("design:type", core_1.ElementRef)
], FileUpload.prototype, "basicFileInput", void 0);
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", core_1.ElementRef)
], FileUpload.prototype, "content", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], FileUpload.prototype, "files", void 0);
FileUpload = __decorate([
    core_1.Component({
        selector: 'p-fileUpload',
        template: "\n        <div [ngClass]=\"'ui-fileupload ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"mode === 'advanced'\">\n            <div class=\"ui-fileupload-buttonbar ui-widget-header ui-corner-top\">\n                <span class=\"ui-fileupload-choose\" [label]=\"chooseLabel\" icon=\"fa-plus\" pButton  [ngClass]=\"{'ui-state-focus': focus}\" [attr.disabled]=\"disabled\" > \n                    <input #advancedfileinput type=\"file\" (change)=\"onFileSelect($event)\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n                </span>\n\n                <button *ngIf=\"!auto&&showUploadButton\" type=\"button\" [label]=\"uploadLabel\" icon=\"fa-upload\" pButton (click)=\"upload()\" [disabled]=\"!hasFiles()\"></button>\n                <button *ngIf=\"!auto&&showCancelButton\" type=\"button\" [label]=\"cancelLabel\" icon=\"fa-close\" pButton (click)=\"clear()\" [disabled]=\"!hasFiles()\"></button>\n            \n                <p-templateLoader [template]=\"toolbarTemplate\"></p-templateLoader>\n            </div>\n            <div #content [ngClass]=\"{'ui-fileupload-content ui-widget-content ui-corner-bottom':true}\" \n                (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragLeave($event)\" (drop)=\"onDrop($event)\">\n                <p-progressBar [value]=\"progress\" [showValue]=\"false\" *ngIf=\"hasFiles()\"></p-progressBar>\n                \n                <p-messages [value]=\"msgs\"></p-messages>\n                \n                <div class=\"ui-fileupload-files\" *ngIf=\"hasFiles()\">\n                    <div *ngIf=\"!fileTemplate\">\n                        <div class=\"ui-fileupload-row\" *ngFor=\"let file of files; let i = index;\">\n                            <div><img [src]=\"file.objectURL\" *ngIf=\"isImage(file)\" [width]=\"previewWidth\" /></div>\n                            <div>{{file.name}}</div>\n                            <div>{{formatSize(file.size)}}</div>\n                            <div><button type=\"button\" icon=\"fa-close\" pButton (click)=\"remove($event,i)\"></button></div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"fileTemplate\">\n                        <ng-template ngFor [ngForOf]=\"files\" [ngForTemplate]=\"fileTemplate\"></ng-template>\n                    </div>\n                </div>\n                <p-templateLoader [template]=\"contentTemplate\"></p-templateLoader>\n            </div>\n        </div>\n        <span class=\"ui-button ui-fileupload-choose ui-widget ui-state-default ui-corner-all ui-button-text-icon-left\" *ngIf=\"mode === 'basic'\" \n        (mouseup)=\"onSimpleUploaderClick($event)\"\n        [ngClass]=\"{'ui-fileupload-choose-selected': hasFiles(),'ui-state-focus': focus}\">\n            <span class=\"ui-button-icon-left fa\" [ngClass]=\"{'fa-plus': !hasFiles()||auto, 'fa-upload': hasFiles()&&!auto}\"></span>\n            <span class=\"ui-button-text ui-clickable\">{{auto ? chooseLabel : hasFiles() ? files[0].name : chooseLabel}}</span>\n            <input #basicfileinput type=\"file\" [accept]=\"accept\" [multiple]=\"multiple\" [disabled]=\"disabled\"\n                (change)=\"onFileSelect($event)\" *ngIf=\"!hasFiles()\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n        </span>\n    ",
        providers: [domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [domhandler_1.DomHandler, platform_browser_1.DomSanitizer, core_1.NgZone])
], FileUpload);
exports.FileUpload = FileUpload;
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    return FileUploadModule;
}());
FileUploadModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, shared_1.SharedModule, button_1.ButtonModule, progressbar_1.ProgressBarModule, messages_1.MessagesModule],
        exports: [FileUpload, shared_1.SharedModule, button_1.ButtonModule, progressbar_1.ProgressBarModule, messages_1.MessagesModule],
        declarations: [FileUpload]
    })
], FileUploadModule);
exports.FileUploadModule = FileUploadModule;
//# sourceMappingURL=fileupload.js.map