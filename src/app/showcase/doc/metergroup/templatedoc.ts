import { Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Menu requires a collection of menuitems as its <i>model</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-meterGroup [value]="value" labelPosition="start">
                <ng-template pTemplate="start">
                    <div class="flex flex-wrap gap-3">
                        <div *ngFor="let val of value; let index = index">
                            <p-card class="flex-1">
                                <div class="flex justify-content-between gap-5">
                                    <div class="flex flex-column gap-1">
                                        <span class="text-secondary text-sm">{{ val.label }}</span>
                                        <span class="font-bold text-lg">{{ val.value }}%</span>
                                    </div>
                                    <span class="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center" [style]="{ 'background-color': val.color1, color: '#ffffff' }">
                                        <i [class]="val.icon"></i>
                                    </span>
                                </div>
                            </p-card>
                        </div>
                    </div>
                </ng-template>

                <ng-template pTemplate="meter">
                    <!-- <span *ngFor="let val of value; let index = index" class="p-metergroup-meter" [ngStyle]="{ background: 'linear-gradient(to right, ' + val.color1 + ', ' + val.color2 + ')', width: percentValue(val.value) }"></span> -->
                </ng-template>
            </p-meterGroup>
        </div>
        <app-code [code]="code" selector="metergroup-vertical-demo"></app-code>
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
        basic: `<p-menu [model]="items"></p-menu>`,

        html: `
<div class="card flex justify-content-center">
    <p-menu [model]="items"></p-menu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'menu-basic-demo',
    templateUrl: './menu-basic-demo.html'
})
export class MeterGroupBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash'
            }
        ];
    }
}`
    };
}
