import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'multiple-doc',
    template: `
        <app-docsectiontext>
            <p>Multiple add-ons can be placed inside the same group.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <div class="p-inputgroup w-full md:w-30rem">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-clock"></i>
                </span>
                <span class="p-inputgroup-addon">
                    <i class="pi pi-star-fill"></i>
                </span>
                <input type="text" pInputText placeholder="Price" />
                <span class="p-inputgroup-addon">$</span>
                <span class="p-inputgroup-addon">.00</span>
            </div>
        </div>
        <app-code [code]="code" selector="inputgroup-multiple-demo"></app-code>
    `
})
export class MultipleDoc {

    code: Code = {
        basic: `
<div class="p-inputgroup w-full md:w-30rem">
    <span class="p-inputgroup-addon">
        <i class="pi pi-clock"></i>
    </span>
    <span class="p-inputgroup-addon">
        <i class="pi pi-star-fill"></i>
    </span>
    <input type="text" pInputText placeholder="Price" />
    <span class="p-inputgroup-addon">$</span>
    <span class="p-inputgroup-addon">.00</span>
</div>`,

        html: `
<div class="card flex justify-content-center">
    <div class="p-inputgroup w-full md:w-30rem">
        <span class="p-inputgroup-addon">
            <i class="pi pi-clock"></i>
        </span>
        <span class="p-inputgroup-addon">
            <i class="pi pi-star-fill"></i>
        </span>
        <input type="text" pInputText placeholder="Price" />
        <span class="p-inputgroup-addon">$</span>
        <span class="p-inputgroup-addon">.00</span>
    </div>
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
