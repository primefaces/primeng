import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-doc',
    template: `
        <app-docsectiontext>
            <p>Buttons can be placed at either side of an input element.</p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row gap-3">
            <p-inputGroup>
                <button type="button" pButton label="Search"></button>
                <input type="text" pInputText placeholder="Keyword" />
            </p-inputGroup>

            <p-inputGroup>
                <input type="text" pInputText placeholder="Keyword" />
                <button type="button" pButton icon="pi pi-search" class="p-button-warning"></button>
            </p-inputGroup>

            <p-inputGroup>
                <button type="button" pButton icon="pi pi-check" class="p-button-success"></button>
                <input type="text" pInputText placeholder="Vote" />
                <button type="button" pButton icon="pi pi-times" class="p-button-danger"></button>
            </p-inputGroup>
        </div>
        <app-code [code]="code" selector="input-group-button-demo"></app-code>
    `
})
export class ButtonDoc {
    code: Code = {
        basic: `<p-inputGroup>
        <button type="button" pButton label="Search"></button>
        <input type="text" pInputText placeholder="Keyword" />
        </p-inputGroup>

        <p-inputGroup>
        <input type="text" pInputText placeholder="Keyword" />
        <button type="button" pButton icon="pi pi-search" class="p-button-warning"></button>
        </p-inputGroup>

        <p-inputGroup>
        <button type="button" pButton icon="pi pi-check" class="p-button-success"></button>
        <input type="text" pInputText placeholder="Vote" />
        <button type="button" pButton icon="pi pi-times" class="p-button-danger"></button>
</p-inputGroup>`,
        html: `<div class="card flex flex-column md:flex-row gap-3">
    <p-inputGroup>
        <button type="button" pButton label="Search"></button>
        <input type="text" pInputText placeholder="Keyword" />
    </p-inputGroup>

    <p-inputGroup>
        <input type="text" pInputText placeholder="Keyword" />
        <button type="button" pButton icon="pi pi-search" class="p-button-warning"></button>
    </p-inputGroup>

    <p-inputGroup>
        <button type="button" pButton icon="pi pi-check" class="p-button-success"></button>
        <input type="text" pInputText placeholder="Vote" />
        <button type="button" pButton icon="pi pi-times" class="p-button-danger"></button>
    </p-inputGroup>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'input-group-button-demo',
    templateUrl: './input-group-button-demo.html'
})
export class InputGroupButtonDemo {
}`
    };
}
