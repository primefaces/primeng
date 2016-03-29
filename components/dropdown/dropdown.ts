import {Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,OnDestroy,Input,Output,Renderer,EventEmitter,ContentChild,TemplateRef} from 'angular2/core';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-dropdown',
    template: `
        <div [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,'ui-state-hover':hover,'ui-state-focus':focus}" 
            (mouseenter)="onMouseenter($event)" (mouseleave)="onMouseleave($event)" (click)="onMouseclick($event,in)" [attr.style]="style" [attr.styleClass]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <select>
                    <option *ngFor="#option of options" [value]="option.value">{{option.label}}</option>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly (focus)="onFocus($event)" (blur)="onBlur($event)" (keydown)="onKeydown($event)">
            </div>
            <label class="ui-dropdown-label ui-inputtext ui-corner-all">{{label}}</label>
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right" [ngClass]="{'ui-state-hover':hover}">
                <span class="fa fa-fw fa-caret-down"></span>
            </div>
            <div class="ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow" [style.display]="panelVisible ? 'block' : 'none'">
                <div *ngIf="filter" class="ui-dropdown-filter-container" (input)="onFilter($event)" (click)="$event.stopPropagation()">
                    <input type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all">
                    <span class="fa fa-search"></span>
                </div>
                <div class="ui-dropdown-items-wrapper">
                    <ul *ngIf="!itemTemplate" class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
                        (mouseover)="onListMouseover($event)" (mouseout)="onListMouseout($event)">
                        <li *ngFor="#option of optionsToDisplay;#i=index" [attr.data-label]="option.label" [attr.data-value]="option.value" (click)="onListClick($event)"
                            class="ui-dropdown-item ui-dropdown-list-item ui-corner-all">{{option.label}}</li
                    ></ul>
                    <ul *ngIf="itemTemplate" class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
                        (mouseover)="onListMouseover($event)" (mouseout)="onListMouseout($event)" (click)="onListClick($event)">
                        <template ngFor [ngForOf]="optionsToDisplay" [ngForTemplate]="itemTemplate"></template>
                    </ul>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Dropdown implements OnInit,AfterViewInit,AfterViewChecked,OnDestroy {

    @Input() options: SelectItem[];

    @Input() value: any;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Input() scrollHeight: number;

    @Input() filter: boolean;

    @Input() filterMatchMode: string;

    @Input() style: string;

    @Input() styleClass: string;
    
    @Input() disabled: boolean;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef;

    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}

    optionsToDisplay: SelectItem[];

    label: string;
    
    hover: boolean;
    
    focus: boolean;
    
    private panelVisible: boolean = false;
    
    private documentClickListener: any;
    
    private optionsFiltered: boolean;
    
    private panel: any;
    
    private container: any;
    
    ngOnInit() {
        if(this.options) {
            let selectedIndex = this.findItemIndex(this.value, this.options);
            if(selectedIndex == -1)
                this.label = this.options[0].label;
            else
                this.label = this.options[selectedIndex].label;
        }
        else {
            this.label = '&nbsp;';
        }
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.panelVisible = false;
        });
        
        this.optionsToDisplay = this.options;
    }
    
    ngAfterViewInit() {
        let items = this.domHandler.find(this.el.nativeElement, '.ui-dropdown-items > li');
        let selectedIndex = this.findItemIndex(this.value, this.options);
        if(this.options) {
            if(selectedIndex == -1) {
                selectedIndex = 0;
            }
            this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
        }
        
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-panel');
        
        this.updateDimensions();
    }
    
    ngAfterViewChecked() {
        if(this.optionsFiltered) {
            let items = this.domHandler.find(this.el.nativeElement, '.ui-dropdown-items > li');
            let selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
            if(selectedIndex != -1) {
                this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
            }
            
            this.domHandler.relativePosition(this.panel, this.container);
            this.optionsFiltered = false;
        }
    }
    
    updateDimensions() {
        let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
        if(!this.style||this.style.indexOf('width') == -1) {
            this.el.nativeElement.children[0].style.width = select.offsetWidth + 20 + 'px';
        }
        
        this.panel.style.width = '100%';
    }
    
    onMouseenter(event) {
        this.hover = true;
    }
    
    onMouseleave(event) {
        this.hover = false
    }
    
    onMouseclick(event,input) {
        if(!this.panelVisible) {
            input.focus();
            this.show(this.panel,this.container);
            event.stopPropagation();
        }
    }
    
    show(panel,container) {
        this.panelVisible = true;
        panel.style.zIndex = ++PUI.zindex;
        this.domHandler.relativePosition(panel, container);
        this.domHandler.fadeIn(panel,250);
    }
    
    hide() {
        this.panelVisible = false;
    }
    
    onFocus(event) {
        this.focus = true;
    }
    
    onBlur(event) {
        this.focus = false;
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
                        var nextItem = highlightedItem.nextSibling;
                        if(nextItem) {
                            this.selectItem(event, nextItem);
                            this.domHandler.scrollInView(this.panel, nextItem);
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
                        this.domHandler.scrollInView(this.panel, prevItem);
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
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.selectItem(event,item);
        }
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
            this.valueChange.next(selectedOption.value);
            this.onChange.next(event);
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
            this.optionsFiltered = true;
        }
    }
    
    ngOnDestroy() {
        this.documentClickListener();
    }

}