import { Component, Input, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'listbox-invalid-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" class="ng-invalid ng-dirty" [style]="{ width: '15rem' }" [listStyle]="{ 'max-height': '220px' }"></p-listbox>
        </div>
        <app-code [code]="code" selector="listbox-invalid-demo"></app-code>
    </section>`
})
export class InvalidDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

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
        basic: `
<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" class="ng-invalid ng-dirty" [style]="{ width: '15rem' }" [listStyle]="{'max-height': '220px'}"></p-listbox>`,

        html: `
<div class="card flex justify-content-center">
    <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" class="ng-invalid ng-dirty" [style]="{ width: '15rem' }" [listStyle]="{'max-height': '220px'}"></p-listbox>
</div>`,

        typescript: `
import { Component, ngOnInit } from '@angular/core';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-invalid-demo',
    templateUrl: './listbox-invalid-demo.html'
})
export class ListboxInvalidDemo implements OnInit {
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
