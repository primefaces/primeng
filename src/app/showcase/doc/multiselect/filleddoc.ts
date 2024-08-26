import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-multiSelect [options]="cities" [(ngModel)]="selectedCities" variant="filled" optionLabel="name" placeholder="Select Cities" />
        </div>
        <app-code [code]="code" selector="multi-select-filled-demo"></app-code>
    `
})
export class FilledDoc implements OnInit {
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
    variant="filled"
    optionLabel="name" 
    placeholder="Select Cities" />`,

        html: `<div class="card flex justify-center">
    <p-multiSelect 
        [options]="cities" 
        [(ngModel)]="selectedCities" 
        variant="filled"
        optionLabel="name" 
        placeholder="Select Cities" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-filled-demo',
    templateUrl: './multi-select-filled-demo.html',
    standalone: true,
    imports: [FormsModule, MultiSelectModule]
})
export class MultiSelectFilledDemo implements OnInit {

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
