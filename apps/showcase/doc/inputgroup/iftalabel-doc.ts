import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'iftalabel-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, FormsModule, RouterModule, InputGroupModule, InputGroupAddonModule, InputNumberModule, IftaLabelModule],
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
        <app-code></app-code>
    `
})
export class IftaLabelDoc {
    value: number = 10;
}
