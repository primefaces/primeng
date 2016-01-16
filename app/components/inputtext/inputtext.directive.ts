import {Directive, ElementRef, Renderer, Input} from 'angular2/core';

@Directive({
    selector: '[pInputText]',
    host: {
        '(mouseover)': 'onMouseOver()',
        '(mouseout)': 'onMouseOut()',
        '(focus)': 'onFocus()',
        '(blur)': 'onBlur()'
    }
})
export class InputTextDirective implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.addClass('pui-inputtext');
        this.addClass('ui-widget');
        this.addClass('ui-state-default');
        this.addClass('ui-corner-all');
    }

    onMouseOver() {
        this.addClass('ui-state-hover');
    }

    onMouseOut() {
        this.removeClass('ui-state-hover');
    }

    onFocus() {
        this.addClass('ui-state-focus');
    }

    onBlur() {
        this.removeClass('ui-state-focus');
    }

    //todo move this to core
    addClass(className: string) {
        var nativeElement = this.el.nativeElement;
        if (nativeElement.classList)
            nativeElement.classList.add(className);
        else
            nativeElement.className += ' ' + className;
    }

    //todo move this to core
    removeClass(className: string) {
        var nativeElement = this.el.nativeElement;

        if (nativeElement.classList)
            nativeElement.classList.remove(className);
        else
            nativeElement.className = nativeElement.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}