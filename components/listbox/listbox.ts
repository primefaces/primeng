import {Component,ElementRef,AfterViewChecked,Input,Output,EventEmitter,ContentChild,TemplateRef,IterableDiffers,forwardRef,Provider} from '@angular/core';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';

const LISTBOX_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => Listbox),
    multi: true
});

@Component({
    selector: 'p-listbox',
    template: `
        <div [ngClass]="{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled}" [attr.style]="style" [class]="styleClass">
            <ul class="ui-listbox-list" *ngIf="!itemTemplate" (mouseover)="onMouseover($event)" (mouseout)="onMouseout($event)" (click)="onClick($event)">
                <li *ngFor="let option of options" class="ui-listbox-item ui-corner-all">
                    {{option.label}}
                </li>
            </ul>
            <ul class="ui-listbox-list" *ngIf="itemTemplate" (mouseover)="onMouseover($event)" (mouseout)="onMouseout($event)" (click)="onClick($event)">
                <template ngFor [ngForOf]="options" [ngForTemplate]="itemTemplate"></template>
            </ul>
        </div>
    `,
    providers: [DomHandler,LISTBOX_VALUE_ACCESSOR]
})
export class Listbox implements AfterViewChecked,ControlValueAccessor {

    @Input() options: SelectItem[];

    @Input() multiple: boolean;

    @Input() style: string;

    @Input() styleClass: string;
    
    @Input() disabled: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    differ: any;
    
    valueChanged: boolean;
        
    constructor(private el: ElementRef, private domHandler: DomHandler, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }
    
    writeValue(value: any) : void {
        this.value = value;
        if(!this.multiple) {
            this.valueChanged = true;
        }
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    ngDoCheck() {
        if(this.multiple) {
            let changes = this.differ.diff(this.value);
            
            if(changes) {
                this.valueChanged = true;
            }
        }
    }
        
    ngAfterViewChecked() {
        if(this.valueChanged) {
            this.preselect();
            this.valueChanged = false;
        }
    }
    
    preselect() {
        let items = this.domHandler.find(this.el.nativeElement, 'li.ui-listbox-item');
        if(items && items.length) {
            this.unselectAll(items);
            
            if(this.value) {
                if(this.multiple) {
                    for(let i = 0; i < this.value.length; i++) {
                        for(let j = 0; i < this.options.length; j++) {
                            if(this.options[j].value == this.value[i]) {
                                this.domHandler.addClass(items[j], 'ui-state-highlight');
                                break;
                            }
                        }
                    }
                }
                else {
                    for(let i = 0; i < this.options.length; i++) {
                        if(this.options[i].value == this.value) {
                            this.domHandler.addClass(items[i], 'ui-state-highlight');
                            break;
                        }
                    }
                }
            }
        }
    }
    
    unselectAll(items: NodeList[]) {
        let listItems = items||this.domHandler.find(this.el.nativeElement, 'li.ui-listbox-item');
        for(let i = 0; i < listItems.length; i++) {
            this.domHandler.removeClass(listItems[i], 'ui-state-highlight');
        }
    }
    
    onMouseover(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    }
    
    onMouseout(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    }
    
    onClick(event) {
        if(this.disabled) {
            return;
        }
        
        let element = event.target;
        if(element.nodeName != 'UL') {
            let item = this.findListItem(element);
            this.onItemClick(event,item);
        }
    }
    
    onItemClick(event, item) {
        let metaKey = (event.metaKey||event.ctrlKey);
                
        if(this.domHandler.hasClass(item, 'ui-state-highlight')) {
            if(metaKey)
                this.domHandler.removeClass(item, 'ui-state-highlight');
            else
                this.unselectSiblings(item);
        }
        else {
            if(!metaKey||!this.multiple) {
                this.unselectSiblings(item);
            }
            
            this.domHandler.removeClass(item, 'ui-state-hover');
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
        
        //update value
        if(this.multiple) {
            let selectedItems = this.domHandler.find(item.parentNode, 'li.ui-state-highlight');
            let valueArr = [];
            if(selectedItems && selectedItems.length) {
                for(let i = 0; i < selectedItems.length; i++) {
                    let itemIndex = this.domHandler.index(selectedItems[i]);
                    valueArr.push(this.options[itemIndex].value);
                }
            }
            this.value = valueArr;
        }
        else {
            let selectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
            if(selectedItem) {
                let selectedIndex = this.domHandler.index(selectedItem);
                this.value = this.options[selectedIndex].value;
            }
            else {
                this.value = null;
            }
        }
        
        this.onModelChange(this.value);
        this.onChange.emit(event);
    }
    
    unselectSiblings(item) {
        let siblings = this.domHandler.siblings(item);
        for(let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if(this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
                this.domHandler.removeClass(sibling, 'ui-state-highlight');
            }
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

}