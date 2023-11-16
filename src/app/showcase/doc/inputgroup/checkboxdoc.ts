import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'checkbox-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
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
        <app-code [code]="code" selector="inputgroup-checkbox-demo"></app-code>
    </section>`
})
export class CheckboxDoc {
    @Input() id: string;

    @Input() title: string;

    checkbox1: boolean = false;

    checkbox2: boolean = false;

    category: string | undefined;

    code: Code = {
        basic: `
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
</p-inputGroup>`,

        html: `
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
</p-inputGroup>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputgroup-checkbox-demo',
    templateUrl: './inputgroup-checkbox-demo.html'
})
export class InputgroupCheckboxDemo {
    checkbox1: boolean = false;

    checkbox2: boolean = false;

    category: string | undefined;
}`
    };
}
