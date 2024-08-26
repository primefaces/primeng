import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>RadioButton can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <form class="flex flex-col gap-4" [formGroup]="formGroup">
                <div *ngFor="let category of categories" class="field-checkbox">
                    <p-radioButton [inputId]="category.key" [value]="category" formControlName="selectedCategory" />
                    <label [for]="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </form>
        </div>
        <app-code [code]="code" selector="radio-button-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup!: FormGroup;

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedCategory: new FormControl()
        });
    }

    code: Code = {
        basic: `<form class="flex flex-col gap-4" [formGroup]="formGroup">
    <div *ngFor="let category of categories" class="field-checkbox">
        <p-radioButton 
            [inputId]="category.key" 
            [value]="category"
            formControlName="selectedCategory" />
        <label [for]="category.key" class="ml-2">
            {{ category.name }}
        </label>
    </div>
</form>`,

        html: `<div class="card flex justify-center">
    <form class="flex flex-col gap-4" [formGroup]="formGroup">
        <div *ngFor="let category of categories" class="field-checkbox">
            <p-radioButton 
                [inputId]="category.key" 
                [value]="category" 
                formControlName="selectedCategory" />
            <label [for]="category.key" class="ml-2">
                {{ category.name }}
            </label>
        </div>
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'radio-button-reactive-forms-demo',
    templateUrl: './radio-button-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, RadioButtonModule],
})
export class RadioButtonReactiveFormsDemo implements OnInit {
    formGroup!: FormGroup;

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    ngOnInit() {
        this.formGroup = new FormGroup({
            selectedCategory: new FormControl()
        });
    }
}`
    };
}
