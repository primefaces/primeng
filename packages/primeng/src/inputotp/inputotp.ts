import { NgTemplateOutlet } from '@angular/common';
import { AfterViewChecked, booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, InjectionToken, input, NgModule, output, Provider, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { InputText } from 'primeng/inputtext';
import { InputOtpChangeEvent, InputOtpInputTemplateContext, InputOtpPassThrough } from 'primeng/types/inputotp';
import type { InputSize, InputVariant } from 'primeng/types/shared';
import { InputOtpStyle } from './style/inputotpstyle';

const INPUTOTP_INSTANCE = new InjectionToken<InputOtp>('INPUTOTP_INSTANCE');

export const INPUT_OTP_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputOtp),
    multi: true
};

// Re-export interfaces from types for backwards compatibility
export { InputOtpChangeEvent, InputOtpInputTemplateContext, InputOtpTemplateEvents } from 'primeng/types/inputotp';

/**
 * Input Otp is used to enter one time passwords.
 * @group Components
 */
@Component({
    selector: 'p-inputotp, p-input-otp',
    standalone: true,
    imports: [NgTemplateOutlet, InputText, AutoFocus, SharedModule, BindModule],
    template: `
        @for (i of getRange(length()); track i) {
            @if (!inputTemplate()) {
                <input
                    type="text"
                    pInputText
                    [value]="getModelValue(i)"
                    [attr.maxlength]="i === 1 ? length() : 1"
                    [attr.type]="inputType()"
                    [class]="cn(cx('pcInputText'), styleClass())"
                    [pSize]="size()"
                    [variant]="$variant()"
                    [invalid]="invalid()"
                    [attr.inputmode]="inputMode()"
                    [attr.name]="name()"
                    [attr.tabindex]="tabindex()"
                    [attr.required]="attrRequired()"
                    [attr.readonly]="attrReadonly()"
                    [attr.disabled]="attrDisabled()"
                    (input)="onInput($event, i - 1)"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (paste)="onPaste($event)"
                    (keydown)="onKeyDown($event)"
                    [pAutoFocus]="getAutofocus(i)"
                    [pt]="ptm('pcInputText')"
                    [unstyled]="unstyled()"
                />
            } @else {
                <ng-container *ngTemplateOutlet="inputTemplate(); context: getTemplateContext(i)"> </ng-container>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [INPUT_OTP_VALUE_ACCESSOR, InputOtpStyle, { provide: INPUTOTP_INSTANCE, useExisting: InputOtp }, { provide: PARENT_INSTANCE, useExisting: InputOtp }],
    hostDirectives: [Bind],
    host: {
        '[class]': "cx('root')"
    }
})
export class InputOtp extends BaseEditableHolder<InputOtpPassThrough> implements AfterViewChecked {
    componentName = 'InputOtp';

    _componentStyle = inject(InputOtpStyle);

    $pcInputOtp: InputOtp | undefined = inject(INPUTOTP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    readonly = input(false, { transform: booleanAttribute });
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input<number | null>(null);
    /**
     * Number of characters to initiate.
     * @group Props
     */
    length = input(4);
    /**
     * Style class of the input element.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Mask pattern.
     * @group Props
     */
    mask = input(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that an input field is integer-only.
     * @group Props
     */
    integerOnly = input(false, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Specifies the input variant of the component.
     * @defaultValue undefined
     * @group Props
     */
    variant = input<InputVariant>();
    /**
     * Specifies the size of the component.
     * @defaultValue undefined
     * @group Props
     */
    size = input<InputSize>();
    /**
     * Callback to invoke on value change.
     * @group Emits
     */
    onChange = output<InputOtpChangeEvent>();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = output<Event>();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = output<Event>();
    /**
     * Custom input template.
     * @param {InputOtpInputTemplateContext} context - Context of the template
     * @see {@link InputOtpInputTemplateContext}
     * @group Templates
     */
    inputTemplate = contentChild<TemplateRef<InputOtpInputTemplateContext>>('input', { descendants: false });

    tokens: string[] = [];

    value = signal<any>(undefined);

    $variant = computed(() => this.variant() || this.config.inputVariant());

    inputMode = computed(() => (this.integerOnly() ? 'numeric' : 'text'));

    inputType = computed(() => (this.mask() ? 'password' : 'text'));

    attrRequired = computed(() => (this.required() ? '' : undefined));

    attrReadonly = computed(() => (this.readonly() ? '' : undefined));

    attrDisabled = computed(() => (this.$disabled() ? '' : undefined));

    getToken(index: number) {
        return this.tokens[index];
    }

    getTemplateContext(i: number): InputOtpInputTemplateContext {
        return {
            $implicit: this.getToken(i - 1),
            events: this.getTemplateEvents(i - 1),
            index: i
        };
    }

    getTemplateEvents(index: number) {
        return {
            input: (event: Event) => this.onInput(event, index),
            keydown: (event: KeyboardEvent) => this.onKeyDown(event),
            focus: (event: FocusEvent) => this.onFocus.emit(event),
            blur: (event: FocusEvent) => this.onBlur.emit(event),
            paste: (event: ClipboardEvent) => this.onPaste(event)
        };
    }

    onInput(event: Event, index: number) {
        const inputEvent = event as InputEvent;
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (index === 0 && value.length > 1) {
            this.handleOnPaste(value, event);
            event.stopPropagation();
            return;
        }
        this.tokens[index] = value;
        this.updateModel(event);

        if (inputEvent.inputType === 'deleteContentBackward') {
            this.moveToPrev(event);
        } else if (inputEvent.inputType === 'insertText' || inputEvent.inputType === 'deleteContentForward') {
            this.moveToNext(event);
        }
    }

    updateModel(event: Event) {
        const newValue = this.tokens.join('');
        this.writeModelValue(newValue);
        this.onModelChange(newValue);

        this.onChange.emit({
            originalEvent: event,
            value: newValue
        });
    }

    updateTokens() {
        const currentValue = this.value();
        if (currentValue !== null && currentValue !== undefined) {
            if (Array.isArray(currentValue)) {
                this.tokens = [...currentValue];
            } else {
                this.tokens = currentValue.toString().split('');
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
            return this.autofocus();
        }
        return false;
    }

    moveToPrev(event: Event) {
        const prevInput = this.findPrevInput(event.target as HTMLElement);

        if (prevInput) {
            prevInput.focus();
            prevInput.select();
        }
    }

    moveToNext(event: Event) {
        const nextInput = this.findNextInput(event.target as HTMLElement);

        if (nextInput) {
            nextInput.focus();
            nextInput.select();
        }
    }

    findNextInput(element: HTMLElement): HTMLInputElement | undefined {
        const nextElement = element.nextElementSibling as HTMLElement | null;

        if (!nextElement) return;

        return nextElement.nodeName === 'INPUT' ? (nextElement as HTMLInputElement) : this.findNextInput(nextElement);
    }

    findPrevInput(element: HTMLElement): HTMLInputElement | undefined {
        const prevElement = element.previousElementSibling as HTMLElement | null;

        if (!prevElement) return;

        return prevElement.nodeName === 'INPUT' ? (prevElement as HTMLInputElement) : this.findPrevInput(prevElement);
    }

    onInputFocus(event: FocusEvent) {
        (event.target as HTMLInputElement).select();
        this.onFocus.emit(event);
    }

    onInputBlur(event: FocusEvent) {
        this.onBlur.emit(event);
    }

    onKeyDown(event: KeyboardEvent) {
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
                if ((event.target as HTMLInputElement).value.length === 0) {
                    this.moveToPrev(event);
                    event.preventDefault();
                }

                break;

            case 'ArrowRight':
                this.moveToNext(event);
                event.preventDefault();

                break;

            default:
                const target = event.target as HTMLInputElement;
                const hasSelection = target.selectionStart !== target.selectionEnd;
                const isAtMaxLength = this.tokens.join('').length >= this.length();
                const isValidKey = this.integerOnly() ? /^[0-9]$/.test(event.key) : true;

                if (!isValidKey || (isAtMaxLength && event.key !== 'Delete' && !hasSelection)) {
                    event.preventDefault();
                }

                break;
        }
    }

    onPaste(event: ClipboardEvent) {
        if (!this.$disabled() && !this.readonly()) {
            const paste = event.clipboardData?.getData('text') ?? '';

            if (paste.length) {
                this.handleOnPaste(paste, event);
            }

            event.preventDefault();
        }
    }

    handleOnPaste(paste: string, event: Event) {
        const pastedCode = paste.substring(0, this.length() + 1);

        if (!this.integerOnly() || !isNaN(Number(pastedCode))) {
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

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(newValue: any, setModelValue: (value: any) => void) {
        if (newValue) {
            if (Array.isArray(newValue) && newValue.length > 0) {
                this.value.set(newValue.slice(0, this.length()));
            } else {
                this.value.set(newValue.toString().split('').slice(0, this.length()));
            }
        } else {
            this.value.set(newValue);
        }
        setModelValue(this.value());
        this.updateTokens();
    }
}

@NgModule({
    imports: [InputOtp, SharedModule],
    exports: [InputOtp, SharedModule]
})
export class InputOtpModule {}
