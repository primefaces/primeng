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
/*
    Port of jQuery MaskedInput by DigitalBush as a Native Angular2 Component in Typescript without jQuery
    https://github.com/digitalBush/jquery.maskedinput/
    
    Copyright (c) 2007-2014 Josh Bush (digitalbush.com)

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var inputtext_1 = require("../inputtext/inputtext");
var forms_1 = require("@angular/forms");
exports.INPUTMASK_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputMask; }),
    multi: true
};
var InputMask = (function () {
    function InputMask(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.type = 'text';
        this.slotChar = '_';
        this.autoClear = true;
        this.onComplete = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    InputMask.prototype.ngOnInit = function () {
        var ua = this.domHandler.getUserAgent();
        this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        this.initMask();
    };
    Object.defineProperty(InputMask.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        set: function (val) {
            this._mask = val;
            this.initMask();
            this.writeValue('');
            this.onModelChange(this.value);
        },
        enumerable: true,
        configurable: true
    });
    InputMask.prototype.initMask = function () {
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': '[A-Za-z]',
            '*': '[A-Za-z0-9]'
        };
        var maskTokens = this.mask.split('');
        for (var i = 0; i < maskTokens.length; i++) {
            var c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }
        this.buffer = [];
        for (var i = 0; i < maskTokens.length; i++) {
            var c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    };
    InputMask.prototype.writeValue = function (value) {
        this.value = value;
        if (this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null)
                this.inputViewChild.nativeElement.value = '';
            else
                this.inputViewChild.nativeElement.value = this.value;
            this.checkVal();
            this.focusText = this.inputViewChild.nativeElement.value;
            this.updateFilledState();
        }
    };
    InputMask.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputMask.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputMask.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    InputMask.prototype.caret = function (first, last) {
        var range, begin, end;
        if (!this.inputViewChild.nativeElement.offsetParent || this.inputViewChild.nativeElement !== document.activeElement) {
            return;
        }
        if (typeof first == 'number') {
            begin = first;
            end = (typeof last === 'number') ? last : begin;
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                this.inputViewChild.nativeElement.setSelectionRange(begin, end);
            }
            else if (this.inputViewChild.nativeElement['createTextRange']) {
                range = this.inputViewChild.nativeElement['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                begin = this.inputViewChild.nativeElement.selectionStart;
                end = this.inputViewChild.nativeElement.selectionEnd;
            }
            else if (document['selection'] && document['selection'].createRange) {
                range = document['selection'].createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    };
    InputMask.prototype.isCompleted = function () {
        var completed;
        for (var i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }
        return true;
    };
    InputMask.prototype.getPlaceholder = function (i) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    };
    InputMask.prototype.seekNext = function (pos) {
        while (++pos < this.len && !this.tests[pos])
            ;
        return pos;
    };
    InputMask.prototype.seekPrev = function (pos) {
        while (--pos >= 0 && !this.tests[pos])
            ;
        return pos;
    };
    InputMask.prototype.shiftL = function (begin, end) {
        var i, j;
        if (begin < 0) {
            return;
        }
        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                }
                else {
                    break;
                }
                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    };
    InputMask.prototype.shiftR = function (pos) {
        var i, c, j, t;
        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                }
                else {
                    break;
                }
            }
        }
    };
    InputMask.prototype.handleAndroidInput = function (e) {
        var _this = this;
        var curVal = this.inputViewChild.nativeElement.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            this.caret(pos.begin, pos.begin);
        }
        else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin - 1])
                pos.begin++;
            setTimeout(function () { return _this.caret(pos.begin, pos.begin); });
        }
        if (this.isCompleted()) {
            this.onComplete.emit();
        }
    };
    InputMask.prototype.onInputBlur = function (e) {
        this.focus = false;
        this.onModelTouched();
        this.checkVal();
        this.updateModel(e);
        this.updateFilledState();
        this.onBlur.emit(e);
        if (this.inputViewChild.nativeElement.value != this.focusText) {
            var event_1 = document.createEvent('HTMLEvents');
            event_1.initEvent('change', true, false);
            this.inputViewChild.nativeElement.dispatchEvent(event_1);
        }
    };
    InputMask.prototype.onKeyDown = function (e) {
        if (this.readonly) {
            return;
        }
        var k = e.which || e.keyCode, pos, begin, end;
        var iPhone = /iphone/i.test(this.domHandler.getUserAgent());
        this.oldVal = this.inputViewChild.nativeElement.value;
        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;
            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }
            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);
            this.updateModel(e);
            e.preventDefault();
        }
        else if (k === 13) {
            this.onInputBlur(e);
            this.updateModel(e);
        }
        else if (k === 27) {
            this.inputViewChild.nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            e.preventDefault();
        }
    };
    InputMask.prototype.onKeyPress = function (e) {
        var _this = this;
        if (this.readonly) {
            return;
        }
        var k = e.which || e.keyCode, pos = this.caret(), p, c, next, completed;
        if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
            return;
        }
        else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }
            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);
                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);
                    if (/android/i.test(this.domHandler.getUserAgent())) {
                        //Path for CSP Violation on FireFox OS 1.1
                        var proxy = function () {
                            _this.caret(next);
                        };
                        setTimeout(proxy, 0);
                    }
                    else {
                        this.caret(next);
                    }
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                }
            }
            e.preventDefault();
        }
        this.updateModel(e);
        this.updateFilledState();
        if (completed) {
            this.onComplete.emit();
        }
    };
    InputMask.prototype.clearBuffer = function (start, end) {
        var i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    };
    InputMask.prototype.writeBuffer = function () {
        this.inputViewChild.nativeElement.value = this.buffer.join('');
    };
    InputMask.prototype.checkVal = function (allow) {
        //try to place characters where they belong
        var test = this.inputViewChild.nativeElement.value, lastMatch = -1, i, c, pos;
        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            }
            else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        }
        else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild.nativeElement.value)
                    this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len);
            }
            else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        }
        else {
            this.writeBuffer();
            this.inputViewChild.nativeElement.value = this.inputViewChild.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    };
    InputMask.prototype.onInputFocus = function (event) {
        var _this = this;
        if (this.readonly) {
            return;
        }
        this.focus = true;
        clearTimeout(this.caretTimeoutId);
        var pos;
        this.focusText = this.inputViewChild.nativeElement.value;
        pos = this.checkVal();
        this.caretTimeoutId = setTimeout(function () {
            if (_this.inputViewChild.nativeElement !== document.activeElement) {
                return;
            }
            _this.writeBuffer();
            if (pos == _this.mask.replace("?", "").length) {
                _this.caret(0, pos);
            }
            else {
                _this.caret(pos);
            }
        }, 10);
        this.onFocus.emit(event);
    };
    InputMask.prototype.onInput = function (event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
    };
    InputMask.prototype.handleInputChange = function (event) {
        var _this = this;
        if (this.readonly) {
            return;
        }
        setTimeout(function () {
            var pos = _this.checkVal(true);
            _this.caret(pos);
            _this.updateModel(event);
            if (_this.isCompleted()) {
                _this.onComplete.emit();
            }
        }, 0);
    };
    InputMask.prototype.getUnmaskedValue = function () {
        var unmaskedBuffer = [];
        for (var i = 0; i < this.buffer.length; i++) {
            var c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }
        return unmaskedBuffer.join('');
    };
    InputMask.prototype.updateModel = function (e) {
        this.onModelChange(this.unmask ? this.getUnmaskedValue() : e.target.value);
    };
    InputMask.prototype.updateFilledState = function () {
        this.filled = this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
    };
    InputMask.prototype.ngOnDestroy = function () {
    };
    return InputMask;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "slotChar", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputMask.prototype, "autoClear", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "inputId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputMask.prototype, "size", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputMask.prototype, "maxlength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputMask.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputMask.prototype, "readonly", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputMask.prototype, "unmask", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputMask.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputMask.prototype, "required", void 0);
__decorate([
    core_1.ViewChild('input'),
    __metadata("design:type", core_1.ElementRef)
], InputMask.prototype, "inputViewChild", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputMask.prototype, "onComplete", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputMask.prototype, "onFocus", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputMask.prototype, "onBlur", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], InputMask.prototype, "mask", null);
InputMask = __decorate([
    core_1.Component({
        selector: 'p-inputMask',
        template: "<input #input pInputText [attr.id]=\"inputId\" [attr.type]=\"type\" [attr.name]=\"name\" [ngStyle]=\"style\" [ngClass]=\"styleClass\" [attr.placeholder]=\"placeholder\"\n        [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [disabled]=\"disabled\" [readonly]=\"readonly\" [attr.required]=\"required\"\n        (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (keydown)=\"onKeyDown($event)\" (keypress)=\"onKeyPress($event)\"\n        (input)=\"onInput($event)\" (paste)=\"handleInputChange($event)\">",
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focus'
        },
        providers: [exports.INPUTMASK_VALUE_ACCESSOR, domhandler_1.DomHandler]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler])
], InputMask);
exports.InputMask = InputMask;
var InputMaskModule = (function () {
    function InputMaskModule() {
    }
    return InputMaskModule;
}());
InputMaskModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, inputtext_1.InputTextModule],
        exports: [InputMask],
        declarations: [InputMask]
    })
], InputMaskModule);
exports.InputMaskModule = InputMaskModule;
//# sourceMappingURL=inputmask.js.map