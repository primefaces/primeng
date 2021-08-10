import { ElementRef, EventEmitter, ChangeDetectorRef, Injector, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
export declare const RADIO_VALUE_ACCESSOR: any;
export declare class RadioControlRegistry {
    private accessors;
    add(control: NgControl, accessor: RadioButton): void;
    remove(accessor: RadioButton): void;
    select(accessor: RadioButton): void;
    private isSameGroup;
}
export declare class RadioButton implements ControlValueAccessor, OnInit, OnDestroy {
    cd: ChangeDetectorRef;
    private injector;
    private registry;
    value: any;
    formControlName: string;
    name: string;
    disabled: boolean;
    label: string;
    tabindex: number;
    inputId: string;
    ariaLabelledBy: string;
    ariaLabel: string;
    style: any;
    styleClass: string;
    labelStyleClass: string;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    inputViewChild: ElementRef;
    onModelChange: Function;
    onModelTouched: Function;
    checked: boolean;
    focused: boolean;
    control: NgControl;
    constructor(cd: ChangeDetectorRef, injector: Injector, registry: RadioControlRegistry);
    ngOnInit(): void;
    handleClick(event: any, radioButton: any, focus: any): void;
    select(event: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    onChange(event: any): void;
    focus(): void;
    ngOnDestroy(): void;
    private checkName;
    private throwNameError;
}
export declare class RadioButtonModule {
}
