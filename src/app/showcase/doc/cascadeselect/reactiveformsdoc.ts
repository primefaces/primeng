import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>CascadeSelect can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-cascadeSelect
                    formControlName="selectedCity"
                    [options]="countries"
                    optionLabel="cname"
                    optionGroupLabel="name"
                    [optionGroupChildren]="['states', 'cities']"
                    [style]="{ minWidth: '14rem' }"
                    placeholder="Select a City"
                ></p-cascadeSelect>
            </form>
        </div>
        <app-code [code]="code" selector="cascade-select-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    countries: any[] | undefined;

    selectedCity: any;

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedCity: new FormControl<object | null>(null)
        });

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
        basic: `
<form [formGroup]="formGroup">
    <p-cascadeSelect formControlName="selectedCity" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" [style]="{ minWidth: '14rem' }" placeholder="Select a City"></p-cascadeSelect>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-cascadeSelect formControlName="selectedCity" [options]="countries" optionLabel="cname" optionGroupLabel="name" [optionGroupChildren]="['states', 'cities']" [style]="{ minWidth: '14rem' }" placeholder="Select a City"></p-cascadeSelect>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'cascade-select-reactive-forms-demo',
    templateUrl: './cascade-select-reactive-forms-demo.html'
})
export class CascadeSelectReactiveFormsDemo implements OnInit {
    countries: any[] | undefined;

    selectedCity: any;

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedCity: new FormControl<object | null>(null)
        });

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
