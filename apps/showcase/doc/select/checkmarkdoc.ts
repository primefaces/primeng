import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-checkmark-demo',
    template: `
        <app-docsectiontext>
            <p>An alternative way to highlight the selected option is displaying a checkmark instead.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" [checkmark]="true" optionLabel="name" [showClear]="true" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <app-code [code]="code" selector="select-checkmark-demo"></app-code>
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
        basic: `<p-select [options]="cities" [(ngModel)]="selectedCity" [checkmark]="true" optionLabel="name" [showClear]="true" placeholder="Select a City" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-select [options]="cities" [(ngModel)]="selectedCity" [checkmark]="true" optionLabel="name" [showClear]="true" placeholder="Select a City" class="w-full md:w-56" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-checkmark-demo',
    templateUrl: './select-checkmark-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectCheckmarkDemo implements OnInit {
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
