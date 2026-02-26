import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { BadgePassThrough, BadgeSeverity, BadgeSize } from 'primeng/types/badge';
import { BadgeStyle } from './style/badgestyle';

const BADGE_INSTANCE = new InjectionToken<Badge>('BADGE_INSTANCE');

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
    imports: [Badge, SharedModule],
    exports: [Badge, SharedModule]
})
export class BadgeModule {}
