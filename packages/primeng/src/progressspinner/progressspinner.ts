import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ProgressSpinnerStyle } from './style/progressspinnerstyle';

/**
 * ProgressSpinner is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progressSpinner, p-progress-spinner, p-progressspinner',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <svg [class]="cx('spin')" viewBox="25 25 50 50" [style.animation-duration]="animationDuration" [attr.data-pc-section]="'root'">
            <circle [class]="cx('circle')" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10" />
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ProgressSpinnerStyle],
    host: {
        '[attr.aria-label]': 'ariaLabel',
        '[attr.role]': "'progressbar'",
        '[attr.data-pc-name]': "'progressspinner'",
        '[attr.data-pc-section]': "'root'",
        '[attr.aria-busy]': 'true',
        '[class]': "cx('root')"
    }
})
export class ProgressSpinner extends BaseComponent {
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Width of the circle stroke.
     * @group Props
     */
    @Input() strokeWidth: string = '2';
    /**
     * Color for the background of the circle.
     * @group Props
     */
    @Input() fill: string = 'none';
    /**
     * Duration of the rotate animation.
     * @group Props
     */
    @Input() animationDuration: string = '2s';
    /**
     * Used to define a aria label attribute the current element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;

    _componentStyle = inject(ProgressSpinnerStyle);
}

@NgModule({
    imports: [ProgressSpinner, SharedModule],
    exports: [ProgressSpinner, SharedModule]
})
export class ProgressSpinnerModule {}
