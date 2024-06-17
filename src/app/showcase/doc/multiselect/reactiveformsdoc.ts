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
            <p>MultiSelect can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-multiSelect [options]="cities" formControlName="selectedCities" optionLabel="name" placeholder="Select Cities" />
            </form>
        </div>
        <app-code [code]="code" selector="multi-select-reactive-forms-demo"></app-code>
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
            selectedCities: new FormControl<City[] | null>([{ name: 'Istanbul', code: 'IST' }])
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-multiSelect 
        [options]="cities" 
        formControlName="selectedCities" 
        optionLabel="name" 
        placeholder="Select Cities"/>
</form>`,

        html: `<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-multiSelect 
            [options]="cities" 
            formControlName="selectedCities" 
            optionLabel="name" 
            placeholder="Select Cities"/>
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface City {
    name: string,
    code: string
}

@Component({
    selector: 'multi-select-reactive-forms-demo',
    templateUrl: './multi-select-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, MultiSelectModule]
})
export class MultiSelectReactiveFormsDemo implements OnInit {
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
            selectedCities: new FormControl<City[] | null>([{ name: 'Istanbul', code: 'IST' }])
        });
    }  
}`
    };
}
