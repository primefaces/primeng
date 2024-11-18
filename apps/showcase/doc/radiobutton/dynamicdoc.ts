import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
            <p>RadioButtons can be generated using a list of values.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="flex flex-col gap-4">
                <div *ngFor="let category of categories" class="field-checkbox">
                    <p-radiobutton [inputId]="category.key" name="category" [value]="category" [(ngModel)]="selectedCategory" />
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
        basic: `<div class="flex flex-col gap-4">
    <div *ngFor="let category of categories" class="field-checkbox">
        <p-radiobutton [inputId]="category.key"name="category" [value]="category" [(ngModel)]="selectedCategory" />
        <label [for]="category.key" class="ml-2">{{ category.name }}</label>
    </div>
</div>`,

        html: `<div class="card flex justify-center">
    <div class="flex flex-col gap-4">
        <div *ngFor="let category of categories" class="field-checkbox">
            <p-radiobutton [inputId]="category.key" name="category" [value]="category" [(ngModel)]="selectedCategory" />
            <label [for]="category.key" class="ml-2">{{ category.name }}</label>
        </div>
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'radio-button-dynamic-demo',
    templateUrl: './radio-button-dynamic-demo.html',
    standalone: true,
    imports: [FormsModule, RadioButton]
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
