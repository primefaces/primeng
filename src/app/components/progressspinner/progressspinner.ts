import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'p-progressSpinner',
    template: `
        <div class="p-progress-spinner" [ngStyle]="style" [ngClass]="styleClass" role="alert" aria-busy="true">
            <svg class="p-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="p-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10" />
            </svg>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./progressspinner.css'],
    host: {
        class: 'p-element'
    }
})
export class ProgressSpinner {
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
}

@NgModule({
    imports: [CommonModule],
    exports: [ProgressSpinner],
    declarations: [ProgressSpinner]
})
export class ProgressSpinnerModule {}
