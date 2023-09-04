import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'multiple-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
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
    </section>`
})
export class MultipleDoc {
    @Input() id: string;

    @Input() title: string;

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
