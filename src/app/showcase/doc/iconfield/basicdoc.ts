import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                A group is created by wrapping the input and icon with the IconField component. Each icon is defined as a child of InputIcon component. In addition, position of the icon can be changed using iconPosition property that the default
                value is right and also left option is available.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-iconField>
                <p-inputIcon>
                    <i class="pi pi-search"></i>
                </p-inputIcon>
                <input type="text" pInputText [(ngModel)]="value" />
            </p-iconField>
        </div>
        <app-code [code]="code" selector="iconfield-basic-demo"></app-code>
    `
})
export class BasicDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-iconField>
    <p-inputIcon>
        <i class="pi pi-search"></i>
    </p-inputIcon>
<input type="text" pInputText [(ngModel)]="value" />
</p-iconField>`,
        html: `<div class="card flex justify-content-center">
<p-iconField>
    <p-inputIcon>
        <i class="pi pi-search"></i>
    </p-inputIcon>
    <input type="text" pInputText [(ngModel)]="value" />
</p-iconField>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'iconField-basic-demo',
    templateUrl: './iconField-basic-demo.html'
})
export class IconFieldBasicDemo {}`
    };
}
