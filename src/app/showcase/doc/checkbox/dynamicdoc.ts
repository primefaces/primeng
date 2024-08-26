import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-dynamic-demo',
    template: `
        <app-docsectiontext>
            <p>Checkboxes can be generated using a list of values.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="flex flex-col gap-2">
                <div *ngFor="let category of categories" class="field-checkbox">
                    <p-checkbox [inputId]="category.key" name="group" [value]="category" [(ngModel)]="selectedCategories" />
                    <label [for]="category.key" class="ml-2"> {{ category.name }} </label>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="checkbox-dynamic-demo"></app-code>
    `
})
export class DynamicDoc {
    selectedCategories: any[] = [];

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    code: Code = {
        basic: `<div *ngFor="let category of categories" class="field-checkbox">
    <p-checkbox 
        [inputId]="category.key" 
        name="group" 
        [value]="category" 
        [(ngModel)]="selectedCategories" 
    />
    <label [for]="category.key" class="ml-2"> {{ category.name }} </label>
</div>`,

        html: `<div class="card flex justify-center">
    <div class="flex flex-col gap-2">
        <div *ngFor="let category of categories" class="field-checkbox">
            <p-checkbox 
                [inputId]="category.key" 
                name="group" 
                [value]="category" 
                [(ngModel)]="selectedCategories" 
            />
            <label [for]="category.key" class="ml-2"> {{ category.name }} </label>
        </div>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-dynamic-demo',
    templateUrl: './checkbox-dynamic-demo.html',
    standalone: true,
    imports: [FormsModule, CheckboxModule]
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
