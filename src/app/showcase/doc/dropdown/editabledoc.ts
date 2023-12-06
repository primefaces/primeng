import { Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-editable-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>editable</i> is present, the input can also be entered with typing.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" [editable]="true" optionLabel="name"></p-dropdown>
        </div>
        <app-code [code]="code" selector="dropdown-editable-demo"></app-code>
    `
})
export class EditableDoc implements OnInit {
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
        basic: `<p-dropdown [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" [editable]="true" optionLabel="name"></p-dropdown>`,

        html: `
<div class="card flex justify-content-center">
    <p-dropdown [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" [editable]="true" optionLabel="name"></p-dropdown>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-editable-demo',
    templateUrl: './dropdown-editable-demo.html'
})
export class DropdownEditableDemo implements OnInit {
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
