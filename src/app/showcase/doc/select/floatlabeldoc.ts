import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-floatlabel-demo',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatLabel>
                <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" inputId="float-label" />
                <label for="float-label">Select a City</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="select-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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
    <p-select 
        [options]="cities"
        [(ngModel)]="selectedCity"
        optionLabel="name" 
        inputId="float-label" />
    <label for="float-label">Select a City</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center">
    <p-floatLabel>
        <p-select 
            [options]="cities"
            [(ngModel)]="selectedCity"
            optionLabel="name"
            inputId="float-label" />
        <label for="float-label">Select a City</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from "primeng/floatlabel"

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-floatlabel-demo',
    templateUrl: './select-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule, FloatLabelModule]
})
export class SelectFloatlabelDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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
