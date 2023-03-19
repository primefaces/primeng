import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'radio-button-dynamic-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>RadioButtons can be generated using a list of values.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <div class="flex flex-column gap-3">
                <div *ngFor="let category of categories" class="field-checkbox">
                    <p-radioButton [inputId]="category.key" name="category" [value]="category" [(ngModel)]="selectedCategory"></p-radioButton>
                    <label [for]="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="radio-button-dynamic-demo"></app-code>
    </section>`
})
export class DynamicDoc {
    @Input() id: string;

    @Input() title: string;

    selectedCategory: any = null;

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    constructor() {
        this.selectedCategory = this.categories[1];
    }

    code: Code = {
        basic: `
<div class="flex flex-column gap-3">
    <div *ngFor="let category of categories" class="field-checkbox">
        <p-radioButton [inputId]="category.key" name="category" [value]="category" [(ngModel)]="selectedCategory"></p-radioButton>
        <label [for]="category.key" class="ml-2">{{ category.name }}</label>
    </div>
</div>`,

        html: `
<div class="card flex justify-content-center">
    <div class="flex flex-column gap-3">
        <div *ngFor="let category of categories" class="field-checkbox">
            <p-radioButton [inputId]="category.key" name="category" [value]="category" [(ngModel)]="selectedCategory"></p-radioButton>
            <label [for]="category.key" class="ml-2">{{ category.name }}</label>
        </div>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'radio-button-dynamic-demo',
    templateUrl: './radio-button-dynamic-demo.html',
    styleUrls: ['./radio-button-dynamic-demo.scss']
})
export class RadioButtonDynamicDemo {
    selectedCategory: any = null;

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    constructor() {
        this.selectedCategory = this.categories[1];
    }
}`
    };
}
