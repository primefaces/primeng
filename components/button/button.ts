import {NgModule,Directive,ElementRef,AfterViewInit,OnDestroy,HostBinding,HostListener,Input} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pButton]',
    providers: [DomHandler]
})
export class Button implements AfterViewInit, OnDestroy {

    @Input() iconPos: string = 'left';
    
    @Input() cornerStyleClass: string = 'ui-corner-all';
        
    public _label: string;
    
    public _icon: string;
            
    public initialized: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler) {}
    
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
        labelElement.appendChild(document.createTextNode(this.label||'ui-btn'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    }
        
    getStyleClass(): string {
        let styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
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
    
    @Input() get icon(): string {
        return this._icon;
    }

    set icon(val: string) {
        this._icon = val;
        
        if(this.initialized) {
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right': 'ui-button-icon-left';
            this.domHandler.findSingle(this.el.nativeElement, '.fa').className = iconPosClass  + ' ui-c fa fa-fw ' + this.icon;
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
