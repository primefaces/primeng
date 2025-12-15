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
    selector: 'clear-icon-doc',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is displayed to clear the value.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" [showClear]="true" />
        </div>
        <app-code [code]="code" selector="multi-select-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc implements OnInit {
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
        basic: `<p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" [showClear]="true" />`,

        html: `<div class="card flex justify-center">
    <p-multiselect [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" placeholder="Select Cities" [maxSelectedLabels]="3" class="w-full md:w-80" [showClear]="true" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-clear-icon-demo',
    templateUrl: './multi-select-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectClearIconDemo implements OnInit {

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
