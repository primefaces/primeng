import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'checkbox-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Checkbox and RadioButton components can be combined with an input element under the same group.</p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row gap-3">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon"><p-checkbox [(ngModel)]="checkbox1" [binary]="true"></p-checkbox></span>
                <input type="text" pInputText placeholder="Username" />
            </div>

            <div class="p-inputgroup">
                <input type="text" pInputText placeholder="Price" />
                <span class="p-inputgroup-addon"><p-radioButton name="category" value="price" [(ngModel)]="category"></p-radioButton></span>
            </div>

            <div class="p-inputgroup">
                <span class="p-inputgroup-addon"><p-checkbox [(ngModel)]="checkbox2" [binary]="true"></p-checkbox></span>
                <input type="text" pInputText placeholder="Website" />
                <span class="p-inputgroup-addon"><p-radioButton name="category" value="site" [(ngModel)]="category"></p-radioButton></span>
            </div>
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
<div class="p-inputgroup">
    <span class="p-inputgroup-addon"><p-checkbox [(ngModel)]="checkbox1" [binary]="true"></p-checkbox></span>
    <input type="text" pInputText placeholder="Username" />
</div>

<div class="p-inputgroup">
    <input type="text" pInputText placeholder="Price" />
    <span class="p-inputgroup-addon"><p-radioButton name="category" value="price" [(ngModel)]="category"></p-radioButton></span>
</div>

<div class="p-inputgroup">
    <span class="p-inputgroup-addon"><p-checkbox [(ngModel)]="checkbox2" [binary]="true"></p-checkbox></span>
    <input type="text" pInputText placeholder="Website" />
    <span class="p-inputgroup-addon"><p-radioButton name="category" value="site" [(ngModel)]="category"></p-radioButton></span>
</div>`,

        html: `
<div class="card flex flex-column md:flex-row gap-3">
    <div class="p-inputgroup">
        <span class="p-inputgroup-addon"><p-checkbox [(ngModel)]="checkbox1" [binary]="true"></p-checkbox></span>
        <input type="text" pInputText placeholder="Username" />
    </div>

    <div class="p-inputgroup">
        <input type="text" pInputText placeholder="Price" />
        <span class="p-inputgroup-addon"><p-radioButton name="category" value="price" [(ngModel)]="category"></p-radioButton></span>
    </div>

    <div class="p-inputgroup">
        <span class="p-inputgroup-addon"><p-checkbox [(ngModel)]="checkbox2" [binary]="true"></p-checkbox></span>
        <input type="text" pInputText placeholder="Website" />
        <span class="p-inputgroup-addon"><p-radioButton name="category" value="site" [(ngModel)]="category"></p-radioButton></span>
    </div>
</div>`,

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
