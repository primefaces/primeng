import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>An InputGroup is created by wrapping the input and add-ons inside an element with a <i>p-inputgroup</i> class where add-ons also should be inside an element with <i>.p-inputgroup-addon</i> class</p>
        </app-docsectiontext>
        <div class="card flex flex-column md:flex-row gap-3">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                </span>
                <input pInputText placeholder="Username" />
            </div>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">$</span>
                <input type="text" pInputText placeholder="Price" />
                <span class="p-inputgroup-addon">.00</span>
            </div>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">www</span>
                <input type="text" pInputText placeholder="Website" />
            </div>
        </div>
        <app-code [code]="code" selector="inputgroup-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<div class="p-inputgroup">
    <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
    </span>
    <input pInputText placeholder="Username" />
</div>
<div class="p-inputgroup">
    <span class="p-inputgroup-addon">$</span>
    <input type="text" pInputText placeholder="Price" />
    <span class="p-inputgroup-addon">.00</span>
</div>
<div class="p-inputgroup">
    <span class="p-inputgroup-addon">www</span>
    <input type="text" pInputText placeholder="Website" />
</div>`,

        html: `
<div class="card flex flex-column md:flex-row gap-3">
    <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
        <input pInputText placeholder="Username" />
    </div>

    <div class="p-inputgroup">
        <span class="p-inputgroup-addon">$</span>
        <input type="text" pInputText placeholder="Price" />
        <span class="p-inputgroup-addon">.00</span>
    </div>

    <div class="p-inputgroup">
        <span class="p-inputgroup-addon">www</span>
        <input type="text" pInputText placeholder="Website" />
    </div>
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
