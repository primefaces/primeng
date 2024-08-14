import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-editable-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>editable</i> is present, the input can also be entered with typing.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" [editable]="true" optionLabel="name" />
        </div>
        <app-code [code]="code" selector="select-editable-demo"></app-code>
    `
})
export class EditableDoc implements OnInit {
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

    code: Code = {
        basic: `<p-select 
    [options]="cities" 
    [(ngModel)]="selectedCity" 
    placeholder="Select a City" 
    [editable]="true" 
    optionLabel="name" />`,

        html: `<div class="card flex justify-content-center">
    <p-select 
        [options]="cities" 
        [(ngModel)]="selectedCity" 
        placeholder="Select a City" 
        [editable]="true" 
        optionLabel="name" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-editable-demo',
    templateUrl: './select-editable-demo.html',
    standalone: true,
    imports: [FormsModule, SelectModule]
})
export class SelectEditableDemo implements OnInit {
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
