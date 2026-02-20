import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, numberAttribute, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { ProgressBarContentTemplateContext, ProgressBarMode, ProgressBarPassThrough } from 'primeng/types/progressbar';
import { ProgressBarStyle } from './style/progressbarstyle';

const PROGRESSBAR_INSTANCE = new InjectionToken<ProgressBar>('PROGRESSBAR_INSTANCE');

/**
 * ProgressBar is a process status indicator.
 * @group Components
 */
@Component({
    selector: 'p-progressbar, p-progress-bar',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, Bind],
    template: `
        @if (mode() === 'determinate') {
            <div [class]="cn(cx('value'), valueStyleClass())" [pBind]="ptm('value')" [style.width]="value() + '%'" [style.display]="'flex'" [style.background]="color()" [attr.data-p]="dataP()">
                <div [class]="cx('label')" [pBind]="ptm('label')" [attr.data-p]="dataP()">
                    @if (showLabel()) {
                        <div [style.display]="labelDisplay()">{{ value() }}{{ unit() }}</div>
                    }
                    <ng-container [ngTemplateOutlet]="contentTemplate()!" [ngTemplateOutletContext]="contentTemplateContext()"></ng-container>
                </div>
            </div>
        }
        @if (mode() === 'indeterminate') {
            <div [class]="cn(cx('value'), valueStyleClass())" [pBind]="ptm('value')" [style.background]="color()" [attr.data-p]="dataP()"></div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ProgressBarStyle, { provide: PROGRESSBAR_INSTANCE, useExisting: ProgressBar }, { provide: PARENT_INSTANCE, useExisting: ProgressBar }],
    host: {
        role: 'progressbar',
        '[attr.aria-valuemin]': '0',
        '[attr.aria-valuenow]': 'value()',
        '[attr.aria-valuemax]': '100',
        '[attr.aria-level]': 'ariaLevel()',
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class ProgressBar extends BaseComponent<ProgressBarPassThrough> {
    componentName = 'ProgressBar';

    $pcProgressBar: ProgressBar | undefined = inject(PROGRESSBAR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Current value of the progress.
     * @group Props
     */
    value = input<number | undefined, unknown>(undefined, { transform: numberAttribute });

    /**
     * Whether to display the progress bar value.
     * @group Props
     */
    showValue = input(true, { transform: booleanAttribute });

    /**
     * Style class of the value element.
     * @group Props
     */
    valueStyleClass = input<string>();

    /**
     * Unit sign appended to the value.
     * @group Props
     */
    unit = input('%');

    /**
     * Defines the mode of the progress
     * @defaultValue 'determinate'
     * @group Props
     */
    mode = input<ProgressBarMode>('determinate');

    /**
     * Color for the background of the progress.
     * @group Props
     */
    color = input<string>();

    /**
     * Template of the content.
     * @param {ProgressBarContentTemplateContext} context - content context.
     * @see {@link ProgressBarContentTemplateContext}
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<ProgressBarContentTemplateContext>>('content', { descendants: false });

    _componentStyle = inject(ProgressBarStyle);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    dataP = computed(() =>
        this.cn({
            determinate: this.mode() === 'determinate',
            indeterminate: this.mode() === 'indeterminate'
        })
    );

    ariaLevel = computed(() => this.value() + this.unit());

    contentTemplateContext = computed(() => ({ $implicit: this.value() }));

    showLabel = computed(() => this.showValue() && !this.contentTemplate());

    labelDisplay = computed(() => (this.value() != null && this.value() !== 0 ? 'flex' : 'none'));
}

@NgModule({
    imports: [ProgressBar, SharedModule],
    exports: [ProgressBar, SharedModule]
})
export class ProgressBarModule {}
