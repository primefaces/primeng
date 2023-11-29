import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-doc',
    template: `
        <app-docsectiontext>
            <p>Buttons can be placed at either side of an input element.</p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row gap-3">
            <div class="p-inputgroup">
                <button type="button" pButton label="Search"></button>
                <input type="text" pInputText placeholder="Keyword" />
            </div>

            <div class="p-inputgroup">
                <input type="text" pInputText placeholder="Keyword" />
                <button type="button" pButton icon="pi pi-refresh" styleClass="p-button-warn"></button>
            </div>

            <div class="p-inputgroup">
                <button type="button" pButton icon="pi pi-check" styleClass="p-button-success"></button>
                <input type="text" pInputText placeholder="Vote" />
                <button type="button" pButton icon="pi pi-times" styleClass="p-button-danger"></button>
            </div>
        </div>
        <app-code [code]="code" selector="inputgroup-button-demo"></app-code>
    `
})
export class ButtonDoc {
    code: Code = {
        basic: `<div class="p-inputgroup">
    <button type="button" pButton label="Search"></button>
    <input type="text" pInputText placeholder="Keyword" />
</div>

<div class="p-inputgroup">
    <input type="text" pInputText placeholder="Keyword" />
    <button type="button" pButton icon="pi pi-refresh" styleClass="p-button-warn"></button>
</div>

<div class="p-inputgroup">
    <button type="button" pButton icon="pi pi-check" styleClass="p-button-success"></button>
    <input type="text" pInputText placeholder="Vote" />
    <button type="button" pButton icon="pi pi-times" styleClass="p-button-danger"></button>
</div>`,

        html: `
<div class="card flex flex-column md:flex-row gap-3">
    <div class="p-inputgroup">
        <button type="button" pButton label="Search"></button>
        <input type="text" pInputText placeholder="Keyword" />
    </div>
    
    <div class="p-inputgroup">
        <input type="text" pInputText placeholder="Keyword" />
        <button type="button" pButton icon="pi pi-refresh" styleClass="p-button-warn"></button>
    </div>

    <div class="p-inputgroup">
        <button type="button" pButton icon="pi pi-check" styleClass="p-button-success"></button>
        <input type="text" pInputText placeholder="Vote" />
        <button type="button" pButton icon="pi pi-times" styleClass="p-button-danger"></button>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputgroup-button-demo',
    templateUrl: './inputgroup-button-demo.html'
})
export class InputgroupButtonDemo {
}`
    };
}
