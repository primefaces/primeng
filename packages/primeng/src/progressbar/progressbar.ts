import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, InjectionToken, Input, NgModule, numberAttribute, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ProgressBarContentTemplateContext, ProgressBarPassThrough } from 'primeng/types/progressbar';
import { ProgressBarStyle } from './style/progressbarstyle';

const PROGRESSBAR_INSTANCE = new InjectionToken<ProgressBar>('PROGRESSBAR_INSTANCE');

/**
 * ProgressBar is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progressBar, p-progressbar, p-progress-bar',
    standalone: true,
    imports: [CommonModule, SharedModule, Bind],
    template: `
        <div *ngIf="mode === 'determinate'" [class]="cn(cx('value'), valueStyleClass)" [pBind]="ptm('value')" [style.width]="value + '%'" [style.display]="'flex'" [style.background]="color" [attr.data-p]="dataP">
            <div [class]="cx('label')" [pBind]="ptm('label')" [attr.data-p]="dataP">
                <div *ngIf="showValue && !contentTemplate && !_contentTemplate" [style.display]="value != null && value !== 0 ? 'flex' : 'none'">{{ value }}{{ unit }}</div>
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: value }"></ng-container>
            </div>
        </div>
        <div *ngIf="mode === 'indeterminate'" [class]="cn(cx('value'), valueStyleClass)" [pBind]="ptm('value')" [style.background]="color" [attr.data-p]="dataP"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ProgressBarStyle, { provide: PROGRESSBAR_INSTANCE, useExisting: ProgressBar }, { provide: PARENT_INSTANCE, useExisting: ProgressBar }],
    host: {
        '[role]': 'progressbar',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuenow]': 'value',
        '[attr.aria-valuemax]': '100',
        '[attr.aria-level]': 'value + unit',
        '[class]': "cn(cx('root'), styleClass)",
        '[attr.data-p]': 'dataP'
    },
    hostDirectives: [Bind]
})
export class ProgressBar extends BaseComponent<ProgressBarPassThrough> {
    $pcProgressBar: ProgressBar | undefined = inject(PROGRESSBAR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

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
     * @deprecated since v20.0.0, use `class` instead.
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
     * @defaultValue 'determinate'
     * @group Props
     */
    @Input() mode: 'determinate' | 'indeterminate' = 'determinate';
    /**
     * Color for the background of the progress.
     * @group Props
     */
    @Input() color: string | undefined;
    /**
     * Template of the content.
     * @param {ProgressBarContentTemplateContext} context - content context.
     * @see {@link ProgressBarContentTemplateContext}
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<ProgressBarContentTemplateContext> | undefined;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    _componentStyle = inject(ProgressBarStyle);

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _contentTemplate: TemplateRef<ProgressBarContentTemplateContext> | undefined;

    onAfterContentInit() {
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

    get dataP() {
        return this.cn({
            determinate: this.mode === 'determinate',
            indeterminate: this.mode === 'indeterminate'
        });
    }
}

@NgModule({
    imports: [ProgressBar, SharedModule],
    exports: [ProgressBar, SharedModule]
})
export class ProgressBarModule {}
