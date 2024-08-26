import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>MeterGroup provides templating support for labels, meter items, and content around the meters.</p>
        </app-docsectiontext>
        <div class="card">
            <p-meterGroup [value]="value" labelPosition="start">
                <ng-template pTemplate="label">
                    <div class="flex flex-wrap gap-4">
                        <ng-container *ngFor="let meterItem of value; let index = index">
                            <p-card class="flex-1">
                                <div class="flex justify-between gap-8">
                                    <div class="flex flex-col gap-1">
                                        <span class="text-secondary text-sm">{{ meterItem.label }}</span>
                                        <span class="font-bold text-lg">{{ meterItem.value }}%</span>
                                    </div>
                                    <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" [style]="{ 'background-color': meterItem.color1, color: '#ffffff' }">
                                        <i [class]="meterItem.icon"></i>
                                    </span>
                                </div>
                            </p-card>
                        </ng-container>
                    </div>
                </ng-template>
                <ng-template pTemplate="meter" let-value let-class="class" let-width="size">
                    <span [class]="class" [style]="{ background: 'linear-gradient(to right, ' + value.color1 + ', ' + value.color2 + ')', width: width }"></span>
                </ng-template>
                <ng-template pTemplate="start" let-totalPercent="totalPercent">
                    <div class="flex justify-between mt-4 mb-2 relative">
                        <span>Storage</span>
                        <span [style]="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
                        <span class="font-medium">1TB</span>
                    </div>
                </ng-template>
                <ng-template pTemplate="end">
                    <div class="flex justify-between mt-4">
                        <p-button label="Manage Storage" [outlined]="true" size="small" />
                        <p-button label="Update Plan" size="small" />
                    </div>
                </ng-template>
            </p-meterGroup>
        </div>
        <app-code [code]="code" selector="meter-group-template-demo"></app-code>
    `
})
export class TemplateDoc {
    value = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];

    code: Code = {
        basic: `<p-meterGroup [value]="value" labelPosition="start">
    <ng-template pTemplate="label">
        <div class="flex flex-wrap gap-4">
            <ng-container *ngFor="let meterItem of value; let index = index">
                <p-card class="flex-1">
                    <div class="flex justify-between gap-8">
                        <div class="flex flex-col gap-1">
                            <span class="text-secondary text-sm">{{ meterItem.label }}</span>
                            <span class="font-bold text-lg">{{ meterItem.value }}%</span>
                        </div>
                        <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" [style]="{ 'background-color': meterItem.color1, color: '#ffffff' }">
                            <i [class]="meterItem.icon"></i>
                        </span>
                    </div>
                </p-card>
            </ng-container>
        </div>
    </ng-template>
    <ng-template pTemplate="meter" let-value let-class="class" let-width="size">
        <span [class]="class" [style]="{ background: 'linear-gradient(to right, ' + value.color1 + ', ' + value.color2 + ')', width: width }"></span>
    </ng-template>
    <ng-template pTemplate="start" let-totalPercent="totalPercent">
        <div class="flex justify-between mt-4 mb-2 relative">
            <span>Storage</span>
            <span [style]="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
            <span class="font-medium">1TB</span>
        </div>
    </ng-template>
    <ng-template pTemplate="end">
        <div class="flex justify-between mt-4">
            <p-button label="Manage Storage" [outlined]="true" size="small" />
            <p-button label="Update Plan" size="small" />
        </div>
    </ng-template>
</p-meterGroup>`,

        html: `<div class="card">
    <p-meterGroup [value]="value" labelPosition="start">
        <ng-template pTemplate="label">
            <div class="flex flex-wrap gap-4">
                <ng-container *ngFor="let meterItem of value; let index = index">
                    <p-card class="flex-1">
                        <div class="flex justify-between gap-8">
                            <div class="flex flex-col gap-1">
                                <span class="text-secondary text-sm">{{ meterItem.label }}</span>
                                <span class="font-bold text-lg">{{ meterItem.value }}%</span>
                            </div>
                            <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" [style]="{ 'background-color': meterItem.color1, color: '#ffffff' }">
                                <i [class]="meterItem.icon"></i>
                            </span>
                        </div>
                    </p-card>
                </ng-container>
            </div>
        </ng-template>
        <ng-template pTemplate="meter" let-value let-class="class" let-width="size">
            <span [class]="class" [style]="{ background: 'linear-gradient(to right, ' + value.color1 + ', ' + value.color2 + ')', width: width }"></span>
        </ng-template>
        <ng-template pTemplate="start" let-totalPercent="totalPercent">
            <div class="flex justify-between mt-4 mb-2 relative">
                <span>Storage</span>
                <span [style]="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
                <span class="font-medium">1TB</span>
            </div>
        </ng-template>
        <ng-template pTemplate="end">
            <div class="flex justify-between mt-4">
                <p-button label="Manage Storage" [outlined]="true" size="small" />
                <p-button label="Update Plan" size="small" />
            </div>
        </ng-template>
    </p-meterGroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MeterGroupModule } from 'primeng/metergroup';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'meter-group-template-demo',
    templateUrl: './meter-group-template-demo.html',
    standalone: true,
    imports: [MeterGroupModule, CardModule, ButtonModule, CommonModule]
})
export class MeterGroupTemplateDemo {
    value = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];
}`
    };
}
