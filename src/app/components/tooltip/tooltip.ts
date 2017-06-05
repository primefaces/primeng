import {NgModule,Directive,ElementRef,OnDestroy,HostBinding,HostListener,Input} from '@angular/core';
import {CommonModule} from '@angular/common';
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
    
    @Input() appendTo: any = 'body';
    
    @Input() positionStyle: string;
    
    @Input() tooltipStyleClass: string;
    
    @Input("tooltipDisabled") disabled: boolean;
    
    @Input() escape: boolean = true;
        
    container: any;
    
    styleClass: string;
    
    tooltipText: any;
        
    constructor(public el: ElementRef, public domHandler: DomHandler) {}
            
    @HostListener('mouseenter', ['$event']) 
    onMouseEnter(e: Event) {
        if(this.tooltipEvent === 'hover') {
            this.show();
        }
    }
    
    @HostListener('mouseleave', ['$event']) 
    onMouseLeave(e: Event) {
        if(this.tooltipEvent === 'hover') {
            this.hide();
        }
    }
    
    @HostListener('focus', ['$event']) 
    onFocus(e: Event) {
        if(this.tooltipEvent === 'focus') {
            this.show();
        }
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e: Event) {
        if(this.tooltipEvent === 'focus') {
            this.hide();
        }
    }
    
    @HostListener('window:resize', ['$event'])
    onResize(e: Event) {
      this.hide();
    }
    
    show() {
        if(!this.text || this.disabled) {
            return;
        }
        
        this.create();
        
        this.tooltipPositioning(this.tooltipPosition);
        
        this.alignTooltip();
    }
    
    tooltipPositioning(pos) {
        let offset = this.el.nativeElement.getBoundingClientRect();
        let targetTop = offset.top + this.domHandler.getWindowScrollTop();
        let targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
        let left: number;
        let top: number;
        
        this.container.style.display = 'block';
        
        switch(pos) {
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
        this.ngOnDestroy();
    }
         
    create() {
        this.styleClass = 'ui-widget ui-tooltip ui-tooltip-' + this.tooltipPosition;
        this.container = document.createElement('div');
        if(this.tooltipStyleClass) {
            this.styleClass += ' ' + this.tooltipStyleClass;
        }
        
        this.container.className = this.styleClass;
        
        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
		
		if(this.escape)
			this.tooltipText.appendChild(document.createTextNode(this.text));
		else
			this.tooltipText.innerHTML = this.text;
        
        if(this.positionStyle) {
            this.container.style.position = this.positionStyle;
        }
        
        this.container.appendChild(this.tooltipText);
        
        if(this.appendTo === 'body')
            document.body.appendChild(this.container);
        else if(this.appendTo === 'target')
            this.domHandler.appendChild(this.container, this.el.nativeElement);
        else
            this.domHandler.appendChild(this.container, this.appendTo);
    }
    
    alignTooltip() {
        let elementWidth = this.container.getBoundingClientRect().width;
        let viewport = this.domHandler.getViewport();
        
        this.domHandler.removeClass(this.tooltipText, 'ui-tooltip-helper');
        switch(this.tooltipPosition) {
            case 'right':
                if(parseInt(this.container.style.left) + elementWidth > viewport.width) {
                    let tooltipPosition = 'left';
                    this.domHandler.removeClass(this.container, 'ui-tooltip-right');
                    this.domHandler.addClass(this.container, 'ui-tooltip-left');
                    this.tooltipPositioning(tooltipPosition);
                    if(parseInt(this.container.style.left) < 0) {
                        tooltipPosition = 'top';
                        this.domHandler.removeClass(this.container, 'ui-tooltip-left');
                        this.domHandler.addClass(this.container, 'ui-tooltip-top');
                        this.domHandler.addClass(this.tooltipText, 'ui-tooltip-helper');
                        this.container.style.width = 100 + 'px';
                        this.tooltipPositioning(tooltipPosition);
                    }
                }
            break;
            
            case 'left':
                if(parseInt(this.container.style.left) < 0) {
                    let tooltipPosition = 'right';
                    this.domHandler.removeClass(this.container, 'ui-tooltip-left');
                    this.domHandler.addClass(this.container, 'ui-tooltip-right');
                    this.tooltipPositioning(tooltipPosition);
                    if(parseInt(this.container.style.left) + elementWidth > viewport.width) {
                        tooltipPosition = 'top';
                        this.domHandler.removeClass(this.container, 'ui-tooltip-right');
                        this.domHandler.addClass(this.container, 'ui-tooltip-top');
                        this.domHandler.addClass(this.tooltipText, 'ui-tooltip-helper');
                        this.container.style.width = 100 + 'px';
                        this.tooltipPositioning(tooltipPosition);
                    }
                }
            break;
            
            case 'top':
                if(parseInt(this.container.style.left) < 0) {
                    let tooltipPosition = 'right';
                    this.domHandler.removeClass(this.container, 'ui-tooltip-top');
                    this.domHandler.addClass(this.container, 'ui-tooltip-right');
                    this.tooltipPositioning(tooltipPosition);
                    if(parseInt(this.container.style.left) + elementWidth > viewport.width) {
                        this.domHandler.addClass(this.tooltipText, 'ui-tooltip-helper');
                        this.container.style.width = 100 + 'px';
                        this.tooltipPositioning(tooltipPosition);
                    }
                }
                else if(parseInt(this.container.style.left) + elementWidth > viewport.width) {
                    let tooltipPosition = 'left';
                    this.domHandler.removeClass(this.container, 'ui-tooltip-top');
                    this.domHandler.addClass(this.container, 'ui-tooltip-left');
                    this.tooltipPositioning(tooltipPosition);
                    if(parseInt(this.container.style.left) < 0) {
                        this.domHandler.addClass(this.tooltipText, 'ui-tooltip-helper');
                        this.container.style.width = 100 + 'px';
                        this.tooltipPositioning(tooltipPosition);
                    }
                }
            break;
            
            case 'bottom':
                if(parseInt(this.container.style.left) < 0) {
                    let tooltipPosition = 'right';
                    this.domHandler.removeClass(this.container, 'ui-tooltip-bottom');
                    this.domHandler.addClass(this.container, 'ui-tooltip-right');
                    this.tooltipPositioning(tooltipPosition);
                    if(parseInt(this.container.style.left) + elementWidth > viewport.width) {
                        this.domHandler.addClass(this.tooltipText, 'ui-tooltip-helper');
                        this.container.style.width = 100 + 'px';
                        this.tooltipPositioning(tooltipPosition);
                    }
                }
                else if(parseInt(this.container.style.left) + elementWidth > viewport.width) {
                    let tooltipPosition = 'left';
                    this.domHandler.removeClass(this.container, 'ui-tooltip-bottom');
                    this.domHandler.addClass(this.container, 'ui-tooltip-left');
                    this.tooltipPositioning(tooltipPosition);
                    if(parseInt(this.container.style.left) < 0) {
                        this.domHandler.addClass(this.tooltipText, 'ui-tooltip-helper');
                        this.container.style.width = 100 + 'px';
                        this.tooltipPositioning(tooltipPosition);
                    }
                }
            break;
        }
        
    }
    
    ngOnDestroy() {
        if(this.container && this.container.parentElement) {
            if(this.appendTo === 'body')
                document.body.removeChild(this.container);
            else if(this.appendTo === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                this.domHandler.removeChild(this.container, this.appendTo);
        }
        this.container = null;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Tooltip],
    declarations: [Tooltip]
})
export class TooltipModule { }