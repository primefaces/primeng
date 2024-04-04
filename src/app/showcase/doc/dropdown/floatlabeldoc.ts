import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-floatlabel-demo',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-floatLabel>
                <p-dropdown [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" inputId="float-label" />
                <label for="float-label">Select a City</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="dropdown-floatlabel-demo"></app-code>
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
    <p-dropdown 
        [options]="cities"
        [(ngModel)]="selectedCity"
        optionLabel="name" 
        inputId="float-label"/>
    <label for="float-label">Select a City</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-content-center">
    <p-floatLabel>
        <p-dropdown 
            [options]="cities"
            [(ngModel)]="selectedCity"
            optionLabel="name"
            inputId="float-label"/>
        <label for="float-label">Select a City</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel"

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-floatlabel-demo',
    templateUrl: './dropdown-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, DropdownModule, FloatLabelModule]
})
export class DropdownFloatlabelDemo implements OnInit {
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
