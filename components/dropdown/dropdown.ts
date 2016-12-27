import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,Renderer,EventEmitter,ContentChild,ViewChild,TemplateRef,IterableDiffers,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/api';
import {SharedModule} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
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
            'ui-state-focus':focus,'ui-state-disabled':disabled,'ui-dropdown-open':panelVisible}" 
            (click)="onMouseclick($event,in)" [ngStyle]="style" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <select [required]="required" tabindex="-1">
                    <option *ngFor="let option of options" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onKeydown($event)" [disabled]="disabled">
            </div>
            <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':!label}" *ngIf="!editable">{{label||'empty'}}</label>
            <input type="text" class="ui-dropdown-label ui-inputtext ui-corner-all" *ngIf="editable" [value]="label" [disabled]="disabled"
                        (click)="onEditableInputClick($event)" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right" [ngClass]="{'ui-state-focus':focus}">
                <span class="fa fa-fw fa-caret-down ui-c"></span>
            </div>
            <div #panel class="ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow" 
                [style.display]="panelVisible ? 'block' : 'none'">
                <div *ngIf="filter" class="ui-dropdown-filter-container" (input)="onFilter($event)" (click)="$event.stopPropagation()">
                    <input type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all">
                    <span class="fa fa-search"></span>
                </div>
                <div #itemswrapper class="ui-dropdown-items-wrapper" [style.max-height]="scrollHeight||'auto'">
                    <ul class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
                        <li *ngFor="let option of optionsToDisplay;let i=index" 
                            [ngClass]="{'ui-dropdown-item ui-corner-all':true, 'ui-state-highlight':(selectedOption == option), 
                            'ui-dropdown-item-empty':!option.label||option.label.length === 0}"
                            (click)="onItemClick($event, option)">
                            <span *ngIf="!itemTemplate">{{option.label||'empty'}}</span>
                            <template [pTemplateWrapper]="itemTemplate" [item]="option" *ngIf="itemTemplate"></template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler,DROPDOWN_VALUE_ACCESSOR]
})
export class Dropdown implements OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,ControlValueAccessor {

    @Input() options: SelectItem[];

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() disabled: boolean;
    
    @Input() autoWidth: boolean = true;
    
    @Input() required: boolean;
    
    @Input() editable: boolean;
    
    @Input() appendTo: any;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('panel') panelViewChild: ElementRef;
    
    @ViewChild('itemswrapper') itemsWrapperViewChild: ElementRef;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }
        
    selectedOption: SelectItem;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    optionsToDisplay: SelectItem[];
    
    hover: boolean;
    
    focus: boolean;
    
    differ: any;
    
    public panelVisible: boolean = false;
    
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
            
    ngOnInit() {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
                
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if(!this.selfClick&&!this.itemClick) {
                this.panelVisible = false;
            }
            
            this.selfClick = false;
            this.itemClick = false;
        });
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.options);
        
        if(changes && this.initialized) {
            this.optionsToDisplay = this.options;
            this.updateSelectedOption(this.value);
            this.optionsChanged = true;
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
        return (this.editable && this.value) ? this.value : (this.selectedOption ? this.selectedOption.label : null);
    }
    
    onItemClick(event, option) {
        this.itemClick = true;
        this.selectItem(event, option);
                                
        this.hide();
    }
    
    selectItem(event, option) {
        this.selectedOption = option;
        this.value = option.value;
                
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    
    ngAfterViewChecked() {
        if(this.optionsChanged) {
            this.domHandler.relativePosition(this.panel, this.container);
            this.optionsChanged = false;
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
        this.value = value;
        this.updateSelectedOption(value);
    }
    
    updateSelectedOption(val: any): void {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if(!this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
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
        
    onMouseclick(event,input) {
        if(this.disabled) {
            return;
        }
        
        this.selfClick = true;
        
        if(!this.itemClick) {
            input.focus();
            
            if(this.panelVisible)
                this.hide();
            else {
                this.show(this.panel,this.container);
            }
        }
    }
    
    onEditableInputClick(event) {
        this.itemClick = true;
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
    
    show(panel,container) {
        if(this.options && this.options.length) {
            this.panelVisible = true;
            panel.style.zIndex = ++DomHandler.zindex;
            
             if(this.appendTo)
                this.domHandler.absolutePosition(panel, container);
            else
                this.domHandler.relativePosition(panel, container);
                
            this.domHandler.fadeIn(panel,250);
        }
    }
    
    hide() {
        this.panelVisible = false;
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
        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;

        switch(event.which) {
            //down
            case 40:
                if(!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
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
    
    findListItem(element) {
        if(element.nodeName == 'LI') {
            return element;
        }
        else {
            let parent = element.parentElement;
            while(parent.nodeName != 'LI') {
                parent = parent.parentElement;
            }
            return parent;
        }
    }
                
    findOptionIndex(val: any, opts: SelectItem[]): number {        
        let index: number = -1;
        if(opts) {
            for(let i = 0; i < opts.length; i++) {
                if((val == null && opts[i].value == null) || this.domHandler.equals(val, opts[i].value)) {
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
        if(this.options && this.options.length) {
            let val = event.target.value.toLowerCase();
            this.optionsToDisplay = [];
            for(let i = 0; i < this.options.length; i++) {
                let option = this.options[i];
                if(option.label.toLowerCase().indexOf(val) > -1) {
                    this.optionsToDisplay.push(option);
                }
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
    
    ngOnDestroy() {
        this.initialized = false;
        
        if(this.documentClickListener) {
            this.documentClickListener();
        }
        
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
