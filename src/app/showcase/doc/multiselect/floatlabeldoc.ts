import { Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <p-multiSelect inputId="float-label" [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
                <label for="float-label">Select Cities</label>
            </span>
        </div>
        <app-code [code]="code" selector="multi-select-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc implements OnInit {
    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
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
    <p-multiSelect inputId="float-label" [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
    <label for="float-label">Select Cities</label>
</span>`,

        html: `
<div class="card flex justify-content-center">
    <span class="p-float-label">
        <p-multiSelect inputId="float-label" [options]="cities" [(ngModel)]="selectedCities" optionLabel="name"></p-multiSelect>
        <label for="float-label">Select Cities</label>
    </span>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-floatlabel-demo',
    templateUrl: './multi-select-floatlabel-demo.html'
})
export class MultiSelectFloatlabelDemo implements OnInit {
    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
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
