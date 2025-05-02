import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, Input, NgModule, numberAttribute, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ProgressBarStyle } from './style/progressbarstyle';

/**
 * ProgressBar is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progressBar, p-progressbar, p-progress-bar',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <div *ngIf="mode === 'determinate'" [class]="cx('value')" [style.width]="value + '%'" style="display:flex" [style.background]="color" [attr.data-pc-section]="'value'">
            <div [class]="cx('label')">
                <div *ngIf="showValue && !contentTemplate && !_contentTemplate" [style.display]="value != null && value !== 0 ? 'flex' : 'none'" [attr.data-pc-section]="'label'">{{ value }}{{ unit }}</div>
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: value }"></ng-container>
            </div>
        </div>
        <div *ngIf="mode === 'indeterminate'" [class]="valueStyleClass" [attr.data-pc-section]="'container'">
            <div [class]="cx('value')" [style.background]="color" [attr.data-pc-section]="'value'"></div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ProgressBarStyle],
    host: {
        '[aria-valuemin]': '0',
        '[aria-valuenow]': 'value',
        '[aria-valuemax]': '100',
        'data-pc-name': 'progressbar',
        'data-pc-section': 'root',
        '[aria-level]': 'value + unit',
        '[class]': "cx('root')"
    }
})
export class ProgressBar extends BaseComponent implements AfterContentInit {
    /**
     * Current value of the progress.
     * @group Props
     */
    @Input({ transform: numberAttribute }) value: number | undefined;
    /**
     * Whether to display the progress bar value.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showValue: boolean = true;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the value element.
     * @group Props
     */
    @Input() valueStyleClass: string | undefined;
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
    /**
     * Template of the content.
     * @group templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(ProgressBarStyle);

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this._contentTemplate = item.template;
                    break;
                default:
                    this._contentTemplate = item.template;
            }
        });
    }
}

@NgModule({
    imports: [ProgressBar, SharedModule],
    exports: [ProgressBar, SharedModule]
})
export class ProgressBarModule {}
