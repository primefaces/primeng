import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, FormsModule, IconFieldModule, InputIconModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>IconField is compatible with the pSize setting of the input field.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
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
        <app-code [code]="code" selector="iconfield-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1 = null;

    value2 = null;

    value3 = null;

    code: Code = {
        basic: `<p-iconfield>
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
</p-iconfield>`,

        html: `<div class="card flex flex-col items-center gap-4">
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
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'iconfield-sizes-demo',
    templateUrl: './iconfield-sizes-demo.html',
    standalone: true,
    imports: [InputIcon, IconField, InputTextModule, FormsModule]
})
export class IconfieldSizesDemo {}`
    };
}
