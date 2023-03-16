import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'listbox-filter-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>ListBox provides built-in filtering that is enabled by adding the <i>filter</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" [style]="{ width: '15rem' }"></p-listbox>
        </div>
        <app-code [code]="code" selector="listbox-filter-demo"></app-code>
    </div>`
})
export class FilterDoc {
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
<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" [style]="{ width: '15rem' }"></p-listbox>`,

        html: `
<div class="card flex justify-content-center">
    <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" [style]="{ width: '15rem' }"></p-listbox>
</div>`,

        typescript: `
import { Component } from '@angular/core';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-filter-demo',
    templateUrl: './listbox-filter-demo.html',
    styleUrls: ['./listbox-filter-demo.scss']
})
export class ListboxFilterDemo {
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
