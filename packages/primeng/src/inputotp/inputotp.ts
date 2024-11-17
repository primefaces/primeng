import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    contentChildren,
    OutputEmitterRef,
    forwardRef,
    inject,
    input,
    NgModule,
    output,
    TemplateRef,
    ViewEncapsulation,
    numberAttribute,
    computed,
    Signal,
    signal
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { InputText } from 'primeng/inputtext';
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
    selector: 'p-inputOtp, p-inputotp, p-input-otp',
    standalone: true,
    imports: [NgClass, NgTemplateOutlet, InputText, AutoFocus, SharedModule],
    template: `
        @for (i of ranges(); track $index) {
            @if (!customInputTemplate()) {
                <input
                    type="text"
                    pInputText
                    [value]="getModelValue(i)"
                    [maxLength]="1"
                    [type]="inputType()"
                    class="p-inputotp-input"
                    [size]="size()"
                    [variant]="variant()"
                    [readonly]="readonly()"
                    [disabled]="disabled()"
                    [tabindex]="tabindex()"
                    (input)="onInput($event, i - 1)"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (paste)="onPaste($event)"
                    (keydown)="onKeyDown($event)"
                    [pAutoFocus]="getAutofocus(i)"
                    [ngClass]="styleClass()"
                />
            } @else {
                <ng-container *ngTemplateOutlet="customInputTemplate(); context: { $implicit: getToken(i - 1), events: getTemplateEvents(i - 1), index: i }"> </ng-container>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [INPUT_OTP_VALUE_ACCESSOR, InputOtpStyle],
    host: {
        class: 'p-inputotp p-component'
    }
})
export class InputOtp extends BaseComponent {
    /**
     * When present, it specifies that the component should have invalid state style.
     * @group Props
     */
    invalid = input<boolean, any>(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = input<boolean, any>(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    readonly = input<boolean, any>(false, { transform: booleanAttribute });
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = input<'filled' | 'outlined'>('outlined');
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input<number | null, any>(null, { transform: numberAttribute });
    /**
     * Number of characters to initiate.
     * @group Props
     */
    length = input<number, any>(4, { transform: numberAttribute });
    /**
     * Style class of the input element.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Mask pattern.
     * @group Props
     */
    mask = input<boolean, any>(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that an input field is integer-only.
     * @group Props
     */
    integerOnly = input<boolean, any>(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input<boolean, any>(undefined, { transform: booleanAttribute });
    /**
     * Defines the size of the component.
     * @group Props
     */
    size = input<'large' | 'small'>();
    /**
     * Callback to invoke on value change.
     * @group Emits
     */
    onChange: OutputEmitterRef<InputOtpChangeEvent> = output<InputOtpChangeEvent>();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus: OutputEmitterRef<Event> = output<Event>();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur: OutputEmitterRef<Event> = output<Event>();
    /**
     * Input template.
     * @param {InputOtpInputTemplateContext} context - Context of the template
     * @see {@link InputOtpInputTemplateContext}
     * @group Templates
     */
    inputTemplate = contentChild<TemplateRef<InputOtpInputTemplateContext>>('input');
    /**
     * List of PrimeTemplate instances provided by the content.
     * @group Templates
     */
    templates = contentChildren<PrimeTemplate | undefined>(PrimeTemplate);
    /**
     * Computes the custom input template if available.
     * @returns {TemplateRef<InputOtpInputTemplateContext> | undefined} The custom input template or undefined if not available.
     */
    customInputTemplate = computed<TemplateRef<InputOtpInputTemplateContext>>(() => {
        if (this.templates()) {
            const templates = this.templates().reduce<{ [key: string]: TemplateRef<InputOtpInputTemplateContext> }>((prev, curr) => {
                prev[curr.getType()] = curr.template;
                return prev;
            }, {});
            return templates['input'];
        }
        return this.inputTemplate();
    });

    tokens = signal<string[]>([]);

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    value = signal<any | null | undefined>(undefined);

    inputType: Signal<string> = computed<string>(() => (this.mask() ? 'password' : 'text'));

    _componentStyle = inject(InputOtpStyle);

    getToken(index: number) {
        return this.tokens[index];
    }

    getTemplateEvents(index: number) {
        return {
            input: (event) => this.onInput(event, index),
            keydown: (event) => this.onKeyDown(event),
            focus: (event) => this.onFocus.emit(event),
            blur: (event) => this.onBlur.emit(event),
            paste: (event) => this.onPaste(event)
        };
    }

    onInput(event, index: number) {
        const inputValue = event.target.value;
        const updateOne = (value: string[]) => {
            value[index] = inputValue;
            return value;
        };
        const updateMany = (value: string[]) => {
            // Update tokens based on the input value
            if (inputValue.length > 0) {
                for (let i = 0; i < inputValue.length; i++) {
                    if (index + i < this.length()) {
                        value[index + i] = inputValue[i];
                    }
                }
            }
            return value;
        };
        this.tokens.update(inputValue.length === this.length() ? updateMany : updateOne);
        this.updateModel(event);

        if (event.inputType === 'deleteContentBackward') {
            this.moveToPrev(event);
        } else if (event.inputType === 'insertText' || event.inputType === 'deleteContentForward') {
            this.moveToNext(event);
        }
    }

    updateModel(event: any) {
        const newValue = this.tokens().join('');
        this.onModelChange(newValue);

        this.onChange.emit({
            originalEvent: event,
            value: newValue
        });
    }

    writeValue(value: any): void {
        if (value) {
            if (Array.isArray(value) && value.length > 0) {
                this.value.set(value.slice(0, this.length()));
            } else {
                this.value.set(value.toString().split('').slice(0, this.length()));
            }
        } else {
            this.value.set(value);
        }
        this.updateTokens();
    }

    updateTokens() {
        if (this.value() !== null && this.value() !== undefined) {
            if (Array.isArray(this.value())) {
                this.tokens.set([...this.value()]);
            } else {
                this.tokens.set(this.value().toString().split(''));
            }
        } else {
            this.tokens.set([]);
        }
    }

    getModelValue(i: number) {
        return this.tokens()[i - 1] || '';
    }

    getAutofocus(i: number): boolean {
        if (i === 1) {
            return this.autofocus();
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

        switch (event.code) {
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

            default:
                if ((this.integerOnly() && !((event.code.startsWith('Digit') || event.code.startsWith('Numpad')) && Number(event.key) >= 0 && Number(event.key) <= 9)) || (this.tokens().join('').length >= this.length() && event.code !== 'Delete')) {
                    event.preventDefault();
                }

                break;
        }
    }

    onPaste(event) {
        if (!this.disabled() && !this.readonly()) {
            let paste = event.clipboardData.getData('text');

            if (paste.length) {
                let pastedCode = paste.substring(0, this.length() + 1);

                if (!this.integerOnly() || !isNaN(pastedCode)) {
                    this.tokens.set(pastedCode.split(''));
                    this.updateModel(event);
                }
            }

            event.preventDefault();
        }
    }

    ranges: Signal<number[]> = computed<number[]>(() => Array.from({ length: this.length() }, (_, index) => index + 1));
}

@NgModule({
    imports: [InputOtp, SharedModule],
    exports: [InputOtp, SharedModule]
})
export class InputOtpModule {}
