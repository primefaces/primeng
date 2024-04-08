import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'loading-state-doc',
    template: `
        <app-docsectiontext>
            <p>Loading state can be used <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" [loading]="true" optionLabel="name" placeholder="Loading..." />
        </div>
        <app-code [code]="code" selector="multi-select-loading-state-demo"></app-code>
    `
})
export class LoadingStateDoc implements OnInit {
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
        basic: `<p-multiSelect 
    [options]="cities" 
    [(ngModel)]="selectedCities" 
    [loading]="true"
    optionLabel="name" 
    placeholder="Loading..."/>`,

        html: `<div class="card flex justify-content-center">
    <p-multiSelect 
        [options]="cities" 
        [(ngModel)]="selectedCities" 
        [loading]="true"
        optionLabel="name" 
        placeholder="Loading..."/>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-loading-state-demo',
    templateUrl: './multi-select-loading-state-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectLoadingStateDemo implements OnInit {

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
