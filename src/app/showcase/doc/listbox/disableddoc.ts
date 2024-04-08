import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [disabled]="true" [style]="{ width: '15rem' }" [listStyle]="{ 'max-height': '220px' }"/>
        </div>
        <app-code [code]="code" selector="listbox-disabled-demo"></app-code>
    `
})
export class DisabledDoc implements OnInit {
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
    [disabled]="true" 
    [style]="{ width: '15rem' }" 
    [listStyle]="{'max-height': '220px'}" />`,

        html: `<div class="card flex justify-content-center">
    <p-listbox 
        [options]="cities" 
        [(ngModel)]="selectedCity" 
        optionLabel="name" 
        [disabled]="true" 
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
    selector: 'listbox-disabled-demo',
    templateUrl: './listbox-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxDisabledDemo implements OnInit {
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
