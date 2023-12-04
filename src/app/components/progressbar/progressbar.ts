import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ContentChildren, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { QueryList } from '@angular/core';
/**
 * ProgressBar is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progressBar',
    template: `
        <div
            role="progressbar"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.aria-valuemin]="0"
            [attr.aria-valuenow]="value"
            [attr.aria-valuemax]="100"
            [attr.data-pc-name]="'progressbar'"
            [attr.data-pc-section]="'root'"
            [ngClass]="{ 'p-progressbar p-component': true, 'p-progressbar-determinate': mode === 'determinate', 'p-progressbar-indeterminate': mode === 'indeterminate' }"
        >
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex" [style.background]="color" [attr.data-pc-section]="'value'">
            <div class="p-progressbar-label">
                <div *ngIf="showValue && !contentTemplate" [style.display]="value != null && value !== 0 ? 'flex' : 'none'" [attr.data-pc-section]="'label'">{{ value }}{{ unit }}</div>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: value }"></ng-container>
            </div>
                
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container" [attr.data-pc-section]="'container'">
                <div class="p-progressbar-value p-progressbar-value-animate" [style.background]="color" [attr.data-pc-section]="'value'"></div>
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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    contentTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
            }
        });
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ProgressBar],
    declarations: [ProgressBar]
})
export class ProgressBarModule {}
