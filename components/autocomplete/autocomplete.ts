import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,TemplateRef,IterableDiffers,Renderer} from 'angular2/core';
import {InputText} from '../inputtext/inputtext';
import {Button} from '../button/button';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-autoComplete',
    template: `
        <span [ngClass]="{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown}" [attr.style]="style" [attr.styleClass]="styleClass">
            <input *ngIf="!multiple" #in pInputText type="text" [attr.style]="inputStyle" [attr.styleClass]="inputStyleClass" 
            [value]="value ? (field ? resolveFieldData(value)||value : value) : null" (input)="onInput($event)"
            [attr.placeholder]="placeholder" [attr.size]="size" [attr.maxlength]="maxlength" [attr.readonly]="readonly" [attr.disabled]="disabled" 
            ><ul *ngIf="multiple" class="ui-autocomplete-multiple ui-widget ui-inputtext ui-state-default ui-corner-all" (click)="multiIn.focus()">
                <li #token *ngFor="#val of value" class="ui-autocomplete-token ui-state-highlight ui-corner-all">
                    <span class="ui-autocomplete-token-icon fa fa-fw fa-close" (click)="removeItem(token)"></span>
                    <span class="ui-autocomplete-token-label">{{val[field]}}</span>
                </li>
                <li class="ui-autocomplete-input-token">
                    <input #multiIn type="text" pInputText (input)="onInput($event)">
                </li>
            </ul
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

    @Input() value: any;
    
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
    
    @Input() multiple: boolean;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef;
    
    timeout: number;
    
    differ: any;
    
    panel: any;
    
    input: any;
    
    multipleContainer: any;
    
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
        
        if(this.multiple) {
            this.multipleContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-autocomplete-multiple');
        }
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.hide();
        });
    }
    
    onInput(event) {
        let value = event.target.value;
        if(!this.multiple) {
            this.valueChange.next(value);
        }
        
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
        
        if(this.multiple) {
            this.input.value = '';
            this.value = this.value||[];
            this.value.push(selectedValue);
            this.valueChange.next(this.value);
        }
        else {
            this.input.value = this.field ? this.resolveFieldData(selectedValue): selectedValue;
            this.valueChange.next(selectedValue);
        }
        
        
        this.input.focus();
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
        
        if(this.multiple)
            this.domHandler.relativePosition(this.panel, this.multipleContainer);
        else
            this.domHandler.relativePosition(this.panel, this.input);
        
        this.panel.style.zIndex = ++PUI.zindex;
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
    
    removeItem(item: any) {
        let itemIndex = this.domHandler.index(item);
        this.value.splice(itemIndex, 1);
    }
    
    resolveFieldData(data: any): any {
        if(data && this.field) {
            if(this.field.indexOf('.') == -1) {
                return data[this.field];
            }
            else {
                let fields: string[] = this.field.split('.');
                let value = data;
                for(var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }        
    }
    
    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
    }
}