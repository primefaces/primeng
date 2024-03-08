import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Injector,
    Input,
    NgModule,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    forwardRef,
    signal
} from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { InputTextModule } from '../inputtext/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Nullable } from 'primeng/ts-helpers';

export const INPUT_OTP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputOtp),
    multi: true
};
/**
 * InputNumber is an input component to provide numerical input.
 * @group Components
 */
@Component({
    selector: 'p-inputOtp',
    template: `
        <ng-container *ngFor="let i of getRange(length); trackBy: trackByFn">
            <ng-container *ngIf="!inputTemplate">
                <input
                    type="text"
                    pInputText
                    [maxLength]="1"
                    [type]="inputType"
                    class="p-inputotp-input"
                    [inputmode]="inputMode"
                    [variant]="variant"
                    [readonly]="readonly"
                    [disabled]="disabled"
                    [invalid]="invalid"
                    [tabindex]="tabindex"
                    [unstyled]="unstyled"
                    (input)="onInput($event, i - 1)"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (paste)="onPaste($event)"
                    (keydown)="onKeyDown($event)"
                />
            </ng-container>
            <ng-container *ngIf="inputTemplate">
                <ng-container *ngTemplateOutlet="inputTemplate; context: { events: getTemplateEvents(i - 1), attrs: getTemplateAttrs(i - 1), index: i }"> </ng-container>
            </ng-container>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./inputotp.css'],
    providers: [INPUT_OTP_VALUE_ACCESSOR]
})
export class InputOtp {
    modelValue = signal<any>(null);

    @Input() invalid: boolean = false;

    @Input() disabled: boolean = false;

    @Input() readonly: boolean = false;

    @Input() variant: string | null = null;

    @Input() tabindex: number | null = null;

    @Input() length: number = 4;

    @Input() mask: boolean = false;

    @Input() integerOnly: boolean = false;

    @Output() updateModelValue = new EventEmitter<string>();

    @Output() onChange = new EventEmitter<any>();

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    inputTemplate: Nullable<TemplateRef<any>>;

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

    tokens: any = [];

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    get inputMode(): string {
        return this.integerOnly ? 'number' : 'text';
    }

    get inputType(): string {
        return this.mask ? 'password' : 'text';
    }

    constructor(public cd: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.modelValue) {
            const newValue = changes.modelValue.currentValue;

            this.tokens = newValue ? newValue.split('') : new Array(this.length);
            this.cd.markForCheck();
        }
    }

    getTemplateAttrs(index) {
        return {
            value: this.tokens[index]
        };
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
        this.tokens[index] = event.target.value;
        this.updateModel(event);

        if (event.inputType === 'deleteContentBackward') {
            this.moveToPrev(event);
        } else if (event.inputType === 'insertText' || event.inputType === 'deleteContentForward') {
            this.moveToNext(event);
        }
    }

    updateModel(event: any) {
        const newValue = this.tokens.join('');

        this.onModelChange(newValue);
        this.modelValue = newValue;

        this.onChange.emit({
            originalEvent: event,
            value: newValue
        });
    }

    writeValue(model: any): void {
        this.modelValue = model;
        this.cd.markForCheck();
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
        const keyCode = event.keyCode;

        switch (keyCode) {
            case 37:
                this.moveToPrev(event);
                event.preventDefault();

                break;

            case 38:
            case 40:
                event.preventDefault();

                break;

            case 8:
                if (event.target.value.length === 0) {
                    this.moveToPrev(event);
                    event.preventDefault();
                }

                break;

            case 40:
                event.preventDefault();

                break;

            case 39:
                this.moveToNext(event);
                event.preventDefault();

                break;

            default:
                if (this.integerOnly && !(event.keyCode >= 48 && event.keyCode <= 57)) {
                    event.preventDefault();
                }

                break;
        }
    }
    onPaste(event) {
        let paste = event.clipboardData.getData('text');

        if (paste.length) {
            let pastedCode = paste.substring(0, this.length + 1);

            if (!this.integerOnly || !isNaN(pastedCode)) {
                this.tokens = pastedCode.split('');
                this.updateModel(event);
            }
        }

        event.preventDefault();
    }
    getRange(n: number): number[] {
        return Array.from({ length: n }, (_, index) => index + 1);
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;
                default:
                    this.inputTemplate = item.template;
                    break;
            }
        });
    }
    trackByFn(index: number, item: any): any {
        return index;
    }
}

@NgModule({
    imports: [CommonModule, InputTextModule],
    exports: [InputOtp, SharedModule],
    declarations: [InputOtp]
})
export class InputOtpModule {}
