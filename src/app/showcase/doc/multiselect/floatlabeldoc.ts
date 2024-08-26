import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatLabel>
                <p-multiSelect inputId="float-label" [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" />
                <label for="float-label">MultiSelect</label>
            </p-floatLabel>
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
        basic: `<p-floatLabel>
    <p-multiSelect 
        inputId="float-label" 
        [options]="cities" 
        [(ngModel)]="selectedCities" 
        optionLabel="name" />
    <label for="float-label">MultiSelect</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center">
    <p-floatLabel>
        <p-multiSelect 
            inputId="float-label" 
            [options]="cities" 
            [(ngModel)]="selectedCities" 
            optionLabel="name" />
        <label for="float-label">MultiSelect</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-floatlabel-demo',
    templateUrl: './multi-select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, FloatLabelModule]
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
