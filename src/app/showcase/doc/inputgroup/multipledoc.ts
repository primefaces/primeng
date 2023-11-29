import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'multiple-doc',
    template: `
        <app-docsectiontext>
            <p>Multiple add-ons can be placed inside the same group.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-inputGroup class="w-full md:w-30rem">
                <p-inputGroupAddon>
                    <i class="pi pi-clock"></i>
                </p-inputGroupAddon>

                <p-inputGroupAddon>
                    <i class="pi pi-star-fill"></i>
                </p-inputGroupAddon>

                <input type="text" pInputText placeholder="Price" />
                <p-inputGroupAddon>$</p-inputGroupAddon>
                <p-inputGroupAddon>.00</p-inputGroupAddon>
            </p-inputGroup>
        </div>
        <app-code [code]="code" selector="inputgroup-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    code: Code = {
        basic: `
<p-inputGroup class="w-full md:w-30rem">
  <p-inputGroupAddon>
    <i class="pi pi-clock"></i>
  </p-inputGroupAddon>
  <p-inputGroupAddon>
    <i class="pi pi-star-fill"></i>
  </p-inputGroupAddon>
  <input type="text" pInputText placeholder="Price" />
  <p-inputGroupAddon>$</p-inputGroupAddon>
  <p-inputGroupAddon>.00</p-inputGroupAddon>
 </p-inputGroup>`,

        html: `
<div class="card flex justify-content-center">
 <p-inputGroup class="w-full md:w-30rem">
  <p-inputGroupAddon>
    <i class="pi pi-clock"></i>
</p-inputGroupAddon>
 <p-inputGroupAddon>
   <i class="pi pi-star-fill"></i>
</p-inputGroupAddon>
  <input type="text" pInputText placeholder="Price" />
 <p-inputGroupAddon>$</p-inputGroupAddon>
 <p-inputGroupAddon>.00</p-inputGroupAddon>
</p-inputGroup>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputgroup-multiple-demo',
    templateUrl: './inputgroup-multiple-demo.html'
})
export class InputgroupMultipleDemo {
}`
    };
}
