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
                <p-checkbox label="Cheese" name="pizza" value="Cheese" [(ngModel)]="pizza" />
            </div>
            <div class="flex align-items-center">
                <p-checkbox label="Mushroom" name="pizza" value="Mushroom" [(ngModel)]="pizza" />
            </div>
            <div class="flex align-items-center">
                <p-checkbox label="Pepper" name="pizza" value="Pepper" [(ngModel)]="pizza" />
            </div>
            <div class="flex align-items-center">
                <p-checkbox label="Onion" name="pizza" value="Onion" [(ngModel)]="pizza" />
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
        [(ngModel)]="pizza"
        label="Cheese" 
        name="pizza" 
        value="Cheese"/>
</div>
<div class="flex align-items-center">
    <p-checkbox 
        [(ngModel)]="pizza"
        label="Mushroom"
        name="pizza" 
        value="Mushroom"/>
</div>
<div class="flex align-items-center">
    <p-checkbox 
        [(ngModel)]="pizza"
        label="Pepper" 
        name="pizza" 
        value="Pepper"/>
</div>
<div class="flex align-items-center">
    <p-checkbox 
        [(ngModel)]="pizza"
        label="Onion" 
        name="pizza" 
        value="Onion"/>
</div>`,

        html: `<div class="card flex justify-content-center gap-3">
    <div class="flex align-items-center">
        <p-checkbox 
            [(ngModel)]="pizza"
            label="Cheese" 
            name="pizza" 
            value="Cheese"/>
    </div>
    <div class="flex align-items-center">
        <p-checkbox 
            [(ngModel)]="pizza"
            label="Mushroom"
            name="pizza" 
            value="Mushroom"/>
    </div>
    <div class="flex align-items-center">
        <p-checkbox 
            [(ngModel)]="pizza"
            label="Pepper" 
            name="pizza" 
            value="Pepper"/>
    </div>
    <div class="flex align-items-center">
        <p-checkbox 
            [(ngModel)]="pizza"
            label="Onion" 
            name="pizza" 
            value="Onion"/>
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
