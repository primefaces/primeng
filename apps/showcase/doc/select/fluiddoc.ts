import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-fluid-demo',
    standalone: true,
    imports: [AppDocSectionText, AppCode, FormsModule, SelectModule],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" fluid />
        </div>
        <app-code [code]="code" selector="select-fluid-demo"></app-code>
    `
})
export class FluidDoc implements OnInit {
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
        basic: `<p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-fluid-demo',
    templateUrl: './select-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, Select]
})
export class SelectFluidDemo implements OnInit {
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
