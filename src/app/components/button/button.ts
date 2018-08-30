import {NgModule,Directive,Component,ElementRef,EventEmitter,AfterViewInit,Output,OnDestroy,HostBinding,HostListener,Input} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {CommonModule} from '@angular/common';

@Directive({
    selector: '[pButton]',
    providers: [DomHandler]
})
export class ButtonDirective implements AfterViewInit, OnDestroy {

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
            iconElement.setAttribute("aria-hidden", "true");
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right': 'ui-button-icon-left';
            iconElement.className = iconPosClass  + ' ui-clickable ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        
        let labelElement = document.createElement("span");
        labelElement.className = 'ui-button-text ui-clickable';
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
            if(this.label) {
                styleClass = styleClass + ' ui-button-text-only';
            }
            else {
                styleClass = styleClass + ' ui-button-text-empty';
            }
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

            if(!this.icon) {
                if (this._label) {
                    this.domHandler.removeClass(this.el.nativeElement, 'ui-button-text-empty');
                    this.domHandler.addClass(this.el.nativeElement, 'ui-button-text-only');
                }
                else {
                    this.domHandler.addClass(this.el.nativeElement, 'ui-button-text-empty');
                    this.domHandler.removeClass(this.el.nativeElement, 'ui-button-text-only');
                }
            }
        }
    }
    
    @Input() get icon(): string {
        return this._icon;
    }

    set icon(val: string) {
        this._icon = val;
        
        if(this.initialized) {
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right': 'ui-button-icon-left';
            this.domHandler.findSingle(this.el.nativeElement, '.ui-clickable').className =
                iconPosClass + ' ui-clickable ' + this.icon;
        }
    }
        
    ngOnDestroy() {
        while(this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
        
        this.initialized = false;
    }
}

@Component({
    selector: 'p-button',
    template: `
        <button [attr.type]="type" [class]="styleClass" [style]="style" [disabled]="disabled"
            [ngClass]="{'ui-button ui-widget ui-state-default ui-corner-all':true,
                        'ui-button-icon-only': (icon && !label),
                        'ui-button-text-icon-left': (icon && label && iconPos === 'left'),
                        'ui-button-text-icon-right': (icon && label && iconPos === 'right'),
                        'ui-button-text-only': (!icon && label),
                        'ui-button-text-empty': (!icon && !label),
                        'ui-state-disabled': disabled}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)">
            <ng-content></ng-content>
            <span [ngClass]="{'ui-clickable': true,
                        'ui-button-icon-left': (iconPos === 'left'), 
                        'ui-button-icon-right': (iconPos === 'right')}"
                        [class]="icon" *ngIf="icon"></span>
            <span class="ui-button-text ui-clickable">{{label||'ui-btn'}}</span>
        </button>
    `
})
export class Button {

    @Input() type: string;

    @Input() iconPos: string = 'left';

    @Input() icon: string;

    @Input() label: string;

    @Input() disabled: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();
}

@NgModule({
    imports: [CommonModule],
    exports: [ButtonDirective,Button],
    declarations: [ButtonDirective,Button]
})
export class ButtonModule { }
