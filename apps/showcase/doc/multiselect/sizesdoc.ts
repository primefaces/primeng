import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>MultiSelect provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-multiselect [(ngModel)]="value1" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" size="small" placeholder="Small" />
            <p-multiselect [(ngModel)]="value2" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" placeholder="Normal" />
            <p-multiselect [(ngModel)]="value3" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" size="large" placeholder="Large" />
        </div>
        <app-code [code]="code" selector="multi-select-sizes-demo"></app-code>
    `
})
export class SizesDoc implements OnInit {
    cities!: City[];

    value1: any[];

    value2: any[];

    value3: any[];

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
        basic: `<p-multiselect [(ngModel)]="value1" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" size="small" placeholder="Small" />
<p-multiselect [(ngModel)]="value2" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" placeholder="Normal" />
<p-multiselect [(ngModel)]="value3" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" size="large" placeholder="Large" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-multiselect [(ngModel)]="value1" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" size="small" placeholder="Small" />
    <p-multiselect [(ngModel)]="value2" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" placeholder="Normal" />
    <p-multiselect [(ngModel)]="value3" [options]="cities" optionLabel="name" [maxSelectedLabels]="3" styleClass="w-full md:w-80" size="large" placeholder="Large" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-sizes-demo',
    templateUrl: './multi-select-sizes-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectSizesDemo implements OnInit {

    cities!: City[];

    value1: any[];

    value2: any[];

    value3: any[];

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
