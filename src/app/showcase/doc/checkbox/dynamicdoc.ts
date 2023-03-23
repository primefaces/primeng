import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'checkbox-dynamic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Checkboxes can be generated using a list of values.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <div class="flex flex-column gap-2">
                <div *ngFor="let category of categories" class="field-checkbox">
                    <p-checkbox name="group" [value]="category" [(ngModel)]="selectedCategories" [inputId]="category.key"></p-checkbox>
                    <label [for]="category.key">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="checkbox-dynamic-demo"></app-code>
    </section>`
})
export class DynamicDoc {
    @Input() id: string;

    @Input() title: string;

    selectedCategories: any[] = [];

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    code: Code = {
        basic: `
<div *ngFor="let category of categories" class="field-checkbox">
    <p-checkbox name="group" [value]="category" [(ngModel)]="selectedCategories" [inputId]="category.key"></p-checkbox>
    <label [for]="category.key">{{ category.name }}</label>
</div>`,

        html: `
<div class="card flex justify-content-center">
    <div class="flex flex-column gap-2">
        <div *ngFor="let category of categories" class="field-checkbox">
            <p-checkbox name="group" [value]="category" [(ngModel)]="selectedCategories" [inputId]="category.key"></p-checkbox>
            <label [for]="category.key">{{ category.name }}</label>
        </div>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-dynamic-demo',
    templateUrl: './checkbox-dynamic-demo.html'
})
export class CheckboxDynamicDemo {
    selectedCategories: any[] = [];

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];
}`
    };
}
