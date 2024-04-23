import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                A group is created by wrapping the input and icon with the <i>IconField</i> component. Each icon is defined as a child of <i>InputIcon</i> component. In addition, position of the icon can be changed using <i>iconPosition</i> property
                that the default value is <i>right</i> and also <i>left</i> option is available.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-3">
            <p-iconField iconPosition="left">
                <p-inputIcon styleClass="pi pi-search" />
                <input type="text" pInputText placeholder="Search" />
            </p-iconField>
            <p-iconField iconPosition="right">
                <p-inputIcon styleClass="pi pi-spinner pi-spin" />
                <input type="text" pInputText />
            </p-iconField>
        </div>
        <app-code [code]="code" selector="iconfield-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-iconField iconPosition="left">
    <p-inputIcon styleClass="pi pi-search" />
    <input type="text" pInputText placeholder="Search" />
</p-iconField>
<p-iconField iconPosition="right">
    <p-inputIcon styleClass="pi pi-spinner pi-spin" />
    <input type="text" pInputText />
</p-iconField>`,

        html: `<div class="card flex flex-wrap justify-content-center gap-3">
    <p-iconField iconPosition="left">
        <p-inputIcon styleClass="pi pi-search" />
        <input type="text" pInputText placeholder="Search" />
    </p-iconField>
    <p-iconField iconPosition="right">
        <p-inputIcon styleClass="pi pi-spinner pi-spin" />
        <input type="text" pInputText />
    </p-iconField>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'iconfield-basic-demo',
    templateUrl: './iconfield-basic-demo.html'
})
export class IconFieldBasicDemo {}`
    };
}
