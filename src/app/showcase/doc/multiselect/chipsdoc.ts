import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'chips-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Selected values are displayed as a comma separated list by default, setting <i>display</i> as <i>chip</i> displays them as chips.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" defaultLabel="Select a City" optionLabel="name" display="chip"></p-multiSelect>
        </div>
        <app-code [code]="code" selector="multiselect-chips-demo"></app-code>
    </section>`
})
export class ChipsDoc {
    @Input() id: string;

    @Input() title: string;

    cities: City[];

    selectedCities: City[];

    constructor() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    code: Code = {
        basic: `
<p-multiSelect [options]="cities" [(ngModel)]="selectedCities" defaultLabel="Select a City" optionLabel="name" display="chip"></p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" defaultLabel="Select a City" optionLabel="name" display="chip"></p-multiSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multiselect-chips-demo',
    templateUrl: './multiselect-chips-demo.html'
})
export class MultiselectChipsDemo {
    cities: City[];

    selectedCities: City[];

    constructor() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}`
    };
}
