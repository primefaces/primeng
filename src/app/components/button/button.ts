import {NgModule,Directive,Component,ElementRef,EventEmitter,AfterViewInit,Output,OnDestroy,Input,ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, AfterContentInit, TemplateRef, QueryList} from '@angular/core';
import {DomHandler} from 'primeng/dom';
import {CommonModule} from '@angular/common';
import {RippleModule} from 'primeng/ripple';
import {PrimeTemplate} from 'primeng/api';

@Directive({
    selector: '[pButton]',
    host: {
        'class': 'p-element'
    }
})
export class ButtonDirective implements AfterViewInit, OnDestroy {

    @Input() iconPos: 'left' | 'right' | 'top' | 'bottom' = 'left';

    @Input() loadingIcon: string = "pi pi-spinner pi-spin";

    public _label: string;

    public _icon: string;

    public _loading: boolean = false;

    public initialized: boolean;

    public _initialStyleClass: string;

    constructor(public el: ElementRef) {}

    ngAfterViewInit() {
        this._initialStyleClass = this.el.nativeElement.className;
        DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());

        if (this.icon || this.loading) {
            this.createIconEl();
        }

        let labelElement = document.createElement("span");
        if (this.icon && !this.label) {
            labelElement.setAttribute('aria-hidden', 'true');
        }
        labelElement.className = 'p-button-label';

        if (this.label)
            labelElement.appendChild(document.createTextNode(this.label));
        else
            labelElement.innerHTML = '&nbsp;';

        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    }

    getStyleClass(): string {
        let styleClass = 'p-button p-component';
        if (this.icon && !this.label) {
            styleClass = styleClass + ' p-button-icon-only';
        }

        if (this.loading) {
            styleClass = styleClass + ' p-disabled p-button-loading';
            if (!this.icon && this.label)
                styleClass = styleClass + ' p-button-loading-label-only';
        }

        return styleClass;
    }

    setStyleClass() {
        let styleClass = this.getStyleClass();
        this.el.nativeElement.className = styleClass + ' ' + this._initialStyleClass;
    }

    createIconEl() {
        let iconElement = document.createElement("span");
        iconElement.className = 'p-button-icon';
        iconElement.setAttribute("aria-hidden", "true");
        let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;

        if (iconPosClass) {
            DomHandler.addClass(iconElement, iconPosClass);
        }

        let iconClass = this.getIconClass();

        if(iconClass) {
            DomHandler.addMultipleClasses(iconElement, iconClass);
        }

        let labelEl = DomHandler.findSingle(this.el.nativeElement, '.p-button-label')

        if (labelEl)
            this.el.nativeElement.insertBefore(iconElement, labelEl);
        else
            this.el.nativeElement.appendChild(iconElement)
    }

    getIconClass() {
        return this.loading ? 'p-button-loading-icon ' + this.loadingIcon : this._icon;
    }

    setIconClass() {
        let iconElement = DomHandler.findSingle(this.el.nativeElement, '.p-button-icon');
        if (iconElement) {
            if (this.iconPos)
                iconElement.className = 'p-button-icon p-button-icon-' + this.iconPos + ' ' + this.getIconClass();
            else
                iconElement.className = 'p-button-icon ' + this.getIconClass();
        }
        else {
            this.createIconEl();
        }
    }

    removeIconElement() {
        let iconElement = DomHandler.findSingle(this.el.nativeElement, '.p-button-icon');
        this.el.nativeElement.removeChild(iconElement);
    }

    @Input() get label(): string {
        return this._label;
    }

    set label(val: string) {
        this._label = val;

        if (this.initialized) {
            DomHandler.findSingle(this.el.nativeElement, '.p-button-label').textContent = this._label || '&nbsp;';

            if (this.loading || this.icon) {
                this.setIconClass();
            }
            this.setStyleClass();
        }
    }

    @Input() get icon(): string {
        return this._icon;
    }

    set icon(val: string) {
        this._icon = val;

        if (this.initialized) {
            this.setIconClass();
            this.setStyleClass();
        }
    }

    @Input() get loading(): boolean {
        return this._loading;
    }

    set loading(val: boolean) {
        this._loading = val;

        if (this.initialized) {
            if (this.loading || this.icon)
                this.setIconClass();
            else
                this.removeIconElement();

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
        <button [attr.type]="type" [class]="styleClass" [ngStyle]="style" [disabled]="disabled || loading"
            [ngClass]="{'p-button p-component':true,
                        'p-button-icon-only': (icon && !label),
                        'p-button-vertical': (iconPos === 'top' || iconPos === 'bottom') && label,
                        'p-disabled': this.disabled || this.loading,
                        'p-button-loading': this.loading,
                        'p-button-loading-label-only': this.loading && !this.icon && this.label}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)" pRipple>
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <span [ngClass]="{'p-button-icon': true,
                        'p-button-icon-left': iconPos === 'left' && label,
                        'p-button-icon-right': iconPos === 'right' && label,
                        'p-button-icon-top': iconPos === 'top' && label,
                        'p-button-icon-bottom': iconPos === 'bottom' && label}"
                        [class]="loading ? 'p-button-loading-icon ' + loadingIcon : icon" *ngIf="!contentTemplate && (icon||loading)" [attr.aria-hidden]="true"></span>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate">{{label||'&nbsp;'}}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge">{{badge}}</span>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'p-element'
    }
})
export class Button implements AfterContentInit {

    @Input() type: string = "button";

    @Input() iconPos: string = 'left';

    @Input() icon: string;

    @Input() badge: string;

    @Input() label: string;

    @Input() disabled: boolean;

    @Input() loading: boolean = false;

    @Input() loadingIcon: string = "pi pi-spinner pi-spin";

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

    badgeStyleClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.badge && String(this.badge).length === 1
        }
    }
}

@NgModule({
    imports: [CommonModule,RippleModule],
    exports: [ButtonDirective,Button],
    declarations: [ButtonDirective,Button]
})
export class ButtonModule { }
