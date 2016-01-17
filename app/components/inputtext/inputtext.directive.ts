import {Directive, ElementRef, Renderer, Input, HostListener} from 'angular2/core';
import {UIComponent} from '../../core/uicomponent';

@Directive({
    selector: '[pInputText]'
})
export class InputTextDirective extends UIComponent {

    constructor(private el: ElementRef, private renderer: Renderer) {
        super();
        this.addClasses(this.el.nativeElement, 'pui-inputtext ui-widget ui-state-default ui-corner-all');
    }

    @HostListener('mouseover')
    onMouseOver() {
        this.addClass(this.el.nativeElement, 'ui-state-hover');
    }

    @HostListener('mouseout')
    onMouseOut() {
        this.removeClass(this.el.nativeElement, 'ui-state-hover');
    }

    @HostListener('focus')
    onFocus() {
        this.addClass(this.el.nativeElement, 'ui-state-focus');
    }

    @HostListener('blur')
    onBlur() {
        this.removeClass(this.el.nativeElement, 'ui-state-focus');
    }
}