import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>
                A group is created by wrapping the input and icon with the <i>IconField</i> component. Each icon is defined as a child of <i>InputIcon</i> component. In addition, position of the icon can be changed using <i>iconPosition</i> property
                that the default value is <i>right</i> and also <i>left</i> option is available.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input pInputText [(ngModel)]="value1" placeholder="Small" size="small" />
            </p-iconfield>

            <p-iconfield>
                <input pInputText [(ngModel)]="value2" placeholder="Normal" />
                <p-inputicon class="pi pi-user" />
            </p-iconfield>

            <p-iconfield>
                <p-inputicon class="pi pi-lock" />
                <input pInputText [(ngModel)]="value3" placeholder="Large" size="large" />
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
    <input pInputText [(ngModel)]="value1" placeholder="Small" size="small" />
</p-iconfield>

<p-iconfield>
    <input pInputText [(ngModel)]="value2" placeholder="Normal" />
    <p-inputicon class="pi pi-user" />
</p-iconfield>

<p-iconfield>
    <p-inputicon class="pi pi-lock" />
    <input pInputText [(ngModel)]="value3" placeholder="Large" size="large" />
    <p-inputicon class="pi pi-spin pi-spinner" />
</p-iconfield>`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-iconfield>
        <p-inputicon class="pi pi-search" />
        <input pInputText [(ngModel)]="value1" placeholder="Small" size="small" />
    </p-iconfield>

    <p-iconfield>
        <input pInputText [(ngModel)]="value2" placeholder="Normal" />
        <p-inputicon class="pi pi-user" />
    </p-iconfield>

    <p-iconfield>
        <p-inputicon class="pi pi-lock" />
        <input pInputText [(ngModel)]="value3" placeholder="Large" size="large" />
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
