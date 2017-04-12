import {NgModule,Component,ViewChild,ElementRef,AfterViewInit,AfterContentInit,AfterViewChecked,DoCheck,Input,Output,EventEmitter,ContentChildren,QueryList,TemplateRef,IterableDiffers,Renderer,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from '../inputtext/inputtext';
import {ButtonModule} from '../button/button';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/ObjectUtils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoComplete),
  multi: true
};

@Component({
    selector: 'p-autoComplete',
    template: `
        <span [ngClass]="{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}" [ngStyle]="style" [class]="styleClass">
            <input *ngIf="!multiple" #in type="text" [attr.id]="inputId" [ngStyle]="inputStyle" [class]="inputStyleClass" autocomplete="off" [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all'" (click)="onInputClick($event)"
            [value]="value ? (field ? objectUtils.resolveFieldData(value,field)||value : value) : null" (input)="onInput($event)" (keydown)="onKeydown($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
            [attr.placeholder]="placeholder" [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled"
            [ngClass]="{'ui-autocomplete-input':true,'ui-autocomplete-dd-input':dropdown}"
            ><ul *ngIf="multiple" #multiContainer class="ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all" [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':focus}" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" class="ui-autocomplete-token ui-state-highlight ui-corner-all">
                    <span class="ui-autocomplete-token-icon fa fa-fw fa-close" (click)="removeItem(token)" *ngIf="!disabled"></span>
                    <span *ngIf="!selectedItemTemplate" class="ui-autocomplete-token-label">{{field ? val[field] : val}}</span>
                    <ng-template *ngIf="selectedItemTemplate" [pTemplateWrapper]="selectedItemTemplate" [item]="val"></ng-template>
                </li>
                <li class="ui-autocomplete-input-token">
                    <input #multiIn type="text" [attr.id]="inputId" [disabled]="disabled" [attr.placeholder]="placeholder" [attr.tabindex]="tabindex" (input)="onInput($event)"  (click)="onInputClick($event)"
                            (keydown)="onKeydown($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" autocomplete="off">
                </li>
            </ul
            ><button type="button" pButton icon="fa-fw fa-caret-down" class="ui-autocomplete-dropdown" [disabled]="disabled"
                (click)="handleDropdownClick($event)" *ngIf="dropdown" (focus)="onDropdownFocus($event)" (blur)="onDropdownBlur($event)"></button>
            <div #panel class="ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow" [style.display]="panelVisible ? 'block' : 'none'" [style.width]="appendTo ? 'auto' : '100%'" [style.max-height]="scrollHeight">
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" *ngIf="panelVisible">
                    <li *ngFor="let option of suggestions; let idx = index" [ngClass]="{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}"
                        (mouseenter)="highlightOption=option" (mouseleave)="highlightOption=null" (click)="selectItem(option)">
                        <span *ngIf="!itemTemplate">{{field ? option[field] : option}}</span>
                        <ng-template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="option" [index]="idx"></ng-template>
                    </li>
                </ul>
            </div>
        </span>
    `,
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler,ObjectUtils,AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutoComplete implements AfterViewInit,DoCheck,AfterViewChecked,ControlValueAccessor {
    
    @Input() minLength: number = 1;
    
    @Input() delay: number = 300;
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() inputStyle: any;

    @Input() inputId: string;
    
    @Input() inputStyleClass: string;
    
    @Input() placeholder: string;
    
    @Input() readonly: boolean;
        
    @Input() disabled: boolean;
    
    @Input() maxlength: number;
    
    @Input() size: number;
    
    @Input() suggestions: any[];

    @Input() appendTo: any;
    
    @Input() autoHighlight: boolean;

    @Output() completeMethod: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    
    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();
    
    @Input() field: string;
    
    @Input() scrollHeight: string = '200px';
    
    @Input() dropdown: boolean;
    
    @Input() multiple: boolean;

    @Input() tabindex: number;
    
    @Input() dataKey: string;
    
    @ViewChild('in') inputEL: ElementRef;
    
    @ViewChild('multiIn') multiInputEL: ElementRef;
    
    @ViewChild('panel') panelEL: ElementRef;
    
    @ViewChild('multiContainer') multiContainerEL: ElementRef;
        
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;
    
    public selectedItemTemplate: TemplateRef<any>;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    timeout: any;
    
    differ: any;
        
    panelVisible: boolean = false;
    
    documentClickListener: any;
    
    suggestionsUpdated: boolean;
    
    highlightOption: any;
    
    highlightOptionChanged: boolean;
    
    focus: boolean = false;
    
    dropdownFocus: boolean = false;
    
    filled: boolean;
    
    inputClick: boolean;
        
    constructor(public el: ElementRef, public domHandler: DomHandler, differs: IterableDiffers, public renderer: Renderer, public objectUtils: ObjectUtils) {
        this.differ = differs.find([]).create(null);
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.suggestions);
        if(changes && this.panelEL.nativeElement) {
            if(this.suggestions && this.suggestions.length) {
                this.show();
                this.suggestionsUpdated = true;
                
                if(this.autoHighlight) {
                    this.highlightOption = this.suggestions[0];
                }
            }
            else {
                this.hide();
            }
        }
    }
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }
    
    ngAfterViewInit() {        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if(this.inputClick) {
                this.inputClick = false;
            }
            else {
                this.hide();
            }
        });

        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.panelEL.nativeElement);
            else
                this.domHandler.appendChild(this.panelEL.nativeElement, this.appendTo);
        }
    }
    
    ngAfterViewChecked() {
        if(this.suggestionsUpdated) {
            this.align();
            this.suggestionsUpdated = false;
        }
        
        if(this.highlightOptionChanged) {
            let listItem = this.domHandler.findSingle(this.panelEL.nativeElement, 'li.ui-state-highlight');
            if(listItem) {
                this.domHandler.scrollInView(this.panelEL.nativeElement, listItem);
            }
            this.highlightOptionChanged = false;
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
        this.filled = this.value && this.value != '';
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

    onInput(event: KeyboardEvent) {
        let value = (<HTMLInputElement> event.target).value;
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
        this.updateFilledState();
    }
    
    onInputClick(event: MouseEvent) {
        this.inputClick = true;
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
            
    selectItem(option: any) {
        if(this.multiple) {
            this.multiInputEL.nativeElement.value = '';
            this.value = this.value||[];
            if(!this.isSelected(option)) {
                this.value = [...this.value,option];
                this.onModelChange(this.value);
            }
        }
        else {
            this.inputEL.nativeElement.value = this.field ? this.objectUtils.resolveFieldData(option, this.field): option;
            this.value = option;
            this.onModelChange(this.value);
        }
        
        this.onSelect.emit(option);
        
        if(this.multiple)
            this.multiInputEL.nativeElement.focus();
        else
            this.inputEL.nativeElement.focus();
    }
    
    show() {
        if(!this.panelVisible && (this.focus||this.dropdownFocus)) {
            this.panelVisible = true;
            this.panelEL.nativeElement.style.zIndex = ++DomHandler.zindex;
            this.domHandler.fadeIn(this.panelEL.nativeElement, 200);
        }        
    }
    
    align() {
        if(this.appendTo)
            this.domHandler.absolutePosition(this.panelEL.nativeElement, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
        else
            this.domHandler.relativePosition(this.panelEL.nativeElement, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
    }
    
    hide() {
        this.panelVisible = false;
    }
    
    handleDropdownClick(event) {
        this.onDropdownClick.emit({
            originalEvent: event,
            query: this.inputEL.nativeElement.value
        });
    }
    
    removeItem(item: any) {
        let itemIndex = this.domHandler.index(item);
        let removedValue = this.value[itemIndex];
        this.value = this.value.filter((val, i) => i!=itemIndex);
        this.onUnselect.emit(removedValue);
        this.onModelChange(this.value);
    }
        
    onKeydown(event) {
        if(this.panelVisible) {
            let highlightItemIndex = this.findOptionIndex(this.highlightOption);
            
            switch(event.which) {
                //down
                case 40:
                    if(highlightItemIndex != -1) {
                        var nextItemIndex = highlightItemIndex + 1;
                        if(nextItemIndex != (this.suggestions.length)) {
                            this.highlightOption = this.suggestions[nextItemIndex];
                            this.highlightOptionChanged = true;
                        }
                    }
                    else {
                        this.highlightOption = this.suggestions[0];
                    }
                    
                    event.preventDefault();
                break;
                
                //up
                case 38:
                    if(highlightItemIndex > 0) {
                        let prevItemIndex = highlightItemIndex - 1;
                        this.highlightOption = this.suggestions[prevItemIndex];
                        this.highlightOptionChanged = true;
                    }
                    
                    event.preventDefault();
                break;
                
                //enter
                case 13:
                    if(this.highlightOption) {
                        this.selectItem(this.highlightOption);
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
                    if(this.highlightOption) {
                        this.selectItem(this.highlightOption);
                    }
                    this.hide();
                break;
            }
        } else {
            if(event.which === 40 && this.suggestions) {
                this.search(event,event.target.value);
            }
        }
        
        if(this.multiple) {
            switch(event.which) {
                //backspace
                case 8:
                    if(this.value && this.value.length && !this.inputEL.nativeElement.value) {
                        this.value = [...this.value];
                        let removedValue = this.value.pop();
                        this.onUnselect.emit(removedValue);
                        this.onModelChange(this.value);
                    }
                break;
            }
        }
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
    
    onDropdownFocus() {
        this.dropdownFocus = true;
        
        if(this.multiple)
            this.multiInputEL.nativeElement.focus();
        else
            this.inputEL.nativeElement.focus();
    }
    
    onDropdownBlur() {
        this.dropdownFocus = false;
    }
    
    isSelected(val: any): boolean {
        let selected: boolean = false;
        if(this.value && this.value.length) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    }
    
    findOptionIndex(option): number {        
        let index: number = -1;
        if(this.suggestions) {
            for(let i = 0; i < this.suggestions.length; i++) {
                if(this.objectUtils.equals(option, this.suggestions[i])) {
                    index = i;
                    break;
                }
            }
        }
                
        return index;
    }
    
    updateFilledState() {
        this.filled = this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '';
    }
    
    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }

        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.panelEL.nativeElement);
        }
    }
}

@NgModule({
    imports: [CommonModule,InputTextModule,ButtonModule,SharedModule],
    exports: [AutoComplete,SharedModule],
    declarations: [AutoComplete]
})
export class AutoCompleteModule { }