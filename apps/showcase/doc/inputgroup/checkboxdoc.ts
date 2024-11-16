import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-doc',
    template: `
        <app-docsectiontext>
            <p>Checkbox and RadioButton components can be combined with an input element under the same group.</p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-inputgroup>
                <input type="text" pInputText placeholder="Price" />
                <p-inputgroup-addon><p-radiobutton [(ngModel)]="radioValue1" name="rb1" value="rb1" /></p-inputgroup-addon>
            </p-inputgroup>

            <p-inputgroup>
                <p-inputgroup-addon><p-checkbox [(ngModel)]="checked1" [binary]="true" /></p-inputgroup-addon>
                <input type="text" pInputText placeholder="Username" />
            </p-inputgroup>

            <p-inputgroup>
                <p-inputgroup-addon><p-checkbox [(ngModel)]="checked2" [binary]="true" /></p-inputgroup-addon>
                <input type="text" pInputText placeholder="Website" />
                <p-inputgroup-addon><p-radiobutton name="rb2" value="rb2" [(ngModel)]="category" /></p-inputgroup-addon>
            </p-inputgroup>
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
        basic: `<p-inputgroup>
    <input type="text" pInputText placeholder="Price" />
    <p-inputgroup-addon>
        <p-radiobutton [(ngModel)]="radioValue1" name="rb1" value="rb1"/>
    </p-inputgroup-addon>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon><p-checkbox [(ngModel)]="checked1" [binary]="true"/></p-inputgroup-addon>
    <input type="text" pInputText placeholder="Username" />
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon><p-checkbox [(ngModel)]="checked2" [binary]="true"/></p-inputgroup-addon>
    <input type="text" pInputText placeholder="Website" />
    <p-inputgroup-addon><p-radiobutton name="rb2" value="rb2" [(ngModel)]="category"/></p-inputgroup-addon>
</p-inputgroup>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-inputgroup>
        <input type="text" pInputText placeholder="Price" />
        <p-inputgroup-addon>
            <p-radiobutton [(ngModel)]="radioValue1" name="rb1" value="rb1"/>
        </p-inputgroup-addon>
    </p-inputgroup>

    <p-inputgroup>
        <p-inputgroup-addon><p-checkbox [(ngModel)]="checked1" [binary]="true"/></p-inputgroup-addon>
        <input type="text" pInputText placeholder="Username" />
    </p-inputgroup>

    <p-inputgroup>
        <p-inputgroup-addon><p-checkbox [(ngModel)]="checked2" [binary]="true"/></p-inputgroup-addon>
        <input type="text" pInputText placeholder="Website" />
        <p-inputgroup-addon><p-radiobutton name="rb2" value="rb2" [(ngModel)]="category"/></p-inputgroup-addon>
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';

@Component({
    selector: 'input-group-checkbox-demo',
    templateUrl: './input-group-checkbox-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, Checkbox, RadioButton]
})
export class InputGroupCheckboxDemo {
    radioValue1: boolean = false;

    checked1: boolean = false;

    checked2: boolean = false;

    category: string | undefined;
}`
    };
}
