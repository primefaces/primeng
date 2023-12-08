import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'checkbox-multiple-demo',
    template: `
        <app-docsectiontext>
            <p>Multiple checkboxes can be grouped together.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-3">
            <div class="flex align-items-center">
                <p-checkbox label="Cheese" name="pizza" value="Cheese" [(ngModel)]="pizza" inputId="ingredient1"></p-checkbox>
            </div>
            <div class="flex align-items-center">
                <p-checkbox label="Mushroom" name="pizza" value="Mushroom" [(ngModel)]="pizza" inputId="ingredient2"></p-checkbox>
            </div>
            <div class="flex align-items-center">
                <p-checkbox label="Pepper" name="pizza" value="Pepper" [(ngModel)]="pizza" inputId="ingredient3"></p-checkbox>
            </div>
            <div class="flex align-items-center">
                <p-checkbox label="Onion" name="pizza" value="Onion" [(ngModel)]="pizza" inputId="ingredient4"></p-checkbox>
            </div>
        </div>
        <app-code [code]="code" selector="checkbox-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    pizza: string[] = [];

    code: Code = {
        basic: `<div class="flex align-items-center">
        <p-checkbox label="Cheese" name="pizza" value="Cheese" [(ngModel)]="pizza" inputId="ingredient1"></p-checkbox>
    </div>
    <div class="flex align-items-center">
        <p-checkbox label="Mushroom" name="pizza" value="Mushroom" [(ngModel)]="pizza" inputId="ingredient2"></p-checkbox>
    </div>
    <div class="flex align-items-center">
        <p-checkbox label="Pepper" name="pizza" value="Pepper" [(ngModel)]="pizza" inputId="ingredient3"></p-checkbox>
    </div>
    <div class="flex align-items-center">
        <p-checkbox label="Onion" name="pizza" value="Onion" [(ngModel)]="pizza" inputId="ingredient4"></p-checkbox>
</div>`,

        html: `<div class="card flex justify-content-center gap-3">
     <div class="flex align-items-center">
        <p-checkbox label="Cheese" name="pizza" value="Cheese" [(ngModel)]="pizza" inputId="ingredient1"></p-checkbox>
    </div>
    <div class="flex align-items-center">
        <p-checkbox label="Mushroom" name="pizza" value="Mushroom" [(ngModel)]="pizza" inputId="ingredient2"></p-checkbox>
    </div>
    <div class="flex align-items-center">
        <p-checkbox label="Pepper" name="pizza" value="Pepper" [(ngModel)]="pizza" inputId="ingredient3"></p-checkbox>
    </div>
    <div class="flex align-items-center">
        <p-checkbox label="Onion" name="pizza" value="Onion" [(ngModel)]="pizza" inputId="ingredient4"></p-checkbox>
</div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-multiple-demo',
    templateUrl: './checkbox-multiple-demo.html'
})
export class CheckboxMultipleDemo {
    pizza: string[] = [];
}`
    };
}
