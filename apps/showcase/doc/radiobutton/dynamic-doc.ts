import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'dynamic-doc',
    standalone: true,
    imports: [FormsModule, RadioButtonModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>RadioButtons can be generated using a list of values.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <div class="flex flex-col gap-4">
                    @for (category of categories; track category.key) {
                        <div class="field-checkbox">
                            <p-radiobutton [inputId]="category.key" name="category" [value]="category" [(ngModel)]="selectedCategory" />
                            <label [for]="category.key" class="text-sm ml-2">{{ category.name }}</label>
                        </div>
                    }
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
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
}
