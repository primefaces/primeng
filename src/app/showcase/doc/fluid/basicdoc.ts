import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
        <p>
            Components with the <i>fluid</i> option like <i>InputText</i> have the ability to span the full width of their component. Enabling the <i>fluid</i> for each component individually may be cumbersome so wrap the content with <i>Fluid</i> to
            instead for an easier alternative.
        </p>
        <p>Any component that has the <i>fluid</i> property can be nested inside the <i>Fluid</i> component. The <i>fluid</i> property of a child component has higher precedence than the fluid container as shown in the last sample.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-6">
            <div>
                <label for="non-fluid" class="font-bold mb-2 block">Non-Fluid</label>
                <input type="text" pInputText id="non-fluid" />
            </div>
            <div>
                <label for="fluid" class="font-bold mb-2 block">Fluid Prop</label>
                <input type="text" pInputText id="fluid" fluid />
            </div>
            <p-fluid>
                <span class="font-bold mb-2 block">Fluid Container</span>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6"><input type="text" pInputText /></div>
                    <div class="col-span-6"><input type="text" pInputText /></div>
                    <div class="col-span-12"><input type="text" pInputText /></div>
                    <div class="p-2"><input type="text" pInputText [fluid]="false" placeholder="Non-Fluid" /></div>
                </div>
            </p-fluid>
        </div>
        <app-code [code]="code" selector="fluid-basic-demo"></app-code>
    `,
})
export class BasicDoc {
    code: Code = {
        basic: `<div>
    <label for="non-fluid" class="font-bold mb-2 block">Non-Fluid</label>
    <input type="text" pInputText id="non-fluid" />
</div>
<div>
    <label for="fluid" class="font-bold mb-2 block">Fluid Prop</label>
    <input type="text" pInputText id="fluid" fluid />
</div>
<p-fluid>
    <span class="font-bold mb-2 block">Fluid Container</span>
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6"><input type="text" pInputText /></div>
            <div class="col-span-6"><input type="text" pInputText /></div>
            <div class="col-span-12"><input type="text" pInputText /></div>
            <div class="p-2"><input type="text" pInputText [fluid]="false" placeholder="Non-Fluid" /></div>
        </div>
</p-fluid>`,

        html: `<div class="card flex flex-col gap-6">
    <div>
        <label for="non-fluid" class="font-bold mb-2 block">Non-Fluid</label>
        <input type="text" pInputText id="non-fluid" />
    </div>
    <div>
        <label for="fluid" class="font-bold mb-2 block">Fluid Prop</label>
        <input type="text" pInputText id="fluid" fluid />
    </div>
    <p-fluid>
        <span class="font-bold mb-2 block">Fluid Container</span>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-6"><input type="text" pInputText /></div>
                <div class="col-span-6"><input type="text" pInputText /></div>
                <div class="col-span-12"><input type="text" pInputText /></div>
                <div class="p-2"><input type="text" pInputText [fluid]="false" placeholder="Non-Fluid" /></div>
            </div>
    </p-fluid>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';

@Component({
    selector: 'fluid-basic-demo',
    templateUrl: './fluid-basic-demo.html',
    standalone: true,
    imports: [FluidModule]
})
export class FluidBasicDemo {

}`,
    };
}
