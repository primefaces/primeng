import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>MultiSelect requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
        </div>
        <app-code [code]="code" selector="multiselect-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
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
<p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>`,

        html: `
<div class="card flex justify-content-center">
    <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multiselect-basic-demo',
    templateUrl: './multiselect-basic-demo.html'
})
export class MultiselectBasicDemo {

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
