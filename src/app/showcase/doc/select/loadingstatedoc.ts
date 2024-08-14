import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-loading-state-demo',
    template: `
        <app-docsectiontext>
            <p>Loading state can be used <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" [loading]="true" optionLabel="name" placeholder="Loading..." />
        </div>
        <app-code [code]="code" selector="select-loading-state-demo"></app-code>
    `
})
export class LoadingStateDoc implements OnInit {
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
    [loading]="true"
    optionLabel="name" 
    placeholder="Select a City" />`,

        html: `<div class="card flex justify-content-center">
    <p-select 
        [options]="cities" 
        [(ngModel)]="selectedCity" 
        [loading]="true"
        optionLabel="name"
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
    selector: 'select-loading-state-demo',
    templateUrl: './select-loading-state-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectLoadingStateDemo implements OnInit {
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
