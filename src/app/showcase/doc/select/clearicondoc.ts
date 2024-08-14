import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-clear-icon-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is added to reset the Select.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [showClear]="true" placeholder="Select a City" />
        </div>
        <app-code [code]="code" selector="select-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc implements OnInit {
    cities: City[];

    selectedCity: City | undefined;

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
        basic: `<p-select 
    [options]="cities" 
    [(ngModel)]="selectedCity" 
    optionLabel="name" 
    [showClear]="true" 
    placeholder="Select a City" />`,

        html: `<div class="card flex justify-content-center">
    <p-select 
        [options]="cities" 
        [(ngModel)]="selectedCity" 
        optionLabel="name" 
        [showClear]="true"
        placeholder="Select a City" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-clear-icon-demo',
    templateUrl: './select-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectClearIconDemo implements OnInit {
    cities: City[] | undefined;

    selectedCity: City | undefined;

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
