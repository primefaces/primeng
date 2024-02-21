import { CommonModule } from '@angular/common';
import { Component, ContentChildren, Input, NgModule, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate, SharedModule } from '../api/shared';

@Component({
    selector: 'p-meterGroupLabel',
    template: `
        <ol [ngClass]="labelClasses">
            <li *ngFor="let val of value; let index = index" [key]="index + '_label'" class="p-metergroup-label">
                <ng-container *ngIf="!iconTemplate">
                    <div class="p-metergroup-label-icon">
                        <i *ngIf="val.icon" [ngClass]="{ 'p-metergroup-label-icon': val.icon }" [ngStyle]="{ color: val.color }"></i>
                        <span *ngIf="!val.icon" class="p-metergroup-label-marker" [ngStyle]="{ backgroundColor: val.color }"></span>
                    </div>
                </ng-container>
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: val }"></ng-container>
                <span class="p-metergroup-label-text">{{ val.label }} ({{ percentValue(val.value) }})</span>
            </li>
        </ol>
    `,

    host: {
        class: 'p-element'
    }
})
export class MeterGroupLabel {
    @Input() value: any[] = null;

    @Input() labelPosition: string = 'end';

    @Input() labelOrientation: string = 'horizontal';

    @Input() min: number;

    @Input() max: number;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    iconTemplate: TemplateRef<any> | undefined;

    percent(meter = 0) {
        const percentOfItem = ((meter - this.min) / (this.max - this.min)) * 100;
        return Math.round(Math.max(0, Math.min(100, percentOfItem)));
    }
    
    percentValue(meter) {
        return this.percent(meter) + '%';
    }
    
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                default:
                    this.iconTemplate = item.template;
                    break;
            }
        });
    }
    get labelClasses(): { [key: string]: boolean } {
        return {
            'p-metergroup-labels': true,
            'p-metergroup-labels-vertical': this.labelOrientation === 'vertical',
            'p-metergroup-labels-horizontal': this.labelOrientation === 'horizontal'
        };
    }
}
/**
 * MeterGroup displays scalar measurements within a known range.
 * @group Components
 */
@Component({
    selector: 'p-meterGroup',
    template: `
        <div [ngClass]="meterGroupStyles" role="meter">
            <ng-container *ngIf="labelPosition === 'start'">
                <p-meterGroupLabel [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" />
            </ng-container>
            <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            <div class="p-metergroup-meters">
                <ng-container *ngFor="let val of value; let index = index" [key]="index" >
                    <ng-container *ngTemplateOutlet="meterTemplate; context: { $implicit: val }"> </ng-container>
                    <ng-container *ngIf="!meterTemplate">
                        <span class="p-metergroup-meter" [ngStyle]="meterSize(val)"></span>
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="labelPosition === 'end'">
                    <p-meterGroupLabel [value]="value" [labelPosition]="labelPosition" [labelOrientation]="labelOrientation" [min]="min" [max]="max" />
                </ng-container>
            </div>
        </div>
    `,
    styleUrls: ['./metergroup.css'],
    host: {
        class: 'p-element'
    }
})
export class MeterGroup {
    @Input() value: any[] | null = [{ label: 'Space used', value: 15 }];
    @Input() min: number = 0;
    @Input() max: number = 100;
    @Input() orientation: string = 'horizontal';
    @Input() labelPosition: string = 'end';
    @Input() labelOrientation: string = 'horizontal';
    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    startTemplate: TemplateRef<any> | undefined;
    meterTemplate: TemplateRef<any> | undefined;
    endTemplate: TemplateRef<any> | undefined;
    percent(meter = 0) {
        const percentOfItem = ((meter - this.min) / (this.max - this.min)) * 100;

        return Math.round(Math.max(0, Math.min(100, percentOfItem)));
    }
    percentValue(meter) {
        return this.percent(meter) + '%';
    }
    meterSize(val) {
        return {
            backgroundColor: val.color,
            width: this.orientation === 'horizontal' && this.percentValue(val.value),
            height: this.orientation === 'vertical' && this.percentValue(val.value),
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
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
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
    get meterGroupStyles() {
        return {
            'p-metergroup p-component': true,
            'p-metergroup-horizontal': this.orientation === 'horizontal',
            'p-metergroup-vertical': this.orientation === 'vertical'
        };
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [MeterGroup, SharedModule],
    declarations: [MeterGroup, MeterGroupLabel]
})
export class MeterGroupModule {}
