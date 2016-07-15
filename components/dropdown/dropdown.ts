import {Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,Renderer,EventEmitter,ContentChild,TemplateRef,IterableDiffers,forwardRef,Provider} from '@angular/core';
import {SelectItem,TemplateWrapper} from '../common';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const DROPDOWN_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => Dropdown),
    multi: true
});

@Component({
    selector: 'p-dropdown',
    template: `
         <div [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,
            'ui-state-hover':hover&&!disabled,'ui-state-focus':focus,'ui-state-disabled':disabled,'ui-dropdown-open':panelVisible}" 
            (mouseenter)="onMouseenter($event)" (mouseleave)="onMouseleave($event)" (click)="onMouseclick($event,in)" [ngStyle]="style" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <select [required]="required" tabindex="-1">
                    <option *ngFor="let option of options" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly (focus)="onFocus($event)" (blur)="onBlur($event)" (keydown)="onKeydown($event)">
            </div>
            <label class="ui-dropdown-label ui-inputtext ui-corner-all">{{label ? label : '&nbsp;'}}</label>
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right" [ngClass]="{'ui-state-hover':hover&&!disabled,'ui-state-focus':focus}">
                <span class="fa fa-fw fa-caret-down"></span>
            </div>
            <div class="ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow" 
                [style.display]="panelVisible ? 'block' : 'none'">
                <div *ngIf="filter" class="ui-dropdown-filter-container" (input)="onFilter($event)" (click)="$event.stopPropagation()">
                    <input type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all">
                    <span class="fa fa-search"></span>
                </div>
                <div class="ui-dropdown-items-wrapper" [style.max-height]="scrollHeight||'auto'">
                    <ul class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
                        <li #item *ngFor="let option of optionsToDisplay;let i=index" 
                            [ngClass]="{'ui-dropdown-item ui-corner-all':true, 'ui-state-hover':hoveredItem == item,'ui-state-highlight':(selectedOption == option)}"
                            (click)="onItemClick(option)" (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                            <span *ngIf="!itemTemplate">{{option.label}}</span>
                            <template [pTemplateWrapper]="itemTemplate" [item]="option" *ngIf="itemTemplate"></template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler,DROPDOWN_VALUE_ACCESSOR],
    directives: [TemplateWrapper]
})
export class Dropdown implements OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,ControlValueAccessor {

    @Input() options: SelectItem[];

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() disabled: boolean;
    
    @Input() autoWidth: boolean = true;
    
    @Input() required: boolean;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }
        
    selectedOption: SelectItem;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    optionsToDisplay: SelectItem[];
    
    hover: boolean;
    
    focus: boolean;
    
    differ: any;
    
    private panelVisible: boolean = false;
    
    private documentClickListener: any;
    
    private optionsChanged: boolean;
        
    private panel: any;
    
    private container: any;
    
    private itemsWrapper: any;
    
    private initialized: boolean;
    
    private selfClick: boolean;
    
    private itemClick: boolean;
    
    private hoveredItem: any;
    
    private selectedOptionUpdated: boolean;
            
    ngOnInit() {
        this.optionsToDisplay = this.options;
                
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
            this.updateSelectedOption(this.selectedOption ? this.selectedOption.value: null);
            this.optionsChanged = true;
        }
    }
    
    ngAfterViewInit() {    
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-panel');
        this.itemsWrapper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-items-wrapper');
        
        this.updateDimensions();
        this.initialized = true;
    }
    
    get label(): string {
        return this.selectedOption ? this.selectedOption.label : null;
    }
    
    onItemClick(option) {
        this.itemClick = true;
        this.selectedOption = option;
                
        this.onModelChange(this.selectedOption.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.selectedOption.value
        });
                                
        this.hide();
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
        this.updateSelectedOption(value);
    }
    
    updateSelectedOption(val: any): void {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if(!this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
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
                 
    updateDimensions() {
        if(this.autoWidth) {
            let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if(!this.style||(!this.style['width']&&!this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    }
    
    onMouseenter(event) {
        this.hover = true;
    }
    
    onMouseleave(event) {
        this.hover = false
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
    
    show(panel,container) {
        if(this.options && this.options.length) {
            this.panelVisible = true;
            panel.style.zIndex = ++DomHandler.zindex;
            this.domHandler.relativePosition(panel, container);
            this.domHandler.fadeIn(panel,250);
        }
    }
    
    hide() {
        this.panelVisible = false;
    }
    
    onFocus(event) {
        this.focus = true;
    }
    
    onBlur(event) {
        this.focus = false;
        this.onModelTouched();
    }
    
    onKeydown(event) {
        let selectedItemIndex = this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay);

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
                        }
                    }
                    else {
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
                }
                
                event.preventDefault();
            break;
            
            //enter
            case 13:
                this.panelVisible = false;
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
                if(option.label.toLowerCase().startsWith(val)) {
                    this.optionsToDisplay.push(option);
                }
            }
            this.optionsChanged = true;
        }
        
    }
    
    ngOnDestroy() {
        this.documentClickListener();
        this.initialized = false;
    }

}