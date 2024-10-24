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
                <input type="text" pInputText placeholder="Price" />
                <p-inputGroupAddon><p-radioButton [(ngModel)]="radioValue1" name="rb1" value="rb1" /></p-inputGroupAddon>
            </p-inputGroup>

            <p-inputGroup>
                <p-inputGroupAddon><p-checkbox [(ngModel)]="checked1" [binary]="true" /></p-inputGroupAddon>
                <input type="text" pInputText placeholder="Username" />
            </p-inputGroup>

            <p-inputGroup>
                <p-inputGroupAddon><p-checkbox [(ngModel)]="checked2" [binary]="true" /></p-inputGroupAddon>
                <input type="text" pInputText placeholder="Website" />
                <p-inputGroupAddon><p-radioButton name="rb2" value="rb2" [(ngModel)]="category" /></p-inputGroupAddon>
            </p-inputGroup>
        </div>
        <app-code [code]="code" selector="input-group-checkbox-demo"></app-code>
    `
})
export class CheckboxDoc {
    radioValue1: boolean = false;

    checked1: boolean = false;

    checked2: boolean = false;

    category: string | undefined;

    code: Code = {
        basic: `<p-inputGroup>
    <input type="text" pInputText placeholder="Price" />
    <p-inputGroupAddon>
        <p-radioButton [(ngModel)]="radioValue1" name="rb1" value="rb1"/>
    </p-inputGroupAddon>
</p-inputGroup>

<p-inputGroup>
    <p-inputGroupAddon><p-checkbox [(ngModel)]="checked1" [binary]="true"/></p-inputGroupAddon>
    <input type="text" pInputText placeholder="Username" />
</p-inputGroup>

<p-inputGroup>
    <p-inputGroupAddon><p-checkbox [(ngModel)]="checked2" [binary]="true"/></p-inputGroupAddon>
    <input type="text" pInputText placeholder="Website" />
    <p-inputGroupAddon><p-radioButton name="rb2" value="rb2" [(ngModel)]="category"/></p-inputGroupAddon>
</p-inputGroup>`,

        html: `<div class="card flex flex-column md:flex-row gap-3">
    <p-inputGroup>
        <input type="text" pInputText placeholder="Price" />
        <p-inputGroupAddon>
            <p-radioButton [(ngModel)]="radioValue1" name="rb1" value="rb1"/>
        </p-inputGroupAddon>
    </p-inputGroup>

    <p-inputGroup>
        <p-inputGroupAddon><p-checkbox [(ngModel)]="checked1" [binary]="true"/></p-inputGroupAddon>
        <input type="text" pInputText placeholder="Username" />
    </p-inputGroup>

    <p-inputGroup>
        <p-inputGroupAddon><p-checkbox [(ngModel)]="checked2" [binary]="true"/></p-inputGroupAddon>
        <input type="text" pInputText placeholder="Website" />
        <p-inputGroupAddon><p-radioButton name="rb2" value="rb2" [(ngModel)]="category"/></p-inputGroupAddon>
    </p-inputGroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primengrtl/inputgroup';
import { InputGroupAddonModule } from 'primengrtl/inputgroupaddon';
import { InputTextModule } from 'primengrtl/inputtext';
import { CheckboxModule } from 'primengrtl/checkbox';
import { RadioButtonModule } from 'primengrtl/radiobutton';

@Component({
    selector: 'input-group-checkbox-demo',
    templateUrl: './input-group-checkbox-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, CheckboxModule, RadioButtonModule]
})
export class InputGroupCheckboxDemo {
    radioValue1: boolean = false;

    checked1: boolean = false;

    checked2: boolean = false;

    category: string | undefined;
}`
    };
}
