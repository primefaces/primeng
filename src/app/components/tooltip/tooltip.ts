import {NgModule,Directive,ElementRef,OnDestroy,HostBinding,HostListener,Input,Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';

@Directive({
    selector: '[pTooltip]',
    providers: [DomHandler]
})
export class Tooltip implements OnDestroy {

    @Input() tooltipPosition: string = 'right';
    
    @Input() tooltipEvent: string = 'hover';
    
    @Input() appendTo: any = 'body';
    
    @Input() positionStyle: string;
    
    @Input() tooltipStyleClass: string;
    
    @Input("tooltipDisabled") disabled: boolean;
    
    @Input() escape: boolean = true;
    
    @Input() showDelay: number;
    
    @Input() hideDelay: number;
        
    container: any;
    
    styleClass: string;
    
    tooltipText: any;
    
    showTimeout: any;
    
    hideTimeout: any;
    
    documentResizeListener: Function;
    
    active: boolean;
    
    public _text: string;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
            
    @HostListener('mouseenter', ['$event']) 
    onMouseEnter(e: Event) {
        if(this.tooltipEvent === 'hover') {
            this.activate();
        }
    }
    
    @HostListener('mouseleave', ['$event']) 
    onMouseLeave(e: Event) {
        if(this.tooltipEvent === 'hover') {
            this.deactivate();
        }
    }
    
    @HostListener('focus', ['$event']) 
    onFocus(e: Event) {
        if(this.tooltipEvent === 'focus') {
            this.activate();
        }
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e: Event) {
        if(this.tooltipEvent === 'focus') {
            this.deactivate();
        }
    }
    
    activate() {
        this.active = true;
        if(this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        
        if(this.showDelay)
            this.showTimeout = setTimeout(() => { this.show() }, this.showDelay);
        else
            this.show();
    }
    
    deactivate() {
        this.active = false;
        if(this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        
        if(this.hideDelay)
            this.hideTimeout = setTimeout(() => { this.hide() }, this.hideDelay);
        else
            this.hide();
    }
    
    get text(): string {
        return this._text;
    }

    @Input('pTooltip') set text(text: string) {
        this._text = text;
        if(this.active) {
            if(this._text) {
                if(this.container && this.container.offsetParent)
                    this.tooltipText.innerHTML = this._text;
                else 
                    this.show();
            }
            else {
                this.hide();
            }
        }
    }
    
    create() {
        this.container = document.createElement('div');
                
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
            
        this.container.style.display = 'inline-block';
    }
    
    show() {
        if(!this.text || this.disabled) {
            return;
        }
        
        this.create();
        this.align();
        if(this.tooltipStyleClass) {
            this.container.className = this.container.className + ' ' + this.tooltipStyleClass; 
        }
        this.domHandler.fadeIn(this.container, 250);
        this.container.style.zIndex = ++DomHandler.zindex;
        this.bindDocumentResizeListener();
    }
    
    hide() {
        this.destroy();
    }
    
    align() {
        let position = this.tooltipPosition;
        
        switch(position) {
            case 'top':
                this.alignTop();
                if(this.isOutOfBounds()) {
                    this.alignBottom();
                }
            break;
            
            case 'bottom':
                this.alignBottom();
                if(this.isOutOfBounds()) {
                    this.alignTop();
                }
            break;
            
            case 'left':
                this.alignLeft();
                if(this.isOutOfBounds()) {
                    this.alignRight();
                    
                    if(this.isOutOfBounds()) {
                        this.alignTop();
                        
                        if(this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
            break;
            
            case 'right':
                this.alignRight();
                if(this.isOutOfBounds()) {
                    this.alignLeft();
                    
                    if(this.isOutOfBounds()) {
                        this.alignTop();
                        
                        if(this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
            break;
        }
    }
    
    getHostOffset() {
        let offset = this.el.nativeElement.getBoundingClientRect();
        let targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
        let targetTop = offset.top + this.domHandler.getWindowScrollTop();
        
        return {left: targetLeft, top: targetTop};
    }
    
    alignRight() {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-right';
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + this.domHandler.getOuterWidth(this.el.nativeElement);
        let top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    } 
    
    alignLeft() {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-left';
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left - this.domHandler.getOuterWidth(this.container);
        let top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    } 
    
    alignTop() {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-top';
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top - this.domHandler.getOuterHeight(this.container);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    } 
    
    alignBottom() {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-bottom';
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top + this.domHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    }
    
    preAlign() {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
    }
    
    isOutOfBounds(): boolean {
        let offset = this.container.getBoundingClientRect();
        let targetTop = offset.top;
        let targetLeft = offset.left;
        let width = this.domHandler.getOuterWidth(this.container);
        let height = this.domHandler.getOuterHeight(this.container);
        let viewport = this.domHandler.getViewport();

        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
    }
        
    bindDocumentResizeListener() {
        this.documentResizeListener = this.renderer.listen('window', 'resize', (event) => {
            this.hide();
        });
    }
    
    unbindDocumentResizeListener() {
        if(this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    
    destroy() {
        this.unbindDocumentResizeListener();
        
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
     
    ngOnDestroy() {
        this.destroy();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Tooltip],
    declarations: [Tooltip]
})
export class TooltipModule { }