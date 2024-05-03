import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'dropdown-invalid-demo',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-dropdown [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [showClear]="true" placeholder="Select a City" class="ng-dirty ng-invalid" />
        </div>
        <app-code [code]="code" selector="dropdown-invalid-demo"></app-code>
    `
})
export class InvalidDoc implements OnInit {
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
    placeholder="Select a City" 
    class="ng-dirty ng-invalid" />`,

        html: `<div class="card flex justify-content-center">
    <p-dropdown 
        [options]="cities"
        [(ngModel)]="selectedCity"
        optionLabel="name" 
        [showClear]="true" 
        placeholder="Select a City" 
        class="ng-dirty ng-invalid" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'dropdown-invalid-demo',
    templateUrl: './dropdown-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, DropdownModule]
})
export class DropdownInvalidDemo implements OnInit {
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
