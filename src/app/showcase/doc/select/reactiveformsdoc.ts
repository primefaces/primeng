import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>Select can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-select formControlName="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City" />
            </form>
        </div>
        <app-code [code]="code" selector="select-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    cities: City[] | undefined;

    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.formGroup = new FormGroup({
            selectedCity: new FormControl<City | null>(null)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-select 
        formControlName="selectedCity" 
        [options]="cities"
        optionLabel="name"
        placeholder="Select a City" />
</form>`,

        html: `<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-select 
            formControlName="selectedCity"
            [options]="cities"
            optionLabel="name"
            placeholder="Select a City" />
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-reactive-forms-demo',
    templateUrl: './select-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, SelectModule]
})
export class SelectReactiveFormsDemo implements OnInit {
    cities: City[] | undefined;
    
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];

        this.formGroup = new FormGroup({
            selectedCity: new FormControl<City | null>(null)
        });
    }
}`
    };
}
