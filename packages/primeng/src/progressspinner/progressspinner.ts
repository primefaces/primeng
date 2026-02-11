import { ChangeDetectionStrategy, Component, inject, InjectionToken, input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { ProgressSpinnerPassThrough } from 'primeng/types/progressspinner';
import { ProgressSpinnerStyle } from './style/progressspinnerstyle';

const PROGRESSSPINNER_INSTANCE = new InjectionToken<ProgressSpinner>('PROGRESSSPINNER_INSTANCE');

/**
 * ProgressSpinner is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progress-spinner, p-progressspinner',
    standalone: true,
    imports: [SharedModule, Bind],
    template: `
        <svg [class]="cx('spin')" [pBind]="ptm('spin')" viewBox="25 25 50 50" [style.animation-duration]="animationDuration()">
            <circle [class]="cx('circle')" [pBind]="ptm('circle')" cx="50" cy="50" r="20" [attr.fill]="fill()" [attr.stroke-width]="strokeWidth()" stroke-miterlimit="10" />
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ProgressSpinnerStyle, { provide: PROGRESSSPINNER_INSTANCE, useExisting: ProgressSpinner }, { provide: PARENT_INSTANCE, useExisting: ProgressSpinner }],
    host: {
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.role]': "'progressbar'",
        '[attr.aria-busy]': 'true',
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class ProgressSpinner extends BaseComponent<ProgressSpinnerPassThrough> {
    componentName = 'ProgressSpinner';

    $pcProgressSpinner: ProgressSpinner | undefined = inject(PROGRESSSPINNER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Width of the circle stroke.
     * @group Props
     */
    strokeWidth = input('2');

    /**
     * Color for the background of the circle.
     * @group Props
     */
    fill = input('none');

    /**
     * Duration of the rotate animation.
     * @group Props
     */
    animationDuration = input('2s');

    /**
     * Used to define a aria label attribute the current element.
     * @group Props
     */
    ariaLabel = input<string>();

    _componentStyle = inject(ProgressSpinnerStyle);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
}

@NgModule({
    imports: [ProgressSpinner, SharedModule],
    exports: [ProgressSpinner, SharedModule]
})
export class ProgressSpinnerModule {}
