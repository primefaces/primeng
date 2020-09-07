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
import {NgModule,Component,ElementRef,OnInit,OnDestroy,Input,forwardRef,Output,EventEmitter,ViewChild,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {InputTextModule} from 'primeng/inputtext';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const INPUTMASK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputMask),
  multi: true
};

@Component({
    selector: 'p-inputMask',
    template: `<input #input pInputText class="p-inputmask" [attr.id]="inputId" [attr.type]="type" [attr.name]="name" [ngStyle]="style" [ngClass]="styleClass" [attr.placeholder]="placeholder" [attr.title]="title"
        [attr.size]="size" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel" [attr.aria-required]="ariaRequired" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
        (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onKeyDown($event)" (keypress)="onKeyPress($event)" [attr.autofocus]="autoFocus"
        (input)="onInputChange($event)" (paste)="handleInputChange($event)">`,
    host: {
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focused'
    },
    providers: [INPUTMASK_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class InputMask implements OnInit,OnDestroy,ControlValueAccessor {

    @Input() type: string = 'text';

    @Input() slotChar: string = '_';

    @Input() autoClear: boolean = true;

    @Input() style: any;

    @Input() inputId: string;

    @Input() styleClass: string;

    @Input() placeholder: string;

    @Input() size: number;

    @Input() maxlength: number;

    @Input() tabindex: string;

    @Input() title: string;

    @Input() ariaLabel: string;

    @Input() ariaRequired: boolean;

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() unmask: boolean;

    @Input() name: string;

    @Input() required: boolean;

    @Input() characterPattern: string = '[A-Za-z]';

    @Input() autoFocus: boolean;

    @Input() autocomplete: string;

    @ViewChild('input', { static: true }) inputViewChild: ElementRef;

    @Output() onComplete: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onInput: EventEmitter<any> = new EventEmitter();

    value: any;

    _mask: string;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    input: HTMLInputElement;

    filled: boolean;

    defs: any;

    tests: any[];

    partialPosition: any;

    firstNonMaskPos: number;

    lastRequiredNonMaskPos: any;

    len: number;

    oldVal: string;

    buffer: any;

    defaultBuffer: string;

    focusText: string;

    caretTimeoutId: any;

    androidChrome: boolean;

    focused: boolean;

    constructor(public el: ElementRef, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        let ua = DomHandler.getUserAgent();
        this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);

        this.initMask();
    }

    @Input() get mask(): string {
        return this._mask;
    }

    set mask(val:string) {
        this._mask = val;

        this.initMask();
        this.writeValue('');
        this.onModelChange(this.value);
    }

    initMask() {
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };

        let maskTokens = this.mask.split('');
        for(let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
				this.len--;
				this.partialPosition = i;
			}
            else if (this.defs[c]) {
				this.tests.push(new RegExp(this.defs[c]));
				if (this.firstNonMaskPos === null) {
	                this.firstNonMaskPos = this.tests.length - 1;
				}
                if (i < this.partialPosition){
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
			}
            else {
				this.tests.push(null);
			}
        }

        this.buffer = [];
        for(let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }

    writeValue(value: any) : void {
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
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }

    caret(first?: number, last?: number) {
        let range, begin, end;

        if (!this.inputViewChild.nativeElement.offsetParent||this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
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

    		return {begin: begin, end: end};
        }
    }

    isCompleted(): boolean {
        let completed: boolean;
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }

        return true;
    }

    getPlaceholder(i: number) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }

    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos]);
        return pos;
    }

    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos]);
        return pos;
    }

    shiftL(begin:number,end:number) {
        let i, j;

        if (begin<0) {
            return;
        }

        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                } else {
                    break;
                }

                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }

    shiftR(pos) {
        let i, c, j, t;

        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                } else {
                    break;
                }
            }
        }
    }

    handleAndroidInput(e) {
        var curVal = this.inputViewChild.nativeElement.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length ) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin-1])
                  pos.begin--;
            if (pos.begin === 0)
            {
               while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                  pos.begin++;
            }

            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
        else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                pos.begin++;

            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
    }

    onInputBlur(e) {
        this.focused = false;
        this.onModelTouched();
        this.checkVal();
        this.updateFilledState();
        this.onBlur.emit(e);

        if (this.inputViewChild.nativeElement.value != this.focusText || this.inputViewChild.nativeElement.value != this.value) {
            this.updateModel(e);
            let event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.inputViewChild.nativeElement.dispatchEvent(event);
        }
    }

    onKeyDown(e) {
        if (this.readonly) {
            return;
        }

        let k = e.which||e.keyCode,
            pos,
            begin,
            end;
        let iPhone = /iphone/i.test(DomHandler.getUserAgent());
        this.oldVal = this.inputViewChild.nativeElement.value;

        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;

            if (end - begin === 0) {
                begin=k!==46?this.seekPrev(begin):(end=this.seekNext(begin-1));
                end=k===46?this.seekNext(end):end;
            }

            this.clearBuffer(begin, end);
			this.shiftL(begin, end - 1);
            this.updateModel(e);
            this.onInput.emit(e);

            e.preventDefault();
        }
        else if ( k === 13 ) { // enter
            this.onInputBlur(e);
            this.updateModel(e);
        }
        else if (k === 27) { // escape
            this.inputViewChild.nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);

            e.preventDefault();
        }
    }

    onKeyPress(e) {
        if (this.readonly){
            return;
        }

        var k = e.which || e.keyCode,
            pos = this.caret(),
            p,
            c,
            next,
            completed;

        if (e.ctrlKey || e.altKey || e.metaKey || k < 32  || (k > 34 && k < 41)) {//Ignore
            return;
        } else if ( k && k !== 13 ) {
            if (pos.end - pos.begin !== 0){
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end-1);
            }

            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);

                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);

                    if (/android/i.test(DomHandler.getUserAgent())) {
                        //Path for CSP Violation on FireFox OS 1.1
                        let proxy = () => {
                            this.caret(next);
                        };

                        setTimeout(proxy,0);
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
    }

    clearBuffer(start, end) {
        let i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    }

    writeBuffer() {
        this.inputViewChild.nativeElement.value = this.buffer.join('');
    }

    checkVal(allow?: boolean) {
        //try to place characters where they belong
        let test = this.inputViewChild.nativeElement.value,
            lastMatch = -1,
            i,
            c,
            pos;

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
            } else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if ( i < this.partialPosition){
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        } else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild.nativeElement.value) this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len);
            } else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        } else {
            this.writeBuffer();
            this.inputViewChild.nativeElement.value = this.inputViewChild.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }

    onInputFocus(event) {
        if (this.readonly){
            return;
        }

        this.focused = true;

        clearTimeout(this.caretTimeoutId);
        let pos;

        this.focusText = this.inputViewChild.nativeElement.value;

        pos = this.checkVal();

        this.caretTimeoutId = setTimeout(() => {
            if (this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement){
                return;
            }
            this.writeBuffer();
            if (pos == this.mask.replace("?","").length) {
                this.caret(0, pos);
            } else {
                this.caret(pos);
            }
        }, 10);

        this.onFocus.emit(event);
    }

    onInputChange(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);

        this.onInput.emit(event);
    }

    handleInputChange(event) {
        if (this.readonly){
            return;
        }

        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.isCompleted()) {
                this.onComplete.emit();
            }
        }, 0);
    }

    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for(let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }

        return unmaskedBuffer.join('');
    }

    updateModel(e) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.onModelChange(this.value);
        }
    }

    updateFilledState() {
        this.filled = this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
    }

    focus() {
        this.inputViewChild.nativeElement.focus();
    }

    ngOnDestroy() {

    }
}

@NgModule({
    imports: [CommonModule,InputTextModule],
    exports: [InputMask],
    declarations: [InputMask]
})
export class InputMaskModule { }
