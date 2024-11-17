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
    @Input() severity: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    /**
     * Value to display inside the badge.
     * @group Props
     */
    @Input() public value: string | number;

    private id!: string;

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

    public ngOnChanges({ value, size, severity, disabled }: SimpleChanges): void {
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
    template: `
        @if (!badgeDisabled()) {
            <span [ngClass]="containerClass()" [class]="styleClass()" [ngStyle]="style()">{{ value() }}</span>
        }
    `,
    standalone: true,
    imports: [CommonModule, SharedModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BadgeStyle]
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
    severity = input<'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null>();
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
    containerClass = computed<{ [klass: string]: any }>(() => {
        return {
            'p-badge p-component': true,
            'p-badge-circle': isNotEmpty(this.value()) && String(this.value()).length === 1,
            'p-badge-lg': this.badgeSize() === 'large',
            'p-badge-xl': this.badgeSize() === 'xlarge',
            'p-badge-sm': this.badgeSize() === 'small',
            'p-badge-dot': isEmpty(this.value()),
            [`p-badge-${this.severity()}`]: this.severity()
        };
    });
}

@NgModule({
    imports: [Badge, BadgeDirective, SharedModule],
    exports: [Badge, BadgeDirective, SharedModule]
})
export class BadgeModule {}
