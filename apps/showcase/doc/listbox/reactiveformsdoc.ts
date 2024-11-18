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
            <p>Listbox can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <form [formGroup]="formGroup" class="card flex justify-center">
            <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" class="w-full md:w-56" />
        </form>
        <app-code [code]="code" selector="listbox-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    cities!: City[];

    formGroup!: FormGroup;

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
    <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" class="w-full md:w-56" />
</form>`,

        html: `<form [formGroup]="formGroup" class="card flex justify-center">
    <p-listbox [options]="cities" formControlName="selectedCity" optionLabel="name" class="w-full md:w-56" />
</form>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'listbox-reactive-forms-demo',
    templateUrl: './listbox-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, Listbox]
})
export class ListboxReactiveFormsDemo implements OnInit {
    cities!: City[];

    formGroup!: FormGroup;

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
