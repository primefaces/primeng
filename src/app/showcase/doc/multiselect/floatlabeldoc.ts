import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'multiselect-floatlabel-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
                <label for="ms-cities">Select Cities</label>
            </span>
        </div>
        <app-code [code]="code" selector="multiselect-floatlabel-demo"></app-code>
    </div>`
})
export class FloatLabelDoc {
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
<span class="p-float-label">
    <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
    <label for="ms-cities">Select Cities</label>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-float-label">
        <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
        <label for="ms-cities">Select Cities</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multiselect-floatlabel-demo',
    templateUrl: './multiselect-floatlabel-demo.html',
    styleUrls: ['./multiselect-floatlabel-demo.scss']

})
export class MultiselectFloatlabelDemo {
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
}`
    };
}
