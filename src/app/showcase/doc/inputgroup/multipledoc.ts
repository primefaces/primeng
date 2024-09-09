import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'multiple-doc',
    template: `
        <app-docsectiontext>
            <p>Multiple add-ons can be placed inside the same group.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-input-group class="w-full md:w-[30rem]">
                <p-input-group-addon>
                    <i class="pi pi-clock"></i>
                </p-input-group-addon>
                <p-input-group-addon>
                    <i class="pi pi-star-fill"></i>
                </p-input-group-addon>
                <input type="text" pInputText placeholder="Price" />
                <p-input-group-addon>$</p-input-group-addon>
                <p-input-group-addon>.00</p-input-group-addon>
            </p-input-group>
        </div>
        <app-code [code]="code" selector="input-group-multiple-demo"></app-code>
    `,
})
export class MultipleDoc {
    code: Code = {
        basic: `<p-input-group class="w-full md:w-[30rem]">
    <p-input-group-addon>
        <i class="pi pi-clock"></i>
    </p-input-group-addon>
    <p-input-group-addon>
        <i class="pi pi-star-fill"></i>
    </p-input-group-addon>
    <input type="text" pInputText placeholder="Price" />
    <p-input-group-addon>$</p-input-group-addon>
    <p-input-group-addon>.00</p-input-group-addon>
</p-input-group>`,

        html: `<div class="card flex justify-center">
    <p-input-group class="w-full md:w-[30rem]">
        <p-input-group-addon>
            <i class="pi pi-clock"></i>
        </p-input-group-addon>
        <p-input-group-addon>
            <i class="pi pi-star-fill"></i>
        </p-input-group-addon>
        <input type="text" pInputText placeholder="Price" />
        <p-input-group-addon>$</p-input-group-addon>
        <p-input-group-addon>.00</p-input-group-addon>
    </p-input-group>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'input-group-multiple-demo',
    templateUrl: './input-group-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule]
})
export class InputGroupMultipleDemo {
}`,
    };
}
