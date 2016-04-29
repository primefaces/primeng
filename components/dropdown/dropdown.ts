import {Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,Renderer,EventEmitter,ContentChild,TemplateRef,IterableDiffers,forwardRef,Provider} from 'angular2/core';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

const DROPDOWN_VALUE_ACCESSOR: Provider = CONST_EXPR(
    new Provider(NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => Dropdown),
        multi: true
    })
);

@Component({
    selector: 'p-dropdown',
    template: `
        <div [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,'ui-state-hover':hover&&!disabled,'ui-state-focus':focus,'ui-state-disabled':disabled}" 
            (mouseenter)="onMouseenter($event)" (mouseleave)="onMouseleave($event)" (click)="onMouseclick($event,in)" [attr.style]="style" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <select [required]="required">
                    <option *ngFor="let option of options" [value]="option.value" [selected]="value == option.value">{{option.label}}</option>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly (focus)="onFocus($event)" (blur)="onBlur($event)" (keydown)="onKeydown($event)">
            </div>
            <label class="ui-dropdown-label ui-inputtext ui-corner-all" [innerHTML]="label"></label>
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
                    <ul *ngIf="!itemTemplate" class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
                        (mouseover)="onListMouseover($event)" (mouseout)="onListMouseout($event)">
                        <li *ngFor="let option of optionsToDisplay;let i=index" [attr.data-label]="option.label" [attr.data-value]="option.value" (click)="onListClick($event)"
                            class="ui-dropdown-item ui-corner-all">{{option.label}}</li>
                    </ul>
                    <ul *ngIf="itemTemplate" class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
                        (mouseover)="onListMouseover($event)" (mouseout)="onListMouseout($event)" (click)="onListClick($event)">
                        <template ngFor [ngForOf]="optionsToDisplay" [ngForTemplate]="itemTemplate"></template>
                    </ul>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler,DROPDOWN_VALUE_ACCESSOR]
})
export class Dropdown implements OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,ControlValueAccessor {

    @Input() options: SelectItem[];

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;

    @Input() style: string;

    @Input() styleClass: string;
    
    @Input() disabled: boolean;
    
    @Input() autoWidth: boolean = true;
    
    @Input() required: boolean;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef;

    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    optionsToDisplay: SelectItem[];

    label: string;
    
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
            
    ngOnInit() {
        this.optionsToDisplay = this.options;
                
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if(!this.selfClick&&!this.itemClick) {
                this.panelVisible = false;
            }
            
            this.selfClick = false;
            this.itemClick = false;
        });
        
        this.updateLabel();
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.options);
        
        if(changes && this.initialized) {
            this.optionsToDisplay = this.options;
            this.optionsChanged = true;
        }
    }
    
    ngAfterViewInit() {    
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-panel');
        this.itemsWrapper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-items-wrapper');
        
        this.highlightValue(true);
        this.updateDimensions();
        this.initialized = true;
    }
    
    ngAfterViewChecked() {
        if(this.optionsChanged) {
            this.highlightValue();
            this.domHandler.relativePosition(this.panel, this.container);
            this.optionsChanged = false;
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
        this.updateLabel();

        if(this.initialized && !this.optionsChanged) {
            this.highlightValue();
        }
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    updateLabel() {
        if(this.optionsToDisplay && this.optionsToDisplay.length) {
            let selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
            if(selectedIndex == -1)
                this.label = this.optionsToDisplay[0].label;
            else
                this.label = this.optionsToDisplay[selectedIndex].label;
        }
        else {
            this.label = '&nbsp;';
        }
    }
        
    highlightValue(fallbackToFirst?: boolean) {
        let items = this.domHandler.find(this.el.nativeElement, '.ui-dropdown-items > li');
        
        let currentSelectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
        if(currentSelectedItem) {
            this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
        }
        
        if(this.optionsToDisplay && this.optionsToDisplay.length) {
            let selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
            if(selectedIndex == -1 && fallbackToFirst) {
                selectedIndex = 0;
            }
            if(selectedIndex != -1) {
                this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
            }
        }
    }
     
    updateDimensions() {
        if(this.autoWidth) {
            let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if(!this.style||this.style.indexOf('width') == -1) {
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
            else
                this.show(this.panel,this.container);
        }
    }
    
    show(panel,container) {
        if(this.optionsToDisplay && this.optionsToDisplay.length) {
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
        let highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
        switch(event.which) {
            //down
            case 40:
                if(!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
                }
                else {
                    if(highlightedItem) {
                        var nextItem = highlightedItem.nextElementSibling;
                        if(nextItem) {
                            this.selectItem(event, nextItem);
                            this.domHandler.scrollInView(this.itemsWrapper, nextItem);
                        }
                    }
                    else {
                        let firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
                        this.selectItem(event, firstItem);
                    }
                }
                
                event.preventDefault();
                
            break;
            
            //up
            case 38:
                if(highlightedItem) {
                    var prevItem = highlightedItem.previousElementSibling;
                    if(prevItem) {
                        this.selectItem(event, prevItem);
                        this.domHandler.scrollInView(this.itemsWrapper, prevItem);
                    }
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
    
    onListMouseover(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    }
    
    onListMouseout(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    }
    
    onListClick(event) {
        if(this.disabled) {
            return;
        }
        
        this.itemClick = true;
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.selectItem(event,item);
        }
        
        this.hide();
    }
    
    selectItem(event, item) {
        let currentSelectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
        if(currentSelectedItem != item) {
            if(currentSelectedItem) {
                this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
            }
            this.domHandler.addClass(item, 'ui-state-highlight');
            let selectedOption = this.options[this.findItemIndex(item.dataset.value, this.options)];
            this.label = selectedOption.label;
            this.value = selectedOption.value;
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    
    findItemIndex(val: any, opts: SelectItem[]): number {
        let index = -1;
        if(opts) {
            if(val !== null && val !== undefined) {
                for(let i = 0; i < opts.length; i++) {
                    if(opts[i].value == val) {
                        index = i;
                        break;
                    }
                }
            }
        }
        
        return index;
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