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
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    NgModule,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseInput } from 'primeng/baseinput';
import { TimesIcon } from 'primeng/icons';
import { InputText } from 'primeng/inputtext';
import { Nullable } from 'primeng/ts-helpers';
import { Caret } from './inputmask.interface';
import { InputMaskStyle } from './style/inputmaskstyle';

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
    selector: 'p-inputmask',
    standalone: true,
    imports: [CommonModule, InputText, AutoFocus, TimesIcon, SharedModule],
    template: `
        <input
            #input
            pInputText
            [class]="cx('root')"
            [attr.id]="inputId"
            [attr.type]="type"
            [name]="name()"
            [invalid]="invalid()"
            [ngStyle]="style"
            [attr.placeholder]="placeholder"
            [attr.title]="title"
            [pSize]="size()"
            [size]="inputSize()"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength()"
            [attr.minlength]="minlength()"
            [attr.tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-required]="ariaRequired"
            [disabled]="disabled()"
            [readonly]="readonly"
            [required]="required()"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onInputKeydown($event)"
            (keypress)="onKeyPress($event)"
            [variant]="$variant()"
            [pAutoFocus]="autofocus"
            (input)="onInputChange($event)"
            (paste)="handleInputChange($event)"
            [attr.data-pc-name]="'inputmask'"
            [attr.data-pc-section]="'root'"
            [attr.inputmode]="inputMode"
        />
        <ng-container *ngIf="value != null && $filled() && showClear && !disabled()">
            <TimesIcon *ngIf="!clearIconTemplate && !_clearIconTemplate" [styleClass]="cx('clearIcon')" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
            <span *ngIf="clearIconTemplate || _clearIconTemplate" [class]="cx('clearIcon')" (click)="clear()" [attr.data-pc-section]="'clearIcon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>
    `,
    providers: [INPUTMASK_VALUE_ACCESSOR, InputMaskStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class InputMask extends BaseInput implements OnInit, AfterContentInit, ControlValueAccessor {
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
     * Used to show a different keyboard on mobile
     * @group Props
     */
    @Input() inputMode: string = 'text';
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
        console.log('autoFocus is deprecated. Use autofocus property instead.');
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
    /**
     * Template of the clear icon.
     * @group Templates
     */
    @ContentChild('clearicon', { descendants: false }) clearIconTemplate: Nullable<TemplateRef<any>>;

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    @ViewChild('input', { static: true }) inputViewChild: Nullable<ElementRef>;

    value: Nullable<string>;

    _mask: Nullable<string>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    input: Nullable<HTMLInputElement>;

    tests: RegExp[] | any;

    partialPosition: Nullable<number>;

    firstNonMaskPos: Nullable<number>;

    lastRequiredNonMaskPos: Nullable<number>;

    maskLength: Nullable<number>;

    oldVal: Nullable<string>;

    buffer: string[] | any;

    defaultBuffer: Nullable<string>;

    focusText: Nullable<string>;

    caretTimeoutId: any;

    android: boolean = true;

    focused: Nullable<boolean>;

    _componentStyle = inject(InputMaskStyle);

    ngOnInit() {
        super.ngOnInit();
        if (isPlatformBrowser(this.platformId)) {
            let ua = navigator.userAgent;
            this.android = /android/i.test(ua);
        }

        this.initMask();
    }

    _clearIconTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'clearicon':
                    this._clearIconTemplate = item.template;
                    break;
            }
        });
    }

    initMask() {
        this.tests = [];
        this.partialPosition = (this.mask as string).length;
        this.maskLength = (this.mask as string).length;
        this.firstNonMaskPos = null;

        const defs = {
            '9': '[0-9]',
            a: this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };

        let maskTokens = (this.mask as string).split('');

        for (let index = 0; index < maskTokens.length; index++) {
            const maskCharacter = maskTokens[index];
            if (maskCharacter == '?') {
                this.maskLength--;
                this.partialPosition = index;
            } else if (defs[maskCharacter]) {
                this.tests.push(new RegExp(defs[maskCharacter]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (index < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            } else {
                this.tests.push(null);
            }
        }

        this.buffer = [];
        for (let index = 0; index < maskTokens.length; index++) {
            const maskCharacter = maskTokens[index];
            if (maskCharacter != '?') {
                if (defs[maskCharacter]) this.buffer.push(this.getPlaceholder(index));
                else this.buffer.push(maskCharacter);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }

    writeValue(value: any): void {
        this.value = value;
        this.writeModelValue(this.value);

        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null) this.inputViewChild.nativeElement.value = '';
            else this.inputViewChild.nativeElement.value = this.value;

            this.checkVal();
            this.focusText = this.inputViewChild.nativeElement.value;
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    caret(first?: number, last?: number): Caret | undefined {
        let range, begin: number, end: number;

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
        while (++pos < (this.maskLength as number) && !this.tests[pos]);
        return pos;
    }

    seekPrev(pos: number) {
        while (--pos >= 0 && !this.tests[pos]);
        return pos;
    }

    shiftLeft(begin: number, end: number) {
        if (begin < 0) {
            return;
        }

        for (let index = begin, nextIndex = this.seekNext(end); index < (this.maskLength as number); index++) {
            if (this.tests[index]) {
                if (nextIndex < (this.maskLength as number) && this.tests[index].test(this.buffer[nextIndex])) {
                    this.buffer[index] = this.buffer[nextIndex];
                    this.buffer[nextIndex] = this.getPlaceholder(nextIndex);
                } else {
                    break;
                }

                nextIndex = this.seekNext(nextIndex);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos as number, begin));
    }

    shiftRight(pos: number) {
        for (let index = pos, placeHolder = this.getPlaceholder(pos); index < (this.maskLength as number); index++) {
            if (this.tests[index]) {
                const nextIndex = this.seekNext(index);
                const buffer = this.buffer[index];

                this.buffer[index] = placeHolder;

                if (nextIndex < (this.maskLength as number) && this.tests[nextIndex].test(buffer)) {
                    placeHolder = buffer;
                } else {
                    break;
                }
            }
        }
    }

    onInputBlur(event: Event) {
        this.focused = false;
        this.onModelTouched();
        if (!this.keepBuffer) {
            this.checkVal();
        }
        this.onBlur.emit(event);

        if (this.modelValue() != this.focusText || this.modelValue() != this.value) {
            this.updateModel(event);
            let newEvent = new Event('change', { bubbles: true, cancelable: false });
            this.inputViewChild?.nativeElement.dispatchEvent(newEvent);
        }
    }

    onInputKeydown(event: KeyboardEvent) {
        if (this.readonly) {
            return;
        }

        let key = event.key,
            positions = this.caret() as Caret,
            begin: number = positions.begin,
            end: number = positions.end;

        this.oldVal = this.inputViewChild?.nativeElement.value;

        this.onKeydown.emit(event);

        //backspace, delete, enter and escape get special treatment
        if (key === 'Backspace' || key === 'Delete') {

            if (end - begin === 0) {
                begin = key !== 'Delete' ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = key === 'Delete' ? this.seekNext(end) : end;
            }

            this.clearBuffer(begin, end);
            if (this.keepBuffer) {
                this.shiftLeft(begin, end - 2);
            } else {
                this.shiftLeft(begin, end - 1);
            }
            this.updateModel(event);
            this.onInput.emit(event);

            event.preventDefault();
        } else if (key === 'Enter') {
            this.onInputBlur(event);
            this.updateModel(event);

        } else if (key === 'Escape') {
            (this.inputViewChild as ElementRef).nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(event);

            event.preventDefault();
        }
    }

    onKeyPress(event: KeyboardEvent) {
        // Android input is handled by onInputChange
        if (this.readonly || this.android) {
            return;
        }

        let key = event.key,
            positions = this.caret() as Caret,
            completed: boolean;


        // key < 32 || (key > 34 && key < 41);
        const ignoredKeys = [
            'Backspace',
            'Tab',
            'Enter',
            'Shift',
            'Control',
            'Alt',
            'Pause',
            'CapsLock',
            'Escape',
            'End',
            'Home',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
        ];

        if (event.ctrlKey || event.altKey || event.metaKey || ignoredKeys.includes(key)) {
            //Ignore
            return;
        }

        if (positions.end - positions.begin !== 0) {
            this.clearBuffer(positions.begin, positions.end);
            this.shiftLeft(positions.begin, positions.end - 1);
        }

        const nextIndex = this.seekNext(positions.begin - 1);

        if (nextIndex < (this.maskLength as number) && this.tests[nextIndex].test(key)) {
            this.shiftRight(nextIndex);

            this.buffer[nextIndex] = key;
            this.writeBuffer();
            const next = this.seekNext(nextIndex);
            this.caret(next);

            if (positions.begin <= (this.lastRequiredNonMaskPos as number)) {
                completed = this.isCompleted();
            }

            this.onInput.emit(event);
        }

        event.preventDefault();
        this.updateModel(event);

        if (completed) {
            this.onComplete.emit();
        }
    }

    clearBuffer(start: number, end: number) {
        if (!this.keepBuffer) {
            for (let index = start; index < end && index < (this.maskLength as number); index++) {
                if (this.tests[index]) {
                    this.buffer[index] = this.getPlaceholder(index);
                }
            }
        }
    }

    writeBuffer() {
        (this.inputViewChild as ElementRef).nativeElement.value = this.buffer.join('');
    }

    checkVal(allow?: boolean): number {
        //try to place characters where they belong
        let valueToTest = this.inputViewChild?.nativeElement.value,
            lastMatch = -1,
            index: number,
            pos: number;

        for (index = 0, pos = 0; index < (this.maskLength as number); index++) {
            if (this.tests[index]) {
                this.buffer[index] = this.getPlaceholder(index);
                while (pos++ < valueToTest.length) {
                    const character = valueToTest.charAt(pos - 1);

                    if (this.tests[index].test(character)) {
                        if (!this.keepBuffer) {
                            this.buffer[index] = character;
                        }
                        lastMatch = index;
                        break;
                    }
                }
                if (pos > valueToTest.length) {
                    this.clearBuffer(index + 1, this.maskLength as number);
                    break;
                }
            } else {
                if (this.buffer[index] === valueToTest.charAt(pos)) {
                    pos++;
                }
                if (index < (this.partialPosition as number)) {
                    lastMatch = index;
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
                this.clearBuffer(0, this.maskLength as number);
            } else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        } else {
            this.writeBuffer();
            (this.inputViewChild as ElementRef).nativeElement.value = this.inputViewChild?.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? index : this.firstNonMaskPos) as number;
    }

    onInputFocus(event: Event) {
        if (this.readonly) {
            return;
        }

        this.focused = true;

        clearTimeout(this.caretTimeoutId);

        this.focusText = this.inputViewChild?.nativeElement.value;

        const pos = this.keepBuffer ? this.inputViewChild?.nativeElement.value.length : this.checkVal();

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

    handleAndroidInput(event: Event) {
        let currentValue = this.inputViewChild?.nativeElement.value;
        let positions = this.caret() as Caret;
        if (this.oldVal && this.oldVal.length && this.oldVal.length > currentValue.length) {
            // a deletion or backspace happened
            positions.begin = this.checkVal(true);
            while (positions.begin > 0 && !this.tests[positions.begin - 1]) positions.begin--;
            if (positions.begin === 0) {
                while (positions.begin < (this.firstNonMaskPos as number) && !this.tests[positions.begin]) positions.begin++;
            }

        } else {
            positions.begin = this.checkVal(true);
            while (positions.begin < (this.maskLength as number) && !this.tests[positions.begin]) positions.begin++;
        }

        this.caret(positions.begin, positions.begin);
        this.updateModel(event);
        if (this.isCompleted()) {
            this.onComplete.emit();
        }
    }

    onInputChange(event: Event) {
        if (this.android) this.handleAndroidInput(event);
        else this.handleInputChange(event);

        this.onInput.emit(event);
    }

    handleInputChange(event: Event) {
        if (this.readonly) {
            return;
        }

        setTimeout(() => {
            let pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.isCompleted()) {
                this.onComplete.emit();
            }
        }, 0);
    }

    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let index = 0; index < this.buffer.length; index++) {
            const character = this.buffer[index];
            if (this.tests[index] && character != this.getPlaceholder(index)) {
                unmaskedBuffer.push(character);
            }
        }

        return unmaskedBuffer.join('');
    }

    updateModel(event: Event) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : (event.target as HTMLInputElement).value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.writeModelValue(this.value);
            this.onModelChange(this.value);
        }
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
    imports: [InputMask, SharedModule],
    exports: [InputMask, SharedModule]
})
export class InputMaskModule {}
