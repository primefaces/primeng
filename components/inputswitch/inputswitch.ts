import {Component,ElementRef,AfterViewInit,OnChanges,Input,forwardRef,Provider,EventEmitter,Output} from 'angular2/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor,NgStyle} from 'angular2/common';
import {DomHandler} from '../dom/domhandler';
import {CONST_EXPR} from 'angular2/src/facade/lang';

const INPUTSWITCH_VALUE_ACCESSOR: Provider = CONST_EXPR(
    new Provider(NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => InputSwitch),
        multi: true
    })
);

@Component({
    selector: 'p-inputSwitch',
    template: `
        <div [ngClass]="{'ui-inputswitch ui-widget ui-widget-content ui-corner-all': true,
            'ui-state-disabled': disabled}" (click)="toggle($event)"
            [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-inputswitch-off">
                <span class="ui-inputswitch-offlabel">{{offLabel}}</span>
            </div>
            <div class="ui-inputswitch-on">
                <span class="ui-inputswitch-onlabel">{{onLabel}}</span>
            </div>
            <div class="ui-inputswitch-handle ui-state-default" [ngClass]="{'ui-state-focus':focus}"></div>
            <div class="ui-helper-hidden-accessible">
                <input type="checkbox" (focus)="onFocus($event)" (blur)="onBlur($event)"/>
            </div>
        </div>
    `,
    providers: [INPUTSWITCH_VALUE_ACCESSOR,DomHandler],
    directives: [NgStyle]
})
export class InputSwitch implements ControlValueAccessor, AfterViewInit {

    @Input() onLabel: string = 'On';

    @Input() offLabel: string = 'Off';

    @Input() disabled: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    value: boolean;

    checked: boolean = false;

    focus: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    private container: any;

    private handle: any;

    private onContainer: any;

    private offContainer: any;

    private onLabelChild: any;

    private offLabelChild: any;

    private offset: any;

    constructor(private el: ElementRef, private domHandler: DomHandler) {}

    ngAfterViewInit() {
        this.handleDimensions();
    }

    handleDimensions() {
        this.container = this.el.nativeElement.children[0];
        this.handle = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-inputswitch-handle');
        this.onContainer = this.domHandler.findSingle(this.container,'div.ui-inputswitch-on');
        this.offContainer = this.domHandler.findSingle(this.container,'div.ui-inputswitch-off');
        this.onLabelChild = this.domHandler.findSingle(this.onContainer,'span.ui-inputswitch-onlabel');
        this.offLabelChild = this.domHandler.findSingle(this.offContainer,'span.ui-inputswitch-offlabel');

        let	onContainerWidth =  this.domHandler.width(this.onContainer),
            offContainerWidth = this.domHandler.width(this.offContainer),
            spanPadding	= this.domHandler.innerWidth(this.offLabelChild) - this.domHandler.width(this.offLabelChild),
            handleMargins = this.domHandler.outerWidth(this.handle) - this.domHandler.innerWidth(this.handle);
        
        var containerWidth = (onContainerWidth > offContainerWidth) ? onContainerWidth : offContainerWidth,
            handleWidth = containerWidth;

        this.handle.style.width = handleWidth + 'px';
        handleWidth = this.domHandler.width(this.handle);
        containerWidth = containerWidth + handleWidth + 6;

        var labelWidth = containerWidth - handleWidth - spanPadding - handleMargins;

        this.container.style.width = containerWidth + 'px';
        this.onLabelChild.style.width = labelWidth + 'px';
        this.offLabelChild.style.width = labelWidth + 'px';
        //position
        this.offContainer.style.width = (this.domHandler.width(this.container) - 5) + 'px';
        this.offset = this.domHandler.width(this.container) - this.domHandler.outerWidth(this.handle);

        //default value
        if(this.checked) {
            this.handle.style.left = this.offset + 'px';
            this.onContainer.style.width = this.offset + 'px';
            this.offLabelChild.style.marginRight = -this.offset + 'px';
        }
        else {
            this.onContainer.style.width = 0 + 'px';
            this.onLabelChild.style.marginLeft = -this.offset + 'px';
        }
    }

    toggle(event) {
        if(!this.disabled) {
            this.focus = true;
            this.checked = !this.checked;
            this.checked ? this.checkUI() : this.uncheckUI();
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            })
        }
    }

    checkUI() {
        this.onContainer.style.width = this.offset + 'px';
        this.onLabelChild.style.marginLeft = 0 + 'px';
        this.offLabelChild.style.marginRight = -this.offset + 'px';
        this.handle.style.left = this.offset + 'px';
    }

    uncheckUI() {
        this.onContainer.style.width = 0 + 'px';
        this.onLabelChild.style.marginLeft = -this.offset + 'px';
        this.offLabelChild.style.marginRight = 0 + 'px';
        this.handle.style.left = 0 + 'px';
    }

    onFocus(event) {
        this.focus = true;
    }

    onBlur(event) {
        this.focus = false;
        this.onModelTouched();
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
}
