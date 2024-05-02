import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-clear-icon-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is added to reset the Dropdown.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [showClear]="true" placeholder="Select a City" />
        </div>
        <app-code [code]="code" selector="dropdown-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc implements OnInit {
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
    optionLabel="name" 
    [showClear]="true" 
    placeholder="Select a City" />`,

        html: `<div class="card flex justify-content-center">
    <p-dropdown 
        [options]="cities" 
        [(ngModel)]="selectedCity" 
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
    selector: 'dropdown-clear-icon-demo',
    templateUrl: './dropdown-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, DropdownModule]
})
export class DropdownClearIconDemo implements OnInit {
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
