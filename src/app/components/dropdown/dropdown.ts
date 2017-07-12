import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,Input,Output,Renderer2,EventEmitter,ContentChildren,
        QueryList,ViewChild,TemplateRef,forwardRef,ChangeDetectorRef} from '@angular/core';
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
            'ui-state-disabled':disabled,'ui-dropdown-open':panelVisible,'ui-state-focus':focus}"
            (click)="onMouseclick($event)" [ngStyle]="style" [class]="styleClass">
            <div class="ui-helper-hidden-accessible" *ngIf="autoWidth">
                <select [required]="required" name="options" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" tabindex="-1" aria-hidden="true">
                    <option *ngFor="let option of options" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in [attr.id]="inputId" type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" readonly (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onKeydown($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
            </div>
            <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':!label}" *ngIf="!editable">{{label||'empty'}}</label>
            <input #editableInput type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" class="ui-dropdown-label ui-inputtext ui-corner-all" *ngIf="editable" [disabled]="disabled" [attr.placeholder]="placeholder"
                        (click)="onEditableInputClick($event)" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right">
                <span class="fa fa-fw fa-caret-down ui-clickable"></span>
            </div>
            <div #panel [ngClass]="'ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow'" [@panelState]="panelVisible ? 'visible' : 'hidden'"
                [style.display]="panelVisible ? 'block' : 'none'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                <div *ngIf="filter" class="ui-dropdown-filter-container" (input)="onFilter($event)" (click)="$event.stopPropagation()">
                    <input #filter type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder"
                    (keydown.enter)="$event.preventDefault()">
                    <span class="fa fa-search"></span>
                </div>
                <div #itemswrapper class="ui-dropdown-items-wrapper" [style.max-height]="scrollHeight||'auto'">
                    <ul class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" *ngIf="panelVisible">
                        <li *ngFor="let option of optionsToDisplay;let i=index" 
                            [ngClass]="{'ui-dropdown-item ui-corner-all':true, 'ui-state-highlight':(selectedOption == option), 
                            'ui-dropdown-item-empty':!option.label||option.label.length === 0}"
                            (click)="onItemClick($event, option)">
                            <span *ngIf="!itemTemplate">{{option.label||'empty'}}</span>
                            <ng-template [pTemplateWrapper]="itemTemplate" [item]="option" *ngIf="itemTemplate"></ng-template>
                        </li>
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
    providers: [DomHandler,ObjectUtils,DROPDOWN_VALUE_ACCESSOR]
})
export class Dropdown implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;

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
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
        
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('panel') panelViewChild: ElementRef;
    
    @ViewChild('itemswrapper') itemsWrapperViewChild: ElementRef;

    @ViewChild('filter') filterViewChild: ElementRef;
    
    @ViewChild('in') focusViewChild: ElementRef;
    
    @ViewChild('editableInput') editableInputViewChild: ElementRef;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;
        
    selectedOption: SelectItem;
    
    _options: SelectItem[];
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    optionsToDisplay: SelectItem[];
    
    hover: boolean;
    
    focus: boolean;
    
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
    
    public hoveredItem: any;
        
    public selectedOptionUpdated: boolean;
    
    public filterValue: string;
        
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, private cd: ChangeDetectorRef, public objectUtils: ObjectUtils) {}
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
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
    
    @Input() get options(): SelectItem[] {
        return this._options;
    }

    set options(opts:SelectItem[]) {
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
        return (this.selectedOption ? this.selectedOption.label : this.placeholder);
    }
    
    updateEditableLabel(): void {
        if(this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = this.value || (this.selectedOption ? this.selectedOption.label : '');
        }
    }
        
    onItemClick(event, option) {
        this.itemClick = true;
        this.selectItem(event, option);
        this.focusViewChild.nativeElement.focus();
                                
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
            this.alignPanel();
        }
        
        if(this.selectedOptionUpdated && this.itemsWrapper) {
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
        if(!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
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
        if(this.autoWidth) {
            let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if(!this.style||(!this.style['width']&&!this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    }
        
    onMouseclick(event) {
        if(this.disabled||this.readonly) {
            return;
        }
        
        this.selfClick = true;
        
        if(!this.itemClick) {
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
        this.focus = true;
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
        if(this.options && this.options.length) {
            this.alignPanel();
            this.bindDocumentClickListener();
            
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
    }
    
    alignPanel() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);
    }
    
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    
    onInputBlur(event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onKeydown(event) {
        if(this.readonly) {
            return;
        }
        
        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;

        switch(event.which) {
            //down
            case 40:
                if(!this.panelVisible && event.altKey) {
                    this.show();
                }
                else {
                    if(selectedItemIndex != -1) {
                        let nextItemIndex = selectedItemIndex + 1;
                        if(nextItemIndex != (this.optionsToDisplay.length)) {
                            this.selectedOption = this.optionsToDisplay[nextItemIndex];
                            this.selectedOptionUpdated = true;
                            this.selectItem(event, this.selectedOption);
                        }
                    }
                    else if(this.optionsToDisplay) {
                        this.selectedOption = this.optionsToDisplay[0];
                    }                    
                }
                
                event.preventDefault();
                
            break;
            
            //up
            case 38:
                if(selectedItemIndex > 0) {
                    let prevItemIndex = selectedItemIndex - 1;
                    this.selectedOption = this.optionsToDisplay[prevItemIndex];
                    this.selectedOptionUpdated = true;
                    this.selectItem(event, this.selectedOption);
                }
                
                event.preventDefault();
            break;

            //space
            case 32:
                this.panelVisible = !this.panelVisible;
                
                event.preventDefault();
            break;
            
            //enter
            case 13:                                        
                this.hide();

                event.preventDefault();
            break;
            
            //escape and tab
            case 27:
            case 9:
                this.panelVisible = false;
            break;
        }
    }
                    
    findOptionIndex(val: any, opts: SelectItem[]): number {        
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
    
    findOption(val: any, opts: SelectItem[]): SelectItem {
        let index: number = this.findOptionIndex(val, opts);
        return (index != -1) ? opts[index] : null;
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
            this.optionsToDisplay = this.objectUtils.filter(this.options, searchFields, this.filterValue);
            this.optionsChanged = true;
        }
    }
    
    applyFocus(): void {
        if(this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
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
