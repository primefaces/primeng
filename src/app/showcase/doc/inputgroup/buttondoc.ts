import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-doc',
    template: `
        <app-docsectiontext>
            <p>Buttons can be placed at either side of an input element.</p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-inputgroup>
                <p-button type="button" label="Search" />
                <input type="text" pInputText placeholder="Keyword" />
            </p-inputgroup>
            <p-inputgroup>
                <input type="text" pInputText placeholder="Keyword" />
                <p-button type="button" icon="pi pi-search" severity="warn" />
            </p-inputgroup>
            <p-inputgroup>
                <p-button type="button" icon="pi pi-check" severity="success" />
                <input type="text" pInputText placeholder="Vote" />
                <p-button type="button" icon="pi pi-times" severity="danger" />
            </p-inputgroup>
        </div>
        <app-code [code]="code" selector="input-group-button-demo"></app-code>
    `,
})
export class ButtonDoc {
    code: Code = {
        basic: `<p-inputgroup>
    <p-button type="button" label="Search" />
    <input type="text" pInputText placeholder="Keyword" />
</p-inputgroup>
<p-inputgroup>
    <input type="text" pInputText placeholder="Keyword" />
    <p-button type="button" icon="pi pi-search" severity="warn" />
</p-inputgroup>
<p-inputgroup>
    <p-button type="button" icon="pi pi-check" severity="success" />
    <input type="text" pInputText placeholder="Vote" />
    <p-button type="button" icon="pi pi-times" severity="danger" />
</p-inputgroup>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-inputgroup>
        <p-button type="button" label="Search" />
        <input type="text" pInputText placeholder="Keyword" />
    </p-inputgroup>
    <p-inputgroup>
        <input type="text" pInputText placeholder="Keyword" />
        <p-button type="button" icon="pi pi-search" severity="warn" />
    </p-inputgroup>
    <p-inputgroup>
        <p-button type="button" icon="pi pi-check" severity="success" />
        <input type="text" pInputText placeholder="Vote" />
        <p-button type="button" icon="pi pi-times" severity="danger" />
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'input-group-button-demo',
    templateUrl: './input-group-button-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, ButtonModule]
})
export class InputGroupButtonDemo {
}`,
    };
}
