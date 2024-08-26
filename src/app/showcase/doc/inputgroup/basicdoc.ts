import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>An InputGroup is created by wrapping the add-ons inside the <i>p-inputGroup</i> element.</p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-inputGroup>
                <p-inputGroupAddon>
                    <i class="pi pi-user"></i>
                </p-inputGroupAddon>
                <input pInputText placeholder="Username" />
            </p-inputGroup>
            <p-inputGroup>
                <p-inputGroupAddon>$</p-inputGroupAddon>
                <input type="text" pInputText placeholder="Price" />
                <p-inputGroupAddon>.00</p-inputGroupAddon>
            </p-inputGroup>
            <p-inputGroup>
                <p-inputGroupAddon>www</p-inputGroupAddon>
                <input type="text" pInputText placeholder="Website" />
            </p-inputGroup>
        </div>
        <app-code [code]="code" selector="input-group-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-inputGroup>
    <p-inputGroupAddon>
        <i class="pi pi-user"></i>
    </p-inputGroupAddon>
    <input pInputText placeholder="Username" />
</p-inputGroup>
<p-inputGroup>
    <p-inputGroupAddon>$</p-inputGroupAddon>
    <input type="text" pInputText placeholder="Price" />
    <p-inputGroupAddon>.00</p-inputGroupAddon>
</p-inputGroup>
<p-inputGroup>
    <p-inputGroupAddon>www</p-inputGroupAddon>
    <input type="text" pInputText placeholder="Website" />
</p-inputGroup>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-inputGroup>
        <p-inputGroupAddon>
            <i class="pi pi-user"></i>
        </p-inputGroupAddon>
        <input pInputText placeholder="Username" />
    </p-inputGroup>
    <p-inputGroup>
        <p-inputGroupAddon>$</p-inputGroupAddon>
        <input type="text" pInputText placeholder="Price" />
        <p-inputGroupAddon>.00</p-inputGroupAddon>
    </p-inputGroup>
    <p-inputGroup>
        <p-inputGroupAddon>www</p-inputGroupAddon>
        <input type="text" pInputText placeholder="Website" />
    </p-inputGroup>
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
export class InputGroupBasicDemo { }`
    };
}
