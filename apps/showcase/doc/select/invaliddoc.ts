import { Code } from '@/domain/code';
import { Component } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-invalid-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-select [options]="cities" [(ngModel)]="selectedCity1" optionLabel="name" [showClear]="true" [invalid]="value1" placeholder="Select a City" class="w-full md:w-56" />
            <p-select [options]="cities" [(ngModel)]="selectedCity2" optionLabel="name" [showClear]="true" [invalid]="value2" placeholder="Select a City" class="w-full md:w-56" variant="filled" />
        </div>
        <app-code [code]="code" selector="select-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCity1: City | undefined;

    selectedCity2: City | undefined;

    value1 = true;

    value2 = true;

    code: Code = {
        basic: `<p-select [options]="cities" [(ngModel)]="selectedCity1" optionLabel="name" [showClear]="true" [invalid]="value1" placeholder="Select a City" class="w-full md:w-56" />
<p-select [options]="cities" [(ngModel)]="selectedCity2" optionLabel="name" [showClear]="true" [invalid]="value2" placeholder="Select a City" class="w-full md:w-56" variant="filled"/>`,

        html: `<div class="card flex justify-center gap-4">
    <p-select [options]="cities" [(ngModel)]="selectedCity1" optionLabel="name" [showClear]="true" [invalid]="value1" placeholder="Select a City" class="w-full md:w-56" />
    <p-select [options]="cities" [(ngModel)]="selectedCity2" optionLabel="name" [showClear]="true" [invalid]="value2" placeholder="Select a City" class="w-full md:w-56" variant="filled"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'select-invalid-demo',
    templateUrl: './select-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectInvalidDemo {
    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    selectedCity1: City | undefined;

    selectedCity2: City | undefined;

    value1 = true;

    value2 = true;

}`
    };
}
