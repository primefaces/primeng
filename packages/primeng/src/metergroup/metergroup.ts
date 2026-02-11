import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, InjectionToken, input, NgModule, TemplateRef, ViewEncapsulation } from '@angular/core';
import { getOuterHeight } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { MeterGroupIconTemplateContext, MeterGroupLabelPosition, MeterGroupLabelTemplateContext, MeterGroupMeterTemplateContext, MeterGroupOrientation, MeterGroupPassThrough, MeterItem } from 'primeng/types/metergroup';
import { MeterGroupStyle } from './style/metergroupstyle';

const METERGROUP_INSTANCE = new InjectionToken<MeterGroup>('METERGROUP_INSTANCE');

@Component({
    selector: 'p-metergrouplabel',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, Bind],
    template: `
        <ol [class]="cx('labelList')" [pBind]="ptm('labelList')" [attr.data-p]="dataP()">
            @for (labelItem of value(); track $index) {
                <li [class]="cx('label')" [pBind]="ptm('label')">
                    @if (!iconTemplate()) {
                        @if (labelItem.icon) {
                            <i [class]="cn(cx('labelIcon'), labelItem.icon)" [pBind]="ptm('labelIcon')" [style]="{ color: labelItem.color }"></i>
                        } @else {
                            <span [class]="cx('labelMarker')" [pBind]="ptm('labelMarker')" [style]="{ backgroundColor: labelItem.color }"></span>
                        }
                    }
                    <ng-container *ngTemplateOutlet="iconTemplate(); context: getIconTemplateContext(labelItem)"></ng-container>
                    <span [class]="cx('labelText')" [pBind]="ptm('labelText')">{{ labelItem.label }} ({{ parentInstance.percentValue(labelItem.value) }})</span>
                </li>
            }
        </ol>
    `
})
export class MeterGroupLabel extends BaseComponent<MeterGroupPassThrough> {
    value = input<MeterItem[]>([]);

    labelPosition = input<MeterGroupLabelPosition>('end');

    labelOrientation = input<MeterGroupOrientation>('horizontal');

    min = input<number>();

    max = input<number>();

    iconTemplate = input<TemplateRef<MeterGroupIconTemplateContext>>();

    parentInstance: MeterGroup = inject(forwardRef(() => MeterGroup));

    _componentStyle = inject(MeterGroupStyle);

    dataP = computed(() =>
        this.cn({
            [this.labelOrientation()]: this.labelOrientation()
        })
    );

    getIconTemplateContext(labelItem: MeterItem): MeterGroupIconTemplateContext {
        return { $implicit: labelItem, icon: labelItem.icon };
    }
}
/**
 * MeterGroup displays scalar measurements within a known range.
 * @group Components
 */
@Component({
    selector: 'p-metergroup, p-meter-group',
    standalone: true,
    imports: [NgTemplateOutlet, MeterGroupLabel, SharedModule, Bind],
    template: `
        @if (isLabelStart()) {
            @if (showDefaultLabel()) {
                <p-metergrouplabel [value]="value()" [labelPosition]="labelPosition()" [labelOrientation]="labelOrientation()" [min]="min()" [max]="max()" [iconTemplate]="iconTemplate()" [pt]="pt()" [unstyled]="unstyled()" />
            }
            <ng-container *ngTemplateOutlet="labelTemplate(); context: labelTemplateContext()"></ng-container>
        }
        <ng-container *ngTemplateOutlet="startTemplate(); context: labelTemplateContext()"></ng-container>
        <div [class]="cx('meters')" [pBind]="ptm('meters')" [attr.data-p]="dataP()">
            @for (meterItem of meterItems(); track meterItem) {
                <ng-container *ngTemplateOutlet="meterTemplate(); context: getMeterTemplateContext(meterItem, $index)"></ng-container>
                @if (showDefaultMeter(meterItem)) {
                    <span [class]="cx('meter')" [attr.data-p]="dataP()" [pBind]="ptm('meter')" [style]="meterStyle(meterItem)"></span>
                }
            }
        </div>
        <ng-container *ngTemplateOutlet="endTemplate(); context: labelTemplateContext()"></ng-container>
        @if (isLabelEnd()) {
            @if (showDefaultLabel()) {
                <p-metergrouplabel [value]="value()" [labelPosition]="labelPosition()" [labelOrientation]="labelOrientation()" [min]="min()" [max]="max()" [iconTemplate]="iconTemplate()" [pt]="pt()" [unstyled]="unstyled()" />
            }
            <ng-container *ngTemplateOutlet="labelTemplate(); context: labelTemplateContext()"></ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MeterGroupStyle, { provide: METERGROUP_INSTANCE, useExisting: MeterGroup }, { provide: PARENT_INSTANCE, useExisting: MeterGroup }],
    host: {
        '[attr.aria-valuemin]': 'min()',
        '[attr.role]': '"meter"',
        '[attr.aria-valuemax]': 'max()',
        '[attr.aria-valuenow]': 'totalPercent()',
        '[attr.data-p]': 'dataP()',
        '[class]': "cn(cx('root'))"
    },
    hostDirectives: [Bind]
})
export class MeterGroup extends BaseComponent<MeterGroupPassThrough> {
    componentName = 'MeterGroup';

    $pcMeterGroup: MeterGroup | undefined = inject(METERGROUP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Current value of the metergroup.
     * @group Props
     */
    value = input<MeterItem[]>();
    /**
     * Mininum boundary value.
     * @group Props
     */
    min = input(0);
    /**
     * Maximum boundary value.
     * @group Props
     */
    max = input(100);
    /**
     * Specifies the layout of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    orientation = input<MeterGroupOrientation>('horizontal');
    /**
     * Specifies the label position of the component, valid values are 'start' and 'end'.
     * @group Props
     */
    labelPosition = input<MeterGroupLabelPosition>('end');
    /**
     * Specifies the label orientation of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    labelOrientation = input<MeterGroupOrientation>('horizontal');

    /**
     * Custom label template.
     * @param {MeterGroupLabelTemplateContext} context - label context.
     * @see {@link MeterGroupLabelTemplateContext}
     * @group Templates
     */
    labelTemplate = contentChild<TemplateRef<MeterGroupLabelTemplateContext>>('label', { descendants: false });

    /**
     * Custom meter template.
     * @param {MeterGroupMeterTemplateContext} context - meter context.
     * @see {@link MeterGroupMeterTemplateContext}
     * @group Templates
     */
    meterTemplate = contentChild<TemplateRef<MeterGroupMeterTemplateContext>>('meter', { descendants: false });

    /**
     * Custom end template.
     * @param {MeterGroupLabelTemplateContext} context - end context.
     * @see {@link MeterGroupLabelTemplateContext}
     * @group Templates
     */
    endTemplate = contentChild<TemplateRef<MeterGroupLabelTemplateContext>>('end', { descendants: false });

    /**
     * Custom start template.
     * @param {MeterGroupLabelTemplateContext} context - start context.
     * @see {@link MeterGroupLabelTemplateContext}
     * @group Templates
     */
    startTemplate = contentChild<TemplateRef<MeterGroupLabelTemplateContext>>('start', { descendants: false });

    /**
     * Custom icon template.
     * @param {MeterGroupIconTemplateContext} context - icon context.
     * @see {@link MeterGroupIconTemplateContext}
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<MeterGroupIconTemplateContext>>('icon', { descendants: false });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    _componentStyle = inject(MeterGroupStyle);

    vertical = computed(() => this.orientation() === 'vertical');

    totalPercent = computed(() => {
        const value = this.value();
        if (!value) return 0;
        return this.percent(value.reduce((total, val) => total + (val.value || 0), 0));
    });

    percentages = computed(() => {
        const value = this.value();
        if (!value) return [];

        let sum = 0;
        const sumsArray: number[] = [];

        value.forEach((item) => {
            sum += item.value || 0;
            sumsArray.push(sum);
        });

        return sumsArray;
    });

    labelTemplateContext = computed<MeterGroupLabelTemplateContext>(() => ({
        $implicit: this.value() ?? [],
        totalPercent: this.totalPercent(),
        percentages: this.percentages()
    }));

    meterItems = computed(() => this.value() ?? []);

    isLabelStart = computed(() => this.labelPosition() === 'start');

    isLabelEnd = computed(() => this.labelPosition() === 'end');

    showDefaultLabel = computed(() => !this.labelTemplate());

    dataP = computed(() =>
        this.cn({
            [this.orientation()]: this.orientation()
        })
    );

    constructor() {
        super();
        afterNextRender(() => {
            const _container = this.el.nativeElement;
            const height = getOuterHeight(_container);
            if (this.vertical()) {
                _container.style.height = height + 'px';
            }
        });
    }

    percent(meter = 0) {
        const max = this.max();
        const min = this.min();
        if (max === min) {
            return 100;
        }
        const percentOfItem = ((meter - min) / (max - min)) * 100;

        return Math.round(Math.max(0, Math.min(100, percentOfItem)));
    }

    percentValue(meter?: number) {
        return this.percent(meter) + '%';
    }

    meterStyle(val: MeterItem) {
        const isHorizontal = this.orientation() === 'horizontal';
        return {
            backgroundColor: val.color,
            width: isHorizontal ? this.percentValue(val.value ?? 0) : undefined,
            height: !isHorizontal ? this.percentValue(val.value ?? 0) : undefined
        };
    }

    showDefaultMeter(meterItem: MeterItem) {
        return !this.meterTemplate() && (meterItem.value ?? 0) > 0;
    }

    getMeterTemplateContext(meterItem: MeterItem, index: number) {
        return {
            $implicit: meterItem,
            index,
            orientation: this.orientation(),
            class: this.cx('meter'),
            size: this.percentValue(meterItem.value),
            totalPercent: this.totalPercent(),
            dataP: this.dataP()
        };
    }
}

@NgModule({
    imports: [MeterGroup, SharedModule],
    exports: [MeterGroup, SharedModule]
})
export class MeterGroupModule {}
