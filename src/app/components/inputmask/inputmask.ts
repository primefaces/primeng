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
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    forwardRef,
    numberAttribute
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { DomHandler } from 'primeng/dom';
import { TimesIcon } from 'primeng/icons/times';
import { InputTextModule } from 'primeng/inputtext';
import { Nullable } from 'primeng/ts-helpers';
import { Caret } from './inputmask.interface';

export const INPUTMASK_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputMask),
    multi: true
};
/**
 * InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone.
 * @group Components
 */
@Component({
    selector: 'p-inputMask',
    template: `
        <input
            #input
            pInputText
            [class]="styleClass"
            [ngClass]="inputClass"
            [attr.id]="inputId"
            [attr.type]="type"
            [attr.name]="name"
            [ngStyle]="style"
            [attr.placeholder]="placeholder"
            [attr.title]="title"
            [attr.size]="size"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength"
            [attr.tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-required]="ariaRequired"
            [disabled]="disabled"
            [readonly]="readonly"
            [attr.required]="required"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onInputKeydown($event)"
            (keypress)="onKeyPress($event)"
            pAutoFocus
            [variant]="variant"
            [autofocus]="autofocus"
            (input)="onInputChange($event)"
            (paste)="handleInputChange($event)"
            [attr.data-pc-name]="'inputmask'"
            [attr.data-pc-section]="'root'"
        />
        <ng-container *ngIf="value != null && filled && showClear && !disabled">
            <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-inputmask-clear-icon'" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
            <span *ngIf="clearIconTemplate" class="p-inputmask-clear-icon" (click)="clear()" [attr.data-pc-section]="'clearIcon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
            </span>
        </ng-container>
    `,
    host: {
        class: 'p-element',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focused',
        '[class.p-inputmask-clearable]': 'showClear && !disabled'
    },
    providers: [INPUTMASK_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./inputmask.css']
})
export class InputMask implements OnInit, ControlValueAccessor {
    /**
     * HTML5 input type.
     * @group Props
     */
    @Input() type: string = 'text';
    /**
     * Placeholder character in mask, default is underscore.
     * @group Props
     */
    @Input() slotChar: string = '_';
    /**
     * Clears the incomplete value on blur.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoClear: boolean = true;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showClear: boolean = false;
    /**
     * Inline style of the input field.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Style class of the input field.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Advisory information to display on input.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Size of the input field.
     * @group Props
     */
    @Input({ transform: numberAttribute }) size: number | undefined;
    /**
     * Maximum number of character allows in the input field.
     * @group Props
     */
    @Input({ transform: numberAttribute }) maxlength: number | undefined;
    /**
     * Specifies tab order of the element.
     * @group Props
     */
    @Input() tabindex: string | undefined;
    /**
     * Title text of the input text.
     * @group Props
     */
    @Input() title: string | undefined;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Used to indicate that user input is required on an element before a form can be submitted.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) ariaRequired: boolean | undefined;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
    /**
     * Defines if ngModel sets the raw unmasked value to bound value or the formatted mask value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) unmask: boolean | undefined;
    /**
     * Name of the input field.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) required: boolean | undefined;
    /**
     * Regex pattern for alpha characters
     * @group Props
     */
    @Input() characterPattern: string = '[A-Za-z]';
    /**
     * When present, the input gets a focus automatically on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * When present, the input gets a focus automatically on load.
     * @group Props
     * @deprecated Use autofocus property instead.
     */
    @Input({ transform: booleanAttribute }) set autoFocus(value: boolean | undefined) {
        this.autofocus = value;
        console.warn('autoFocus is deprecated. Use autofocus property instead.');
    }
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() autocomplete: string | undefined;
    /**
     * When present, it specifies that whether to clean buffer value from model.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) keepBuffer: boolean = false;
    /**
     * Mask pattern.
     * @group Props
     */
    @Input() get mask(): string | undefined | null {
        return this._mask;
    }
    set mask(val: string | undefined | null) {
        this._mask = val;

        this.initMask();
        this.writeValue('');
        this.onModelChange(this.value);
    }
    /**
     * Callback to invoke when the mask is completed.
     * @group Emits
     */
    @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke on input.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onInput: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke on input key press.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onKeydown: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('input', { static: true }) inputViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    clearIconTemplate: Nullable<TemplateRef<any>>;

    value: Nullable<string>;

    _mask: Nullable<string>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    input: Nullable<HTMLInputElement>;

    filled: Nullable<boolean>;

    defs: Nullable<{ [klass: string]: any }>;

    tests: RegExp[] | any;

    partialPosition: Nullable<number>;

    firstNonMaskPos: Nullable<number>;

    lastRequiredNonMaskPos: Nullable<number>;

    len: Nullable<number>;

    oldVal: Nullable<string>;

    buffer: string[] | any;

    defaultBuffer: Nullable<string>;

    focusText: Nullable<string>;

    caretTimeoutId: any;

    androidChrome: boolean = true;

    focused: Nullable<boolean>;

    _variant: 'filled' | 'outlined' = 'outlined';

    get inputClass() {
        return {
            'p-inputmask': true
        };
    }

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, public el: ElementRef, public cd: ChangeDetectorRef, public config: PrimeNGConfig) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            let ua = navigator.userAgent;
            this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        }

        this.initMask();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
            }
        });
    }

    initMask() {
        this.tests = [];
        this.partialPosition = (this.mask as string).length;
        this.len = (this.mask as string).length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            a: this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };

        let maskTokens = (this.mask as string).split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            } else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            } else {
                this.tests.push(null);
            }
        }

        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c]) this.buffer.push(this.getPlaceholder(i));
                else this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }

    writeValue(value: any): void {
        this.value = value;

        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null) this.inputViewChild.nativeElement.value = '';
            else this.inputViewChild.nativeElement.value = this.value;

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

    caret(first?: number, last?: number): Caret | undefined {
        let range, begin, end;

        if (!this.inputViewChild?.nativeElement.offsetParent || this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
            return;
        }

        if (typeof first == 'number') {
            begin = first;
            end = typeof last === 'number' ? last : begin;
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                this.inputViewChild.nativeElement.setSelectionRange(begin, end);
            } else if (this.inputViewChild.nativeElement['createTextRange']) {
                range = this.inputViewChild.nativeElement['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        } else {
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                begin = this.inputViewChild.nativeElement.selectionStart;
                end = this.inputViewChild.nativeElement.selectionEnd;
            } else if ((this.document as any['selection']) && (this.document as any)['selection'].createRange) {
                range = (this.document as any['selection']).createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }

            return { begin: begin, end: end };
        }
    }

    isCompleted(): boolean {
        let completed: boolean;
        for (let i = this.firstNonMaskPos as number; i <= (this.lastRequiredNonMaskPos as number); i++) {
            if (this.tests[i] && (this.buffer as string[])[i] === this.getPlaceholder(i)) {
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

    seekNext(pos: number) {
        while (++pos < (this.len as number) && !this.tests[pos]);
        return pos;
    }

    seekPrev(pos: number) {
        while (--pos >= 0 && !this.tests[pos]);
        return pos;
    }

    shiftL(begin: number, end: number) {
        let i, j;

        if (begin < 0) {
            return;
        }

        for (i = begin, j = this.seekNext(end); i < (this.len as number); i++) {
            if (this.tests[i]) {
                if (j < (this.len as number) && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                } else {
                    break;
                }

                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos as number, begin));
    }

    shiftR(pos: number) {
        let i, c, j, t;

        for (i = pos, c = this.getPlaceholder(pos); i < (this.len as number); i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < (this.len as number) && this.tests[j].test(t)) {
                    c = t;
                } else {
                    break;
                }
            }
        }
    }

    handleAndroidInput(e: Event) {
        var curVal = this.inputViewChild?.nativeElement.value;
        var pos = this.caret() as Caret;
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1]) pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < (this.firstNonMaskPos as number) && !this.tests[pos.begin]) pos.begin++;
            }

            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        } else {
            this.checkVal(true);
            while (pos.begin < (this.len as number) && !this.tests[pos.begin]) pos.begin++;

            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
    }

    onInputBlur(e: Event) {
        this.focused = false;
        this.onModelTouched();
        if (!this.keepBuffer) {
            this.checkVal();
        }
        this.updateFilledState();
        this.onBlur.emit(e);

        if (this.inputViewChild?.nativeElement.value != this.focusText || this.inputViewChild?.nativeElement.value != this.value) {
            this.updateModel(e);
            let event = this.document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.inputViewChild?.nativeElement.dispatchEvent(event);
        }
    }

    onInputKeydown(e: KeyboardEvent) {
        if (this.readonly) {
            return;
        }

        let k = e.which || e.keyCode,
            pos,
            begin,
            end;
        let iPhone;
        if (isPlatformBrowser(this.platformId)) {
            iPhone = /iphone/i.test(DomHandler.getUserAgent());
        }
        this.oldVal = this.inputViewChild?.nativeElement.value;

        this.onKeydown.emit(e);

        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret() as Caret;
            begin = pos.begin;
            end = pos.end;

            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }

            this.clearBuffer(begin, end);
            if (this.keepBuffer) {
                this.shiftL(begin, end - 2);
            } else {
                this.shiftL(begin, end - 1);
            }
            this.updateModel(e);
            this.onInput.emit(e);

            e.preventDefault();
        } else if (k === 13) {
            // enter
            this.onInputBlur(e);
            this.updateModel(e);
        } else if (k === 27) {
            // escape
            (this.inputViewChild as ElementRef).nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);

            e.preventDefault();
        }
    }

    onKeyPress(e: KeyboardEvent) {
        if (this.readonly) {
            return;
        }

        var k = e.which || e.keyCode,
            pos = this.caret() as Caret,
            p: number,
            c: string,
            next: number,
            completed!: boolean;

        if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || (k > 34 && k < 41)) {
            //Ignore
            return;
        } else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }

            p = this.seekNext(pos.begin - 1);
            if (p < (this.len as number)) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);

                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);

                    if (DomHandler.isClient() && /android/i.test(DomHandler.getUserAgent())) {
                        let proxy = () => {
                            this.caret(next);
                        };

                        setTimeout(proxy, 0);
                    } else {
                        this.caret(next);
                    }

                    if (pos.begin <= (this.lastRequiredNonMaskPos as number)) {
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

    clearBuffer(start: number, end: number) {
        if (!this.keepBuffer) {
            let i;
            for (i = start; i < end && i < (this.len as number); i++) {
                if (this.tests[i]) {
                    this.buffer[i] = this.getPlaceholder(i);
                }
            }
        }
    }

    writeBuffer() {
        (this.inputViewChild as ElementRef).nativeElement.value = this.buffer.join('');
    }

    checkVal(allow?: boolean): number {
        //try to place characters where they belong
        let test = this.inputViewChild?.nativeElement.value,
            lastMatch = -1,
            i,
            c,
            pos;

        for (i = 0, pos = 0; i < (this.len as number); i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        if (!this.keepBuffer) {
                            this.buffer[i] = c;
                        }
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len as number);
                    break;
                }
            } else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < (this.partialPosition as number)) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        } else if (lastMatch + 1 < (this.partialPosition as number)) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild?.nativeElement.value) this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len as number);
            } else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        } else {
            this.writeBuffer();
            (this.inputViewChild as ElementRef).nativeElement.value = this.inputViewChild?.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos) as number;
    }

    onInputFocus(event: Event) {
        if (this.readonly) {
            return;
        }

        this.focused = true;

        clearTimeout(this.caretTimeoutId);
        let pos: number;

        this.focusText = this.inputViewChild?.nativeElement.value;

        pos = this.keepBuffer ? this.inputViewChild?.nativeElement.value.length : this.checkVal();

        this.caretTimeoutId = setTimeout(() => {
            if (this.inputViewChild?.nativeElement !== this.inputViewChild?.nativeElement.ownerDocument.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos == this.mask?.replace('?', '').length) {
                this.caret(0, pos);
            } else {
                this.caret(pos);
            }
        }, 10);

        this.onFocus.emit(event);
    }

    onInputChange(event: Event) {
        if (this.androidChrome) this.handleAndroidInput(event);
        else this.handleInputChange(event);

        this.onInput.emit(event);
    }

    handleInputChange(event: Event) {
        if (this.readonly || this.disabled) {
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
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }

        return unmaskedBuffer.join('');
    }

    updateModel(e: Event) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : (e.target as HTMLInputElement).value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.onModelChange(this.value);
        }
    }

    updateFilledState() {
        this.filled = this.inputViewChild?.nativeElement && this.inputViewChild.nativeElement.value != '';
    }

    focus() {
        this.inputViewChild?.nativeElement.focus();
    }

    clear() {
        (this.inputViewChild as ElementRef).nativeElement.value = '';
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }
}

@NgModule({
    imports: [CommonModule, InputTextModule, AutoFocusModule, TimesIcon],
    exports: [InputMask, SharedModule],
    declarations: [InputMask]
})
export class InputMaskModule {}
