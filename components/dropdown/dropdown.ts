import {Component,ElementRef,OnInit,AfterViewInit,OnDestroy,OnChanges,Input,Output,Renderer,EventEmitter,ContentChild,TemplateRef} from 'angular2/core';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-dropdown',
    template: `
        <div #container [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,'ui-state-hover':hover,'ui-state-focus':focus}" 
            (mouseenter)="onMouseenter($event)" (mouseleave)="onMouseleave($event)" (click)="onMouseclick($event,container,pnl,in)">
            <div class="ui-helper-hidden-accessible">
                <select>
                    <option *ngFor="#option of options" [value]="option.value">{{option.label}}</option>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly (focus)="onFocus($event)" (blur)="onBlur($event)" (keydown)="onKeydown($event,pnl,container)">
            </div>
            <label #lbl class="ui-dropdown-label ui-inputtext ui-corner-all">{{label}}</label>
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right" [ngClass]="{'ui-state-hover':hover}">
                <span class="fa fa-fw fa-caret-down"></span>
            </div>
            <div #pnl class="ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow" [style.display]="panelVisible ? 'block' : 'none'">
                <div *ngIf="filter" class="ui-dropdown-filter-container">
                    <input type="text" autocomplete="off" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all">
                    <span class="fa fa-search"></span>
                </div>
                <div class="ui-dropdown-items-wrapper">
                    <ul *ngIf="!itemTemplate" class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
                        (mouseover)="onListMouseover($event)" (mouseout)="onListMouseout($event)" (click)="onListClick($event)">
                        <li *ngFor="#option of options" [attr.data-label]="option.label" class="ui-dropdown-item ui-dropdown-list-item ui-corner-all">{{option.label}}</li
                    ></ul>
                    <ul *ngIf="itemTemplate" class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"
                        (mouseover)="onListMouseover($event)" (mouseout)="onListMouseout($event)" (click)="onListClick($event)">
                        <template ngFor [ngForOf]="options" [ngForTemplate]="itemTemplate"></template>
                    </ul>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Dropdown implements OnInit,AfterViewInit,OnDestroy {

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

    label: string;
    
    hover: boolean;
    
    focus: boolean;
    
    private panelVisible: boolean = false;
    
    private documentClickListener: any;
    
    ngOnInit() {
        if(this.options) {
            if(this.value !== null && this.value !== undefined) {
                for(let i = 0; i < this.options.length; i++) {
                    if(this.options[i].value == this.value) {
                        this.label = this.options[i].label;
                    }
                }
            }
            else {
                this.label = this.options[0].label;
            }
        }
        else {
            this.label = '&nbsp;';
        }
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.panelVisible = false;
        });
    }
    
    ngAfterViewInit() {
        let items = this.domHandler.find(this.el.nativeElement, '.ui-dropdown-items > li');
        let selectedIndex = this.findSelectedItemIndex();
        if(this.options) {
            if(selectedIndex == -1) {
                selectedIndex = 0;
            }
            this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
        }
        
        //dimensions
        this.updateDimensions();
    }
    
    updateDimensions() {
        let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
        this.el.nativeElement.children[0].style.width = select.offsetWidth + 20 + 'px';
    }
    
    onMouseenter(event) {
        this.hover = true;
    }
    
    onMouseleave(event) {
        this.hover = false
    }
    
    onMouseclick(event,container,panel,input) {
        if(!this.panelVisible) {
            input.focus();
            this.show(panel,container);
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
    
    onKeydown(event, panel, container) {
        let highlightedItem = this.domHandler.findSingle(panel, 'li.ui-state-highlight');
        
        switch(event.which) {
            //down
            case 40:
                if(!this.panelVisible && event.altKey) {
                    this.show(panel, container);
                }
                else {
                    if(highlightedItem) {
                        var nextItem = highlightedItem.nextSibling;
                        if(nextItem) {
                            this.selectItem(event, nextItem);
                            this.domHandler.scrollInView(panel, nextItem);
                        }
                    }
                    else {
                        let firstItem = this.domHandler.findSingle(panel, 'li:first-child');
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
                        this.domHandler.scrollInView(panel, prevItem);
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
            let selectedIndex = this.domHandler.index(item);
            let selectedValue = this.options[selectedIndex].value;
            let selectedOption = this.options[selectedIndex];
            this.label = selectedOption.label;
            this.valueChange.next(selectedOption.value);
            this.onChange.next(event);
        }
    }
    
    findSelectedItemIndex(): number {
        let index = -1;
        if(this.options) {
            if(this.value !== null && this.value !== undefined) {
                for(let i = 0; i < this.options.length; i++) {
                    if(this.options[i].value == this.value) {
                        index = i;
                        break;
                    }
                }
            }
        }
        
        return index;
    }
    
    ngOnDestroy() {
        this.documentClickListener();
    }

}