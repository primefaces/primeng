import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'cascade-select-filled-demo',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-cascadeSelect [(ngModel)]="selectedCity" variant="filled" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" [style]="{ minWidth: '14rem' }" placeholder="Select a City" />
        </div>
        <app-code [code]="code" selector="cascade-select-filled-demo"></app-code>
    `
})
export class FilledDoc {
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
    variant="filled"
    [options]="countries" 
    optionLabel="cname" 
    optionGroupLabel="name" 
    [optionGroupChildren]="['states', 'cities']" 
    [style]="{ minWidth: '14rem' }"
    placeholder="Select a City" />`,

        html: `<div class="card flex justify-center">
    <p-cascadeSelect 
        [(ngModel)]="selectedCity" 
        variant="filled"
        [options]="countries" 
        optionLabel="cname"
        optionGroupLabel="name" 
        [optionGroupChildren]="['states', 'cities']" 
        [style]="{ minWidth: '14rem' }" 
        placeholder="Select a City" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
    selector: 'cascade-select-filled-demo',
    templateUrl: './cascade-select-filled-demo.html',
    standalone: true,
    imports: [FormsModule, CascadeSelectModule]
})
export class CascadeSelectFilledDemo implements OnInit {
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
