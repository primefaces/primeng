
import {NgModule,Component,ChangeDetectionStrategy, Input, ElementRef, ViewChild, OnInit, EventEmitter, Output, forwardRef, ViewEncapsulation, ChangeDetectorRef, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const INPUTNUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
};
@Component({
    selector: 'p-inputNumber',
    template: `
        <span [ngClass]="{'p-inputnumber p-component': true,'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal', 'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}"
                [ngStyle]="style" [class]="styleClass">
            <input #input [ngClass]="'p-inputnumber-input'" [ngStyle]="inputStyle" [class]="inputStyleClass" pInputText [value]="formattedValue()" [attr.placeholder]="placeholder" [attr.title]="title" [attr.id]="inputId"
                [attr.size]="size" [attr.name]="name" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel"
                [attr.aria-required]="ariaRequired" [disabled]="disabled" [attr.required]="required" [attr.aria-valuemin]="min" [attr.aria-valuemax]="max" [readonly]="readonly" inputmode="decimal"
                (input)="onUserInput($event)" (keydown)="onInputKeyDown($event)" (keypress)="onInputKeyPress($event)" (paste)="onPaste($event)" (click)="onInputClick()"
                (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
            <span class="p-inputnumber-button-group" *ngIf="showButtons && buttonLayout === 'stacked'">
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
                <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" [disabled]="disabled"
                    (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
            </span>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-up': true}" [class]="incrementButtonClass" [icon]="incrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onUpButtonMouseDown($event)" (mouseup)="onUpButtonMouseUp()" (mouseleave)="onUpButtonMouseLeave()" (keydown)="onUpButtonKeyDown($event)" (keyup)="onUpButtonKeyUp()"></button>
            <button type="button" pButton [ngClass]="{'p-inputnumber-button p-inputnumber-button-down': true}" [class]="decrementButtonClass" [icon]="decrementButtonIcon" *ngIf="showButtons && buttonLayout !== 'stacked'" [disabled]="disabled"
                (mousedown)="this.onDownButtonMouseDown($event)" (mouseup)="onDownButtonMouseUp()" (mouseleave)="onDownButtonMouseLeave()" (keydown)="onDownButtonKeyDown($event)" (keyup)="onDownButtonKeyUp()"></button>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [INPUTNUMBER_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./inputnumber.css'],
    host: {
        'class': 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focused'
    }
})
export class InputNumber implements OnInit,ControlValueAccessor {

    @Input() showButtons: boolean = false;

    @Input() format: boolean = true;

    @Input() buttonLayout: string = "stacked";

    @Input() inputId: string;

    @Input() styleClass: string;

    @Input() style: any;

    @Input() placeholder: string;

    @Input() size: number;

    @Input() maxlength: number;

    @Input() tabindex: string;

    @Input() title: string;

    @Input() ariaLabel: string;

    @Input() ariaRequired: boolean;

    @Input() name: string;

    @Input() required: boolean;

    @Input() autocomplete: string;

    @Input() min: number;

    @Input() max: number;

    @Input() incrementButtonClass: string;

    @Input() decrementButtonClass: string;

    @Input() incrementButtonIcon: string = 'pi pi-angle-up';

    @Input() decrementButtonIcon: string = 'pi pi-angle-down';

    @Input() readonly: boolean = false;

    @Input() step: number = 1;

    @Input() allowEmpty: boolean = true;

    @Input() locale: string;

    @Input() localeMatcher: string;

    @Input() mode: string = "decimal";

    @Input() currency: string;

    @Input() currencyDisplay: string;

    @Input() useGrouping: boolean = true;

    @Input() minFractionDigits: number;

    @Input() maxFractionDigits: number;

    @Input() prefix: string;

    @Input() suffix: string;

    @Input() inputStyle: any;

    @Input() inputStyleClass: string;

    @ViewChild('input') input: ElementRef;

    @Output() onInput: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onKeyDown: EventEmitter<any> = new EventEmitter();

    value: number;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    focused: boolean;

    initialized: boolean;

    groupChar: string = '';

    prefixChar: string = '';

    suffixChar: string = '';

    isSpecialChar: boolean;

    timer: any;

    lastValue: string;

    _numeral: any;

    numberFormat: any;

    _decimal: any;

    _group: any;

    _minusSign: any;

    _currency: any;

    _prefix: any;

    _suffix: any;

    _index: any;

    _disabled: boolean;

    @Input() get disabled(): boolean {
        return this._disabled;
    }

    set disabled(disabled: boolean) {
        if (disabled)
            this.focused = false;

        this._disabled = disabled;

        if (this.timer)
            this.clearTimer();
    }

    constructor(public el: ElementRef, private cd: ChangeDetectorRef) { }

    ngOnChanges(simpleChange: SimpleChanges) {
        const props = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'prefix', 'suffix'];
        if (props.some(p => !!simpleChange[p])) {
            this.updateConstructParser();
        }
    }

    ngOnInit() {
        this.constructParser();

        this.initialized = true;
    }

    getOptions() {
        return {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        };
    }

    constructParser() {
        this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
        const numerals = [...new Intl.NumberFormat(this.locale, {useGrouping: false}).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._decimal = this.getDecimalExpression();
        this._suffix = this.getSuffixExpression();
        this._prefix = this.getPrefixExpression();
        this._index = d => index.get(d);
    }

    updateConstructParser() {
        if (this.initialized) {
            this.constructParser();
        }
    }

    escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    getDecimalExpression() {
        const formatter = new Intl.NumberFormat(this.locale, {...this.getOptions(), useGrouping: false});
        return new RegExp(`[${formatter.format(1.1).replace(this._currency, '').trim().replace(this._numeral, '')}]`, 'g');
    }

    getGroupingExpression() {
        const formatter = new Intl.NumberFormat(this.locale, {useGrouping: true});
        this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
        return new RegExp(`[${this.groupChar}]`, 'g');
    }

    getMinusSignExpression() {
        const formatter = new Intl.NumberFormat(this.locale, {useGrouping: false});
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
    }

    getCurrencyExpression() {
        if (this.currency) {
            const formatter = new Intl.NumberFormat(this.locale, {style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay,
                minimumFractionDigits: 0, maximumFractionDigits: 0});
            return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, '')}]`, 'g');
        }

        return new RegExp(`[]`,'g');
    }

    getPrefixExpression() {
        if (this.prefix) {
            this.prefixChar = this.prefix;
        }
        else {
            const formatter = new Intl.NumberFormat(this.locale, {style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay});
            this.prefixChar = formatter.format(1).split('1')[0];
        }

        return new RegExp(`${this.escapeRegExp(this.prefixChar||'')}`, 'g');
    }

    getSuffixExpression() {
        if (this.suffix) {
            this.suffixChar = this.suffix;
        }
        else {
            const formatter = new Intl.NumberFormat(this.locale, {style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay,
                minimumFractionDigits: 0, maximumFractionDigits: 0});
            this.suffixChar = formatter.format(1).split('1')[1];
        }

        return new RegExp(`${this.escapeRegExp(this.suffixChar||'')}`, 'g');
    }

    formatValue(value) {
        if (value != null) {
            if (value === '-') { // Minus sign
                return value;
            }

            if (this.format) {
                let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                let formattedValue = formatter.format(value);
                if (this.prefix) {
                    formattedValue = this.prefix + formattedValue;
                }

                if (this.suffix) {
                    formattedValue = formattedValue + this.suffix;
                }

                return formattedValue;
            }

            return value.toString();
        }

        return '';
    }

    parseValue(text) {
        let filteredText = text
                            .replace(this._suffix, '')
                            .replace(this._prefix, '')
                            .trim()
                            .replace(/\s/g, '')
                            .replace(this._currency, '')
                            .replace(this._group, '')
                            .replace(this._minusSign, '-')
                            .replace(this._decimal, '.')
                            .replace(this._numeral, this._index);

        if (filteredText) {
            if (filteredText === '-') // Minus sign
                return filteredText;

            let parsedValue = +filteredText;
            return isNaN(parsedValue) ? null : parsedValue;
        }

        return null;
    }

    repeat(event, interval, dir) {
        if (this.readonly) {
            return;
        }

        let i = interval || 500;

        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);

        this.spin(event, dir);
    }

    spin(event, dir) {
        let step = this.step * dir;
        let currentValue = this.parseValue(this.input.nativeElement.value) || 0;
        let newValue = this.validateValue(currentValue + step);
        if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
            return;
        }

        this.updateInput(newValue, null, 'spin', null);
        this.updateModel(event, newValue);

        this.handleOnInput(event, currentValue, newValue);
    }

    onUpButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, 1);
        event.preventDefault();
    }

    onUpButtonMouseUp() {
        this.clearTimer();
    }

    onUpButtonMouseLeave() {
        this.clearTimer();
    }

    onUpButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, 1);
        }
    }

    onUpButtonKeyUp() {
        this.clearTimer();
    }

    onDownButtonMouseDown(event) {
        this.input.nativeElement.focus();
        this.repeat(event, null, -1);
        event.preventDefault();
    }

    onDownButtonMouseUp() {
        this.clearTimer();
    }

    onDownButtonMouseLeave() {
        this.clearTimer();
    }

    onDownButtonKeyUp() {
        this.clearTimer();
    }

    onDownButtonKeyDown(event) {
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.repeat(event, null, -1);
        }
    }

    onUserInput(event) {
        if(this.readonly) {
            return;
        }

        if (this.isSpecialChar) {
            event.target.value = this.lastValue;
        }
        this.isSpecialChar = false;
    }

    onInputKeyDown(event) {
        if(this.readonly) {
            return;
        }

        this.lastValue = event.target.value;
        if (event.shiftKey || event.altKey) {
            this.isSpecialChar = true;
            return;
        }

        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;
        let inputValue = event.target.value;
        let newValueStr = null;

        if (event.altKey) {
            event.preventDefault();
        }

        switch (event.which) {
            //up
            case 38:
                this.spin(event, 1);
                event.preventDefault();
            break;

            //down
            case 40:
                this.spin(event, -1);
                event.preventDefault();
            break;

            //left
            case 37:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                    event.preventDefault();
                }
            break;

            //right
            case 39:
                if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                    event.preventDefault();
                }
            break;

            //enter
            case 13:
                newValueStr = this.validateValue(this.parseValue(this.input.nativeElement.value));
                this.input.nativeElement.value = this.formatValue(newValueStr);
                this.input.nativeElement.setAttribute('aria-valuenow', newValueStr);
                this.updateModel(event, newValueStr);
            break;

            //backspace
            case 8: {
                event.preventDefault();

                if (selectionStart === selectionEnd) {
                    const deleteChar = inputValue.charAt(selectionStart - 1);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);

                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);

                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;

                            if (decimalLength) {
                                this.input.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                            }
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                        }
                        else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                    }

                    this.updateValue(event, newValueStr, null, 'delete-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }

                break;
            }

            // del
            case 46:
                event.preventDefault();

                if (selectionStart === selectionEnd) {
                    const deleteChar = inputValue.charAt(selectionStart);
                    const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);

                    if (this.isNumeralChar(deleteChar)) {
                        const decimalLength = this.getDecimalLength(inputValue);

                        if (this._group.test(deleteChar)) {
                            this._group.lastIndex = 0;
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                        }
                        else if (this._decimal.test(deleteChar)) {
                            this._decimal.lastIndex = 0;

                            if (decimalLength) {
                                this.input.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                            }
                        }
                        else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                            const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                            newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
                        }
                        else if (decimalCharIndexWithoutPrefix === 1) {
                            newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                            newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                        }
                        else {
                            newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                        }
                    }

                    this.updateValue(event, newValueStr, null, 'delete-back-single');
                }
                else {
                    newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, null, 'delete-range');
                }
            break;

            default:
            break;
        }

        this.onKeyDown.emit(event);
    }

    onInputKeyPress(event) {
        if (this.readonly) {
            return;
        }

        event.preventDefault();
        let code = event.which || event.keyCode;
        let char = String.fromCharCode(code);
        const isDecimalSign = this.isDecimalSign(char);
        const isMinusSign = this.isMinusSign(char);

        if ((48 <= code && code <= 57) || isMinusSign || isDecimalSign) {
            this.insert(event, char, { isDecimalSign, isMinusSign });
        }
    }

    onPaste(event) {
        if (!this.disabled && !this.readonly) {
            event.preventDefault();
            let data = (event.clipboardData || window['clipboardData']).getData('Text');
            if (data) {
                let filteredData = this.parseValue(data);
                if (filteredData != null) {
                    this.insert(event, filteredData.toString());
                }
            }
        }
    }

    allowMinusSign() {
        return this.min == null || this.min < 0;
    }

    isMinusSign(char) {
        if (this._minusSign.test(char) || char === '-') {
            this._minusSign.lastIndex = 0;
            return true;
        }

        return false;
    }

    isDecimalSign(char) {
        if (this._decimal.test(char)) {
            this._decimal.lastIndex = 0;
            return true;
        }

        return false;
    }

    isDecimalMode() {
        return this.mode === 'decimal';
    }

    getDecimalCharIndexes(val) {
        let decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;

        const filteredVal = val.replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '');
        const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
        this._decimal.lastIndex = 0;

        return { decimalCharIndex, decimalCharIndexWithoutPrefix };
    }

    getCharIndexes(val) {
        const decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        const minusCharIndex = val.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        const suffixCharIndex = val.search(this._suffix);
        this._suffix.lastIndex = 0;
        const currencyCharIndex = val.search(this._currency);
        this._currency.lastIndex = 0;

        return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
    }

    insert(event, text, sign = { isDecimalSign: false, isMinusSign: false }) {
        const minusCharIndexOnText = text.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
            return;
        }

        let selectionStart = this.input.nativeElement.selectionStart;
        let selectionEnd = this.input.nativeElement.selectionEnd;
        let inputValue = this.input.nativeElement.value.trim();
        const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
        let newValueStr;

        if (sign.isMinusSign) {
            if (selectionStart === 0) {
                newValueStr = inputValue;
                if (minusCharIndex === -1 || selectionEnd !== 0) {
                    newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
                }

                this.updateValue(event, newValueStr, text, 'insert');
            }
        }
        else if (sign.isDecimalSign) {
            if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                this.updateValue(event, inputValue, text, 'insert');
            }
            else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            }
            else if (decimalCharIndex === -1 && this.maxFractionDigits) {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, 'insert');
            }
        }
        else {
            const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
            const operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';

            if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                if ((selectionStart + text.length - (decimalCharIndex + 1)) <= maxFractionDigits) {
                    const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : (suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length);

                    newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
                    this.updateValue(event, newValueStr, text, operation);
                }
            }
            else {
                newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                this.updateValue(event, newValueStr, text, operation);
            }
        }
    }

    insertText(value, text, start, end) {
        let textSplit = text === '.' ? text : text.split('.');

        if (textSplit.length === 2) {
            const decimalCharIndex = value.slice(start, end).search(this._decimal);
            this._decimal.lastIndex = 0;
            return (decimalCharIndex > 0) ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : (value || this.formatValue(text));
        }
        else if ((end - start) === value.length) {
            return this.formatValue(text);
        }
        else if (start === 0) {
            return text + value.slice(end);
        }
        else if (end === value.length) {
            return value.slice(0, start) + text;
        }
        else {
            return value.slice(0, start) + text + value.slice(end);
        }
    }

    deleteRange(value, start, end) {
        let newValueStr;

        if ((end - start) === value.length)
            newValueStr = '';
        else if (start === 0)
            newValueStr = value.slice(end);
        else if (end === value.length)
            newValueStr = value.slice(0, start);
        else
            newValueStr = value.slice(0, start) + value.slice(end);

        return newValueStr;
    }

    initCursor() {
        let selectionStart = this.input.nativeElement.selectionStart;
        let inputValue = this.input.nativeElement.value;
        let valueLength = inputValue.length;
        let index = null;

        // remove prefix
        let prefixLength = (this.prefixChar || '').length;
        inputValue = inputValue.replace(this._prefix, '');
        selectionStart = selectionStart - prefixLength;

        let char = inputValue.charAt(selectionStart);
        if (this.isNumeralChar(char)) {
            return selectionStart + prefixLength;
        }

        //left
        let i = selectionStart - 1;
        while (i >= 0) {
            char = inputValue.charAt(i);
            if (this.isNumeralChar(char)) {
                index = i + prefixLength;
                break;
            }
            else {
                i--;
            }
        }

        if (index !== null) {
            this.input.nativeElement.setSelectionRange(index + 1, index + 1);
        }
        else {
            i = selectionStart;
            while (i < valueLength) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i + prefixLength;
                    break;
                }
                else {
                    i++;
                }
            }

            if (index !== null) {
                this.input.nativeElement.setSelectionRange(index, index);
            }
        }

        return index || 0;
    }

    onInputClick() {
        if(!this.readonly) {
            this.initCursor();
        }
    }

    isNumeralChar(char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
            this.resetRegex();
            return true;
        }

        return false;
    }

    resetRegex() {
        this._numeral.lastIndex =  0;
        this._decimal.lastIndex =  0;
        this._group.lastIndex =  0;
        this._minusSign.lastIndex =  0;
    }

    updateValue(event, valueStr, insertedValueStr, operation) {
        let currentValue = this.input.nativeElement.value;
        let newValue = null;

        if (valueStr != null) {
            newValue = this.parseValue(valueStr);
            newValue = !newValue && !this.allowEmpty ? 0 : newValue;
            this.updateInput(newValue, insertedValueStr, operation, valueStr);

            this.handleOnInput(event, currentValue, newValue);
        }
    }

    handleOnInput(event, currentValue, newValue) {
        if (this.isValueChanged(currentValue, newValue)) {
            this.onInput.emit({ originalEvent: event, value: newValue });
        }
    }

    isValueChanged(currentValue, newValue) {
        if (newValue === null && currentValue !== null) {
            return true;
        }

        if (newValue != null) {
            let parsedCurrentValue = (typeof currentValue === 'string') ? this.parseValue(currentValue) : currentValue;
            return newValue !== parsedCurrentValue;
        }

        return false;
    }

    validateValue(value) {
        if (value === '-' || value == null) {
            return null;
        }

        if (this.min != null && value < this.min) {
            return this.min;
        }

        if (this.max != null && value > this.max) {
            return this.max;
        }

        return value;
    }

    updateInput(value, insertedValueStr, operation, valueStr) {
        insertedValueStr = insertedValueStr || '';

        let inputValue = this.input.nativeElement.value;
        let newValue = this.formatValue(value);
        let currentLength = inputValue.length;

        if (newValue !== valueStr) {
            newValue = this.concatValues(newValue, valueStr);
        }

        if (currentLength === 0) {
            this.input.nativeElement.value = newValue;
            this.input.nativeElement.setSelectionRange(0, 0);
            const index = this.initCursor();
            const selectionEnd = index + insertedValueStr.length;
            this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
        }
        else {
            let selectionStart = this.input.nativeElement.selectionStart;
            let selectionEnd = this.input.nativeElement.selectionEnd;
            if (this.maxlength && this.maxlength < newValue.length) {
                return;
            }

            this.input.nativeElement.value = newValue;
            let newLength = newValue.length;

            if (operation === 'range-insert') {
                const startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
                const startValueStr = startValue !== null ? startValue.toString() : '';
                const startExpr = startValueStr.split('').join(`(${this.groupChar})?`);
                const sRegex = new RegExp(startExpr, 'g');
                sRegex.test(newValue);

                const tExpr = insertedValueStr.split('').join(`(${this.groupChar})?`);
                const tRegex = new RegExp(tExpr, 'g');
                tRegex.test(newValue.slice(sRegex.lastIndex));

                selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (newLength === currentLength) {
                if (operation === 'insert' || operation === 'delete-back-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                else if (operation === 'delete-single')
                    this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                else if (operation === 'delete-range' || operation === 'spin')
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (operation === 'delete-back-single') {
                let prevChar = inputValue.charAt(selectionEnd - 1);
                let nextChar = inputValue.charAt(selectionEnd);
                let diff = currentLength - newLength;
                let isGroupChar = this._group.test(nextChar);

                if (isGroupChar && diff === 1) {
                    selectionEnd += 1;
                }
                else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                    selectionEnd += (-1 * diff) + 1;
                }

                this._group.lastIndex = 0;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else if (inputValue === '-' && operation === 'insert') {
                this.input.nativeElement.setSelectionRange(0, 0);
                const index = this.initCursor();
                const selectionEnd = index + insertedValueStr.length + 1;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else {
                selectionEnd = selectionEnd + (newLength - currentLength);
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
        }

        this.input.nativeElement.setAttribute('aria-valuenow', value);
    }

    concatValues(val1, val2) {
        if (val1 && val2) {
            let decimalCharIndex = val2.search(this._decimal);
            this._decimal.lastIndex = 0;

            return decimalCharIndex !== -1 ? (val1.split(this._decimal)[0] + val2.slice(decimalCharIndex)) : val1;
        }

        return val1;
    }

    getDecimalLength(value) {
        if (value) {
            const valueSplit = value.split(this._decimal);

            if (valueSplit.length === 2) {
                return valueSplit[1].replace(this._suffix, '')
                            .trim()
                            .replace(/\s/g, '')
                            .replace(this._currency, '').length;
            }
        }

        return 0;
    }

    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event) {
        this.focused = false;

        let newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.input.nativeElement.value = this.formatValue(newValue);
        this.input.nativeElement.setAttribute('aria-valuenow', newValue);
        this.updateModel(event, newValue);

        this.onBlur.emit(event);
    }

    formattedValue() {
        const val = !this.value && !this.allowEmpty ? 0 : this.value;
        return this.formatValue(val);
    }

    updateModel(event, value) {
        if (this.value !== value) {
            this.value = value;
            this.onModelChange(value);
        }

        this.onModelTouched();
    }

    writeValue(value: any) : void {
        this.value = value;
        this.cd.markForCheck();
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

    get filled() {
        return (this.value != null && this.value.toString().length > 0)
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    getFormatter() {
        return this.numberFormat;
    }
}

@NgModule({
    imports: [CommonModule,InputTextModule, ButtonModule],
    exports: [InputNumber],
    declarations: [InputNumber]
})
export class InputNumberModule { }
