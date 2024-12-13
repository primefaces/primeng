import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, forwardRef, inject, Input, NgModule, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { getOuterHeight } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { MeterItem } from './metergroup.interface';
import { MeterGroupStyle } from './style/metergroupstyle';

@Component({
    selector: 'p-meterGroupLabel, p-metergrouplabel',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <ol [ngClass]="labelClass">
            <li *ngFor="let labelItem of value; let index = index; trackBy: parentInstance.trackByFn" class="p-metergroup-label">
                <ng-container *ngIf="!iconTemplate">
                    <i *ngIf="labelItem.icon" [class]="labelItem.icon" [ngClass]="{ 'p-metergroup-label-icon': true }" [ngStyle]="{ color: labelItem.color }"></i>
                    <span *ngIf="!labelItem.icon" class="p-metergroup-label-marker" [ngStyle]="{ backgroundColor: labelItem.color }"></span>
                </ng-container>
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: labelItem, icon: labelItem.icon }"></ng-container>
                <span class="p-metergroup-label-text">{{ labelItem.label }} ({{ parentInstance.percentValue(labelItem.value) }})</span>
            </li>
        </ol>
    `
})
export class MeterGroupLabel {
    @Input() value: any[] = null;

    @Input() labelPosition: 'start' | 'end' = 'end';

    @Input() labelOrientation: 'horizontal' | 'vertical' = 'horizontal';

    @Input() min: number;

    @Input() max: number;

    @Input() iconTemplate: TemplateRef<any> | undefined;

    get labelClass(): { [key: string]: boolean } {
        return {
            'p-metergroup-label-list p-component': true,
            'p-metergroup-label-list-vertical': this.labelOrientation === 'vertical',
            'p-metergroup-label-list-horizontal': this.labelOrientation === 'horizontal'
        };
    }

    parentInstance: MeterGroup = inject(forwardRef(() => MeterGroup));
}
/**
 * MeterGroup displays scalar measurements within a known range.
 * @group Components
 */
@Component({
    selector: 'p-meterGroup, p-metergroup, p-meter-group',
    standalone: true,
    imports: [CommonModule, MeterGroupLabel, SharedModule],
    template: `
        <div #container [ngClass]="containerClass" [attr.role]="'meter'" [attr.aria-valuemin]="min" [attr.aria-valuemax]="max" [attr.aria-valuenow]="totalPercent()" [ngStyle]="style" [class]="styleClass">
            @if (labelPosition === 'start') {
                <p-meterGroupLabel *ngIf="!labelTemplate && !_labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate || _iconTemplate" />
                <ng-container *ngTemplateOutlet="labelTemplate || labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
            <ng-container *ngTemplateOutlet="startTemplate || _startTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            <div class="p-metergroup-meters">
                <ng-container *ngFor="let meterItem of value; let index = index; trackBy: trackByFn">
                    <ng-container
                        *ngTemplateOutlet="
                            meterTemplate || _meterTemplate;
                            context: {
                                $implicit: meterItem,
                                index: index,
                                orientation: this.orientation,
                                class: 'p-metergroup-meter',
                                size: percentValue(meterItem.value),
                                totalPercent: totalPercent()
                            }
                        "
                    >
                    </ng-container>
                    <ng-container *ngIf="!meterTemplate && !_meterTemplate && meterItem.value > 0">
                        <span class="p-metergroup-meter" [ngStyle]="meterStyle(meterItem)"></span>
                    </ng-container>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="endTemplate || _endTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            @if (labelPosition === 'end') {
                <p-meterGroupLabel *ngIf="!labelTemplate && !_labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate || _iconTemplate" />
                <ng-container *ngTemplateOutlet="labelTemplate || _labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MeterGroupStyle]
})
export class MeterGroup extends BaseComponent implements AfterContentInit {
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
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    get vertical(): boolean {
        return this.orientation === 'vertical';
    }

    get containerClass() {
        return {
            'p-metergroup p-component': true,
            'p-metergroup-horizontal': this.orientation === 'horizontal',
            'p-metergroup-vertical': this.orientation === 'vertical'
        };
    }

    @ContentChild('label', { descendants: false }) labelTemplate: TemplateRef<any> | undefined;

    @ContentChild('meter', { descendants: false }) meterTemplate: TemplateRef<any> | undefined;

    @ContentChild('end', { descendants: false }) endTemplate: TemplateRef<any> | undefined;

    @ContentChild('start', { descendants: false }) startTemplate: TemplateRef<any> | undefined;

    @ContentChild('icon', { descendants: false }) iconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _labelTemplate: TemplateRef<any> | undefined;

    _meterTemplate: TemplateRef<any> | undefined;

    _endTemplate: TemplateRef<any> | undefined;

    _startTemplate: TemplateRef<any> | undefined;

    _iconTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(MeterGroupStyle);

    @ViewChild('container', { read: ElementRef }) container: ElementRef;

    ngAfterViewInit() {
        super.ngAfterViewInit();
        const _container = this.container.nativeElement;
        const height = getOuterHeight(_container);
        this.vertical && (_container.style.height = height + 'px');
    }

    ngAfterContentInit() {
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
        const percentOfItem = ((meter - this.min) / (this.max - this.min)) * 100;

        return Math.round(Math.max(0, Math.min(100, percentOfItem)));
    }

    percentValue(meter) {
        return this.percent(meter) + '%';
    }

    meterStyle(val) {
        return {
            backgroundColor: val.color,
            width: this.orientation === 'horizontal' && this.percentValue(val.value),
            height: this.orientation === 'vertical' && this.percentValue(val.value)
        };
    }

    totalPercent() {
        return this.percent(this.value.reduce((total, val) => total + val.value, 0));
    }

    percentages() {
        let sum = 0;
        const sumsArray = [];

        this.value.forEach((item) => {
            sum += item.value;
            sumsArray.push(sum);
        });

        return sumsArray;
    }

    trackByFn(index: number): number {
        return index;
    }
}

@NgModule({
    imports: [MeterGroup, SharedModule],
    exports: [MeterGroup, SharedModule]
})
export class MeterGroupModule {}
