(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/inputtext'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/inputmask', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/inputtext', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputmask = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.inputtext, global.ng.forms));
}(this, (function (exports, core, common, dom, inputtext, forms) { 'use strict';

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
    var INPUTMASK_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return InputMask; }),
        multi: true
    };
    var InputMask = /** @class */ (function () {
        function InputMask(el, cd) {
            this.el = el;
            this.cd = cd;
            this.type = 'text';
            this.slotChar = '_';
            this.autoClear = true;
            this.characterPattern = '[A-Za-z]';
            this.onComplete = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onInput = new core.EventEmitter();
            this.onKeydown = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        InputMask.prototype.ngOnInit = function () {
            var ua = dom.DomHandler.getUserAgent();
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
            enumerable: false,
            configurable: true
        });
        InputMask.prototype.initMask = function () {
            this.tests = [];
            this.partialPosition = this.mask.length;
            this.len = this.mask.length;
            this.firstNonMaskPos = null;
            this.defs = {
                '9': '[0-9]',
                'a': this.characterPattern,
                '*': this.characterPattern + "|[0-9]"
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
            if (this.inputViewChild && this.inputViewChild.nativeElement) {
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
            this.cd.markForCheck();
        };
        InputMask.prototype.caret = function (first, last) {
            var range, begin, end;
            if (!this.inputViewChild.nativeElement.offsetParent || this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
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
                setTimeout(function () {
                    _this.caret(pos.begin, pos.begin);
                    _this.updateModel(e);
                    if (_this.isCompleted()) {
                        _this.onComplete.emit();
                    }
                }, 0);
            }
            else {
                this.checkVal(true);
                while (pos.begin < this.len && !this.tests[pos.begin])
                    pos.begin++;
                setTimeout(function () {
                    _this.caret(pos.begin, pos.begin);
                    _this.updateModel(e);
                    if (_this.isCompleted()) {
                        _this.onComplete.emit();
                    }
                }, 0);
            }
        };
        InputMask.prototype.onInputBlur = function (e) {
            this.focused = false;
            this.onModelTouched();
            this.checkVal();
            this.updateFilledState();
            this.onBlur.emit(e);
            if (this.inputViewChild.nativeElement.value != this.focusText || this.inputViewChild.nativeElement.value != this.value) {
                this.updateModel(e);
                var event = document.createEvent('HTMLEvents');
                event.initEvent('change', true, false);
                this.inputViewChild.nativeElement.dispatchEvent(event);
            }
        };
        InputMask.prototype.onInputKeydown = function (e) {
            if (this.readonly) {
                return;
            }
            var k = e.which || e.keyCode, pos, begin, end;
            var iPhone = /iphone/i.test(dom.DomHandler.getUserAgent());
            this.oldVal = this.inputViewChild.nativeElement.value;
            this.onKeydown.emit(e);
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
                this.onInput.emit(e);
                e.preventDefault();
            }
            else if (k === 13) { // enter
                this.onInputBlur(e);
                this.updateModel(e);
            }
            else if (k === 27) { // escape
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
            if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || (k > 34 && k < 41)) { //Ignore
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
                        if (/android/i.test(dom.DomHandler.getUserAgent())) {
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
                        this.onInput.emit(e);
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
            this.focused = true;
            clearTimeout(this.caretTimeoutId);
            var pos;
            this.focusText = this.inputViewChild.nativeElement.value;
            pos = this.checkVal();
            this.caretTimeoutId = setTimeout(function () {
                if (_this.inputViewChild.nativeElement !== _this.inputViewChild.nativeElement.ownerDocument.activeElement) {
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
        InputMask.prototype.onInputChange = function (event) {
            if (this.androidChrome)
                this.handleAndroidInput(event);
            else
                this.handleInputChange(event);
            this.onInput.emit(event);
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
            var updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
            if (updatedValue !== null || updatedValue !== undefined) {
                this.value = updatedValue;
                this.onModelChange(this.value);
            }
        };
        InputMask.prototype.updateFilledState = function () {
            this.filled = this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
        };
        InputMask.prototype.focus = function () {
            this.inputViewChild.nativeElement.focus();
        };
        InputMask.prototype.ngOnDestroy = function () {
        };
        return InputMask;
    }());
    InputMask.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-inputMask',
                    template: "<input #input pInputText class=\"p-inputmask\" [attr.id]=\"inputId\" [attr.type]=\"type\" [attr.name]=\"name\" [ngStyle]=\"style\" [ngClass]=\"styleClass\" [attr.placeholder]=\"placeholder\" [attr.title]=\"title\"\n        [attr.size]=\"size\" [attr.autocomplete]=\"autocomplete\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.aria-label]=\"ariaLabel\" [attr.aria-required]=\"ariaRequired\" [disabled]=\"disabled\" [readonly]=\"readonly\" [attr.required]=\"required\"\n        (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (keydown)=\"onInputKeydown($event)\" (keypress)=\"onKeyPress($event)\" [attr.autofocus]=\"autoFocus\"\n        (input)=\"onInputChange($event)\" (paste)=\"handleInputChange($event)\">",
                    host: {
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused'
                    },
                    providers: [INPUTMASK_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] }
    ];
    InputMask.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    InputMask.propDecorators = {
        type: [{ type: core.Input }],
        slotChar: [{ type: core.Input }],
        autoClear: [{ type: core.Input }],
        style: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        size: [{ type: core.Input }],
        maxlength: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        title: [{ type: core.Input }],
        ariaLabel: [{ type: core.Input }],
        ariaRequired: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        unmask: [{ type: core.Input }],
        name: [{ type: core.Input }],
        required: [{ type: core.Input }],
        characterPattern: [{ type: core.Input }],
        autoFocus: [{ type: core.Input }],
        autocomplete: [{ type: core.Input }],
        inputViewChild: [{ type: core.ViewChild, args: ['input', { static: true },] }],
        onComplete: [{ type: core.Output }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }],
        onInput: [{ type: core.Output }],
        onKeydown: [{ type: core.Output }],
        mask: [{ type: core.Input }]
    };
    var InputMaskModule = /** @class */ (function () {
        function InputMaskModule() {
        }
        return InputMaskModule;
    }());
    InputMaskModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, inputtext.InputTextModule],
                    exports: [InputMask],
                    declarations: [InputMask]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.INPUTMASK_VALUE_ACCESSOR = INPUTMASK_VALUE_ACCESSOR;
    exports.InputMask = InputMask;
    exports.InputMaskModule = InputMaskModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputmask.umd.js.map
