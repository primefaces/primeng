import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-multiselect [options]="cities" [(ngModel)]="selectedCities" class="ng-dirty ng-invalid" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" styleClass="w-full md:w-80" />
        </div>
        <app-code [code]="code" selector="multi-select-invalid-demo"></app-code>
    `
})
export class InvalidDoc implements OnInit {
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
        basic: `<p-multiselect [options]="cities" [(ngModel)]="selectedCities" class="ng-dirty ng-invalid" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" />`,

        html: `<div class="card flex justify-center">
    <p-multiselect [options]="cities" [(ngModel)]="selectedCities" class="ng-dirty ng-invalid" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-invalid-demo',
    templateUrl: './multi-select-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectInvalidDemo implements OnInit {
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
