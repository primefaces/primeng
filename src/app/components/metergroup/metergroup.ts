import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, NgModule, QueryList, TemplateRef, ViewChild, ViewEncapsulation, effect, forwardRef, inject, viewChild } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { MeterItem } from './metergroup.interface';

@Component({
    selector: 'p-meterGroupLabel',
    template: `
        <ol [ngClass]="labelClass">
            <li *ngFor="let val of value; let index = index; trackBy: parentInstance.trackByFn" class="p-metergroup-label">
                <ng-container *ngIf="!iconTemplate">
                    <i *ngIf="val.icon" [class]="val.icon" [ngClass]="{ 'p-metergroup-label-icon': true }" [ngStyle]="{ color: val.color }"></i>
                    <span *ngIf="!val.icon" class="p-metergroup-label-marker" [ngStyle]="{ backgroundColor: val.color }"></span>
                </ng-container>
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: val, icon: val.icon }"></ng-container>
                <span class="p-metergroup-label-text">{{ val.label }} ({{ parentInstance?.percentValue(val.value) }})</span>
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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    get labelClass(): { [key: string]: boolean } {
        return {
            'p-metergroup-labels p-component': true,
            'p-metergroup-labels-vertical': this.labelOrientation === 'vertical',
            'p-metergroup-labels-horizontal': this.labelOrientation === 'horizontal'
        };
    }

    parentInstance: MeterGroup = inject(forwardRef(() => MeterGroup));
}
/**
 * MeterGroup displays scalar measurements within a known range.
 * @group Components
 */
@Component({
    selector: 'p-meterGroup',
    template: `
        <div #container [ngClass]="containerClass" role="meter" [attr.aria-valuemin]="min" [attr.aria-valuemax]="max" [attr.aria-valuenow]="totalPercent()" [ngStyle]="style" [class]="styleClass">
            @if(labelPosition ==='start') {
            <p-meterGroupLabel *ngIf="!labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate" />
            <ng-container *ngTemplateOutlet="labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
            <ng-container *ngTemplateOutlet="startTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            <div class="p-metergroup-meters">
                <ng-container *ngFor="let val of value; let index = index; trackBy: trackByFn">
                    <ng-container *ngTemplateOutlet="meterTemplate; context: { $implicit: val, index: index, orientation: this.orientation, class: 'p-metergroup-meter', size: percentValue(val.value) }; totalPercent: totalPercent()"> </ng-container>
                    <ng-container *ngIf="!meterTemplate">
                        <span class="p-metergroup-meter" [ngStyle]="meterStyle(val)"></span>
                    </ng-container>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="endTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            @if(labelPosition === 'end') {
            <p-meterGroupLabel *ngIf="!labelTemplate" [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" [iconTemplate]="iconTemplate" />
            <ng-container *ngTemplateOutlet="labelTemplate; context: { $implicit: value, totalPercent: totalPercent(), percentages: percentages() }"></ng-container>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MeterGroup implements AfterContentInit {
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
    @Input() labelOrientation: string = 'horizontal';
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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

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

    labelTemplate: TemplateRef<any> | undefined;

    meterTemplate: TemplateRef<any> | undefined;

    endTemplate: TemplateRef<any> | undefined;

    startTemplate: TemplateRef<any> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    container = viewChild('container', { read: ElementRef });

    containerEffect = effect(() => {
        const _container = this.container();
        const height = DomHandler.getOuterHeight(_container.nativeElement);
        this.vertical && (this.container().nativeElement.style.height = height + 'px');
    });

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'label':
                    this.labelTemplate = item.template;
                    break;
                case 'meter':
                    this.meterTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                case 'start':
                    this.startTemplate = item.template;
                    break;
                case 'end':
                    this.endTemplate = item.template;
                    break;
                default:
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
    imports: [CommonModule, SharedModule],
    exports: [MeterGroup, SharedModule],
    declarations: [MeterGroup, MeterGroupLabel]
})
export class MeterGroupModule {}
