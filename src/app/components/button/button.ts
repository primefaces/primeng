import {NgModule,Directive,Component,ElementRef,EventEmitter,AfterViewInit,Output,OnDestroy,Input,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, AfterContentInit, TemplateRef, QueryList} from '@angular/core';
import {DomHandler} from 'primeng/dom';
import {CommonModule} from '@angular/common';
import {RippleModule} from 'primeng/ripple'; 
import {PrimeTemplate} from 'primeng/api'; 

@Directive({
    selector: '[pButton]'
})
export class ButtonDirective implements AfterViewInit, OnDestroy {

    @Input() iconPos: 'left' | 'right' | 'top' | 'bottom' = 'left';
            
    public _label: string;
    
    public _icon: string;
            
    public initialized: boolean;
    
    public _initialStyleClass: string;

    constructor(public el: ElementRef) {}
    
    ngAfterViewInit() {
        this._initialStyleClass = this.el.nativeElement.className;
        DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());

        if (this.icon) {
            let iconElement = document.createElement("span");
            iconElement.className = 'p-button-icon';
            iconElement.setAttribute("aria-hidden", "true");
            let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
            if (iconPosClass) {
                DomHandler.addClass(iconElement, iconPosClass);
            }
            DomHandler.addMultipleClasses(iconElement, this.icon);
            this.el.nativeElement.appendChild(iconElement);
        }
        
        let labelElement = document.createElement("span");
        if (this.icon && !this.label) {
            labelElement.setAttribute('aria-hidden', 'true');
        }
        labelElement.className = 'p-button-label';
        labelElement.appendChild(document.createTextNode(this.label||'&nbsp;'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    }
        
    getStyleClass(): string {
        let styleClass = 'p-button p-component';
        if (this.icon && !this.label) {
            styleClass = styleClass + ' p-button-icon-only';
        }
        
        return styleClass;
    }

    setStyleClass() {
        let styleClass = this.getStyleClass();
        this.el.nativeElement.className = styleClass + ' ' + this._initialStyleClass;
    }
    
    @Input() get label(): string {
        return this._label;
    }

    set label(val: string) {
        this._label = val;
        
        if (this.initialized) {
            DomHandler.findSingle(this.el.nativeElement, '.p-button-label').textContent = this._label || '&nbsp;';
            this.setStyleClass();
        }
    }
    
    @Input() get icon(): string {
        return this._icon;
    }

    set icon(val: string) {
        this._icon = val;
        
        if (this.initialized) {
            if (this.iconPos)
                DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon p-button-icon-' + this.iconPos + ' ' + this._icon;
            else
                DomHandler.findSingle(this.el.nativeElement, '.p-button-icon').className = 'p-button-icon ' + this._icon;

            this.setStyleClass();
        }
    }
    
    ngOnDestroy() {
        this.initialized = false;
    }
}

@Component({
    selector: 'p-button',
    template: `
        <button [attr.type]="type" [class]="styleClass" [ngStyle]="style" [disabled]="disabled"
            [ngClass]="{'p-button p-component':true,
                        'p-button-icon-only': (icon && !label),
                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)" pRipple>
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <span [ngClass]="{'p-button-icon': true,
                        'p-button-icon-left': iconPos === 'left' && label,
                        'p-button-icon-right': iconPos === 'right' && label,
                        'p-button-icon-top': iconPos === 'top' && label,
                        'p-button-icon-bottom': iconPos === 'bottom' && label}"
                        [class]="icon" *ngIf="icon" [attr.aria-hidden]="true"></span>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label">{{label||'&nbsp;'}}</span>
            <span [ngClass]="'p-badge'" *ngIf="badge" [class]="badgeClass">{{badge}}</span>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class Button implements AfterContentInit {

    @Input() type: string = "button";

    @Input() iconPos: string = 'left';

    @Input() icon: string;

    @Input() badge: string;

    @Input() label: string;

    @Input() disabled: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() badgeClass: string;

    contentTemplate: TemplateRef<any>;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;
                
                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }
}

@NgModule({
    imports: [CommonModule,RippleModule],
    exports: [ButtonDirective,Button],
    declarations: [ButtonDirective,Button]
})
export class ButtonModule { }
