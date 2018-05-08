import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,Input,Output,Renderer2,EventEmitter,ContentChildren,
        QueryList,ViewChild,TemplateRef,forwardRef,ChangeDetectorRef,NgZone} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/selectitem';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const DROPDOWN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Dropdown),
  multi: true
};

@Component({
    selector: 'p-dropdown',
    template: `
         <div #container [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,
            'ui-state-disabled':disabled,'ui-dropdown-open':panelVisible,'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}"
            (click)="onMouseclick($event)" [ngStyle]="style" [class]="styleClass">
            <div class="ui-helper-hidden-accessible" *ngIf="autoWidth">
                <select [required]="required" [attr.name]="name" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" tabindex="-1" aria-hidden="true">
                    <option *ngIf="placeholder">{{placeholder}}</option>
                    <ng-container *ngIf="group">
                        <optgroup *ngFor="let option of options" [attr.label]="option.label">
                            <option *ngFor="let option of option.items" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
                        <optgroup>
                    </ng-container>
                    <ng-container *ngIf="!group">
                        <option *ngFor="let option of options" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
                    </ng-container>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in [attr.id]="inputId" type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" readonly (focus)="onInputFocus($event)" role="listbox"
                    (blur)="onInputBlur($event)" (keydown)="onKeydown($event)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.autofocus]="autofocus">
            </div>
            <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}" *ngIf="!editable && (label != null)">
                <ng-container *ngIf="!selectedItemTemplate">{{label||'empty'}}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
            </label>
            <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}" *ngIf="!editable && (label == null)">{{placeholder||'empty'}}</label>
            <input #editableInput type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" class="ui-dropdown-label ui-inputtext ui-corner-all" *ngIf="editable" [disabled]="disabled" [attr.placeholder]="placeholder"
                        (click)="onEditableInputClick($event)" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
            <i class="ui-dropdown-clear-icon fa fa-close" (click)="clear($event)" *ngIf="value != null && showClear && !disabled"></i>
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right">
                <span class="ui-dropdown-trigger-icon ui-clickable" [ngClass]="dropdownIcon"></span>
            </div>
            <div #panel [ngClass]="'ui-dropdown-panel ui-widget-content ui-corner-all ui-shadow'" [@panelState]="panelVisible ? 'visible' : 'hidden'"
                [style.display]="panelVisible ? 'block' : 'none'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                <div *ngIf="filter" class="ui-dropdown-filter-container" (input)="onFilter($event)" (click)="$event.stopPropagation()">
                    <input #filter type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder"
                    (keydown.enter)="$event.preventDefault()" (keydown)="onKeydown($event)">
                    <span class="ui-dropdown-filter-icon fa fa-search"></span>
                </div>
                <div #itemswrapper class="ui-dropdown-items-wrapper" [style.max-height]="scrollHeight||'auto'">
                    <ul class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" *ngIf="lazy ? panelVisible : true">
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToDisplay">
                                <li class="ui-dropdown-item-group">
                                    <span *ngIf="!groupTemplate">{{optgroup.label||'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-options let-selectedOption="selectedOption">
                            <li *ngFor="let option of options;let i=index" [ngClass]="{'ui-dropdown-item ui-corner-all':true, 'ui-state-highlight':(selectedOption == option), 'ui-dropdown-item-empty':!option.label||option.label.length === 0}" 
                                    (click)="onItemClick($event, option)">
                                <span *ngIf="!itemTemplate">{{option.label||'empty'}}</span>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option}"></ng-container>
                            </li>
                        </ng-template>
                        <li *ngIf="filter && optionsToDisplay && optionsToDisplay.length === 0">{{emptyFilterMessage}}</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('panelState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focused'
    },
    providers: [DomHandler,ObjectUtils,DROPDOWN_VALUE_ACCESSOR]
})
export class Dropdown implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;
    
    @Input() name: string;

    @Input() style: any;
    
    @Input() panelStyle: any;

    @Input() styleClass: string;
    
    @Input() panelStyleClass: string;
    
    @Input() disabled: boolean;
    
    @Input() readonly: boolean;
    
    @Input() autoWidth: boolean = true;
    
    @Input() required: boolean;
    
    @Input() editable: boolean;
    
    @Input() appendTo: any;

    @Input() tabindex: number;
    
    @Input() placeholder: string;
    
    @Input() filterPlaceholder: string;

    @Input() inputId: string;
    
    @Input() dataKey: string;
    
    @Input() filterBy: string = 'label';
    
    @Input() lazy: boolean = true;
    
    @Input() autofocus: boolean;
    
    @Input() resetFilterOnHide: boolean = false;
    
    @Input() dropdownIcon: string = 'fa fa-fw fa-caret-down';
    
    @Input() optionLabel: string;

    @Input() autoDisplayFirst: boolean = true;

    @Input() group: boolean;

    @Input() showClear: boolean;

    @Input() emptyFilterMessage: string = 'No results found';
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('panel') panelViewChild: ElementRef;
    
    @ViewChild('itemswrapper') itemsWrapperViewChild: ElementRef;

    @ViewChild('filter') filterViewChild: ElementRef;
    
    @ViewChild('in') focusViewChild: ElementRef;
    
    @ViewChild('editableInput') editableInputViewChild: ElementRef;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;

    public groupTemplate: TemplateRef<any>;

    public selectedItemTemplate: TemplateRef<any>;
    
    selectedOption: any;
    
    _options: any[];
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    optionsToDisplay: any[];
    
    hover: boolean;
    
    focused: boolean;

    filled: boolean;
    
    public panelVisible: boolean = false;
    
    public shown: boolean;
    
    public documentClickListener: any;
    
    public optionsChanged: boolean;
    
    public panel: HTMLDivElement;
    
    public container: HTMLDivElement;
    
    public itemsWrapper: HTMLDivElement;
    
    public initialized: boolean;
    
    public selfClick: boolean;
    
    public itemClick: boolean;

    public clearClick: boolean;
    
    public hoveredItem: any;
    
    public selectedOptionUpdated: boolean;
    
    public filterValue: string;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, private cd: ChangeDetectorRef,
                public objectUtils: ObjectUtils, public zone: NgZone) {}
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                break;

                case 'group':
                    this.groupTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }
    
    ngOnInit() {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
    }
    
    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
        this.optionsToDisplay = this._options;
        this.updateSelectedOption(this.value);
        this.optionsChanged = true;
        
        if(this.filterValue && this.filterValue.length) {
            this.activateFilter();
        }
    }
    
    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        this.panel = <HTMLDivElement> this.panelViewChild.nativeElement;
        this.itemsWrapper = <HTMLDivElement> this.itemsWrapperViewChild.nativeElement;
        
        if(this.editable) {
            this.updateEditableLabel();
        }
        
        this.updateDimensions();
        this.initialized = true;
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
    }
    
    get label(): string {
        return (this.selectedOption ? this.selectedOption.label : null);
    }
    
    updateEditableLabel(): void {
        if(this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value||'');
        }
    }
    
    onItemClick(event, option) {
        this.itemClick = true;
        this.selectItem(event, option);
        this.focusViewChild.nativeElement.focus();
        this.filled = true;
        this.hide();
    }
    
    selectItem(event, option) {
        if(this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option.value;
            
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    
    ngAfterViewChecked() {
        if(this.shown) {
            this.onShow();
            this.shown = false;
        }
        
        if(this.optionsChanged && this.panelVisible) {
            this.optionsChanged = false;
            
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.updateDimensions();
                    this.alignPanel();
                }, 1);
            });
        }
        
        if(this.selectedOptionUpdated && this.itemsWrapper) {
            this.updateDimensions();
            let selectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            if(selectedItem) {
                this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.panel, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    }
    
    writeValue(value: any): void {
        if(this.filter) {
            this.resetFilter();
        }
        
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    }
    
    resetFilter(): void {
        if(this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
        
        this.optionsToDisplay = this.options;
    }
    
    updateSelectedOption(val: any): void {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if(this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        this.selectedOptionUpdated = true;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
    
    updateDimensions() {
        if(this.autoWidth && this.el.nativeElement && this.el.nativeElement.children[0]) {
            let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if(select && !this.style||(this.style && (!this.style['width']&&!this.style['min-width']))) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    }
    
    onMouseclick(event) {
        if(this.disabled||this.readonly) {
            return;
        }

        this.onClick.emit(event);
        
        this.selfClick = true;
        this.clearClick = this.domHandler.hasClass(event.target, 'ui-dropdown-clear-icon');
        
        if(!this.itemClick && !this.clearClick) {
            this.focusViewChild.nativeElement.focus();
            
            if(this.panelVisible)
                this.hide();
            else {
                this.show();

                if (this.filterViewChild != undefined) {
                    setTimeout(() => {
                        this.filterViewChild.nativeElement.focus();
                    }, 200);
                }
            }
        }
    }
    
    onEditableInputClick(event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    }
    
    onEditableInputFocus(event) {
        this.focused = true;
        this.hide();
    }
    
    onEditableInputChange(event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    
    onShow() {
        this.bindDocumentClickListener();

        if(this.options && this.options.length) {
            this.alignPanel();
            
            let selectedListItem = this.domHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
            if(selectedListItem) {
                this.domHandler.scrollInView(this.itemsWrapper, selectedListItem);
            }
        }
    }
    
    show() {
        if(this.appendTo) {
            this.panel.style.minWidth = this.domHandler.getWidth(this.container) + 'px';
        }
        
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.panelVisible = true;
        this.shown = true;
    }
    
    hide() {
        this.panelVisible = false;
        
        if(this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
    }
    
    alignPanel() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
    }
    
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    
    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onKeydown(event) {
        if(this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }

        switch(event.which) {
            //down
            case 40:
                if(!this.panelVisible && event.altKey) {
                    this.show();
                }
                else {
                    if(this.group) {
                        let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        
                        if(selectedItemIndex !== -1) {
                            let nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if(nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if(this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0].items[0]);
                        }
                    }
                    else {
                        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        let nextItemIndex = selectedItemIndex + 1;
                        if(nextItemIndex != (this.optionsToDisplay.length)) {
                            this.selectItem(event, this.optionsToDisplay[nextItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0]);
                        }
                    }
                }
                
                event.preventDefault();
                
            break;
            
            //up
            case 38:
                if(this.group) {
                    let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    if(selectedItemIndex !== -1) {
                        let prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if(prevItemIndex >= 0) {
                            this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if(prevItemIndex < 0) {
                            let prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if(prevGroup) {
                                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    if(selectedItemIndex > 0) {
                        let prevItemIndex = selectedItemIndex - 1;
                        this.selectItem(event, this.optionsToDisplay[prevItemIndex]);
                        this.selectedOptionUpdated = true;
                    }
                }

                event.preventDefault();
            break;

            //space
            case 32:
            case 32:
                if(!this.panelVisible){
                    this.show();
                    event.preventDefault();
                }
            break;
            
            //enter
            case 13:
                if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                    this.hide();
                }
                
                event.preventDefault();
            break;
            
            //escape and tab
            case 27:
            case 9:
                this.hide();
            break;
        }
    }
    
    findOptionIndex(val: any, opts: any[]): number {
        let index: number = -1;
        if(opts) {
            for(let i = 0; i < opts.length; i++) {
                if((val == null && opts[i].value == null) || this.objectUtils.equals(val, opts[i].value, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }

    findOptionGroupIndex(val: any, opts: any[]): any {
        let groupIndex, itemIndex;

        if(opts) {
            for(let i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, opts[i].items);

                if(itemIndex !== -1) {
                    break;
                }
            }
        }

        if(itemIndex !== -1) {
            return {groupIndex: groupIndex, itemIndex: itemIndex};
        }
        else {
            return -1;
        }
    }
    
    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem {
        if(this.group && !inGroup) {
            let opt: SelectItem;
            if(opts && opts.length) {
                for(let optgroup of opts) {
                    opt = this.findOption(val, optgroup.items, true);
                    if(opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            let index: number = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    }
    
    onFilter(event): void {
        let inputValue = event.target.value.toLowerCase();
        if(inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
        }
        
        this.optionsChanged = true;
    }
    
    activateFilter() {
        let searchFields: string[] = this.filterBy.split(',');
        if(this.options && this.options.length) {
            if(this.group) {
                let filteredGroups = [];
                for(let optgroup of this.options) {
                    let filteredSubOptions = this.objectUtils.filter(optgroup.items, searchFields, this.filterValue);
                    if(filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({
                            label: optgroup.label,
                            value: optgroup.value,
                            items: filteredSubOptions
                        });
                    }
                }

                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = this.objectUtils.filter(this.options, searchFields, this.filterValue);
            }

            this.optionsChanged = true;
        }
    }
    
    applyFocus(): void {
        if(this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }

    focus(): void {
        this.applyFocus();
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.selfClick&&!this.itemClick) {
                    this.panelVisible = false;
                    this.unbindDocumentClickListener();
                }
                
                this.selfClick = false;
                this.itemClick = false;
                this.cd.markForCheck();
            });
        }
    }
    
    unbindDocumentClickListener() {
        if(this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    updateFilledState() {
        this.filled = (this.selectedOption != null);
    }

    clear(event: Event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    }
    
    ngOnDestroy() {
        this.initialized = false;
        
        this.unbindDocumentClickListener();
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    }
}

@NgModule({
    imports: [CommonModule,SharedModule],
    exports: [Dropdown,SharedModule],
    declarations: [Dropdown]
})
export class DropdownModule { }
