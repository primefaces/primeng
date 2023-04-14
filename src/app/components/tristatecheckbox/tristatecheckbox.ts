import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CheckIcon } from 'primeng/icon/check';
import { TimesIcon } from 'primeng/icon/times';
import { PrimeTemplate, SharedModule } from '../api/shared';

export const TRISTATECHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TriStateCheckbox),
    multi: true
};

@Component({
    selector: 'p-triStateCheckbox',
    template: `
        <div [ngStyle]="style" [ngClass]="{ 'p-checkbox p-component': true, 'p-checkbox-disabled': disabled, 'p-checkbox-focused': focused }" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input
                    #input
                    type="text"
                    [attr.id]="inputId"
                    [name]="name"
                    [attr.tabindex]="tabindex"
                    [readonly]="readonly"
                    [disabled]="disabled"
                    (keyup)="onKeyup($event)"
                    (keydown)="onKeydown($event)"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    inputmode="none"
                />
            </div>
            <div class="p-checkbox-box" (click)="onClick($event, input)" role="checkbox" [attr.aria-checked]="value === true" [ngClass]="{ 'p-highlight': value != null, 'p-disabled': disabled, 'p-focus': focused }">
                <span class="p-checkbox-icon" [ngClass]="value === true ? checkboxTrueIcon : value === false ? checkboxFalseIcon : ''"></span>
                <ng-container *ngIf="value" >
                    <CheckIcon class="p-checkbox-icon" *ngIf="!checkboxTrueIconTemplate"/>
                    <ng-template *ngTemplateOutlet="checkboxTrueIconTemplate;context:{$implicit:'p-checkbox-icon'}"></ng-template>
                </ng-container>
                <ng-container *ngIf="value === false">
                    <TimesIcon class="p-checkbox-icon" *ngIf="!checkboxFalseIconTemplate" />
                    <ng-template *ngTemplateOutlet="checkboxFalseIconTemplate;context:{$implicit:'p-checkbox-icon'}"></ng-template>
                </ng-container>
        </div>
        </div>
        <label class="p-checkbox-label" (click)="onClick($event, input)" [ngClass]="{ 'p-checkbox-label-active': value != null, 'p-disabled': disabled, 'p-checkbox-label-focus': focused }" *ngIf="label" [attr.for]="inputId">{{ label }}</label>
    `,
    providers: [TRISTATECHECKBOX_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class TriStateCheckbox implements ControlValueAccessor {
    constructor(private cd: ChangeDetectorRef) {}

    @Input() disabled: boolean;

    @Input() name: string;

    @Input() ariaLabelledBy: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() label: string;

    @Input() readonly: boolean;

    @Input() checkboxTrueIcon: string;

    @Input() checkboxFalseIcon: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    checkboxTrueIconTemplate: TemplateRef<any>;

    checkboxFalseIconTemplate: TemplateRef<any>;

    focused: boolean;

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    onClick(event: Event, input: HTMLInputElement) {
        if (!this.disabled && !this.readonly) {
            this.toggle(event);
            this.focused = true;
            input.focus();
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    }

    onKeyup(event: KeyboardEvent) {
        if (event.keyCode == 32 && !this.readonly) {
            this.toggle(event);
            event.preventDefault();
        }
    }

    toggle(event: Event) {
        if (this.value == null || this.value == undefined) this.value = true;
        else if (this.value == true) this.value = false;
        else if (this.value == false) this.value = null;

        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'checkboxTrueIcon':
                    this.checkboxTrueIconTemplate = item.template;
                    break;

                case 'checkboxFalseIcon':
                    this.checkboxFalseIconTemplate = item.template;
                    break;
            }
        });
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    writeValue(value: any): void {
        this.value = value;
        this.cd.markForCheck();
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
        this.cd.markForCheck();
    }
}

@NgModule({
    imports: [CommonModule, CheckIcon, TimesIcon],
    exports: [TriStateCheckbox, SharedModule],
    declarations: [TriStateCheckbox]
})
export class TriStateCheckboxModule {}
