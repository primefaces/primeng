import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'filter-doc',
    template: `
        <app-docsectiontext>
            <p>ListBox provides built-in filtering that is enabled by adding the <i>filter</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [filter]="true" [style]="{ width: '15rem' }" [listStyle]="{ 'max-height': '220px' }" />
        </div>
        <app-code [code]="code" selector="listbox-filter-demo"></app-code>
    `
})
export class FilterDoc implements OnInit {
    cities!: City[];

    selectedCity!: City;

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
        basic: `<p-listbox 
    [options]="cities" 
    [(ngModel)]="selectedCity"
    optionLabel="name" 
    [filter]="true" 
    [style]="{ width: '15rem' }" 
    [listStyle]="{'max-height': '220px'}" />`,

        html: `<div class="card flex justify-content-center">
    <p-listbox 
        [options]="cities" 
        [(ngModel)]="selectedCity" 
        optionLabel="name" 
        [filter]="true" 
        [style]="{ width: '15rem' }" 
        [listStyle]="{'max-height': '220px'}" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-filter-demo',
    templateUrl: './listbox-filter-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxFilterDemo implements OnInit {
    cities!: City[];

    selectedCity!: City;
    
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
