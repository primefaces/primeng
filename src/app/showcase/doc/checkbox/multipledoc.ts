import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-multiple-demo',
    template: `
        <app-docsectiontext>
            <p>Multiple checkboxes can be grouped together.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-3">
            <div class="flex align-items-center">
                <p-checkbox inputId="ingredient1" name="pizza" value="Cheese" [(ngModel)]="pizza" />
                <label for="ingredient1" class="ml-2"> Cheese </label>
            </div>
            <div class="flex align-items-center">
                <p-checkbox inputId="ingredient2" name="pizza" value="Mushroom" [(ngModel)]="pizza" />
                <label for="ingredient2" class="ml-2"> Mushroom </label>
            </div>
            <div class="flex align-items-center">
                <p-checkbox inputId="ingredient3" name="pizza" value="Pepper" [(ngModel)]="pizza" />
                <label for="ingredient3" class="ml-2"> Pepper </label>
            </div>
            <div class="flex align-items-center">
                <p-checkbox inputId="ingredient4" name="pizza" value="Onion" [(ngModel)]="pizza" />
                <label for="ingredient4" class="ml-2"> Onion </label>
            </div>
        </div>
        <app-code [code]="code" selector="checkbox-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    pizza: string[] = [];

    code: Code = {
        basic: `<div class="flex align-items-center">
    <p-checkbox 
        inputId="ingredient1" 
        name="pizza"
        value="Cheese" 
        [(ngModel)]="pizza" 
    />
    <label for="ingredient1" class="ml-2"> Cheese </label>
</div>
<div class="flex align-items-center">
    <p-checkbox 
        inputId="ingredient2" 
        name="pizza" 
        value="Mushroom" 
        [(ngModel)]="pizza" 
    />
    <label for="ingredient2" class="ml-2"> Mushroom </label>
</div>
<div class="flex align-items-center">
    <p-checkbox 
        inputId="ingredient3" 
        name="pizza" 
        value="Pepper" 
        [(ngModel)]="pizza" 
    />
    <label for="ingredient3" class="ml-2"> Pepper </label>
</div>
<div class="flex align-items-center">
    <p-checkbox 
        inputId="ingredient4" 
        name="pizza" 
        value="Onion" 
        [(ngModel)]="pizza" 
    />
    <label for="ingredient4" class="ml-2"> Onion </label>
</div>`,

        html: `<div class="card flex justify-content-center gap-3">
    <div class="flex align-items-center">
        <p-checkbox 
            inputId="ingredient1" 
            name="pizza"
            value="Cheese" 
            [(ngModel)]="pizza" 
        />
        <label for="ingredient1" class="ml-2"> Cheese </label>
    </div>
    <div class="flex align-items-center">
        <p-checkbox 
            inputId="ingredient2" 
            name="pizza" 
            value="Mushroom" 
            [(ngModel)]="pizza" 
        />
        <label for="ingredient2" class="ml-2"> Mushroom </label>
    </div>
    <div class="flex align-items-center">
        <p-checkbox 
            inputId="ingredient3" 
            name="pizza" 
            value="Pepper" 
            [(ngModel)]="pizza" 
        />
        <label for="ingredient3" class="ml-2"> Pepper </label>
    </div>
    <div class="flex align-items-center">
        <p-checkbox 
            inputId="ingredient4" 
            name="pizza" 
            value="Onion" 
            [(ngModel)]="pizza" 
        />
        <label for="ingredient4" class="ml-2"> Onion </label>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-multiple-demo',
    templateUrl: './checkbox-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, CheckboxModule]
})
export class CheckboxMultipleDemo {
    pizza: string[] = [];
}`
    };
}
