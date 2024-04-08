import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-loading-state-demo',
    template: `
        <app-docsectiontext>
            <p>Loading state can be used <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="cities" [(ngModel)]="selectedCity" [loading]="true" optionLabel="name" placeholder="Loading..." />
        </div>
        <app-code [code]="code" selector="dropdown-loading-state-demo"></app-code>
    `
})
export class LoadingStateDoc implements OnInit {
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
    [loading]="true"
    optionLabel="name" 
    placeholder="Select a City" />`,

        html: `<div class="card flex justify-content-center">
    <p-dropdown 
        [options]="cities" 
        [(ngModel)]="selectedCity" 
        [loading]="true"
        optionLabel="name"
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
    selector: 'dropdown-loading-state-demo',
    templateUrl: './dropdown-loading-state-demo.html',
    standalone: true,
    imports: [FormsModule, DropdownModule]
})
export class DropdownLoadingStateDemo implements OnInit {
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
