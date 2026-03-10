import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'multiple-doc',
    standalone: true,
    imports: [FormsModule, CheckboxModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Multiple checkboxes can be grouped together.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap justify-center gap-4">
                <div class="flex items-center">
                    <p-checkbox inputId="ingredient1" name="pizza" value="Cheese" [(ngModel)]="pizza" />
                    <label for="ingredient1" class="text-sm ml-2"> Cheese </label>
                </div>
                <div class="flex items-center">
                    <p-checkbox inputId="ingredient2" name="pizza" value="Mushroom" [(ngModel)]="pizza" />
                    <label for="ingredient2" class="text-sm ml-2"> Mushroom </label>
                </div>
                <div class="flex items-center">
                    <p-checkbox inputId="ingredient3" name="pizza" value="Pepper" [(ngModel)]="pizza" />
                    <label for="ingredient3" class="text-sm ml-2"> Pepper </label>
                </div>
                <div class="flex items-center">
                    <p-checkbox inputId="ingredient4" name="pizza" value="Onion" [(ngModel)]="pizza" />
                    <label for="ingredient4" class="text-sm ml-2"> Onion </label>
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MultipleDoc {
    pizza: string[] = [];
}
