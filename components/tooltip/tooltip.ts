import {Directive,ElementRef,HostBinding,HostListener,Input} from '@angular/core';
import {DomHandler} from '../dom/domhandler';

@Directive({
    selector: '[pTooltip]',
    host: {
    },
    providers: [DomHandler]
})
export class Tooltip {

    @Input('pTooltip') text: string;

    @Input() tooltipPosition: string = 'right';

    @Input() tooltipEvent: string = 'hover';

    @Input() allowHover: boolean = false;

    container: any;

    mouseOverContainer: boolean = false;

    constructor(private el: ElementRef, private domHandler: DomHandler) { }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter(e) {
        if (this.tooltipEvent === 'hover') {
            this.show();
        }
    }

    @HostListener('mouseout', ['$event'])
    onMouseLeave(e) {
        this.mouseOverContainer = false;
        if (this.tooltipEvent === 'hover') {
            if (this.allowHover) {
                setTimeout(() => this.hideWhenMouseIsOut(), 400);
            } else {
                this.hide();            
            }
        }
    }

    @HostListener('focus', ['$event'])
    onFocus(e) {
        if (this.tooltipEvent === 'focus') {
            this.show();
        }
    }

    @HostListener('blur', ['$event'])
    onBlur(e) {
        if (this.tooltipEvent === 'focus') {
            this.hide();
        }
    }

    show() {
        this.create();
        let rect = this.el.nativeElement.getBoundingClientRect();
        let targetTop = rect.top + document.body.scrollTop;
        let targetLeft = rect.left + document.body.scrollLeft;
        let left;
        let top;

        this.container.style.display = 'block';

        switch (this.tooltipPosition) {
            case 'right':
                left = targetLeft + this.domHandler.getOuterWidth(this.el.nativeElement);
                top = targetTop + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
                break;

            case 'left':
                left = targetLeft - this.domHandler.getOuterWidth(this.container);
                top = targetTop + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
                break;

            case 'top':
                left = targetLeft + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
                top = targetTop - this.domHandler.getOuterHeight(this.container);
                break;

            case 'bottom':
                left = targetLeft + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
                top = targetTop + this.domHandler.getOuterHeight(this.el.nativeElement);
                break;
        }

        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
        this.domHandler.fadeIn(this.container, 250);
        this.container.style.zIndex = ++DomHandler.zindex;
    }

    hide() {
        this.container.style.display = 'none';
        this.destroy();
    }

    create() {
        this.container = document.createElement('div');
        this.container.className = 'ui-widget ui-tooltip ui-tooltip-' + this.tooltipPosition;

        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);

        let tooltipText = document.createElement('div');
        tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
        tooltipText.innerHTML = this.text;

        this.container.appendChild(tooltipText);

        document.body.appendChild(this.container);

        if (this.allowHover) {
            let _self = this;
            this.container.onmouseenter = () => { this.mouseOverContainer = true};
            this.container.onmouseleave = ($event) => { $event.fromElement.style.display = 'none' };
        }
    }
    hideWhenMouseIsOut() {
        if (this.mouseOverContainer === false) {
            this.hide();
        }        
    }
    destroy() {
        document.body.removeChild(this.container);
    }   
}