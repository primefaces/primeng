import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, forwardRef, inject, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseInput } from 'primeng/baseinput';
import { InputText } from 'primeng/inputtext';
import { Nullable } from 'primeng/ts-helpers';
import { InputOtpStyle } from './style/inputotpstyle';

export const INPUT_OTP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputOtp),
    multi: true
};

/**
 * Input change event.
 * @property {Event} originalEvent - browser event.
 * @property {any}  value - updated value.
 * @group Interface
 */
export interface InputOtpChangeEvent {
    originalEvent: Event;
    value: any;
}

/**
 * Context interface for the input template events.
 * @property {(event: Event, index: number) => void} input - input event.
 * @property {(event: Event)} keydown - keydown event.
 * @property {(event: Event)} focus - focus event.
 * @property {(event: Event)} blur - blur event.
 * @property {(event: Event)} paste - paste event.
 * @group Interface
 */
export interface InputOtpTemplateEvents {
    input: (event: Event, index: number) => void;
    keydown: (event: Event) => void;
    focus: (event: Event) => void;
    blur: (event: Event) => void;
    paste: (event: Event) => void;
}

/**
 * Context of the input template.
 * @property {number | string} $implicit - token value.
 * @property {InputOtpTemplateEvents} events - Browser events of the template.
 * @property {number} index - index of the token.
 * @group Interface
 */
export interface InputOtpInputTemplateContext {
    $implicit: number | string;
    events: InputOtpTemplateEvents;
    index: number;
}

/**
 * Input Otp is used to enter one time passwords.
 * @group Components
 */
@Component({
    selector: 'p-inputotp',
    standalone: true,
    imports: [CommonModule, InputText, AutoFocus, SharedModule],
    template: `
        <ng-container *ngFor="let i of getRange(length); trackBy: trackByFn">
            <ng-container *ngIf="!inputTemplate && !_inputTemplate">
                <input
                    type="text"
                    pInputText
                    [value]="getModelValue(i)"
                    [maxLength]="i === 1 ? length : 1"
                    [type]="inputType"
                    [class]="cn(cx('pcInputText'), styleClass)"
                    [pSize]="size()"
                    [variant]="$variant()"
                    [invalid]="invalid()"
                    [readonly]="readonly"
                    [disabled]="disabled()"
                    [name]="name()"
                    [required]="required()"
                    [tabindex]="tabindex"
                    (input)="onInput($event, i - 1)"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (paste)="onPaste($event)"
                    (keydown)="onKeyDown($event)"
                    [pAutoFocus]="getAutofocus(i)"
                    [attr.inputmode]="integerOnly ? 'numeric' : undefined"
                />
            </ng-container>
            <ng-container *ngIf="inputTemplate || _inputTemplate">
                <ng-container *ngTemplateOutlet="inputTemplate || _inputTemplate; context: { $implicit: getToken(i - 1), events: getTemplateEvents(i - 1), index: i }"> </ng-container>
            </ng-container>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [INPUT_OTP_VALUE_ACCESSOR, InputOtpStyle],
    host: {
        '[class]': "cx('root')"
    }
})
export class InputOtp extends BaseInput implements AfterContentInit {
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    @Input() readonly: boolean = false;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number | null = null;
    /**
     * Number of characters to initiate.
     * @group Props
     */
    @Input() length: number = 4;
    /**
     * Style class of the input element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Mask pattern.
     * @group Props
     */
    @Input() mask: boolean = false;
    /**
     * When present, it specifies that an input field is integer-only.
     * @group Props
     */
    @Input() integerOnly: boolean = false;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Callback to invoke on value change.
     * @group Emits
     */
    @Output() onChange: EventEmitter<InputOtpChangeEvent> = new EventEmitter<InputOtpChangeEvent>();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter();

    /**
     * Input template.
     * @param {InputOtpInputTemplateContext} context - Context of the template
     * @see {@link InputOtpInputTemplateContext}
     * @group Templates
     */
    @ContentChild('input', { descendants: false }) inputTemplate: TemplateRef<any>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    _inputTemplate: TemplateRef<any> | undefined;

    tokens: any = [];

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    value: any;

    get inputMode(): string {
        return this.integerOnly ? 'numeric' : 'text';
    }

    get inputType(): string {
        return this.mask ? 'password' : 'text';
    }

    _componentStyle = inject(InputOtpStyle);

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this._inputTemplate = item.template;
                    break;
                default:
                    this._inputTemplate = item.template;
                    break;
            }
        });
    }

    getToken(index) {
        return this.tokens[index];
    }

    getTemplateEvents(index) {
        return {
            input: (event) => this.onInput(event, index),
            keydown: (event) => this.onKeyDown(event),
            focus: (event) => this.onFocus.emit(event),
            blur: (event) => this.onBlur.emit(event),
            paste: (event) => this.onPaste(event)
        };
    }

    onInput(event, index) {
        const value = event.target.value;

        if(value.length > 1 && index === this.length-1) {
            event.target.value = value[0];
            event.stopPropagation();
            return;
        }

        if (this.tokens.join('').length >= this.length && event.inputType !== 'deleteContentBackward') {
            event.stopPropagation();
            return;
        }

        if (index === 0 && value.length > 1) {
            this.handleOnPaste(value, event);
            event.stopPropagation();
            return;
        }

        this.tokens[index] = value;
        this.updateModel(event);

        if (event.inputType === 'deleteContentBackward') {
            this.moveToPrev(event);
        } else if (event.inputType === 'insertText' || event.inputType === 'insertCompositionText' || event.inputType === 'deleteContentForward') {
            this.moveToNext(event);
        }
    }

    updateModel(event: any) {
        const newValue = this.tokens.join('');
        this.writeModelValue(newValue);
        this.onModelChange(newValue);

        this.onChange.emit({
            originalEvent: event,
            value: newValue
        });
    }

    writeValue(value: any): void {
        if (value) {
            if (Array.isArray(value) && value.length > 0) {
                this.value = value.slice(0, this.length);
            } else {
                this.value = value.toString().split('').slice(0, this.length);
            }
        } else {
            this.value = value;
        }
        this.writeModelValue(this.value);
        this.updateTokens();
        this.cd.markForCheck();
    }

    updateTokens() {
        if (this.value !== null && this.value !== undefined) {
            if (Array.isArray(this.value)) {
                this.tokens = [...this.value];
            } else {
                this.tokens = this.value.toString().split('');
            }
        } else {
            this.tokens = [];
        }
    }

    getModelValue(i: number) {
        return this.tokens[i - 1] || '';
    }

    getAutofocus(i: number): boolean {
        if (i === 1) {
            return this.autofocus;
        }
        return false;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    moveToPrev(event) {
        let prevInput = this.findPrevInput(event.target);

        if (prevInput) {
            prevInput.focus();
            prevInput.select();
        }
    }

    moveToNext(event) {
        let nextInput = this.findNextInput(event.target);

        if (nextInput) {
            nextInput.focus();
            nextInput.select();
        }
    }

    findNextInput(element) {
        let nextElement = element.nextElementSibling;

        if (!nextElement) return;

        return nextElement.nodeName === 'INPUT' ? nextElement : this.findNextInput(nextElement);
    }

    findPrevInput(element) {
        let prevElement = element.previousElementSibling;

        if (!prevElement) return;

        return prevElement.nodeName === 'INPUT' ? prevElement : this.findPrevInput(prevElement);
    }

    onInputFocus(event) {
        event.target.select();
        this.onFocus.emit(event);
    }

    onInputBlur(event) {
        this.onBlur.emit(event);
    }

    onKeyDown(event) {
        if (event.altKey || event.ctrlKey || event.metaKey) {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
                this.moveToPrev(event);
                event.preventDefault();

                break;

            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();

                break;

            case 'Backspace':
                if (event.target.value.length === 0) {
                    this.moveToPrev(event);
                    event.preventDefault();
                }

                break;

            case 'ArrowRight':
                this.moveToNext(event);
                event.preventDefault();

                break;

            case 'Tab':
                break;

            default:
                if (this.integerOnly && !(Number(event.key) >= 0 && Number(event.key) <= 9)) {
                    event.preventDefault();
                }

                if(this.tokens.join('').length >= this.length && event.code !== 'Delete') {
                    event.preventDefault();
                }

                break;
        }
    }

    onPaste(event) {
        if (!this.disabled() && !this.readonly) {
            let paste = event.clipboardData.getData('text');

            if (paste.length) {
                this.handleOnPaste(paste, event);
            }

            event.preventDefault();
        }
    }

    handleOnPaste(paste, event) {
        let pastedCode = paste.substring(0, this.length + 1);

        if (!this.integerOnly || !isNaN(pastedCode)) {
            this.tokens = pastedCode.split('');
            this.updateModel(event);
        }
    }

    getRange(n: number): number[] {
        return Array.from({ length: n }, (_, index) => index + 1);
    }

    trackByFn(index: number) {
        return index;
    }
}

@NgModule({
    imports: [InputOtp, SharedModule],
    exports: [InputOtp, SharedModule]
})
export class InputOtpModule {}
