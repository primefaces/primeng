import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'iftalabel-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel class="w-full md:w-80">
                <p-multiselect [(ngModel)]="selectedCities" inputId="ms_cities" [options]="cities" optionLabel="name" [filter]="true" [maxSelectedLabels]="3" styleClass="w-full" />
                <label for="ms_cities">Cities</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="multi-select-iftalabel-demo"></app-code>
    `
})
export class IftaLabelDoc implements OnInit {
    cities!: City[];

    selectedCities!: City[];
    code: Code = {
        basic: `<p-iftalabel class="w-full md:w-80">
    <p-multiselect [(ngModel)]="selectedCities" inputId="ms_cities" [options]="cities" optionLabel="name" [filter]="true" [maxSelectedLabels]="3" styleClass="w-full" />
    <label for="ms_cities">Cities</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel class="w-full md:w-80">
        <p-multiselect [(ngModel)]="selectedCities" inputId="ms_cities" [options]="cities" optionLabel="name" [filter]="true" [maxSelectedLabels]="3" styleClass="w-full" />
        <label for="ms_cities">Cities</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { IftaLabelModule } from 'primeng/iftalabel';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-iftalabel-demo',
    templateUrl: './multi-select-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule, IftaLabelModule]
})
export class MultiSelectIftalabelDemo implements OnInit {
    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' },
        ];
    }
}`
    };

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
