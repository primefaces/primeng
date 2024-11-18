import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
        <form [formGroup]="formGroup" class="card flex justify-center">
            <p-select formControlName="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
        </form>
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
        basic: `<form [formGroup]="formGroup" class="card flex justify-center">
    <p-select formControlName="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
</form>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'select-reactive-forms-demo',
    templateUrl: './select-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, Select]
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
