import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'group-doc',
    standalone: true,
    imports: [FormsModule, RadioButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>RadioButton is used as a controlled input with <i>value</i> and <i>ngModel</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="flex flex-wrap gap-4">
                <div class="flex items-center">
                    <p-radiobutton name="pizza" value="Cheese" [(ngModel)]="ingredient" inputId="ingredient1" />
                    <label for="ingredient1" class="ml-2">Cheese</label>
                </div>
                <div class="flex items-center">
                    <p-radiobutton name="pizza" value="Mushroom" [(ngModel)]="ingredient" inputId="ingredient2" />
                    <label for="ingredient2" class="ml-2">Mushroom</label>
                </div>
                <div class="flex items-center">
                    <p-radiobutton name="pizza" value="Pepper" [(ngModel)]="ingredient" inputId="ingredient3" />
                    <label for="ingredient3" class="ml-2">Pepper</label>
                </div>
                <div class="flex items-center">
                    <p-radiobutton name="pizza" value="Onion" [(ngModel)]="ingredient" inputId="ingredient4" />
                    <label for="ingredient4" class="ml-2">Onion</label>
                </div>
            </div>
        </div>
        <app-code></app-code>
    `
})
export class GroupDoc {
    ingredient!: string;
}
