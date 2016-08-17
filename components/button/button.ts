import {NgModule,Directive,ElementRef,AfterViewInit,OnDestroy,HostBinding,HostListener,Input} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pButton]',
    host: {
        '[class.ui-state-hover]': 'hover&&!isDisabled()',
        '[class.ui-state-focus]': 'focus',
        '[class.ui-state-active]': 'active',
        '[class.ui-state-disabled]': 'isDisabled()'
    },
    providers: [DomHandler]
})
export class Button implements AfterViewInit, OnDestroy {

    @Input() icon: string;

    @Input() iconPos: string = 'left';
        
    protected _label: string;
    
    protected hover: boolean;
    
    protected focus: boolean;
    
    protected active: boolean;
    
    protected initialized: boolean;

    constructor(protected el: ElementRef, protected domHandler: DomHandler) {}
    
    ngAfterViewInit() {
        this.domHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
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
        this.initialized = true;
    }
        
    @HostListener('mouseenter', ['$event']) 
    onMouseenter(e) {
        this.hover = true;
    }
    
    @HostListener('mouseleave', ['$event']) 
    onMouseleave(e) {
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
    
    getStyleClass(): string {
        let styleClass = 'ui-button ui-widget ui-state-default ui-corner-all';
        if(this.icon) {
            if(this.label != null && this.label != undefined) {
                if(this.iconPos == 'left')
                    styleClass = styleClass + ' ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ui-button-icon-only';
            }
        }
        else {
            styleClass = styleClass + ' ui-button-text-only';
        }
        
        return styleClass;
    }
    
    @Input() get label(): string {
        return this._label;
    }

    set label(val: string) {
        this._label = val;
        
        if(this.initialized) {
            this.domHandler.findSingle(this.el.nativeElement, '.ui-button-text').textContent = this._label;
        }
    }
        
    ngOnDestroy() {
        while(this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
        
        this.initialized = false;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Button],
    declarations: [Button]
})
export class ButtonModule { }