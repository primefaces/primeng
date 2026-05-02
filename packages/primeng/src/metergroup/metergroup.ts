import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, forwardRef, inject, InjectionToken, Input, NgModule, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { getOuterHeight } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { MeterGroupIconTemplateContext, MeterGroupLabelTemplateContext, MeterGroupMeterTemplateContext, MeterGroupPassThrough, MeterItem } from 'primeng/types/metergroup';
import { MeterGroupStyle } from './style/metergroupstyle';

const METERGROUP_INSTANCE = new InjectionToken<MeterGroup>('METERGROUP_INSTANCE');

@Component({
    selector: 'p-meterGroupLabel, p-metergrouplabel',
    standalone: true,
    imports: [CommonModule, SharedModule, Bind],
    template: `
        <ol [class]="cx('labelList')" [pBind]="ptm('labelList')" [attr.data-p]="dataP">
            <li *ngFor="let labelItem of value; let index = index; trackBy: parentInstance.trackByFn" [class]="cx('label')" [pBind]="ptm('label')">
                <ng-container *ngIf="!iconTemplate">
                    <i *ngIf="labelItem.icon" [class]="labelItem.icon" [ngClass]="cx('labelIcon')" [pBind]="ptm('labelIcon')" [ngStyle]="{ color: labelItem.color }"></i>
                    <span *ngIf="!labelItem.icon" [class]="cx('labelMarker')" [pBind]="ptm('labelMarker')" [ngStyle]="{ backgroundColor: labelItem.color }"></span>
                </ng-container>
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: labelItem, icon: labelItem.icon }"></ng-container>
                <span [class]="cx('labelText')" [pBind]="ptm('labelText')">{{ labelItem.label }} ({{ parentInstance.percentValue(labelItem.value) }})</span>
            </li>
        </ol>
    `
})
export class MeterGroupLabel extends BaseComponent<MeterGroupPassThrough> {
    @Input() value: any[] = [];

    @Input() labelPosition: 'start' | 'end' = 'end';

    @Input() labelOrientation: 'horizontal' | 'vertical' = 'horizontal';

    @Input() min: number;

    @Input() max: number;

    @Input() iconTemplate: TemplateRef<MeterGroupIconTemplateContext> | undefined;

    parentInstance: MeterGroup = inject(forwardRef(() => MeterGroup));

    _componentStyle = inject(MeterGroupStyle);

    get dataP() {
        return this.cn({
            [this.labelOrientation]: this.labelOrientation
        });
    }
}
/**
 * MeterGroup displays scalar measurements within a known range.
 * @group Components
 */
@Component({
    selector: 'p-meterGroup, p-metergroup, p-meter-group',
    standalone: true,
    imports: [CommonModule, MeterGroupLabel, SharedModule, Bind],
    template: `
        @if (labelPosition === 'start') {
            <p-meterGroupLabel
                *ngIf="!labelTemplate && !_labelTemplate"
                [value]="value"
                [labelPosition]="labelPosition"
                [labelOrientation]="labelOrientation"
                [min]="min"
                [max]="max"
                [iconTemplate]="iconTemplate || _iconTemplate"
                [pt]="pt"
                [unstyled]="unstyled()"
            />
            <ng-container *ngTemplateOutlet="labelTemplate || labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        }
        <ng-container *ngTemplateOutlet="startTemplate || _startTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        <div [class]="cx('meters')" [pBind]="ptm('meters')" [attr.data-p]="dataP">
            <ng-container *ngFor="let meterItem of value; let index = index; trackBy: trackByFn">
                <ng-container
                    *ngTemplateOutlet="
                        meterTemplate || _meterTemplate;
                        context: {
                            $implicit: meterItem,
                            index: index,
                            orientation: this.orientation,
                            class: cx('meter'),
                            size: percentValue(meterItem.value),
                            totalPercent: totalPercent(),
                            dataP: dataP
                        }
                    "
                >
                </ng-container>
                <ng-container *ngIf="!meterTemplate && !_meterTemplate && meterItem.value > 0">
                    <span [class]="cx('meter')" [attr.data-p]="dataP" [pBind]="ptm('meter')" [ngStyle]="meterStyle(meterItem)"></span>
                </ng-container>
            </ng-container>
        </div>
        <ng-container *ngTemplateOutlet="endTemplate || _endTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        @if (labelPosition === 'end') {
            <p-meterGroupLabel
                *ngIf="!labelTemplate && !_labelTemplate"
                [value]="value"
                [labelPosition]="labelPosition"
                [labelOrientation]="labelOrientation"
                [min]="min"
                [max]="max"
                [iconTemplate]="iconTemplate || _iconTemplate"
                [pt]="pt"
                [unstyled]="unstyled()"
            />
            <ng-container *ngTemplateOutlet="labelTemplate || _labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MeterGroupStyle, { provide: METERGROUP_INSTANCE, useExisting: MeterGroup }, { provide: PARENT_INSTANCE, useExisting: MeterGroup }],
    host: {
        '[attr.aria-valuemin]': 'min',
        '[attr.role]': '"meter"',
        '[attr.aria-valuemax]': 'max',
        '[attr.aria-valuenow]': 'totalPercent()',
        '[attr.data-p]': 'dataP',
        '[class]': "cn(cx('root'), styleClass)"
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
    @Input() value: MeterItem[] | undefined;
    /**
     * Mininum boundary value.
     * @group Props
     */
    @Input() min: number = 0;
    /**
     * Maximum boundary value.
     * @group Props
     */
    @Input() max: number = 100;
    /**
     * Specifies the layout of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
    /**
     * Specifies the label position of the component, valid values are 'start' and 'end'.
     * @group Props
     */
    @Input() labelPosition: 'start' | 'end' = 'end';
    /**
     * Specifies the label orientation of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    @Input() labelOrientation: 'horizontal' | 'vertical' | undefined = 'horizontal';
    /**
     * Style class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    get vertical(): boolean {
        return this.orientation === 'vertical';
    }

    /**
     * Custom label template.
     * @param {MeterGroupLabelTemplateContext} context - label context.
     * @see {@link MeterGroupLabelTemplateContext}
     * @group Templates
     */
    @ContentChild('label', { descendants: false }) labelTemplate: TemplateRef<MeterGroupLabelTemplateContext> | undefined;

    /**
     * Custom meter template.
     * @param {MeterGroupMeterTemplateContext} context - meter context.
     * @see {@link MeterGroupMeterTemplateContext}
     * @group Templates
     */
    @ContentChild('meter', { descendants: false }) meterTemplate: TemplateRef<MeterGroupMeterTemplateContext> | undefined;

    /**
     * Custom end template.
     * @param {MeterGroupLabelTemplateContext} context - end context.
     * @see {@link MeterGroupLabelTemplateContext}
     * @group Templates
     */
    @ContentChild('end', { descendants: false }) endTemplate: TemplateRef<MeterGroupLabelTemplateContext> | undefined;

    /**
     * Custom start template.
     * @param {MeterGroupLabelTemplateContext} context - start context.
     * @see {@link MeterGroupLabelTemplateContext}
     * @group Templates
     */
    @ContentChild('start', { descendants: false }) startTemplate: TemplateRef<MeterGroupLabelTemplateContext> | undefined;

    /**
     * Custom icon template.
     * @param {MeterGroupIconTemplateContext} context - icon context.
     * @see {@link MeterGroupIconTemplateContext}
     * @group Templates
     */
    @ContentChild('icon', { descendants: false }) iconTemplate: TemplateRef<MeterGroupIconTemplateContext> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _labelTemplate: TemplateRef<MeterGroupLabelTemplateContext> | undefined;

    _meterTemplate: TemplateRef<MeterGroupMeterTemplateContext> | undefined;

    _endTemplate: TemplateRef<MeterGroupLabelTemplateContext> | undefined;

    _startTemplate: TemplateRef<MeterGroupLabelTemplateContext> | undefined;

    _iconTemplate: TemplateRef<MeterGroupIconTemplateContext> | undefined;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    _componentStyle = inject(MeterGroupStyle);

    constructor() {
        super();
    }

    onAfterViewInit() {
        const _container = this.el.nativeElement;
        const height = getOuterHeight(_container);
        this.vertical && (_container.style.height = height + 'px');
    }

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'label':
                    this._labelTemplate = item.template;
                    break;

                case 'meter':
                    this._meterTemplate = item.template;
                    break;

                case 'icon':
                    this._iconTemplate = item.template;
                    break;

                case 'start':
                    this._startTemplate = item.template;
                    break;

                case 'end':
                    this._endTemplate = item.template;
                    break;
            }
        });
    }

    percent(meter = 0) {
        if (this.max === this.min) {
            return 100; // When min = max, any value should be 100%
        }
        const percentOfItem = ((meter - this.min) / (this.max - this.min)) * 100;

        return Math.round(Math.max(0, Math.min(100, percentOfItem)));
    }

    percentValue(meter: number) {
        return this.percent(meter) + '%';
    }

    meterStyle(val: MeterItem) {
        return {
            backgroundColor: val.color,
            width: this.orientation === 'horizontal' && this.percentValue(val.value || 0),
            height: this.orientation === 'vertical' && this.percentValue(val.value || 0)
        };
    }

    totalPercent() {
        if (!this.value) {
            return 0;
        }
        return this.percent(this.value.reduce((total, val) => total + (val.value || 0), 0));
    }

    percentages() {
        if (!this.value) {
            return [];
        }

        let sum = 0;
        const sumsArray: number[] = [];

        this.value.forEach((item) => {
            sum += item.value || 0;
            sumsArray.push(sum);
        });

        return sumsArray;
    }

    trackByFn(index: number): number {
        return index;
    }

    get dataP() {
        return this.cn({
            [this.orientation]: this.orientation
        });
    }
}

@NgModule({
    imports: [MeterGroup, SharedModule],
    exports: [MeterGroup, SharedModule]
})
export class MeterGroupModule {}
