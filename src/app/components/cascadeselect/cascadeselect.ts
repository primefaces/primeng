import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    NgModule,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils } from 'primeng/utils';

export const CASCADESELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CascadeSelect),
    multi: true
};

@Component({
    selector: 'p-cascadeSelectSub',
    template: `
        <ul class="p-cascadeselect-panel p-cascadeselect-items" [ngClass]="{ 'p-cascadeselect-panel-root': root }" role="listbox" aria-orientation="horizontal">
            <ng-template ngFor let-option [ngForOf]="options" let-i="index">
                <li [ngClass]="getItemClass(option)" role="none">
                    <div class="p-cascadeselect-item-content" (click)="onOptionClick($event, option)" tabindex="0" (keydown)="onKeyDown($event, option, i)" pRipple>
                        <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
                            <ng-container *ngTemplateOutlet="optionTemplate; context: { $implicit: option }"></ng-container>
                        </ng-container>
                        <ng-template #defaultOptionTemplate>
                            <span class="p-cascadeselect-item-text">{{ getOptionLabelToRender(option) }}</span>
                        </ng-template>
                        <span class="p-cascadeselect-group-icon pi pi-angle-right" *ngIf="isOptionGroup(option)"></span>
                    </div>
                    <p-cascadeSelectSub
                        *ngIf="isOptionGroup(option) && isOptionActive(option)"
                        class="p-cascadeselect-sublist"
                        [selectionPath]="selectionPath"
                        [options]="getOptionGroupChildren(option)"
                        [optionLabel]="optionLabel"
                        [optionValue]="optionValue"
                        [level]="level + 1"
                        (onSelect)="onOptionSelect($event)"
                        (onOptionGroupSelect)="onOptionGroupSelect()"
                        [optionGroupLabel]="optionGroupLabel"
                        [optionGroupChildren]="optionGroupChildren"
                        [parentActive]="isOptionActive(option)"
                        [dirty]="dirty"
                        [optionTemplate]="optionTemplate"
                    >
                    </p-cascadeSelectSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CascadeSelectSub implements OnInit {
    @Input() selectionPath: any[];

    @Input() options: any[];

    @Input() optionGroupChildren: any[];

    @Input() optionTemplate: TemplateRef<any>;

    @Input() level: number = 0;

    @Input() optionLabel: string;

    @Input() optionValue: string;

    @Input() optionGroupLabel: string;

    @Input() dirty: boolean;

    @Input() root: boolean;

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onGroupSelect: EventEmitter<any> = new EventEmitter();

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }
    set parentActive(val) {
        if (!val) {
            this.activeOption = null;
        }

        this._parentActive = val;
    }

    activeOption: any = null;

    _parentActive: boolean;

    cascadeSelect: CascadeSelect;

    constructor(@Inject(forwardRef(() => CascadeSelect)) cascadeSelect, private el: ElementRef) {
        this.cascadeSelect = cascadeSelect as CascadeSelect;
    }

    ngOnInit() {
        if (this.selectionPath && this.options && !this.dirty) {
            for (let option of this.options) {
                if (this.selectionPath.includes(option)) {
                    this.activeOption = option;
                    break;
                }
            }
        }

        if (!this.root) {
            this.position();
        }
    }

    onOptionClick(event, option) {
        if (this.isOptionGroup(option)) {
            this.activeOption = this.activeOption === option ? null : option;

            this.onGroupSelect.emit({
                originalEvent: event,
                value: option
            });
        } else {
            this.onSelect.emit({
                originalEvent: event,
                value: this.getOptionValue(option)
            });
        }
    }

    onOptionSelect(event) {
        this.onSelect.emit(event);
    }

    onOptionGroupSelect(event) {
        this.onGroupSelect.emit(event);
    }

    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    }

    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }

    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : null;
    }

    getOptionGroupChildren(optionGroup) {
        return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[this.level]);
    }

    isOptionGroup(option) {
        return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[this.level]);
    }

    getOptionLabelToRender(option) {
        return this.isOptionGroup(option) ? this.getOptionGroupLabel(option) : this.getOptionLabel(option);
    }

    getItemClass(option) {
        return {
            'p-cascadeselect-item': true,
            'p-cascadeselect-item-group': this.isOptionGroup(option),
            'p-cascadeselect-item-active p-highlight': this.isOptionActive(option)
        };
    }

    isOptionActive(option) {
        return this.activeOption === option;
    }

    onKeyDown(event, option, index) {
        let listItem = event.currentTarget.parentElement;

        switch (event.key) {
            case 'Down':
            case 'ArrowDown':
                var nextItem = this.el.nativeElement.children[0].children[index + 1];
                if (nextItem) {
                    nextItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'Up':
            case 'ArrowUp':
                var prevItem = this.el.nativeElement.children[0].children[index - 1];
                if (prevItem) {
                    prevItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'Right':
            case 'ArrowRight':
                if (this.isOptionGroup(option)) {
                    if (this.isOptionActive(option)) {
                        listItem.children[1].children[0].children[0].children[0].focus();
                    } else {
                        this.activeOption = option;
                    }
                }

                event.preventDefault();
                break;

            case 'Left':
            case 'ArrowLeft':
                this.activeOption = null;

                var parentList = listItem.parentElement.parentElement.parentElement;
                if (parentList) {
                    parentList.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'Enter':
                this.onOptionClick(event, option);

                event.preventDefault();
                break;

            case 'Tab':
            case 'Escape':
                this.cascadeSelect.hide();

                event.preventDefault();
                break;
        }
    }

    position() {
        const parentItem = this.el.nativeElement.parentElement;
        const containerOffset = DomHandler.getOffset(parentItem);
        const viewport = DomHandler.getViewport();
        const sublistWidth = this.el.nativeElement.children[0].offsetParent ? this.el.nativeElement.children[0].offsetWidth : DomHandler.getHiddenElementOuterWidth(this.el.nativeElement.children[0]);
        const itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);

        if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
            this.el.nativeElement.children[0].style.left = '-200%';
        }
    }
}

@Component({
    selector: 'p-cascadeSelect',
    template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    #focusInput
                    type="text"
                    [attr.id]="inputId"
                    readonly
                    [disabled]="disabled"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    (keydown)="onKeyDown($event)"
                    [attr.tabindex]="tabindex"
                    aria-haspopup="listbox"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.label]="inputLabel"
                    [attr.aria-label]="ariaLabel"
                />
            </div>
            <span [ngClass]="labelClass()">
                <ng-container *ngIf="valueTemplate; else defaultValueTemplate">
                    <ng-container *ngTemplateOutlet="valueTemplate; context: { $implicit: value, placeholder: placeholder }"></ng-container>
                </ng-container>
                <ng-template #defaultValueTemplate>
                    {{ label() }}
                </ng-template>
            </span>
            <i *ngIf="filled && !disabled && showClear" class="p-cascadeselect-clear-icon pi pi-times" (click)="clear($event)"></i>
            <div class="p-cascadeselect-trigger" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
                <span class="p-cascadeselect-trigger-icon pi pi-chevron-down"></span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationDone)="onOverlayAnimationDone($event)"
                (onBeforeShow)="onBeforeShow.emit($event)"
                (onShow)="onShow.emit($event)"
                (onBeforeHide)="onBeforeHide.emit($event)"
                (onHide)="onHide.emit($event)"
            >
                <ng-template pTemplate="content">
                    <div #panel class="p-cascadeselect-panel p-component" [class]="panelStyleClass" [ngStyle]="panelStyle">
                        <div class="p-cascadeselect-items-wrapper">
                            <p-cascadeSelectSub
                                [options]="options"
                                [selectionPath]="selectionPath"
                                class="p-cascadeselect-items"
                                [optionLabel]="optionLabel"
                                [optionValue]="optionValue"
                                [level]="0"
                                [optionTemplate]="optionTemplate"
                                [optionGroupLabel]="optionGroupLabel"
                                [optionGroupChildren]="optionGroupChildren"
                                (onSelect)="onOptionSelect($event)"
                                (onGroupSelect)="onOptionGroupSelect($event)"
                                [dirty]="dirty"
                                [root]="true"
                            >
                            </p-cascadeSelectSub>
                        </div>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focused || overlayVisible',
        '[class.p-cascadeselect-clearable]': 'showClear && !disabled'
    },
    providers: [CASCADESELECT_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./cascadeselect.css']
})
export class CascadeSelect implements OnInit, AfterContentInit {
    @Input() styleClass: string;

    @Input() style: any;

    @Input() options: any[];

    @Input() optionLabel: string;

    @Input() optionValue: string;

    @Input() optionGroupLabel: string;

    @Input() optionGroupChildren: any[];

    @Input() placeholder: string;

    @Input() value: string;

    @Input() dataKey: string;

    @Input() inputId: string;

    @Input() tabindex: string;

    @Input() ariaLabelledBy: string;

    @Input() inputLabel: string;

    @Input() ariaLabel: string;

    @Input() appendTo: any;

    @Input() disabled: boolean;

    @Input() rounded: boolean;

    @Input() showClear: boolean = false;

    @Input() panelStyleClass: string;

    @Input() panelStyle: object;

    @Input() overlayOptions: OverlayOptions;

    @ViewChild('focusInput') focusInputEl: ElementRef;

    @ViewChild('container') containerEl: ElementRef;

    @ViewChild('panel') panelEl: ElementRef;

    @ViewChild('overlay') overlayViewChild: Overlay;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onGroupChange: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    /* @deprecated */
    _showTransitionOptions: string;
    @Input() get showTransitionOptions(): string {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val: string) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    /* @deprecated */
    _hideTransitionOptions: string;
    @Input() get hideTransitionOptions(): string {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val: string) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    selectionPath: any = null;

    focused: boolean = false;

    filled: boolean = false;

    overlayVisible: boolean = false;

    dirty: boolean = false;

    valueTemplate: TemplateRef<any>;

    optionTemplate: TemplateRef<any>;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private el: ElementRef, private cd: ChangeDetectorRef, private config: PrimeNGConfig, public overlayService: OverlayService) {}

    ngOnInit() {
        this.updateSelectionPath();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'value':
                    this.valueTemplate = item.template;
                    break;
                case 'option':
                    this.optionTemplate = item.template;
                    break;
            }
        });
    }

    onOptionSelect(event) {
        this.value = event.value;
        this.updateSelectionPath();
        this.onModelChange(this.value);
        this.onChange.emit(event);
        this.hide();
        this.focusInputEl.nativeElement.focus();
    }

    onOptionGroupSelect(event) {
        this.dirty = true;
        this.onGroupChange.emit(event);
    }

    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    }

    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }

    getOptionGroupChildren(optionGroup, level) {
        return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[level]);
    }

    isOptionGroup(option, level) {
        return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
    }

    updateSelectionPath() {
        let path;
        if (this.value != null && this.options) {
            for (let option of this.options) {
                path = this.findModelOptionInGroup(option, 0);
                if (path) {
                    break;
                }
            }
        }

        this.selectionPath = path;
        this.updateFilledState();
    }

    updateFilledState() {
        this.filled = !(this.selectionPath == null || this.selectionPath.length == 0);
    }

    findModelOptionInGroup(option, level) {
        if (this.isOptionGroup(option, level)) {
            let selectedOption;
            for (let childOption of this.getOptionGroupChildren(option, level)) {
                selectedOption = this.findModelOptionInGroup(childOption, level + 1);
                if (selectedOption) {
                    selectedOption.unshift(option);
                    return selectedOption;
                }
            }
        } else if (ObjectUtils.equals(this.value, this.getOptionValue(option), this.dataKey)) {
            return [option];
        }

        return null;
    }

    show() {
        this.overlayVisible = true;
    }

    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }

    clear(event) {
        this.value = null;
        this.selectionPath = null;
        this.updateFilledState();
        this.onClear.emit();
        this.onModelChange(this.value);
        event.stopPropagation();
        this.cd.markForCheck();
    }

    onClick(event) {
        if (this.disabled) {
            return;
        }

        if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target)) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
            }

            this.focusInputEl.nativeElement.focus();
        }
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
    }

    onOverlayAnimationDone(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.dirty = false;
                break;
        }
    }

    writeValue(value: any): void {
        this.value = value;
        this.updateSelectionPath();
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

    label() {
        if (this.selectionPath) {
            return this.getOptionLabel(this.selectionPath[this.selectionPath.length - 1]);
        }

        return this.placeholder || 'p-emptylabel';
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'Down':
            case 'ArrowDown':
                if (this.overlayVisible) {
                    DomHandler.findSingle(this.panelEl.nativeElement, '.p-cascadeselect-item').children[0].focus();
                } else if (event.altKey && this.options && this.options.length) {
                    this.show();
                }
                event.preventDefault();
                break;

            case 'Space':
            case 'Enter':
                if (!this.overlayVisible) this.show();
                else this.hide();

                event.preventDefault();
                break;

            case 'Tab':
            case 'Escape':
                if (this.overlayVisible) {
                    this.hide();
                    event.preventDefault();
                }
                break;
        }
    }

    containerClass() {
        return {
            'p-cascadeselect p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-focus': this.focused
        };
    }

    labelClass() {
        return {
            'p-cascadeselect-label': true,
            'p-inputtext': true,
            'p-placeholder': this.label() === this.placeholder,
            'p-cascadeselect-label-empty': !this.value && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, SharedModule, RippleModule],
    exports: [CascadeSelect, OverlayModule, CascadeSelectSub, SharedModule],
    declarations: [CascadeSelect, CascadeSelectSub]
})
export class CascadeSelectModule {}
