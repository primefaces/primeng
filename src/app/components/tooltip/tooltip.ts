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
    
    show() {
        if(!this.text || this.disabled) {
            return;
        }
        
        this.create();
        let offset = this.el.nativeElement.getBoundingClientRect();
        let targetTop = offset.top + this.domHandler.getWindowScrollTop();
        let targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
        let left: number;
        let top: number;
        
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
        this.ngOnDestroy();
    }
         
    create() {
        let styleClass = 'ui-widget ui-tooltip ui-tooltip-' + this.tooltipPosition;
        this.container = document.createElement('div');
        if(this.tooltipStyleClass) {
            styleClass += ' ' + this.tooltipStyleClass;
        }
        
        this.container.className = styleClass;
        
        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        
        let tooltipText = document.createElement('div');
        tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
		
		if(this.escape)
			tooltipText.appendChild(document.createTextNode(this.text));
		else
			tooltipText.innerHTML = this.text;
        
        if(this.positionStyle) {
            this.container.style.position = this.positionStyle;
        }
        
        this.container.appendChild(tooltipText);
        
        if(this.appendTo === 'body')
            document.body.appendChild(this.container);
        else if(this.appendTo === 'target')
            this.domHandler.appendChild(this.container, this.el.nativeElement);
        else
            this.domHandler.appendChild(this.container, this.appendTo);
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