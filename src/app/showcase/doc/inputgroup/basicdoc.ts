import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>An InputGroup is created by wrapping the add-ons inside the <i>p-inputGroup</i> element.</p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-inputgroup>
                <p-inputgroup-addon>
                    <i class="pi pi-user"></i>
                </p-inputgroup-addon>
                <input pInputText placeholder="Username" />
            </p-inputgroup>
            <p-inputgroup>
                <p-inputgroup-addon>$</p-inputgroup-addon>
                <input type="text" pInputText placeholder="Price" />
                <p-inputgroup-addon>.00</p-inputgroup-addon>
            </p-inputgroup>
            <p-inputgroup>
                <p-inputgroup-addon>www</p-inputgroup-addon>
                <input type="text" pInputText placeholder="Website" />
            </p-inputgroup>
        </div>
        <app-code [code]="code" selector="input-group-basic-demo"></app-code>
    `,
})
export class BasicDoc {
    code: Code = {
        basic: `<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-user"></i>
    </p-inputgroup-addon>
    <input pInputText placeholder="Username" />
</p-inputgroup>
<p-inputgroup>
    <p-inputgroup-addon>$</p-inputgroup-addon>
    <input type="text" pInputText placeholder="Price" />
    <p-inputgroup-addon>.00</p-inputgroup-addon>
</p-inputgroup>
<p-inputgroup>
    <p-inputgroup-addon>www</p-inputgroup-addon>
    <input type="text" pInputText placeholder="Website" />
</p-inputgroup>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-inputgroup>
        <p-inputgroup-addon>
            <i class="pi pi-user"></i>
        </p-inputgroup-addon>
        <input pInputText placeholder="Username" />
    </p-inputgroup>
    <p-inputgroup>
        <p-inputgroup-addon>$</p-inputgroup-addon>
        <input type="text" pInputText placeholder="Price" />
        <p-inputgroup-addon>.00</p-inputgroup-addon>
    </p-inputgroup>
    <p-inputgroup>
        <p-inputgroup-addon>www</p-inputgroup-addon>
        <input type="text" pInputText placeholder="Website" />
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'input-group-basic-demo',
    templateUrl: './input-group-basic-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule]
})
export class InputGroupBasicDemo { }`,
    };
}
