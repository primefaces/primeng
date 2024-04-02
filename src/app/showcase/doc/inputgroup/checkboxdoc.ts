import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-doc',
    template: `
        <app-docsectiontext>
            <p>Checkbox and RadioButton components can be combined with an input element under the same group.</p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row gap-3">
            <p-inputGroup>
                <p-inputGroupAddon><p-checkbox [(ngModel)]="checkbox1" [binary]="true"></p-checkbox></p-inputGroupAddon>
                <input type="text" pInputText placeholder="Username" />
            </p-inputGroup>
            <p-inputGroup>
                <input type="text" pInputText placeholder="Price" />
                <p-inputGroupAddon><p-radioButton name="category" value="price" [(ngModel)]="category"></p-radioButton></p-inputGroupAddon>
            </p-inputGroup>
            <p-inputGroup>
                <p-inputGroupAddon><p-checkbox [(ngModel)]="checkbox2" [binary]="true"></p-checkbox></p-inputGroupAddon>
                <input type="text" pInputText placeholder="Website" />
                <p-inputGroupAddon><p-radioButton name="category" value="site" [(ngModel)]="category"></p-radioButton></p-inputGroupAddon>
            </p-inputGroup>
        </div>
        <app-code [code]="code" selector="input-group-checkbox-demo"></app-code>
    `
})
export class CheckboxDoc {
    checkbox1: boolean = false;

    checkbox2: boolean = false;

    category: string | undefined;

    code: Code = {
        basic: `<p-inputGroup>
    <p-inputGroupAddon><p-checkbox [(ngModel)]="checkbox1" [binary]="true"></p-checkbox></p-inputGroupAddon>
    <input type="text" pInputText placeholder="Username" />
</p-inputGroup>
<p-inputGroup>
    <input type="text" pInputText placeholder="Price" />
    <p-inputGroupAddon><p-radioButton name="category" value="price" [(ngModel)]="category"></p-radioButton></p-inputGroupAddon>
</p-inputGroup>
<p-inputGroup>
    <p-inputGroupAddon><p-checkbox [(ngModel)]="checkbox2" [binary]="true"></p-checkbox></p-inputGroupAddon>
    <input type="text" pInputText placeholder="Website" />
    <p-inputGroupAddon><p-radioButton name="category" value="site" [(ngModel)]="category"></p-radioButton></p-inputGroupAddon>
</p-inputGroup>`,

        html: `<div class="card flex flex-column md:flex-row gap-3">
    <p-inputGroup>
        <p-inputGroupAddon><p-checkbox [(ngModel)]="checkbox1" [binary]="true"></p-checkbox></p-inputGroupAddon>
        <input type="text" pInputText placeholder="Username" />
    </p-inputGroup>
    <p-inputGroup>
        <input type="text" pInputText placeholder="Price" />
        <p-inputGroupAddon><p-radioButton name="category" value="price" [(ngModel)]="category"></p-radioButton></p-inputGroupAddon>
    </p-inputGroup>
    <p-inputGroup>
        <p-inputGroupAddon><p-checkbox [(ngModel)]="checkbox2" [binary]="true"></p-checkbox></p-inputGroupAddon>
        <input type="text" pInputText placeholder="Website" />
        <p-inputGroupAddon><p-radioButton name="category" value="site" [(ngModel)]="category"></p-radioButton></p-inputGroupAddon>
    </p-inputGroup>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-group-checkbox-demo',
    templateUrl: './input-group-checkbox-demo.html'
})
export class InputGroupCheckboxDemo {
    checkbox1: boolean = false;

    checkbox2: boolean = false;

    category: string | undefined;
}`
    };
}
