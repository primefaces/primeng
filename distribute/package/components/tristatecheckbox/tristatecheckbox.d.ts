import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const TRISTATECHECKBOX_VALUE_ACCESSOR: any;
export declare class TriStateCheckbox implements ControlValueAccessor {
    private cd;
    constructor(cd: ChangeDetectorRef);
    disabled: boolean;
    name: string;
    tabindex: number;
    inputId: string;
    style: any;
    styleClass: string;
    onChange: EventEmitter<any>;
    focus: boolean;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    onClick(event: Event, input: HTMLInputElement): void;
    onKeydown(event: KeyboardEvent): void;
    onKeyup(event: KeyboardEvent): void;
    toggle(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
}
export declare class TriStateCheckboxModule {
}
