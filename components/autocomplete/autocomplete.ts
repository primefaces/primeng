import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,TemplateRef,IterableDiffers,Renderer} from 'angular2/core';
import {InputText} from '../inputtext/inputtext';
import {Button} from '../button/button';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-autoComplete',
    template: `
        <span [ngClass]="{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown}" [attr.style]="style" [attr.styleClass]="styleClass">
            <input #in pInputText type="text" [attr.style]="inputStyle" [attr.styleClass]="inputStyleClass" [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all'"
            [attr.placeholder]="placeholder" [attr.size]="size" [attr.maxlength]="maxlength" [attr.readonly]="readonly" [attr.disabled]="disabled" (input)="onInput($event)"
            ><button type="button" pButton icon="fa-fw fa-caret-down" class="ui-autocomplete-dropdown" (click)="handleDropdownClick($event,in.value)" *ngIf="dropdown"></button>
            <div class="ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow" [style.display]="panelVisible ? 'block' : 'none'" [style.width]="'100%'" [style.max-height]="scrollHeight">
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" 
                    (mouseover)="onItemMouseover($event)" (mouseout)="onItemMouseout($event)" (click)="onItemClick($event)" *ngIf="!itemTemplate">
                    <li class="ui-autocomplete-list-item ui-corner-all" *ngFor="#item of suggestions">{{field ? item[field] : item}}</li>
                </ul>
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" 
                    (mouseover)="onItemMouseover($event)" (mouseout)="onItemMouseout($event)" (click)="onItemClick($event)"*ngIf="itemTemplate">
                    <template ngFor [ngForOf]="suggestions" [ngForTemplate]="itemTemplate"></template>
                </ul>
            </div>
        </span>
    `,
    directives: [InputText,Button],
    providers: [DomHandler]
})
export class AutoComplete implements AfterViewInit,DoCheck {

    @Input() value: number;
    
    @Input() minLength: number = 3;
    
    @Input() delay: number = 300;
    
    @Input() style: string;
    
    @Input() styleClass: string;
    
    @Input() inputStyle: string;
    
    @Input() inputStyleClass: string;
    
    @Input() placeholder: string;
    
    @Input() readonly: number;
        
    @Input() disabled: number;
    
    @Input() maxlength: number;
    
    @Input() size: number;
    
    @Input() suggestions: any[];
    
    @Output() completeMethod: EventEmitter<any> = new EventEmitter();
    
    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();
    
    @Input() field: string;
    
    @Input() scrollHeight: string = '200px';
    
    @Input() dropdown: boolean;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
    
    timeout: number;
    
    differ: any;
    
    panel: any;
    
    input: any;
    
    panelVisible: boolean = false;
    
    documentClickListener: any;
    
    constructor(private el: ElementRef, private domHandler: DomHandler, differs: IterableDiffers, private renderer: Renderer) {
        this.differ = differs.find([]).create(null);
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.suggestions);

        if(changes) {
            if(this.suggestions && this.suggestions.length)
                this.show();
            else
                this.hide();
        }
    }
    
    ngAfterViewInit() {
        this.input = this.domHandler.findSingle(this.el.nativeElement, 'input');
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-autocomplete-panel');
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.hide();
        });
    }
    
    onInput(event) {
        let value = event.target.value;
        
        if(value.length === 0) {
           this.hide();
        }
        
        if(value.length >= this.minLength) {
            //Cancel the search request if user types within the timeout
            if(this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this.search(event, value);
            }, this.delay);
        }
        else {
            this.suggestions = null;
        }
    }
    
    search(event: any, query: string) {
        //allow empty string but not undefined or null
       if(query === undefined || query === null) {
           return;
       }
       
       this.completeMethod.next({
           originalEvent: event,
           query: query
       });
    }
    
    onItemMouseover(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    }
    
    onItemMouseout(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    }
    
    onItemClick(event) {        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.selectItem(item);
        }
    }
    
    selectItem(item: any) {
        let itemIndex = this.domHandler.index(item);
        let selectedValue = this.suggestions[itemIndex];
        this.input.value = this.field ? selectedValue[this.field]: selectedValue;
        this.input.focus();
        this.valueChange.next(selectedValue);
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
    
    show() {
        this.panelVisible = true;
        this.panel.style.zIndex = ++PUI.zindex;
        this.domHandler.relativePosition(this.panel, this.input);
        this.domHandler.fadeIn(this.panel, 200);
    }
    
    hide() {
        this.panelVisible = false;
    }
    
    handleDropdownClick(event,query) {
        this.onDropdownClick.next({
            originalEvent: event,
            query: query
        });
    }
    
    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
    }
}