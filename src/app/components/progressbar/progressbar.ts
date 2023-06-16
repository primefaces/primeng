import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
/**
 * ProgressBar is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progressBar',
    template: `
        <div
            [class]="styleClass"
            [ngStyle]="style"
            role="progressbar"
            aria-valuemin="0"
            [attr.aria-valuenow]="value"
            aria-valuemax="100"
            [ngClass]="{ 'p-progressbar p-component': true, 'p-progressbar-determinate': mode === 'determinate', 'p-progressbar-indeterminate': mode === 'indeterminate' }"
        >
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex" [style.background]="color">
                <div *ngIf="showValue" class="p-progressbar-label" [style.display]="value != null && value !== 0 ? 'flex' : 'none'">{{ value }}{{ unit }}</div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container">
                <div class="p-progressbar-value p-progressbar-value-animate" [style.background]="color"></div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./progressbar.css'],
    host: {
        class: 'p-element'
    }
})
export class ProgressBar {
    /**
     * Current value of the progress.
     * @group Props
     */
    @Input() value: number | undefined;
    /**
     * Whether to display the progress bar value.
     * @group Props
     */
    @Input() showValue: boolean = true;
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
     * Unit sign appended to the value.
     * @group Props
     */
    @Input() unit: string = '%';
    /**
     * Defines the mode of the progress
     * @group Props
     */
    @Input() mode: string = 'determinate';
    /**
     * Color for the background of the progress.
     * @group Props
     */
    @Input() color: string | undefined;
}

@NgModule({
    imports: [CommonModule],
    exports: [ProgressBar],
    declarations: [ProgressBar]
})
export class ProgressBarModule {}
