import { booleanAttribute, ChangeDetectionStrategy, Component, computed, Directive, effect, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { addClass, createElement, hasClass, isNotEmpty, removeClass, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { BadgePassThrough, BadgeSeverity, BadgeSize } from 'primeng/types/badge';
import type { CSSProperties } from 'primeng/types/shared';
import { BadgeStyle } from './style/badgestyle';

const BADGE_INSTANCE = new InjectionToken<Badge>('BADGE_INSTANCE');

const BADGE_DIRECTIVE_INSTANCE = new InjectionToken<BadgeDirective>('BADGE_DIRECTIVE_INSTANCE');

/**
 * Badge Directive is directive usage of badge component.
 * @group Components
 */
@Directive({
    selector: '[pBadge]',
    providers: [BadgeStyle, { provide: BADGE_DIRECTIVE_INSTANCE, useExisting: BadgeDirective }, { provide: PARENT_INSTANCE, useExisting: BadgeDirective }],
    standalone: true
})
export class BadgeDirective extends BaseComponent {
    $pcBadgeDirective: BadgeDirective | undefined = inject(BADGE_DIRECTIVE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    /**
     * Used to pass attributes to DOM elements inside the Badge component.
     * @defaultValue undefined
     * @deprecated use pBadgePT instead.
     * @group Props
     */
    ptBadgeDirective = input<BadgePassThrough>();

    /**
     * Used to pass attributes to DOM elements inside the Badge component.
     * @defaultValue undefined
     * @group Props
     */
    pBadgePT = input<BadgePassThrough>();

    /**
     * Indicates whether the component should be rendered without styles.
     * @defaultValue undefined
     * @group Props
     */
    pBadgeUnstyled = input<boolean>();

    /**
     * When specified, disables the component.
     * @group Props
     */
    disabled = input(false, { alias: 'badgeDisabled', transform: booleanAttribute });

    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    badgeSize = input<BadgeSize>();

    /**
     * Severity type of the badge.
     * @group Props
     */
    severity = input<BadgeSeverity>();

    /**
     * Value to display inside the badge.
     * @group Props
     */
    value = input<string | number>();

    /**
     * Inline style of the element.
     * @group Props
     */
    badgeStyle = input<CSSProperties>();

    /**
     * Class of the element.
     * @group Props
     */
    badgeStyleClass = input<string>();

    private id!: string;

    badgeEl: HTMLElement | undefined;

    private previousSeverity: BadgeSeverity | undefined;

    _componentStyle = inject(BadgeStyle);

    private get activeElement(): HTMLElement {
        return this.el.nativeElement.nodeName.indexOf('-') != -1 ? this.el.nativeElement.firstElementChild : this.el.nativeElement;
    }

    private get canUpdateBadge(): boolean {
        return isNotEmpty(this.id) && !this.disabled();
    }

    constructor() {
        super();

        effect(() => {
            const pt = this.ptBadgeDirective() || this.pBadgePT();
            pt && this.directivePT.set(pt);
        });

        effect(() => {
            const unstyled = this.pBadgeUnstyled();
            unstyled && this.directiveUnstyled.set(unstyled);
        });

        effect(() => {
            const disabled = this.disabled();
            if (this.id) {
                this.toggleDisableState(disabled);
            }
        });

        effect(() => {
            const severity = this.severity();
            if (this.canUpdateBadge) {
                this.setSeverity(this.previousSeverity);
                this.previousSeverity = severity;
            }
        });

        effect(() => {
            this.badgeSize();
            if (this.canUpdateBadge) {
                this.setSizeClasses();
            }
        });

        effect(() => {
            this.value();
            if (this.canUpdateBadge) {
                this.setValue();
            }
        });

        effect(() => {
            this.badgeStyle();
            this.badgeStyleClass();
            if (this.canUpdateBadge) {
                this.applyStyles();
            }
        });
    }

    onAfterViewInit() {
        this.id = uuid('pn_id_') + '_badge';
        this.renderBadgeContent();
    }

    private setValue(element?: HTMLElement) {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        const value = this.value();

        if (!this.$unstyled()) {
            if (value != null) {
                if (hasClass(badge, 'p-badge-dot')) {
                    removeClass(badge, 'p-badge-dot');
                }

                if (value && String(value).length === 1) {
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
        }

        badge.textContent = '';
        const badgeValue = value != null ? String(value) : '';
        this.renderer.appendChild(badge, this.document.createTextNode(badgeValue));
    }

    private setSizeClasses(element?: HTMLElement) {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge || this.$unstyled()) {
            return;
        }

        const badgeSize = this.badgeSize();

        if (badgeSize === 'large') {
            addClass(badge, 'p-badge-lg');
            removeClass(badge, 'p-badge-xl');
        } else if (badgeSize === 'xlarge') {
            addClass(badge, 'p-badge-xl');
            removeClass(badge, 'p-badge-lg');
        } else {
            removeClass(badge, 'p-badge-lg');
            removeClass(badge, 'p-badge-xl');
        }
    }

    private renderBadgeContent() {
        if (this.disabled()) {
            return;
        }

        const el = this.activeElement;
        const badge = createElement('span', { class: this.cx('root'), id: this.id, 'p-bind': this.ptm('root') }) as HTMLElement;
        this.setSeverity(undefined, badge);
        this.setSizeClasses(badge);
        this.setValue(badge);

        if (!this.$unstyled()) {
            addClass(el, 'p-overlay-badge');
        }

        this.renderer.appendChild(el, badge);
        this.badgeEl = badge;
        this.applyStyles();
    }

    private applyStyles() {
        const style = this.badgeStyle();
        const styleClass = this.badgeStyleClass();

        if (this.badgeEl && style && typeof style === 'object') {
            for (const [key, value] of Object.entries(style)) {
                this.renderer.setStyle(this.badgeEl, key, value);
            }
        }
        if (this.badgeEl && styleClass) {
            this.badgeEl.classList.add(...styleClass.split(' '));
        }
    }

    private setSeverity(oldSeverity?: BadgeSeverity, element?: HTMLElement) {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge || this.$unstyled()) {
            return;
        }

        const severity = this.severity();

        if (severity) {
            addClass(badge, `p-badge-${severity}`);
        }

        if (oldSeverity) {
            removeClass(badge, `p-badge-${oldSeverity}`);
        }
    }

    private toggleDisableState(disabled: boolean) {
        if (!this.id) {
            return;
        }

        if (disabled) {
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
    imports: [SharedModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BadgeStyle, { provide: BADGE_INSTANCE, useExisting: Badge }, { provide: PARENT_INSTANCE, useExisting: Badge }],
    host: {
        '[class]': "cx('root')",
        '[style.display]': 'displayStyle()',
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Badge extends BaseComponent<BadgePassThrough> {
    componentName = 'Badge';

    $pcBadge: Badge | undefined = inject(BADGE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    badgeSize = input<BadgeSize>();

    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    size = input<BadgeSize>();

    /**
     * Severity type of the badge.
     * @group Props
     */
    severity = input<BadgeSeverity>();

    /**
     * Value to display inside the badge.
     * @group Props
     */
    value = input<string | number | null>();

    /**
     * When specified, disables the component.
     * @group Props
     */
    badgeDisabled = input(false, { transform: booleanAttribute });

    _componentStyle = inject(BadgeStyle);

    displayStyle = computed(() => (this.badgeDisabled() ? 'none' : null));

    dataP = computed(() => {
        const value = this.value();
        const severity = this.severity();
        const size = this.size();

        return this.cn({
            circle: value != null && String(value).length === 1,
            empty: value == null,
            disabled: this.badgeDisabled(),
            [severity as string]: severity,
            [size as string]: size
        });
    });
}

@NgModule({
    imports: [Badge, BadgeDirective, SharedModule],
    exports: [Badge, BadgeDirective, SharedModule]
})
export class BadgeModule {}
