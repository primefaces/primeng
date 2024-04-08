import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-checkmark-demo',
    template: `
        <app-docsectiontext>
            <p>An alternative way to highlight the selected option is displaying a checkmark instead.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="cities" [(ngModel)]="selectedCity" [checkmark]="true" optionLabel="name" [showClear]="true" placeholder="Select a City" />
        </div>
        <app-code [code]="code" selector="dropdown-checkmark-demo"></app-code>
    `
})
export class CheckmarkDoc implements OnInit {
    cities: City[];

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
        basic: `<p-dropdown 
    [options]="cities" 
    [(ngModel)]="selectedCity"
    [checkmark]="true" 
    optionLabel="name" 
    [showClear]="true" 
    placeholder="Select a City" />`,

        html: `<div class="card flex justify-content-center">
    <p-dropdown 
        [options]="cities" 
        [(ngModel)]="selectedCity"
        [checkmark]="true" 
        optionLabel="name" 
        [showClear]="true"
        placeholder="Select a City" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-checkmark-demo',
    templateUrl: './dropdown-checkmark-demo.html',
    standalone: true,
    imports: [FormsModule, DropdownModule]
})
export class DropdownCheckmarkDemo implements OnInit {
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
