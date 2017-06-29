import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,Renderer2,EventEmitter,IterableDiffers,forwardRef,ViewChild,ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/selectitem';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};

@Component({
    selector: 'p-multiSelect',
    template: `
        <div #container [ngClass]="{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
            (click)="onMouseclick($event,in)">
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly="readonly" [attr.id]="inputId" (focus)="onFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
            </div>
            <div class="ui-multiselect-label-container" [title]="valuesAsString">
                <label class="ui-multiselect-label ui-corner-all">{{valuesAsString}}</label>
            </div>
            <div [ngClass]="{'ui-multiselect-trigger ui-state-default ui-corner-right':true}">
                <span class="fa fa-fw fa-caret-down ui-clickable"></span>
            </div>
            <div #panel class="ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow" [style.display]="overlayVisible ? 'block' : 'none'" (click)="panelClick=true">
                <div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">
                    <div class="ui-chkbox ui-widget">
                        <div class="ui-helper-hidden-accessible">
                            <input #cb type="checkbox" readonly="readonly" [checked]="isAllChecked()">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isAllChecked()}" (click)="toggleAll($event,cb)">
                            <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'fa fa-check':isAllChecked()}"></span>
                        </div>
                    </div>
                    <div class="ui-multiselect-filter-container" *ngIf="filter">
                        <input type="text" role="textbox" (input)="onFilter($event)"
                                    class="ui-inputtext ui-widget ui-state-default ui-corner-all">
                        <span class="fa fa-fw fa-search"></span>
                    </div>
                    <a class="ui-multiselect-close ui-corner-all" href="#" (click)="close($event)">
                        <span class="fa fa-close"></span>
                    </a>
                </div>
                <div class="ui-multiselect-items-wrapper">
                    <ul class="ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" [style.max-height]="scrollHeight||'auto'">
                        <li *ngFor="let option of options" class="ui-multiselect-item ui-corner-all" (click)="onItemClick($event,option.value)" 
                            [style.display]="isItemVisible(option) ? 'block' : 'none'" [ngClass]="{'ui-state-highlight':isSelected(option.value)}">
                            <div class="ui-chkbox ui-widget">
                                <div class="ui-helper-hidden-accessible">
                                    <input type="checkbox" readonly="readonly" [checked]="isSelected(option.value)">
                                </div>
                                <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isSelected(option.value)}">
                                    <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'fa fa-check':isSelected(option.value)}"></span>
                                </div>
                            </div>
                            <label>{{option.label}}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler,ObjectUtils,MULTISELECT_VALUE_ACCESSOR]
})
export class MultiSelect implements OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,ControlValueAccessor {

    @Input() options: SelectItem[];

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Input() scrollHeight: string = '200px';
    
    @Input() defaultLabel: string = 'Choose';

    @Input() style: any;

    @Input() styleClass: string;

    @Input() inputId: string;

    @Input() disabled: boolean;
    
    @Input() filter: boolean = true;
    
    @Input() overlayVisible: boolean;

    @Input() tabindex: number;
    
    @Input() appendTo: any;
    
    @Input() dataKey: string;
    
    @Input() displaySelectedLabel: boolean = true;
    
    @Input() maxSelectedLabels: number = 3;
    
    @Input() selectedItemsLabel: string = '{0} items selected';
        
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('panel') panelViewChild: ElementRef;
    
    public value: any[];
    
    public onModelChange: Function = () => {};
    
    public onModelTouched: Function = () => {};
    
    public valuesAsString: string;
        
    public focus: boolean;
    
    public documentClickListener: any;
    
    public container: HTMLDivElement;
    
    public panel: HTMLDivElement;
        
    public selfClick: boolean;
    
    public panelClick: boolean;
    
    public filterValue: string;
    
    public visibleOptions: SelectItem[];
    
    public filtered: boolean;
        
    public valueDiffer: any;
    
    public optionsDiffer: any;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, differs: IterableDiffers, public objectUtils: ObjectUtils, private cd: ChangeDetectorRef) {
        this.valueDiffer = differs.find([]).create(null);
        this.optionsDiffer = differs.find([]).create(null);
    }
    
    ngOnInit() {
        this.updateLabel();
    }
    
    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        this.panel = <HTMLDivElement> this.panelViewChild.nativeElement; 
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                this.domHandler.appendChild(this.panel, this.appendTo);
        }
        
        if(this.overlayVisible) {
            this.show();
        }
    }
    
    ngAfterViewChecked() {
        if(this.filtered) {
            if(this.appendTo)
                this.domHandler.absolutePosition(this.panel, this.container);
            else
                this.domHandler.relativePosition(this.panel, this.container);

            this.filtered = false;
        }
    }
    
    ngDoCheck() {
        let valueChanges = this.valueDiffer.diff(this.value);
        let optionChanges = this.optionsDiffer.diff(this.options);
        
        if(valueChanges||optionChanges) {
            this.updateLabel();
        }
    }
    
    writeValue(value: any) : void {
        this.value = value;
        this.updateLabel();
        this.cd.markForCheck();
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
    
    onItemClick(event, value) {
        let selectionIndex = this.findSelectionIndex(value);
        if(selectionIndex != -1)
            this.value = this.value.filter((val,i) => i!=selectionIndex);
        else
            this.value = [...this.value||[],value];
        
        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event, value: this.value});
    }   
    
    isSelected(value) {
        return this.findSelectionIndex(value) != -1;
    }
    
    findSelectionIndex(val: any): number {
        let index = -1;
        
        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }
    
    toggleAll(event, checkbox) {
        if(checkbox.checked) {
            this.value = [];
        }
        else {
            let opts = this.getVisibleOptions();
            if(opts) {
                this.value = [];
                for(let i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                } 
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event, value: this.value});
    } 
    
    isAllChecked() {
        if(this.filterValue && this.filterValue.trim().length)
            return this.value&&this.visibleOptions&&this.visibleOptions.length&&(this.value.length == this.visibleOptions.length);
        else
            return this.value&&this.options&&(this.value.length == this.options.length);
    } 
    
    show() {
        this.overlayVisible = true;
        this.panel.style.zIndex = String(++DomHandler.zindex);
        this.bindDocumentClickListener();
        
        if(this.appendTo)
            this.domHandler.absolutePosition(this.panel, this.container);
        else
            this.domHandler.relativePosition(this.panel, this.container);

        this.domHandler.fadeIn(this.panel, 250);
    }
    
    hide() {
        this.overlayVisible = false;
        this.unbindDocumentClickListener();
    }
    
    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
         
    onMouseclick(event,input) {
        if(this.disabled) {
            return;
        }
        
        if(!this.panelClick) {
            if(this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        
        this.selfClick = true;
    }
    
    onFocus(event) {
        this.focus = true;
    }
    
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit({originalEvent: event});
        this.onModelTouched();
    }
    
    updateLabel() {
        if(this.value && this.options && this.value.length && this.displaySelectedLabel) {
            let label = '';
            for(let i = 0; i < this.value.length; i++) {
                if(i != 0) {
                    label = label + ', ';
                }
                label = label + this.findLabelByValue(this.value[i]);
            }
            
            if(this.value.length <= this.maxSelectedLabels) {
                this.valuesAsString = label;
            }
            else {
                let pattern = /{(.*?)}/,
                newSelectedItemsLabel = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                this.valuesAsString = newSelectedItemsLabel;
            }
        }
        else {
            this.valuesAsString = this.defaultLabel;
        }
    }
    
    findLabelByValue(val: any): string {
        let label = null;
        for(let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if(val == null && option.value == null || this.objectUtils.equals(val, option.value, this.dataKey)) {
                label = option.label;
                break; 
            }
        }
        return label;
    }
    
    onFilter(event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for(let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if(option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    }
        
    isItemVisible(option: SelectItem): boolean {
        if(this.filterValue && this.filterValue.trim().length) {
            for(let i = 0; i < this.visibleOptions.length; i++) {
                if(this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    
    getVisibleOptions(): SelectItem[] {
        if(this.filterValue && this.filterValue.trim().length) {
            let items = [];
            for(let i = 0; i < this.options.length; i++) {
                let option = this.options[i];
                if(option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.selfClick && !this.panelClick && this.overlayVisible) {
                    this.hide();
                }
                
                this.selfClick = false;
                this.panelClick = false;
                this.cd.markForCheck();
            });
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
            this.container.appendChild(this.panel);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [MultiSelect],
    declarations: [MultiSelect]
})
export class MultiSelectModule { }
