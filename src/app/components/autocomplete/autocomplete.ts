import {NgModule,Component,ViewChild,ElementRef,AfterViewInit,AfterContentInit,DoCheck,AfterViewChecked,Input,Output,EventEmitter,ContentChildren,QueryList,TemplateRef,Renderer2,forwardRef,ChangeDetectorRef,IterableDiffers} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from '../inputtext/inputtext';
import {ButtonModule} from '../button/button';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';
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
            <input *ngIf="!multiple" #in [attr.type]="type" [attr.id]="inputId" [ngStyle]="inputStyle" [class]="inputStyleClass" autocomplete="off" [attr.required]="required"
            [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input'" [value]="inputFieldValue"
            (click)="onInputClick($event)" (input)="onInput($event)" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (change)="onInputChange($event)"
            [attr.placeholder]="placeholder" [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled"
            ><ul *ngIf="multiple" #multiContainer class="ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all" [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':focus}" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" class="ui-autocomplete-token ui-state-highlight ui-corner-all">
                    <span class="ui-autocomplete-token-icon fa fa-fw fa-close" (click)="removeItem(token)" *ngIf="!disabled"></span>
                    <span *ngIf="!selectedItemTemplate" class="ui-autocomplete-token-label">{{field ? objectUtils.resolveFieldData(val, field): val}}</span>
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: val}"></ng-container>
                </li>
                <li class="ui-autocomplete-input-token">
                    <input #multiIn [attr.type]="type" [attr.id]="inputId" [disabled]="disabled" [attr.placeholder]="(value&&value.length ? null : placeholder)" [attr.tabindex]="tabindex" (input)="onInput($event)"  (click)="onInputClick($event)"
                            (keydown)="onKeydown($event)" [readonly]="readonly" (keyup)="onKeyup($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (change)="onInputChange($event)" autocomplete="off" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul
            ><i *ngIf="loading" class="ui-autocomplete-loader fa fa-circle-o-notch fa-spin fa-fw"></i><button #ddBtn type="button" pButton icon="fa-fw fa-caret-down" class="ui-autocomplete-dropdown" [disabled]="disabled"
                (click)="handleDropdownClick($event)" *ngIf="dropdown"></button>
            <div #panel class="ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow" [style.display]="panelVisible ? 'block' : 'none'" [style.width]="appendTo ? 'auto' : '100%'" [style.max-height]="scrollHeight">
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" *ngIf="panelVisible">
                    <li *ngFor="let option of suggestions; let idx = index" [ngClass]="{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}"
                        (mouseenter)="highlightOption=option" (mouseleave)="highlightOption=null" (click)="selectItem(option)">
                        <span *ngIf="!itemTemplate">{{field ? objectUtils.resolveFieldData(option, field) : option}}</span>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: idx}"></ng-container>
                    </li>
                    <li *ngIf="noResults && emptyMessage" class="ui-autocomplete-list-item ui-corner-all">{{emptyMessage}}</li>
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
export class AutoComplete implements AfterViewInit,AfterViewChecked,DoCheck,ControlValueAccessor {

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

    @Input() required: boolean;

    @Input() size: number;

    @Input() appendTo: any;

    @Input() autoHighlight: boolean;

    @Input() forceSelection: boolean;

    @Input() type: string = 'text';

    @Output() completeMethod: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();

	@Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onKeyUp: EventEmitter<any> = new EventEmitter();

    @Input() field: string;

    @Input() scrollHeight: string = '200px';

    @Input() dropdown: boolean;

    @Input() dropdownMode: string = 'blank';

    @Input() multiple: boolean;

    @Input() tabindex: number;

    @Input() dataKey: string;

    @Input() emptyMessage: string;

    @Input() immutable: boolean = true;

    @ViewChild('in') inputEL: ElementRef;

    @ViewChild('multiIn') multiInputEL: ElementRef;

    @ViewChild('panel') panelEL: ElementRef;

    @ViewChild('multiContainer') multiContainerEL: ElementRef;

    @ViewChild('ddBtn') dropdownButton: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    itemTemplate: TemplateRef<any>;

    selectedItemTemplate: TemplateRef<any>;

    value: any;

    _suggestions: any[];

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    timeout: any;

    panelVisible: boolean = false;

    documentClickListener: any;

    suggestionsUpdated: boolean;

    highlightOption: any;

    highlightOptionChanged: boolean;

    focus: boolean = false;

    filled: boolean;

    inputClick: boolean;

    inputKeyDown: boolean;

    noResults: boolean;

    differ: any;

    inputFieldValue: string = null;

    loading: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public objectUtils: ObjectUtils, public cd: ChangeDetectorRef, public differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    @Input() get suggestions(): any[] {
        return this._suggestions;
    }

    set suggestions(val:any[]) {
        this._suggestions = val;
        if(this.immutable) {
            this.handleSuggestionsChange();
        }
    }

    ngDoCheck() {
        if(!this.immutable) {
            let changes = this.differ.diff(this.suggestions);
            if(changes) {
                this.handleSuggestionsChange();
            }
        }
    }

    handleSuggestionsChange() {
        if(this._suggestions != null) { //async pipe support
            if(this.panelEL && this.panelEL.nativeElement && this.loading) {
                this.highlightOption = null;
                if(this._suggestions && this._suggestions.length) {
                    this.noResults = false;
                    this.show();
                    this.suggestionsUpdated = true;
    
                    if(this.autoHighlight) {
                        this.highlightOption = this._suggestions[0];
                    }
                }
                else {
                    this.noResults = true;
    
                    if(this.emptyMessage) {
                        this.show();
                        this.suggestionsUpdated = true;
                    }
                    else {
                        this.hide();
                    }
                }
            }
    
            this.loading = false;
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
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.panelEL.nativeElement);
            else
                this.domHandler.appendChild(this.panelEL.nativeElement, this.appendTo);
        }
    }

    ngAfterViewChecked() {
        //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
        if(this.suggestionsUpdated && this.panelEL.nativeElement && this.panelEL.nativeElement.offsetParent) {
            setTimeout(() => this.align(), 1);
            this.suggestionsUpdated = false;
        }

        if(this.highlightOptionChanged) {
            setTimeout(() => {
                let listItem = this.domHandler.findSingle(this.panelEL.nativeElement, 'li.ui-state-highlight');
                if(listItem) {
                    this.domHandler.scrollInView(this.panelEL.nativeElement, listItem);
                }
            }, 1);
            this.highlightOptionChanged = false;
        }
    }

    writeValue(value: any) : void {
        this.value = value;
        this.filled = this.value && this.value != '';
        this.updateInputField();
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
        if(!this.inputKeyDown) {
            return;
        }

        if(this.timeout) {
            clearTimeout(this.timeout);
        }

        let value = (<HTMLInputElement> event.target).value;
        if(!this.multiple && !this.forceSelection) {
            this.onModelChange(value);
        }

        if(value.length === 0) {
           this.hide();
           this.onClear.emit(event);
        }

        if(value.length >= this.minLength) {
            this.timeout = setTimeout(() => {
                this.search(event, value);
            }, this.delay);
        }
        else {
            this.suggestions = null;
            this.hide();
        }
        this.updateFilledState();
        this.inputKeyDown = false;
    }

    onInputClick(event: MouseEvent) {
        if(this.documentClickListener) {
            this.inputClick = true;
        }
    }

    search(event: any, query: string) {
        //allow empty string but not undefined or null
       if(query === undefined || query === null) {
           return;
       }

       this.loading = true;

       this.completeMethod.emit({
           originalEvent: event,
           query: query
       });
    }

    selectItem(option: any, focus: boolean = true) {
        if(this.multiple) {
            this.multiInputEL.nativeElement.value = '';
            this.value = this.value||[];
            if(!this.isSelected(option)) {
                this.value = [...this.value,option];
                this.onModelChange(this.value);
            }
        }
        else {
            this.inputEL.nativeElement.value = this.field ? this.objectUtils.resolveFieldData(option, this.field)||'': option;
            this.value = option;
            this.onModelChange(this.value);
        }

        this.onSelect.emit(option);
        this.updateFilledState();
        this._suggestions = null;

        if(focus) {
            this.focusInput();
        }
    }

    show() {
        if(this.multiInputEL || this.inputEL) {
            let hasFocus = this.multiple ? document.activeElement == this.multiInputEL.nativeElement : document.activeElement == this.inputEL.nativeElement ;
            if(!this.panelVisible && hasFocus) {
                this.panelVisible = true;
                if(this.appendTo) {
                    this.panelEL.nativeElement.style.minWidth = this.domHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
                }
                this.panelEL.nativeElement.style.zIndex = ++DomHandler.zindex;
                this.domHandler.fadeIn(this.panelEL.nativeElement, 200);
                this.bindDocumentClickListener();
            }
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
        this.unbindDocumentClickListener();
    }

    handleDropdownClick(event) {
        this.focusInput();
        let queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;

        if(this.dropdownMode === 'blank')
            this.search(event, '');
        else if(this.dropdownMode === 'current')
            this.search(event, queryValue);

        this.onDropdownClick.emit({
            originalEvent: event,
            query: queryValue
        });
    }

    focusInput() {
        if(this.multiple)
            this.multiInputEL.nativeElement.focus();
        else
            this.inputEL.nativeElement.focus();
    }

    removeItem(item: any) {
        let itemIndex = this.domHandler.index(item);
        let removedValue = this.value[itemIndex];
        this.value = this.value.filter((val, i) => i!=itemIndex);
        this.onModelChange(this.value);
        this.updateFilledState();
        this.onUnselect.emit(removedValue);
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
                    if(this.value && this.value.length && !this.multiInputEL.nativeElement.value) {
                        this.value = [...this.value];
                        const removedValue = this.value.pop();
                        this.onModelChange(this.value);
                        this.updateFilledState();
                        this.onUnselect.emit(removedValue);
                    }
                break;
            }
        }

        this.inputKeyDown = true;
    }

    onKeyup(event) {
        this.onKeyUp.emit(event);
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

    onInputChange(event) {
        if(this.forceSelection && this.suggestions) {
            let valid = false;
            let inputValue = event.target.value.trim();

            if(this.suggestions)  {
                for(let suggestion of this.suggestions) {
                    let itemValue = this.field ? this.objectUtils.resolveFieldData(suggestion, this.field) : suggestion;
                    if(itemValue && inputValue === itemValue.trim()) {
                        valid = true;
                        this.selectItem(suggestion, false);
                        break;
                    }
                }
            }

            if(!valid) {
                if(this.multiple) {
                    this.multiInputEL.nativeElement.value = '';
                }
                else {
                    this.value = null;
                    this.inputEL.nativeElement.value = '';
                }

                this.onClear.emit(event);
                this.onModelChange(this.value);
            }
        }
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
        if(this.multiple)
            this.filled = (this.value && this.value.length) || (this.multiInputEL && this.multiInputEL.nativeElement && this.multiInputEL.nativeElement.value != '');
        else
            this.filled = (this.inputFieldValue && this.inputFieldValue != '') || (this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '');;
    }

    updateInputField() {
        let formattedValue = this.value ? (this.field ? this.objectUtils.resolveFieldData(this.value, this.field)||'' : this.value) : '';
        this.inputFieldValue = formattedValue;

        if(this.inputEL && this.inputEL.nativeElement) {
            this.inputEL.nativeElement.value = formattedValue;
        }

        this.updateFilledState();
    }

    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
                if(event.which === 3) {
                    return;
                }

                if(!this.inputClick && !this.isDropdownClick(event)) {
                    this.hide();
                }

                this.inputClick = false;
                this.cd.markForCheck();
            });
        }
    }

    isDropdownClick(event) {
        if(this.dropdown) {
            let target = event.target;
            return (target === this.dropdownButton.nativeElement || target.parentNode === this.dropdownButton.nativeElement);
        }
        else {
            return false;
        }
    }

    unbindDocumentClickListener() {
        if(this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();

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
