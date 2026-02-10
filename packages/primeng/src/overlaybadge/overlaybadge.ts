import { booleanAttribute, ChangeDetectionStrategy, Component, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { BadgeSeverity, BadgeSize } from 'primeng/types/badge';
import type { OverlayBadgePassThrough } from 'primeng/types/overlaybadge';
import type { CSSProperties } from 'primeng/types/shared';
import { OverlayBadgeStyle } from './style/overlaybadgestyle';

const OVERLAYBADGE_INSTANCE = new InjectionToken<OverlayBadge>('OVERLAYBADGE_INSTANCE');

/**
 * OverlayPanel is a container component positioned as connected to its target.
 * @group Components
 */
@Component({
    selector: 'p-overlay-badge, p-overlaybadge',
    standalone: true,
    imports: [BadgeModule, SharedModule, Bind],
    template: `
        <div [class]="cx('root')" [pBind]="ptm('root')">
            <ng-content></ng-content>
            <p-badge [pt]="ptm('pcBadge')" [class]="styleClass()" [style]="style()" [badgeSize]="badgeSize()" [severity]="severity()" [value]="value()" [badgeDisabled]="badgeDisabled()" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [OverlayBadgeStyle, { provide: OVERLAYBADGE_INSTANCE, useExisting: OverlayBadge }, { provide: PARENT_INSTANCE, useExisting: OverlayBadge }],
    hostDirectives: [Bind]
})
export class OverlayBadge extends BaseComponent<OverlayBadgePassThrough> {
    componentName = 'OverlayBadge';

    $pcOverlayBadge: OverlayBadge | undefined = inject(OVERLAYBADGE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();

    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<CSSProperties>();

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
    value = input<string | number | null>();

    /**
     * When specified, disables the component.
     * @group Props
     */
    badgeDisabled = input(false, { transform: booleanAttribute });

    _componentStyle = inject(OverlayBadgeStyle);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }
}

@NgModule({
    imports: [OverlayBadge, SharedModule],
    exports: [OverlayBadge, SharedModule]
})
export class OverlayBadgeModule {}
