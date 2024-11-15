import { DOCUMENT, NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { Ripple } from 'primeng/ripple';
import { ObjectUtils } from 'primeng/utils';

type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

const INTERNAL_BUTTON_CLASSES = {
    button: 'p-button',
    component: 'p-component',
    iconOnly: 'p-button-icon-only',
    disabled: 'p-disabled',
    loading: 'p-button-loading',
    labelOnly: 'p-button-loading-label-only'
} as const;

/**
 * Button directive is an extension to button component.
 * @group Components
 */
@Directive({
    selector: '[pButton]',
    standalone: true,
    host: {
        class: 'p-element'
    }
})
export class ButtonDirective implements AfterViewInit, OnDestroy {
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPos: ButtonIconPosition = 'left';
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;
    /**
     * Text of the button.
     * @group Props
     */
    @Input() get label(): string | undefined {
        return this._label as string;
    }
    set label(val: string) {
        this._label = val;

        if (this.initialized) {
            this.updateLabel();
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Name of the icon.
     * @group Props
     */
    @Input() get icon(): string {
        return this._icon as string;
    }
    set icon(val: string) {
        this._icon = val;

        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    @Input() get loading(): boolean {
        return this._loading;
    }
    set loading(val: boolean) {
        this._loading = val;

        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Defines the style of the button.
     * @group Props
     */
    @Input() severity: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) raised: boolean = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rounded: boolean = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) text: boolean = false;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) outlined: boolean = false;
    /**
     * Defines the size of the button.
     * @group Props
     */
    @Input() size: 'small' | 'large' | undefined | null = null;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) plain: boolean = false;

    public _label: string | undefined;

    public _icon: string | undefined;

    public _loading: boolean = false;

    public initialized: boolean | undefined;

    private get htmlElement(): HTMLElement {
        return this.el.nativeElement as HTMLElement;
    }

    private _internalClasses: string[] = Object.values(INTERNAL_BUTTON_CLASSES);

    constructor(
        public el: ElementRef,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngAfterViewInit() {
        DomHandler.addMultipleClasses(this.htmlElement, this.getStyleClass().join(' '));

        this.createIcon();
        this.createLabel();

        this.initialized = true;
    }

    getStyleClass(): string[] {
        const styleClass: string[] = [INTERNAL_BUTTON_CLASSES.button, INTERNAL_BUTTON_CLASSES.component];

        if (this.icon && !this.label && ObjectUtils.isEmpty(this.htmlElement.textContent)) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
        }

        if (this.loading) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.disabled, INTERNAL_BUTTON_CLASSES.loading);

            if (!this.icon && this.label) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.labelOnly);
            }

            if (this.icon && !this.label && !ObjectUtils.isEmpty(this.htmlElement.textContent)) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
            }
        }

        if (this.text) {
            styleClass.push('p-button-text');
        }

        if (this.severity) {
            styleClass.push(`p-button-${this.severity}`);
        }

        if (this.plain) {
            styleClass.push('p-button-plain');
        }

        if (this.raised) {
            styleClass.push('p-button-raised');
        }

        if (this.size) {
            styleClass.push(`p-button-${this.size}`);
        }

        if (this.outlined) {
            styleClass.push('p-button-outlined');
        }

        if (this.rounded) {
            styleClass.push('p-button-rounded');
        }

        if (this.size === 'small') {
            styleClass.push('p-button-sm');
        }

        if (this.size === 'large') {
            styleClass.push('p-button-lg');
        }

        return styleClass;
    }

    setStyleClass() {
        const styleClass = this.getStyleClass();
        this.htmlElement.classList.remove(...this._internalClasses);
        this.htmlElement.classList.add(...styleClass);
    }

    createLabel() {
        const created = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (!created && this.label) {
            let labelElement = this.document.createElement('span');
            if (this.icon && !this.label) {
                labelElement.setAttribute('aria-hidden', 'true');
            }

            labelElement.className = 'p-button-label';
            labelElement.appendChild(this.document.createTextNode(this.label));

            this.htmlElement.appendChild(labelElement);
        }
    }

    createIcon() {
        const created = DomHandler.findSingle(this.htmlElement, '.p-button-icon');
        if (!created && (this.icon || this.loading)) {
            let iconElement = this.document.createElement('span');
            iconElement.className = 'p-button-icon';
            iconElement.setAttribute('aria-hidden', 'true');
            let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;

            if (iconPosClass) {
                DomHandler.addClass(iconElement, iconPosClass);
            }

            let iconClass = this.getIconClass();

            if (iconClass) {
                DomHandler.addMultipleClasses(iconElement, iconClass);
            }

            this.htmlElement.insertBefore(iconElement, this.htmlElement.firstChild);
        }
    }

    updateLabel() {
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');

        if (!this.label) {
            labelElement && this.htmlElement.removeChild(labelElement);
            return;
        }

        labelElement ? (labelElement.textContent = this.label) : this.createLabel();
    }

    updateIcon() {
        let iconElement = DomHandler.findSingle(this.htmlElement, '.p-button-icon');
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');

        if (iconElement) {
            if (this.iconPos) {
                iconElement.className = 'p-button-icon ' + (labelElement ? 'p-button-icon-' + this.iconPos : '') + ' ' + this.getIconClass();
            } else {
                iconElement.className = 'p-button-icon ' + this.getIconClass();
            }
        } else {
            this.createIcon();
        }
    }

    getIconClass() {
        return this.loading ? 'p-button-loading-icon pi-spin ' + (this.loadingIcon ?? 'pi pi-spinner') : this.icon || 'p-hidden';
    }

    ngOnDestroy() {
        this.initialized = false;
    }
}
/**
 * Button is an extension to standard button element with icons and theming.
 * @group Components
 */
@Component({
    selector: 'p-button',
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, NgStyle, NgClass, Ripple, AutoFocus, SpinnerIcon],
    template: `
        <button
            [attr.type]="type"
            [attr.aria-label]="ariaLabel"
            [ngStyle]="style"
            [disabled]="disabled || loading"
            [ngClass]="buttonClass"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.data-pc-name]="'button'"
            [attr.data-pc-section]="'root'"
            [attr.tabindex]="tabindex"
            pAutoFocus
            [autofocus]="autofocus"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ng-container *ngIf="loading">
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'"></span>
                    <SpinnerIcon *ngIf="!loadingIcon" [styleClass]="spinnerIconClass()" [spin]="true" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'" />
                </ng-container>
                <ng-template [ngIf]="loadingIconTemplate" *ngTemplateOutlet="loadingIconTemplate; context: { class: iconClass() }"></ng-template>
            </ng-container>
            <ng-container *ngIf="!loading">
                <span *ngIf="icon && !iconTemplate" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'"></span>
                <ng-template [ngIf]="!icon && iconTemplate" *ngTemplateOutlet="iconTemplate; context: { class: iconClass() }"></ng-template>
            </ng-container>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate && label" [attr.data-pc-section]="'label'">{{ label }}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge" [attr.data-pc-section]="'badge'">{{ badge }}</span>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element',
        '[class.p-disabled]': 'disabled' || 'loading'
    }
})
export class Button implements AfterContentInit {
    /**
     * Type of the button.
     * @group Props
     */
    @Input() type: string = 'button';
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPos: ButtonIconPosition = 'left';
    /**
     * Name of the icon.
     * @group Props
     */
    @Input() icon: string | undefined;
    /**
     * Value of the badge.
     * @group Props
     */
    @Input() badge: string | undefined;
    /**
     * Uses to pass attributes to the label's DOM element.
     * @group Props
     */
    @Input() label: string | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) loading: boolean = false;
    /**
     * Icon to display in loading state.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) raised: boolean = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rounded: boolean = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) text: boolean = false;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) plain: boolean = false;
    /**
     * Defines the style of the button.
     * @group Props
     */
    @Input() severity: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) outlined: boolean = false;
    /**
     * Add a link style to the button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) link: boolean = false;
    /**
     * Add a tabindex to the button.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
    /**
     * Defines the size of the button.
     * @group Props
     */
    @Input() size: 'small' | 'large' | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the badge.
     * @group Props
     */
    @Input() badgeClass: string | undefined;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Callback to execute when button is clicked.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (click).
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * Callback to execute when button is focused.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (focus).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    /**
     * Callback to execute when button loses focus.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (blur).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    contentTemplate: TemplateRef<any> | undefined;

    loadingIconTemplate: TemplateRef<any> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    constructor(public el: ElementRef) {}

    spinnerIconClass(): string {
        return Object.entries(this.iconClass())
            .filter(([, value]) => !!value)
            .reduce((acc, [key]) => acc + ` ${key}`, 'p-button-loading-icon');
    }

    iconClass() {
        const iconClasses = {
            'p-button-icon': true,
            'p-button-icon-left': this.iconPos === 'left' && this.label,
            'p-button-icon-right': this.iconPos === 'right' && this.label,
            'p-button-icon-top': this.iconPos === 'top' && this.label,
            'p-button-icon-bottom': this.iconPos === 'bottom' && this.label
        };

        if (this.loading) {
            iconClasses[`p-button-loading-icon pi-spin ${this.loadingIcon ?? ''}`] = true;
        } else if (this.icon) {
            iconClasses[this.icon] = true;
        }

        return iconClasses;
    }

    get buttonClass() {
        return {
            'p-button p-component': true,
            'p-button-icon-only': (this.icon || this.iconTemplate || this.loadingIcon || this.loadingIconTemplate) && !this.label,
            'p-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
            'p-button-loading': this.loading,
            'p-button-loading-label-only': this.loading && !this.icon && this.label && !this.loadingIcon && this.iconPos === 'left',
            'p-button-link': this.link,
            [`p-button-${this.severity}`]: this.severity,
            'p-button-raised': this.raised,
            'p-button-rounded': this.rounded,
            'p-button-text': this.text,
            'p-button-outlined': this.outlined,
            'p-button-sm': this.size === 'small',
            'p-button-lg': this.size === 'large',
            'p-button-plain': this.plain,
            [`${this.styleClass}`]: this.styleClass
        };
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'icon':
                    this.iconTemplate = item.template;
                    break;

                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
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
        };
    }

    /**
     * Applies focus.
     * @group Method
     */
    public focus() {
        this.el.nativeElement.firstChild.focus();
    }
}

@NgModule({
    imports: [ButtonDirective, Button],
    exports: [ButtonDirective, Button, SharedModule]
})
export class ButtonModule {}
