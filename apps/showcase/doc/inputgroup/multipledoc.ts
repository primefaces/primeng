import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'multiple-doc',
    template: `
        <app-docsectiontext>
            <p>Multiple add-ons can be placed inside the same group.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputgroup class="w-full md:!w-[30rem]">
                <p-inputgroup-addon>
                    <i class="pi pi-clock"></i>
                </p-inputgroup-addon>
                <p-inputgroup-addon>
                    <i class="pi pi-star-fill"></i>
                </p-inputgroup-addon>
                <input type="text" pInputText placeholder="Price" />
                <p-inputgroup-addon>$</p-inputgroup-addon>
                <p-inputgroup-addon>.00</p-inputgroup-addon>
            </p-inputgroup>
        </div>
        <app-code [code]="code" selector="input-group-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    code: Code = {
        basic: `<p-inputgroup class="w-full md:!w-[30rem]">
    <p-inputgroup-addon>
        <i class="pi pi-clock"></i>
    </p-inputgroup-addon>
    <p-inputgroup-addon>
        <i class="pi pi-star-fill"></i>
    </p-inputgroup-addon>
    <input type="text" pInputText placeholder="Price" />
    <p-inputgroup-addon>$</p-inputgroup-addon>
    <p-inputgroup-addon>.00</p-inputgroup-addon>
</p-inputgroup>`,

        html: `<div class="card flex justify-center">
    <p-inputgroup class="w-full md:!w-[30rem]">
        <p-inputgroup-addon>
            <i class="pi pi-clock"></i>
        </p-inputgroup-addon>
        <p-inputgroup-addon>
            <i class="pi pi-star-fill"></i>
        </p-inputgroup-addon>
        <input type="text" pInputText placeholder="Price" />
        <p-inputgroup-addon>$</p-inputgroup-addon>
        <p-inputgroup-addon>.00</p-inputgroup-addon>
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'input-group-multiple-demo',
    templateUrl: './input-group-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule]
})
export class InputGroupMultipleDemo {
}`
    };
}
