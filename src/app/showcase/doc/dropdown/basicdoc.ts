import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-basic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Dropdown requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="cities" [(ngModel)]="selectedCity" optionLabel="name"></p-dropdown>
        </div>
        <app-code [code]="code" selector="dropdown-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    cities: City[];

    selectedCity: City;

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
<p-dropdown [options]="cities" [(ngModel)]="selectedCity" optionLabel="name"></p-dropdown>`,

        html: `
<div class="card flex justify-content-center">
    <p-dropdown [options]="cities" [(ngModel)]="selectedCity" optionLabel="name"></p-dropdown>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'dropdown-basic-demo',
    templateUrl: './dropdown-basic-demo.html'
})
export class DropdownBasicDemo {
    cities: City[];

    selectedCity: City;

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
