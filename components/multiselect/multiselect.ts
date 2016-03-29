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
            <span class="ui-multiselect-label-container">
                <label [ngClass]="{'ui-multiselect-label ui-corner-all':true,'ui-state-hover':hover,'ui-state-focus':focus}">{{valuesAsString}}</label>
            </span>
            <div [ngClass]="{'ui-multiselect-trigger ui-state-default ui-corner-right':true,'ui-state-hover':hover,'ui-state-focus':focus}">
                <span class="fa fa-fw fa-caret-down"></span>
            </div>
            <div class="ui-multiselect-panel ui-widget ui-widget-content ui-corner-all" [style.display]="panelVisible ? 'block' : 'none'">
                <div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">
                    <div class="ui-chkbox ui-widget">
                        <div class="ui-helper-hidden-accessible">
                            <input type="checkbox" readonly="readonly">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default">
                            <span class="ui-chkbox-icon ui-c"></span>
                        </div>
                        </div>
                    <div class="ui-multiselect-filter-container">
                        <input type="text" aria-multiline="false" aria-readonly="false" aria-disabled="false" role="textbox" class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all">
                        <span class="fa fa-fw fa-search"></span>
                    </div>
                    <a class="ui-multiselect-close ui-corner-all" href="#">
                        <span class="fa fa-close"></span>
                    </a>
                </div>
                <div class="ui-multiselect-items-wrapper">
                    <ul class="ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
                        <li *ngFor="#option of options" class="ui-multiselect-item ui-multiselect-list-item ui-corner-all">
                            <div class="ui-chkbox ui-widget">
                                <div class="ui-helper-hidden-accessible">
                                    <input type="checkbox" readonly="readonly">
                                </div>
                                <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default">
                                    <span class="ui-chkbox-icon ui-c"></span>
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

    @Input() filter: boolean;

    @Input() filterMatchMode: string;

    @Input() style: string;

    @Input() styleClass: string;
    
    @Input() disabled: boolean;
    
    private valuesAsString: string;
    
    private hover: boolean;
    
    private focus: boolean;
    
    private panelVisible: boolean;
    
    private documentClickListener: any;
    
    private panel: any;
    
    private container: any;
    
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {

    }
    
    ngOnInit() {
        if(this.value) {
            this.valuesAsString = this.value.join(',');
        }
        else {
            this.valuesAsString = 'Choose';
        }
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.hide();
        });
    }
    
    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-multiselect-panel');
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
     
    onMouseenter(event) {
        this.hover = true;
    }
    
    onMouseleave(event) {
        this.hover = false;
    }
    
    onMouseclick(event,input) {
        if(this.panelVisible) {
            this.hide();
        }
        else {
            input.focus();
            this.show();
        }
        
        event.stopPropagation();
    }
    
    onFocus(event) {
        this.focus = true;
    }
    
    onBlur(event) {
        this.focus = false;
    }

    ngOnDestroy() {
        this.documentClickListener();
    }

}