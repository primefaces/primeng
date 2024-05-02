import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'multiple-doc',
    template: `
        <app-docsectiontext>
            <p>
                ListBox allows choosing a single item by default, enable <i>multiple</i> property to choose more than one. When the optional <i>metaKeySelection</i> is present, behavior is changed in a way that selecting a new item requires meta key
                to be present.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" [style]="{ width: '15rem' }" [multiple]="true" [metaKeySelection]="false" [listStyle]="{ 'max-height': '220px' }"/>
        </div>
        <app-code [code]="code" selector="listbox-multiple-demo"></app-code>
    `
})
export class MultipleDoc implements OnInit {
    cities!: City[];

    selectedCities!: City[];

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
    [(ngModel)]="selectedCities" 
    optionLabel="name" 
    [style]="{'width':'15rem'}" 
    [multiple]="true" 
    [metaKeySelection]="false" 
    [listStyle]="{'max-height': '220px'}" />`,

        html: `<div class="card flex justify-content-center">
    <p-listbox 
        [options]="cities" 
        [(ngModel)]="selectedCities" 
        optionLabel="name" 
        [style]="{'width':'15rem'}" 
        [multiple]="true" 
        [metaKeySelection]="false" 
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
    selector: 'listbox-multiple-demo',
    templateUrl: './listbox-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, ListboxModule]
})
export class ListboxMultipleDemo implements OnInit {
    cities!: City[];

    selectedCities!: City[];
    
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
