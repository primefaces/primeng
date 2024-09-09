import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-doc',
    template: `
        <app-docsectiontext>
            <p>Checkbox and RadioButton components can be combined with an input element under the same group.</p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-input-group>
                <input type="text" pInputText placeholder="Price" />
                <p-input-group-addon><p-radioButton [(ngModel)]="radioValue1" name="rb1" value="rb1" /></p-input-group-addon>
            </p-input-group>

            <p-input-group>
                <p-input-group-addon><p-checkbox [(ngModel)]="checked1" [binary]="true" /></p-input-group-addon>
                <input type="text" pInputText placeholder="Username" />
            </p-input-group>

            <p-input-group>
                <p-input-group-addon><p-checkbox [(ngModel)]="checked2" [binary]="true" /></p-input-group-addon>
                <input type="text" pInputText placeholder="Website" />
                <p-input-group-addon><p-radioButton name="rb2" value="rb2" [(ngModel)]="category" /></p-input-group-addon>
            </p-input-group>
        </div>
        <app-code [code]="code" selector="input-group-checkbox-demo"></app-code>
    `,
})
export class CheckboxDoc {
    radioValue1: boolean = false;

    checked1: boolean = false;

    checked2: boolean = false;

    category: string | undefined;

    code: Code = {
        basic: `<p-input-group>
    <input type="text" pInputText placeholder="Price" />
    <p-input-group-addon>
        <p-radioButton [(ngModel)]="radioValue1" name="rb1" value="rb1"/>
    </p-input-group-addon>
</p-input-group>

<p-input-group>
    <p-input-group-addon><p-checkbox [(ngModel)]="checked1" [binary]="true"/></p-input-group-addon>
    <input type="text" pInputText placeholder="Username" />
</p-input-group>

<p-input-group>
    <p-input-group-addon><p-checkbox [(ngModel)]="checked2" [binary]="true"/></p-input-group-addon>
    <input type="text" pInputText placeholder="Website" />
    <p-input-group-addon><p-radioButton name="rb2" value="rb2" [(ngModel)]="category"/></p-input-group-addon>
</p-input-group>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-input-group>
        <input type="text" pInputText placeholder="Price" />
        <p-input-group-addon>
            <p-radioButton [(ngModel)]="radioValue1" name="rb1" value="rb1"/>
        </p-input-group-addon>
    </p-input-group>
    
    <p-input-group>
        <p-input-group-addon><p-checkbox [(ngModel)]="checked1" [binary]="true"/></p-input-group-addon>
        <input type="text" pInputText placeholder="Username" />
    </p-input-group>
    
    <p-input-group>
        <p-input-group-addon><p-checkbox [(ngModel)]="checked2" [binary]="true"/></p-input-group-addon>
        <input type="text" pInputText placeholder="Website" />
        <p-input-group-addon><p-radioButton name="rb2" value="rb2" [(ngModel)]="category"/></p-input-group-addon>
    </p-input-group>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

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
}`,
    };
}
