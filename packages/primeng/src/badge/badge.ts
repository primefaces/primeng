import { CommonModule } from '@angular/common';
import { AfterViewInit, booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, inject, Input, input, NgModule, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { addClass, hasClass, isEmpty, isNotEmpty, removeClass, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { BadgeStyle } from './style/badgestyle';

/**
 * Badge Directive is directive usage of badge component.
 * @group Components
 */
@Directive({
    selector: '[pBadge]',
    providers: [BadgeStyle],
    standalone: true
})
export class BadgeDirective extends BaseComponent implements OnChanges, AfterViewInit {
    /**
     * When specified, disables the component.
     * @group Props
     */
    @Input('badgeDisabled') public disabled: boolean;
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    @Input() public badgeSize: 'large' | 'xlarge' | 'small' | null | undefined;
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     * @deprecated use badgeSize instead.
     */
    @Input() public set size(value: 'large' | 'xlarge' | 'small' | null | undefined) {
        this._size = value;
        console.log('size property is deprecated and will removed in v18, use badgeSize instead.');
    }
    get size() {
        return this._size;
    }
    _size: 'large' | 'xlarge' | 'small' | null | undefined;
    /**
     * Severity type of the badge.
     * @group Props
     */
    @Input() severity: 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null | undefined;
    /**
     * Value to display inside the badge.
     * @group Props
     */
    @Input() public value: string | number;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() badgeStyle: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() badgeStyleClass: string;

    private id!: string;

    badgeEl: HTMLElement;

    _componentStyle = inject(BadgeStyle);

    private get activeElement(): HTMLElement {
        return this.el.nativeElement.nodeName.indexOf('-') != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
    }

    private get canUpdateBadge(): boolean {
        return this.id && !this.disabled;
    }

    constructor() {
        super();
    }

    public ngOnChanges({ value, size, severity, disabled, badgeStyle, badgeStyleClass }: SimpleChanges): void {
        super.ngOnChanges({ value, size, severity, disabled });
        if (disabled) {
            this.toggleDisableState();
        }

        if (!this.canUpdateBadge) {
            return;
        }

        if (severity) {
            this.setSeverity(severity.previousValue);
        }

        if (size) {
            this.setSizeClasses();
        }

        if (value) {
            this.setValue();
        }

        if (badgeStyle || badgeStyleClass) {
            this.applyStyles();
        }
    }

    public ngAfterViewInit(): void {
        this.id = uuid('pn_id_') + '_badge';
        this.renderBadgeContent();
    }

    private setValue(element?: HTMLElement): void {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        if (this.value != null) {
            if (hasClass(badge, 'p-badge-dot')) {
                removeClass(badge, 'p-badge-dot');
            }

            if (this.value && String(this.value).length === 1) {
                addClass(badge, 'p-badge-circle');
            } else {
                removeClass(badge, 'p-badge-circle');
            }
        } else {
            if (!hasClass(badge, 'p-badge-dot')) {
                addClass(badge, 'p-badge-dot');
            }

            removeClass(badge, 'p-badge-circle');
        }

        badge.innerHTML = '';
        const badgeValue = this.value != null ? String(this.value) : '';
        this.renderer.appendChild(badge, this.document.createTextNode(badgeValue));
    }

    private setSizeClasses(element?: HTMLElement): void {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        if (this.badgeSize) {
            if (this.badgeSize === 'large') {
                addClass(badge, 'p-badge-lg');
                removeClass(badge, 'p-badge-xl');
            }

            if (this.badgeSize === 'xlarge') {
                addClass(badge, 'p-badge-xl');
                removeClass(badge, 'p-badge-lg');
            }
        } else if (this.size && !this.badgeSize) {
            if (this.size === 'large') {
                addClass(badge, 'p-badge-lg');
                removeClass(badge, 'p-badge-xl');
            }

            if (this.size === 'xlarge') {
                addClass(badge, 'p-badge-xl');
                removeClass(badge, 'p-badge-lg');
            }
        } else {
            removeClass(badge, 'p-badge-lg');
            removeClass(badge, 'p-badge-xl');
        }
    }

    private renderBadgeContent(): void {
        if (this.disabled) {
            return null;
        }

        const el = this.activeElement;
        const badge = this.document.createElement('span');
        badge.id = this.id;
        badge.className = 'p-badge p-component';

        this.setSeverity(null, badge);
        this.setSizeClasses(badge);
        this.setValue(badge);
        addClass(el, 'p-overlay-badge');
        this.renderer.appendChild(el, badge);
        this.badgeEl = badge;
        this.applyStyles();
    }

    private applyStyles(): void {
        if (this.badgeEl && this.badgeStyle && typeof this.badgeStyle === 'object') {
            for (const [key, value] of Object.entries(this.badgeStyle)) {
                this.renderer.setStyle(this.badgeEl, key, value);
            }
        }
        if (this.badgeEl && this.badgeStyleClass) {
            this.badgeEl.classList.add(...this.badgeStyleClass.split(' '));
        }
    }

    private setSeverity(oldSeverity?: 'success' | 'info' | 'warn' | 'danger' | null, element?: HTMLElement): void {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        if (this.severity) {
            addClass(badge, `p-badge-${this.severity}`);
        }

        if (oldSeverity) {
            removeClass(badge, `p-badge-${oldSeverity}`);
        }
    }

    private toggleDisableState(): void {
        if (!this.id) {
            return;
        }

        if (this.disabled) {
            const badge = this.activeElement?.querySelector(`#${this.id}`);

            if (badge) {
                this.renderer.removeChild(this.activeElement, badge);
            }
        } else {
            this.renderBadgeContent();
        }
    }
}
/**
 * Badge is a small status indicator for another element.
 * @group Components
 */
@Component({
    selector: 'p-badge',
    template: `{{ value() }}`,
    standalone: true,
    imports: [CommonModule, SharedModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BadgeStyle],
    host: {
        '[class]': 'containerClass()',
        '[style.display]': 'badgeDisabled() ? "none" : null',
        '[style]': 'style()'
    }
})
export class Badge extends BaseComponent {
    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    badgeSize = input<'small' | 'large' | 'xlarge' | null>();
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    size = input<'small' | 'large' | 'xlarge' | null>();
    /**
     * Severity type of the badge.
     * @group Props
     */
    severity = input<'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null>();
    /**
     * Value to display inside the badge.
     * @group Props
     */
    value = input<string | number | null>();
    /**
     * When specified, disables the component.
     * @group Props
     */
    badgeDisabled = input<boolean, boolean>(false, { transform: booleanAttribute });

    _componentStyle = inject(BadgeStyle);

    /**
     * Computes the container class for the badge element based on its properties.
     * @returns An object representing the CSS classes to be applied to the badge container.
     */
    containerClass = computed<string>(() => {
        let classes = 'p-badge p-component';

        if (isNotEmpty(this.value()) && String(this.value()).length === 1) {
            classes += ' p-badge-circle';
        }

        if (this.badgeSize() === 'large') {
            classes += ' p-badge-lg';
        } else if (this.badgeSize() === 'xlarge') {
            classes += ' p-badge-xl';
        } else if (this.badgeSize() === 'small') {
            classes += ' p-badge-sm';
        }

        if (isEmpty(this.value())) {
            classes += ' p-badge-dot';
        }

        if (this.styleClass()) {
            classes += ` ${this.styleClass()}`;
        }

        if (this.severity()) {
            classes += ` p-badge-${this.severity()}`;
        }

        return classes;
    });
}

@NgModule({
    imports: [Badge, BadgeDirective, SharedModule],
    exports: [Badge, BadgeDirective, SharedModule]
})
export class BadgeModule {}
