import { Component, OnInit } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
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
    `
})
export class DynamicDoc implements OnInit {
    selectedCategory: any = null;

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    ngOnInit() {
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
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'radio-button-dynamic-demo',
    templateUrl: './radio-button-dynamic-demo.html'
})
export class RadioButtonDynamicDemo implements OnInit{
    selectedCategory: any = null;

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    ngOnInit() {
        this.selectedCategory = this.categories[1];
    }
}`
    };
}
