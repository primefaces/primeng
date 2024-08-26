import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'cascade-select-template-demo',
    template: `
        <app-docsectiontext>
            <p>
                CascadeSelect is used as a controlled component with <i>ngModel</i> property along with an <i>options</i> collection. To define the label of a group <i>optionGroupLabel</i> property is needed and also <i>optionGroupChildren</i> is
                required to define the property that refers to the children of a group. Note that order of the <i>optionGroupChildren</i> matters as it should correspond to the data hierarchy.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-cascadeSelect [(ngModel)]="selectedCity" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" [style]="{ minWidth: '14rem' }" placeholder="Select a City">
                <ng-template pTemplate="option" let-option>
                    <div class="flex items-center gap-2">
                        <img *ngIf="option.states" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" />
                        <i class="pi pi-compass mr-2" *ngIf="option.cities"></i>
                        <i class="pi pi-map-marker mr-2" *ngIf="option.cname"></i>
                        <span>{{ option.cname || option.name }}</span>
                    </div>
                </ng-template>
            </p-cascadeSelect>
        </div>
        <app-code [code]="code" selector="cascade-select-template-demo"></app-code>
    `
})
export class TemplateDoc {
    countries: any[] | undefined;

    selectedCity: any;

    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }

    code: Code = {
        basic: `<p-cascadeSelect 
    [(ngModel)]="selectedCity" 
    [options]="countries"
    optionLabel="cname"
    optionGroupLabel="name"
    [optionGroupChildren]="['states', 'cities']"
    [style]="{ minWidth: '14rem' }" 
    placeholder="Select a City">
    <ng-template pTemplate="option" let-option>
        <div class="flex items-center gap-2">
            <img 
                src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                *ngIf="option.states" 
                [class]="'flag flag-' + option.code.toLowerCase()"/>
            <i class="pi pi-compass mr-2" *ngIf="option.cities"></i>
            <i class="pi pi-map-marker mr-2" *ngIf="option.cname"></i>
            <span>{{ option.cname || option.name }}</span>
        </div>
    </ng-template>
</p-cascadeSelect>`,

        html: `<div class="card flex justify-center">
    <p-cascadeSelect 
        [(ngModel)]="selectedCity" 
        [options]="countries"
        optionLabel="cname" 
        optionGroupLabel="name"
        [optionGroupChildren]="['states', 'cities']"
        [style]="{ minWidth: '14rem' }"
        placeholder="Select a City">
            <ng-template pTemplate="option" let-option>
                <div class="flex items-center gap-2">
                    <img 
                        src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png"
                        *ngIf="option.states"
                        [class]="'flag flag-' + option.code.toLowerCase()"/>
                    <i class="pi pi-compass mr-2" *ngIf="option.cities"></i>
                    <i class="pi pi-map-marker mr-2" *ngIf="option.cname"></i>
                    <span>{{ option.cname || option.name }}</span>
                </div>
            </ng-template>
    </p-cascadeSelect>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    selector: 'cascade-select-template-demo',
    templateUrl: './cascade-select-template-demo.html',
    standalone: true,
    imports: [FormsModule, CascadeSelectModule]
})
export class CascadeSelectTemplateDemo implements OnInit {
    countries: any[] | undefined;

    selectedCity: any;
    
    ngOnInit() {
        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
    }
}`
    };
}
