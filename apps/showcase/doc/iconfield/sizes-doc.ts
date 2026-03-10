import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, FormsModule, IconFieldModule, InputIconModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>IconField is compatible with the pSize setting of the input field.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center gap-4">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input pInputText [(ngModel)]="value1" placeholder="Small" pSize="small" />
                </p-iconfield>

                <p-iconfield>
                    <input pInputText [(ngModel)]="value2" placeholder="Normal" />
                    <p-inputicon class="pi pi-user" />
                </p-iconfield>

                <p-iconfield>
                    <p-inputicon class="pi pi-lock" />
                    <input pInputText [(ngModel)]="value3" placeholder="Large" pSize="large" />
                    <p-inputicon class="pi pi-spin pi-spinner" />
                </p-iconfield>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SizesDoc {
    value1 = null;

    value2 = null;

    value3 = null;
}
