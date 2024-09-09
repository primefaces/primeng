import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>An InputGroup is created by wrapping the add-ons inside the <i>p-inputGroup</i> element.</p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-input-group>
                <p-input-group-addon>
                    <i class="pi pi-user"></i>
                </p-input-group-addon>
                <input pInputText placeholder="Username" />
            </p-input-group>
            <p-input-group>
                <p-input-group-addon>$</p-input-group-addon>
                <input type="text" pInputText placeholder="Price" />
                <p-input-group-addon>.00</p-input-group-addon>
            </p-input-group>
            <p-input-group>
                <p-input-group-addon>www</p-input-group-addon>
                <input type="text" pInputText placeholder="Website" />
            </p-input-group>
        </div>
        <app-code [code]="code" selector="input-group-basic-demo"></app-code>
    `,
})
export class BasicDoc {
    code: Code = {
        basic: `<p-input-group>
    <p-input-group-addon>
        <i class="pi pi-user"></i>
    </p-input-group-addon>
    <input pInputText placeholder="Username" />
</p-input-group>
<p-input-group>
    <p-input-group-addon>$</p-input-group-addon>
    <input type="text" pInputText placeholder="Price" />
    <p-input-group-addon>.00</p-input-group-addon>
</p-input-group>
<p-input-group>
    <p-input-group-addon>www</p-input-group-addon>
    <input type="text" pInputText placeholder="Website" />
</p-input-group>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-input-group>
        <p-input-group-addon>
            <i class="pi pi-user"></i>
        </p-input-group-addon>
        <input pInputText placeholder="Username" />
    </p-input-group>
    <p-input-group>
        <p-input-group-addon>$</p-input-group-addon>
        <input type="text" pInputText placeholder="Price" />
        <p-input-group-addon>.00</p-input-group-addon>
    </p-input-group>
    <p-input-group>
        <p-input-group-addon>www</p-input-group-addon>
        <input type="text" pInputText placeholder="Website" />
    </p-input-group>
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
