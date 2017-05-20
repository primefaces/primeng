import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,Renderer,EventEmitter,IterableDiffers,forwardRef,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/api';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/ObjectUtils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};

@Component({
    selector: 'p-multiSelect',
    template: `
     <div [ngClass]="{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-state-focus': focus,'ui-state-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
     (click)="onMouseclick($event,in)">
    <div class="ui-helper-hidden-accessible">
        <input #in type="text" readonly="readonly" (focus)="onFocus($event)" (blur)="onBlur($event)">
    </div>
    <div class="ui-multiselect-label-container" [title]="valuesAsString">
        <label [ngClass]="{'ui-multiselect-label ui-corner-all':true,'ui-state-hover':hover,'ui-state-focus':focus}">{{valuesAsString}}</label>
    </div>
    <div [ngClass]="{'ui-multiselect-trigger ui-state-default ui-corner-right':true,'ui-state-hover':hover,'ui-state-focus':focus}">
        <span class="fa fa-fw fa-caret-down"></span>
    </div>
    <div class="ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow" [style.display]="overlayVisible ? 'block' : 'none'" (click)="panelClick=true">
        <div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">
            <div class="ui-chkbox ui-widget">
                <div class="ui-helper-hidden-accessible">
                    <input #cb type="checkbox" readonly="readonly" [checked]="isAllChecked()">
                </div>
                <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-hover':hoverToggleAll}"
                     (click)="toggleAll($event,cb)">
                    <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-fw fa-check':isAllChecked()}"></span>
                </div>
            </div>
            <div class="ui-multiselect-filter-container">
                <input type="text" role="textbox" (input)="onFilter($event)"
                       class="ui-inputtext ui-widget ui-state-default ui-corner-all">
                <span class="fa fa-fw fa-search"></span>
                <span style="float: right;" (click)="isSheetVisible = !isSheetVisible;" class="fa fa-eye" [class.hideUnselected]="isSheetVisible" pTooltip="Toggle Unselected Items" tooltipPosition="top" placeholder="Top"></span>
            </div>
            <a class="ui-multiselect-close ui-corner-all" href="#" (click)="close($event)">
                <span class="fa fa-close"></span>
            </a>

        </div>
        <div class="ui-multiselect-items-wrapper">
            <ul class="ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" [class.hideUnselected]="isSheetVisible" [style.max-height]="scrollHeight||'auto'">
                <li #item *ngFor="let option of options" class="ui-multiselect-item ui-corner-all" (click)="onItemClick($event,option.value)"
                    [style.display]="isItemVisible(option) ? 'block' : 'none'"
                    [ngClass]="{'ui-state-highlight':isSelected(option.value),'ui-state-hover':hoveredItem==item}">
                    <div class="ui-chkbox ui-widget">
                        <div class="ui-helper-hidden-accessible">
                            <input type="checkbox" readonly="readonly" [checked]="isSelected(option.value)">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isSelected(option.value)}">
                            <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-fw fa-check':isSelected(option.value)}"></span>
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
export class MultiSelect implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnDestroy, ControlValueAccessor {
    public hoverToggleAll: string;
    public valuesAsString: string;
    public hover: boolean;
    public focus: boolean;
    public panelClick: boolean;
    public hoveredItem: any;

    @Input() options: SelectItem[];
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Input() scrollHeight: string = '200px';
    @Input() defaultLabel: string = 'Choose';
    @Input() style: any;
    @Input() styleClass: string;
    @Input() disabled: boolean;
    @Input() overlayVisible: boolean;

    value: any[];
    differ: any;
    isSheetVisible: boolean = false;

    private documentClickListener: any;
    private panel: any;
    private container: any;
    private selfClick: boolean;
    private filterValue: string;
    private visibleOptions: SelectItem[];
    private filtered: boolean;

    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        this.updateLabel();

        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if (!this.selfClick && this.overlayVisible) {
                this.hide();
            }

            this.selfClick = false;
            this.panelClick = false;
        });
    }

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-multiselect-panel');

        if (this.overlayVisible) {
            this.show();
        }
    }

    ngAfterViewChecked() {
        if (this.filtered) {
            this.domHandler.relativePosition(this.panel, this.container);
            this.filtered = false;
        }
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.value);

        if (changes) {
            this.updateLabel();
        }
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    onItemClick(event: any, value: any) {
        let selectionIndex = this.findSelectionIndex(value);
        if (selectionIndex !== -1) {
            this.value.splice(selectionIndex, 1);
        } else {
            this.value = this.value || [];
            this.value.push(value);
        }

        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    }

    isSelected(value: any) {
        return this.findSelectionIndex(value) !== -1;
    }

    findSelectionIndex(val: any): number {
        let index = -1;

        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] === val) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    toggleAll(event: any, checkbox: any) {
        if (checkbox.checked) {
            this.value = [];
        } else {
            let opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (let i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                }
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
    }

    isAllChecked() {
        if (this.filterValue && this.filterValue.trim().length) {
            return this.value && this.visibleOptions && (this.value.length === this.visibleOptions.length);
        } else {
            return this.value && this.options && (this.value.length === this.options.length);
        }
    }

    show() {
        this.overlayVisible = true;
        this.panel.style.zIndex = ++DomHandler.zindex;
        this.domHandler.relativePosition(this.panel, this.container);
        this.domHandler.fadeIn(this.panel, 250);
    }

    hide() {
        this.overlayVisible = false;
    }

    close(event: Event) {
        this.hide();
        event.preventDefault();
    }

    onMouseenter(event: Event) {
        if (!this.disabled) {
            this.hover = true;
        }
    }

    onMouseleave(event: Event) {
        this.hover = false;
    }

    onMouseclick(event: Event, input: HTMLInputElement) {
        if (this.disabled) {
            return;
        }

        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                input.focus();
                this.show();
            }
        }

        this.selfClick = true;
    }

    onFocus(event: Event) {
        this.focus = true;
    }

    onBlur(event: Event) {
        this.focus = false;
        this.onModelTouched();
    }

    updateLabel() {
        if (this.value && this.value.length) {
            let label = '';
            for (let i = 0; i < this.value.length; i++) {
                if (i !== 0) {
                    label = label + ',';
                }
                label = label + this.findLabelByValue(this.value[i]);
            }
            this.valuesAsString = label;
        } else {
            this.valuesAsString = this.defaultLabel;
        }
    }

    findLabelByValue(val: any): string {
        let label: string = null;
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if (option.value === val) {
                label = option.label;
                break;
            }
        }
        return label;
    }

    onFilter(event: any) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    }

    isItemVisible(option: SelectItem): boolean {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value === option.value) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }

    getVisibleOptions(): SelectItem[] {
        if (this.filterValue && this.filterValue.trim().length) {
            let items: SelectItem[] = [];
            for (let i = 0; i < this.options.length; i++) {
                let option = this.options[i];
                if (option.label.toLowerCase().startsWith(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        } else {
            return this.options;
        }
    }

    ngOnDestroy() {
        this.documentClickListener();
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [MultiSelect],
    declarations: [MultiSelect]
})
export class MultiSelectModule { }
