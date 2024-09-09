import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                A group is created by wrapping the input and icon with the <i>IconField</i> component. Each icon is defined as a child of
                <i>InputIcon</i> component. In addition, position of the icon can be changed using <i>iconPosition</i> property that the
                default value is <i>right</i> and also <i>left</i> option is available.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <p-icon-field iconPosition="left">
                <p-input-icon styleClass="pi pi-search" />
                <input type="text" pInputText placeholder="Search" />
            </p-icon-field>
            <p-icon-field iconPosition="right">
                <p-input-icon styleClass="pi pi-spinner pi-spin" />
                <input type="text" pInputText />
            </p-icon-field>
        </div>
        <app-code [code]="code" selector="iconfield-basic-demo"></app-code>
    `,
})
export class BasicDoc {
    code: Code = {
        basic: `<p-icon-field iconPosition="left">
    <p-input-icon styleClass="pi pi-search" />
    <input type="text" pInputText placeholder="Search" />
</p-icon-field>
<p-icon-field iconPosition="right">
    <p-input-icon styleClass="pi pi-spinner pi-spin" />
    <input type="text" pInputText />
</p-icon-field>`,

        html: `<div class="card flex flex-wrap justify-center gap-4">
    <p-icon-field iconPosition="left">
        <p-input-icon styleClass="pi pi-search" />
        <input type="text" pInputText placeholder="Search" />
    </p-icon-field>
    <p-icon-field iconPosition="right">
        <p-input-icon styleClass="pi pi-spinner pi-spin" />
        <input type="text" pInputText />
    </p-icon-field>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'iconfield-basic-demo',
    templateUrl: './iconfield-basic-demo.html',
    standalone: true,
    imports: [InputIconModule, IconFieldModule, InputTextModule, FormsModule]
})
export class IconfieldBasicDemo {}`,
    };
}
