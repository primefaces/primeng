import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '../../domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>RadioButton can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form class="flex flex-column gap-3" [formGroup]="formGroup">
                <div *ngFor="let category of categories" class="field-checkbox">
                    <p-radioButton [inputId]="category.key" [value]="category" formControlName="selectedCategory"></p-radioButton>
                    <label [for]="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </form>
        </div>
        <app-code [code]="code" selector="radio-button-reactive-forms-demo"></app-code>
    </section>`
})
export class ReactiveFormsDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

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
        basic: `
<form class="flex flex-column gap-3" [formGroup]="formGroup">
    <div *ngFor="let category of categories" class="field-checkbox">
        <p-radioButton [inputId]="category.key" [value]="category" formControlName="selectedCategory"></p-radioButton>
        <label [for]="category.key" class="ml-2">{{ category.name }}</label>
    </div>
</form>`,

        html: `
<div class="card flex justify-content-center">
    <form class="flex flex-column gap-3" [formGroup]="formGroup">
        <div *ngFor="let category of categories" class="field-checkbox">
            <p-radioButton [inputId]="category.key" [value]="category" formControlName="selectedCategory"></p-radioButton>
            <label [for]="category.key" class="ml-2">{{ category.name }}</label>
        </div>
    </form>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'radio-button-reactive-forms-demo',
    templateUrl: './radio-button-reactive-forms-demo.html'
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
