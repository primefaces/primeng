import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'ifta-label-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputgroup class="md:!w-80">
                <p-inputgroup-addon>
                    <i class="pi pi-shopping-cart"></i>
                </p-inputgroup-addon>
                <p-iftalabel>
                    <p-inputnumber [(ngModel)]="value" inputId="price" mode="currency" currency="USD" locale="en-US" />
                    <label for="price">Price</label>
                </p-iftalabel>
            </p-inputgroup>
        </div>
        <app-code [code]="code" selector="input-group-ifta-label-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value: number = 10;

    code: Code = {
        basic: `<p-inputgroup class="md:!w-80">
    <p-inputgroup-addon>
        <i class="pi pi-shopping-cart"></i>
    </p-inputgroup-addon>
    <p-iftalabel>
        <p-inputnumber [(ngModel)]="value" inputId="price" mode="currency" currency="USD" locale="en-US" />
        <label for="price">Price</label>
    </p-iftalabel>
</p-inputgroup>`,

        html: `<div class="card flex justify-center">
    <p-inputgroup class="md:!w-80">
        <p-inputgroup-addon>
            <i class="pi pi-shopping-cart"></i>
        </p-inputgroup-addon>
        <p-iftalabel>
            <p-inputnumber [(ngModel)]="value" inputId="price" mode="currency" currency="USD" locale="en-US" />
            <label for="price">Price</label>
        </p-iftalabel>
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'input-group-ifta-label-demo',
    templateUrl: './input-group-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, IftaLabelModule , InputNumberModule]
})
export class InputGroupIftaLabelDemo {
    value: number = 10;
}`
    };
}
