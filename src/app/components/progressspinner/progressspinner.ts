import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { ProgressSpinnerStyle } from './style/progressspinnerstyle';

/**
 * ProgressSpinner is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progressSpinner',
    template: `
        <div class="p-progressspinner" [ngStyle]="style" [ngClass]="styleClass" role="progressbar" [attr.aria-label]="ariaLabel" [attr.aria-busy]="true" [attr.data-pc-name]="'progressspinner'" [attr.data-pc-section]="'root'">
            <svg class="p-progressspinner-spin" viewBox="25 25 50 50" [style.animation-duration]="animationDuration" [attr.data-pc-section]="'root'">
                <circle class="p-progressspinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10" />
            </svg>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    },
    providers: [ProgressSpinnerStyle]
})
export class ProgressSpinner extends BaseComponent {
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
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
    imports: [CommonModule],
    exports: [ProgressSpinner],
    declarations: [ProgressSpinner]
})
export class ProgressSpinnerModule {}
