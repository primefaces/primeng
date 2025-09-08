import { Code } from '@/domain/code';
import { Component } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'invalid-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-multiselect [options]="cities" [(ngModel)]="selectedCities1" [invalid]="value1" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" />
            <p-multiselect [options]="cities" [(ngModel)]="selectedCities2" [invalid]="value2" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" variant="filled" />
        </div>
        <app-code [code]="code" selector="multi-select-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value1: boolean = true;

    value2: boolean = true;

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCities1!: City[];

    selectedCities2!: City[];

    code: Code = {
        basic: `<p-multiselect [options]="cities" [(ngModel)]="selectedCities1" [invalid]="value1" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" />
<p-multiselect [options]="cities" [(ngModel)]="selectedCities2" [invalid]="value2" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" variant="filled" />`,

        html: `<div class="card flex justify-center gap-4">
    <p-multiselect [options]="cities" [(ngModel)]="selectedCities1" [invalid]="value1" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" />
    <p-multiselect [options]="cities" [(ngModel)]="selectedCities2" [invalid]="value2" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
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
export class MultiSelectInvalidDemo {
    value1: boolean = true;

    value2: boolean = true;

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCities1!: City[];

    selectedCities2!: City[];
}`
    };
}
