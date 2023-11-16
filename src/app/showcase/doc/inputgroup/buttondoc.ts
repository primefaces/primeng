import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Buttons can be placed at either side of an input element.</p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row gap-3">
            <p-inputGroup >
                <button type="button" pButton label="Search"></button>
                <input type="text" pInputText placeholder="Keyword" />
            </p-inputGroup>

            <p-inputGroup>
                <input type="text" pInputText placeholder="Keyword" />
                <button type="button" pButton icon="pi pi-refresh" styleClass="p-button-warn"></button>
            </p-inputGroup>

            <p-inputGroup>
                <button type="button" pButton icon="pi pi-check" styleClass="p-button-success"></button>
                <input type="text" pInputText placeholder="Vote" />
                <button type="button" pButton icon="pi pi-times" styleClass="p-button-danger"></button>
            </p-inputGroup>
        </div>
        <app-code [code]="code" selector="inputgroup-button-demo"></app-code>
    </section>`
})
export class ButtonDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
 <p-inputGroup >
     <button type="button" pButton label="Search"></button>
     <input type="text" pInputText placeholder="Keyword" />
 </p-inputGroup>

 <p-inputGroup>
     <input type="text" pInputText placeholder="Keyword" />
     <button type="button" pButton icon="pi pi-refresh" styleClass="p-button-warn"></button>
 </p-inputGroup>
 
 <p-inputGroup>
     <button type="button" pButton icon="pi pi-check" styleClass="p-button-success"></button>
     <input type="text" pInputText placeholder="Vote" />
     <button type="button" pButton icon="pi pi-times" styleClass="p-button-danger"></button>
 </p-inputGroup>`,
        html: `
<div class="card flex flex-column md:flex-row gap-3">
   <p-inputGroup >
   <button type="button" pButton label="Search"></button>
   <input type="text" pInputText placeholder="Keyword" />
   </p-inputGroup>
   
   <p-inputGroup>
   <input type="text" pInputText placeholder="Keyword" />
   <button type="button" pButton icon="pi pi-refresh" styleClass="p-button-warn"></button>
   </p-inputGroup>
   
   <p-inputGroup>
   <button type="button" pButton icon="pi pi-check" styleClass="p-button-success"></button>
   <input type="text" pInputText placeholder="Vote" />
   <button type="button" pButton icon="pi pi-times" styleClass="p-button-danger"></button>
   </p-inputGroup>
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
