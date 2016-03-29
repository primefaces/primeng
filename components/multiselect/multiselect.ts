import {Component,ElementRef,OnInit,AfterViewInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,Renderer,EventEmitter,ContentChild,TemplateRef,IterableDiffers} from 'angular2/core';
import {SelectItem} from '../api/selectitem';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-multiSelect',
    template: `
        <div [ngClass]="{'ui-multiselect ui-widget ui-state-default ui-corner-all':true}" [attr.style]="style" [attr.styleClass]="styleClass"
            (mouseenter)="onMouseenter($event)" (mouseleave)="onMouseleave($event)" (click)="onMouseclick($event,in)">
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly="readonly" (focus)="onFocus($event)" (blur)="onBlur($event)">
            </div>
            <div class="ui-multiselect-label-container">
                <label [ngClass]="{'ui-multiselect-label ui-corner-all':true,'ui-state-hover':hover,'ui-state-focus':focus}">{{valuesAsString}}</label>
            </div>
            <div [ngClass]="{'ui-multiselect-trigger ui-state-default ui-corner-right':true,'ui-state-hover':hover,'ui-state-focus':focus}">
                <span class="fa fa-fw fa-caret-down"></span>
            </div>
            <div class="ui-multiselect-panel ui-widget ui-widget-content ui-corner-all" [style.display]="panelVisible ? 'block' : 'none'" (click)="panelClick=true">
                <div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">
                    <div class="ui-chkbox ui-widget" (click)="toggleAll($event,cb.checked)">
                        <div class="ui-helper-hidden-accessible">
                            <input #cb type="checkbox" readonly="readonly" [checked]="options&&value&&(options.length == value.length)">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-hover':hoverToggleAll}"
                            (mouseenter)="hoverToggleAll=true" (mouseleave)="hoverToggleAll=false">
                            <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-fw fa-check':options&&value&&(options.length == value.length)}"></span>
                        </div>
                    </div>
                    <div class="ui-multiselect-filter-container">
                        <input type="text" aria-multiline="false" aria-readonly="false" aria-disabled="false" role="textbox" (input)="filterValue = $event.target.value"
                                    class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all">
                        <span class="fa fa-fw fa-search"></span>
                    </div>
                    <a class="ui-multiselect-close ui-corner-all" href="#" (click)="close($event)">
                        <span class="fa fa-close"></span>
                    </a>
                </div>
                <div class="ui-multiselect-items-wrapper">
                    <ul class="ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" [style.max-height]="scrollHeight||'auto'">
                        <li #item *ngFor="#option of options" class="ui-multiselect-item ui-corner-all" (click)="onItemClick($event,option.value)" 
                            [style.display]="isItemVisible(option.label) ? 'block' : 'none'"
                            [ngClass]="{'ui-state-highlight':isSelected(option.value),'ui-state-hover':hoveredItem==item}" (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
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
    providers: [DomHandler]
})
export class MultiSelect implements OnInit,AfterViewInit,OnDestroy {

    @Input() value: any[];

    @Input() options: SelectItem[];

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Input() scrollHeight: string = '200px';

    @Input() style: string;

    @Input() styleClass: string;
    
    @Input() field: string;
    
    @Input() disabled: boolean;
    
    private valuesAsString: string;
    
    private hover: boolean;
    
    private focus: boolean;
    
    private panelVisible: boolean;
    
    private documentClickListener: any;
    
    private panel: any;
    
    private container: any;
    
    private selfClick: boolean;
    
    private panelClick: boolean;
    
    private filterValue: string;
    
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}
    
    ngOnInit() {
        this.updateLabel();
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if(!this.selfClick && this.panelVisible) {
                this.hide();
            }
            
            this.selfClick = false;
            this.panelClick = false;
        });
    }
    
    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-multiselect-panel');
    }
    
    onItemClick(event, value) {
        let selectionIndex = this.findSelectionIndex(value);
        if(selectionIndex != -1) {
            this.value.splice(selectionIndex, 1);
        }
        else {
            this.value = this.value||[];
            this.value.push(value);
        }
        
        this.updateLabel();
        
        event.stopPropagation();
    }   
    
    isSelected(value) {
        return this.findSelectionIndex(value) != -1;
    }
    
    findSelectionIndex(val: any): number {
        let index = -1;
        
        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.value[i] == val) {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }
    
    toggleAll(event, checked) {
        if(checked) {
            this.value = [];
        }
        else {
            if(this.options) {
                this.value = [];
                for(let i = 0; i < this.options.length; i++) {
                    this.value.push(this.options[i].value);
                } 
            }
        }
        this.updateLabel();
        this.valueChange.next(this.value);
    } 
  
    show() {
        this.panelVisible = true;
        this.panel.style.zIndex = ++PUI.zindex;
        this.domHandler.relativePosition(this.panel, this.container);
        this.domHandler.fadeIn(this.panel, 250);
    }
    
    hide() {
        this.panelVisible = false;
    }
    
    close(event) {
        this.hide();
        event.preventDefault();
    }
     
    onMouseenter(event) {
        this.hover = true;
    }
    
    onMouseleave(event) {
        this.hover = false;
    }
    
    onMouseclick(event,input) {
        if(!this.panelClick) {
            if(this.panelVisible) {
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
    
    onBlur(event) {
        this.focus = false;
    }
    
    updateLabel() {
        if(this.value && this.value.length) {
            let label = '';
            for(let i = 0; i < this.value.length; i++) {
                if(i != 0) {
                    label = label + ',';
                }
                label = label + (this.field ? this.value[i][this.field] : this.value[i]);
            }
            this.valuesAsString = label;
        }
        else {
            this.valuesAsString = 'Choose';
        }
    }
        
    isItemVisible(val) {
        if(this.filterValue && this.filterValue.trim().length) {
            return val.toLowerCase().startsWith(this.filterValue.toLowerCase());
        }
        else {
            return true;
        }
    }

    ngOnDestroy() {
        this.documentClickListener();
    }

}