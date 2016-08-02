import {Directive,ElementRef,OnDestroy,HostBinding,HostListener,Input} from '@angular/core';
import {DomHandler} from '../dom/domhandler';

@Directive({
    selector: '[pTooltip]',
    host: {
    },
    providers: [DomHandler]
})
export class Tooltip implements OnDestroy {

    @Input('pTooltip') text: string;

    @Input() tooltipPosition: string = 'right';
    
    @Input() tooltipEvent: string = 'hover';
        
    container: any;
        
    constructor(protected el: ElementRef, protected domHandler: DomHandler) {}
        
    @HostListener('mouseenter', ['$event']) 
    onMouseEnter(e) {
        if(this.tooltipEvent === 'hover') {
            this.show();
        }
    }
    
    @HostListener('mouseleave', ['$event']) 
    onMouseLeave(e) {
        if(this.tooltipEvent === 'hover') {
            this.hide();
        }
    }
    
    @HostListener('focus', ['$event']) 
    onFocus(e) {
        if(this.tooltipEvent === 'focus') {
            this.show();
        }
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e) {
        if(this.tooltipEvent === 'focus') {
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

        switch(this.tooltipPosition) {
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
        document.body.removeChild(this.container);
        this.container = null;
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
    }
    
    ngOnDestroy() {
        if(this.container && this.container.parentElement) {
            document.body.removeChild(this.container);
        }
        this.container = null;
    }
}