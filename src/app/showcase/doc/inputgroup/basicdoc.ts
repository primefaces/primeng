import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A group is created by wrapping the input and add-ons with the <i>InputGroup</i> component. Each add-on element is defined as a child of <i>InputGroupAddon</i> component.</p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row gap-3">
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
        <app-code [code]="code" selector="inputgroup-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
    <p-inputGroup>
     <p-inputGroupAddon>
          <i class="pi pi-user"></i>
     </p-inputGroupAddon>
       <input pInputText placeholder="Username" />
    </p-inputGroup>
    <p-inputGroup class="p-inputgroup">
     <p-inputGroupAddon>$</p-inputGroupAddon>
        <input type="text" pInputText placeholder="Price" />
     <p-inputGroupAddon>.00</p-inputGroupAddon>
    </p-inputGroup>
    <p-inputGroup class="p-inputgroup">
     <p-inputGroupAddon>www</p-inputGroupAddon>
        <input type="text" pInputText placeholder="Website" />
    </p-inputGroup>`,

        html: `
    <div class="card flex flex-column md:flex-row gap-3">
    <p-inputGroup>
    <p-inputGroupAddon>
         <i class="pi pi-user"></i>
    </p-inputGroupAddon>
      <input pInputText placeholder="Username" />
    </p-inputGroup>
    <p-inputGroup class="p-inputgroup">
    <p-inputGroupAddon>$</p-inputGroupAddon>
       <input type="text" pInputText placeholder="Price" />
    <p-inputGroupAddon>.00</p-inputGroupAddon>
    </p-inputGroup>
    <p-inputGroup class="p-inputgroup">
    <p-inputGroupAddon>www</p-inputGroupAddon>
       <input type="text" pInputText placeholder="Website" />
    </p-inputGroup>
      </div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputgroup-basic-demo',
    templateUrl: './inputgroup-basic-demo.html'
})
export class InputgroupBasicDemo {
}`
    };
}
