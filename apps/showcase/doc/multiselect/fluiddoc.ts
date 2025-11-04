import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" fluid />
        </div>
        <app-code [code]="code" selector="multi-select-fluid-demo"></app-code>
    `
})
export class FluidDoc implements OnInit {
    cities!: City[];

    selectedCities!: any[];

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
        basic: `<p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" fluid />`,

        html: `<div class="card flex justify-center">
    <p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" fluid />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-fluid-demo',
    templateUrl: './multi-select-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectFluidDemo implements OnInit {

    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}`
    };
}
