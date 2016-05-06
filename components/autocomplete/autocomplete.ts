import {Component,ElementRef,AfterViewInit,AfterViewChecked,DoCheck,Input,Output,EventEmitter,ContentChild,TemplateRef,IterableDiffers,Renderer,forwardRef,Provider} from '@angular/core';
import {InputText} from '../inputtext/inputtext';
import {Button} from '../button/button';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';

const AUTOCOMPLETE_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => AutoComplete),
    multi: true
});

@Component({
    selector: 'p-autoComplete',
    template: `
        <span [ngClass]="{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown}" [ngStyle]="style" [class]="styleClass">
            <input *ngIf="!multiple" #in pInputText type="text" [ngStyle]="inputStyle" [class]="inputStyleClass" 
            [value]="value ? (field ? resolveFieldData(value)||value : value) : null" (input)="onInput($event)" (keydown)="onKeydown($event)" (blur)="onModelTouched()"
            [attr.placeholder]="placeholder" [attr.size]="size" [attr.maxlength]="maxlength" [attr.readonly]="readonly" [disabled]="disabled" 
            ><ul *ngIf="multiple" class="ui-autocomplete-multiple ui-widget ui-inputtext ui-state-default ui-corner-all" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" class="ui-autocomplete-token ui-state-highlight ui-corner-all">
                    <span class="ui-autocomplete-token-icon fa fa-fw fa-close" (click)="removeItem(token)"></span>
                    <span class="ui-autocomplete-token-label">{{field ? val[field] : val}}</span>
                </li>
                <li class="ui-autocomplete-input-token">
                    <input #multiIn type="text" pInputText (input)="onInput($event)" (keydown)="onKeydown($event)" (blur)="onModelTouched()">
                </li>
            </ul
            ><button type="button" pButton icon="fa-fw fa-caret-down" class="ui-autocomplete-dropdown" [disabled]="disabled"
                (click)="handleDropdownClick($event)" *ngIf="dropdown"></button>
            <div class="ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow" [style.display]="panelVisible ? 'block' : 'none'" [style.width]="'100%'" [style.max-height]="scrollHeight">
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" 
                    (mouseover)="onItemMouseover($event)" (mouseout)="onItemMouseout($event)" (click)="onItemClick($event)" *ngIf="!itemTemplate">
                    <li class="ui-autocomplete-list-item ui-corner-all" *ngFor="let item of suggestions">{{field ? item[field] : item}}</li>
                </ul>
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" 
                    (mouseover)="onItemMouseover($event)" (mouseout)="onItemMouseout($event)" (click)="onItemClick($event)"*ngIf="itemTemplate">
                    <template ngFor [ngForOf]="suggestions" [ngForTemplate]="itemTemplate"></template>
                </ul>
            </div>
        </span>
    `,
    directives: [InputText,Button],
    providers: [DomHandler,AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutoComplete implements AfterViewInit,DoCheck,AfterViewChecked,ControlValueAccessor {
    
    @Input() minLength: number = 3;
    
    @Input() delay: number = 300;
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() inputStyle: any;
    
    @Input() inputStyleClass: string;
    
    @Input() placeholder: string;
    
    @Input() readonly: number;
        
    @Input() disabled: boolean;
    
    @Input() maxlength: number;
    
    @Input() size: number;
    
    @Input() suggestions: any[];
    
    @Output() completeMethod: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onUnselect: EventEmitter<any> = new EventEmitter();
    
    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();
    
    @Input() field: string;
    
    @Input() scrollHeight: string = '200px';
    
    @Input() dropdown: boolean;
    
    @Input() multiple: boolean;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    timeout: number;
    
    differ: any;
    
    panel: any;
    
    input: any;
    
    multipleContainer: any;
    
    panelVisible: boolean = false;
    
    documentClickListener: any;
    
    suggestionsUpdated: boolean;
    
    constructor(private el: ElementRef, private domHandler: DomHandler, differs: IterableDiffers, private renderer: Renderer) {
        this.differ = differs.find([]).create(null);
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.suggestions);

        if(changes && this.panel) {
            if(this.suggestions && this.suggestions.length) {
                this.show();
                this.suggestionsUpdated = true;
            }
            else {
                this.hide();
            }
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
    
    ngAfterViewChecked() {
        if(this.suggestionsUpdated) {
            this.align();
            this.suggestionsUpdated = false;
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    onInput(event) {
        let value = event.target.value;
        if(!this.multiple) {
            this.value = value;
            this.onModelChange(value);
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
       
       this.completeMethod.emit({
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
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
    }
    
    onItemMouseout(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-highlight');
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
            if(!this.isSelected(selectedValue)) {
                this.value.push(selectedValue);
                this.onModelChange(this.value);
            }
        }
        else {
            this.input.value = this.field ? this.resolveFieldData(selectedValue): selectedValue;
            this.value = selectedValue;
            this.onModelChange(this.value);
        }
        
        this.onSelect.emit(selectedValue);
        
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
        if(!this.panelVisible) {
            this.panelVisible = true;
            this.panel.style.zIndex = ++DomHandler.zindex;
            this.domHandler.fadeIn(this.panel, 200);
        }        
    }
    
    align() {
        if(this.multiple)
            this.domHandler.relativePosition(this.panel, this.multipleContainer);
        else
            this.domHandler.relativePosition(this.panel, this.input);
    }
    
    hide() {
        this.panelVisible = false;
    }
    
    handleDropdownClick(event) {
        this.onDropdownClick.emit({
            originalEvent: event,
            query: this.input.value
        });
    }
    
    removeItem(item: any) {
        let itemIndex = this.domHandler.index(item);
        let removedValue = this.value.splice(itemIndex, 1)[0];
        this.onUnselect.emit(removedValue);
        this.onModelChange(this.value);
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
    
    onKeydown(event) {
        if(this.panelVisible) {
            let highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            
            switch(event.which) {
                //down
                case 40:
                    if(highlightedItem) {
                        var nextItem = highlightedItem.nextElementSibling;
                        if(nextItem) {
                            this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
                            this.domHandler.addClass(nextItem, 'ui-state-highlight');
                            this.domHandler.scrollInView(this.panel, nextItem);
                        }
                    }
                    else {
                        let firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
                        this.domHandler.addClass(firstItem, 'ui-state-highlight');
                    }
                    
                    event.preventDefault();
                break;
                
                //up
                case 38:
                    if(highlightedItem) {
                        var prevItem = highlightedItem.previousElementSibling;
                        if(prevItem) {
                            this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
                            this.domHandler.addClass(prevItem, 'ui-state-highlight');
                            this.domHandler.scrollInView(this.panel, prevItem);
                        }
                    }
                    
                    event.preventDefault();
                break;
                
                //enter
                case 13:
                    if(highlightedItem) {
                        this.selectItem(highlightedItem);
                        this.hide();
                    }
                    event.preventDefault();
                break;
                
                //escape
                case 27:
                    this.hide();
                    event.preventDefault();
                break;

                
                //tab
                case 9:
                    if(highlightedItem) {
                        this.selectItem(highlightedItem);
                    }
                    this.hide();
                break;
            }
        }
        
        if(this.multiple) {
            switch(event.which) {
                //backspace
                case 8:
                    if(this.value && this.value.length && !this.input.value) {
                        let removedValue = this.value.pop();
                        this.onUnselect.emit(removedValue);
                        this.onModelChange(this.value);
                    }
                break;
            }
        }
    }
    
    isSelected(val: any): boolean {
        let selected: boolean = false;
        if(this.value && this.value.length) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.domHandler.equals(this.value[i], val)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    }
    
    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
    }
}