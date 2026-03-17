import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'multiple-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, InputGroupModule, InputGroupAddonModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>Multiple add-ons can be placed inside the same group.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputgroup class="w-full md:w-120!">
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
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MultipleDoc {}
