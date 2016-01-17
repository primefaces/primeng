import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
import {UIComponent} from '../../core/uicomponent';

@Directive({
    selector: '[pInputText]',
    host: {
        '(mouseover)': 'onMouseOver()',
        '(mouseout)': 'onMouseOut()',
        '(focus)': 'onFocus()',
        '(blur)': 'onBlur()'
    }
})
export class InputTextDirective extends UIComponent {

    constructor(private el: ElementRef) {
        super();
        this.addClass(this.el.nativeElement, 'pui-inputtext');
        this.addClass(this.el.nativeElement, 'ui-widget');
        this.addClass(this.el.nativeElement, 'ui-state-default');
        this.addClass(this.el.nativeElement, 'ui-corner-all');
    }

    onMouseOver() {
        this.addClass(this.el.nativeElement, 'ui-state-hover');
    }

    onMouseOut() {
        this.removeClass(this.el.nativeElement, 'ui-state-hover');
    }

    onFocus() {
        this.addClass(this.el.nativeElement, 'ui-state-focus');
    }

    onBlur() {
        this.removeClass(this.el.nativeElement, 'ui-state-focus');
    }
}