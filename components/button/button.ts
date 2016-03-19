import {Directive,ElementRef,AfterViewInit,OnDestroy,HostBinding,HostListener,Input} from 'angular2/core';

@Directive({
    selector: '[pButton]',
    host: {
        '[class.ui-button]': 'true',
        '[class.ui-widget]': 'true',
        '[class.ui-state-default]': 'true',
        '[class.ui-corner-all]': 'true',
        '[class.ui-button-text-only]': '!icon && label',
        '[class.ui-button-icon-only]': 'icon && !label',
        '[class.ui-button-text-icon-left]': 'icon && label && iconPos == "left"',
        '[class.ui-button-text-icon-right]': 'icon && label && iconPos == "right"',
        '[class.ui-state-hover]': 'hover',
        '[class.ui-state-focus]': 'focus',
        '[class.ui-state-active]': 'active',
        '[class.ui-state-disabled]': 'isDisabled()'
    }
})
export class Button implements AfterViewInit, OnDestroy {

    @Input() icon: string;

    @Input() iconPos: string = 'left';
        
    @Input() label: string;
    
    private hover: boolean;
    
    private focus: boolean;
    
    private active: boolean;

    constructor(private el: ElementRef) {}
    
    ngAfterViewInit() {
        if(this.icon) {
            let iconElement = document.createElement("span");
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right': 'ui-button-icon-left';
            iconElement.className = iconPosClass  + ' ui-c fa fa-fw ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        
        let labelElement = document.createElement("span");
        labelElement.className = 'ui-button-text ui-c';
        labelElement.appendChild(document.createTextNode(this.label||'ui-button'));
        this.el.nativeElement.appendChild(labelElement);
    }
        
    @HostListener('mouseover', ['$event']) 
    onMouseover(e) {
        this.hover = true;
    }
    
    @HostListener('mouseout', ['$event']) 
    onMouseout(e) {
        this.hover = false;
        this.active = false;
    }
    
    @HostListener('mousedown', ['$event']) 
    onMouseDown(e) {
        this.active = true;
    }
    
    @HostListener('mouseup', ['$event']) 
    onMouseUp(e) {
        this.active = false;
    }
    
    @HostListener('focus', ['$event']) 
    onFocus(e) {
        this.focus = true;
    }
    
    @HostListener('blur', ['$event']) 
    onBlur(e) {
        this.focus = false;
    }
    
    isDisabled() {
        return this.el.nativeElement.disabled;
    }
        
    ngOnDestroy() {
        while(this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
    }
}