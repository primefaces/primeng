import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'input-doc',
    template: `
        <app-docsectiontext>
            <p>Inplace can be used within a form to display a value as read only before making it editable. The <i>closable</i> property adds a close button next to the content to switch back to read only mode.</p>
        </app-docsectiontext>
        <div class="card">
            <p-inplace closable="closable">
                <ng-template pTemplate="display">
                    <span>Click to Edit</span>
                </ng-template>
                <ng-template pTemplate="content">
                    <input type="text" value="PrimeNG" pInputText />
                </ng-template>
            </p-inplace>
        </div>
        <app-code [code]="code" selector="inplace-input-demo"></app-code>
    `
})
export class InputDoc {
    code: Code = {
        basic: `<p-inplace closable="closable">
    <ng-template pTemplate="display">
        <span>Click to Edit</span>
    </ng-template>
    <ng-template pTemplate="content">
        <input type="text" value="PrimeNG" pInputText />
    </ng-template>
</p-inplace>`,
        html: `
<div class="card">
    <p-inplace closable="closable">
        <ng-template pTemplate="display">
            <span>Click to Edit</span>
        </ng-template>
        <ng-template pTemplate="content">
            <input type="text" value="PrimeNG" pInputText />
        </ng-template>
    </p-inplace>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inplace-input-demo',
    templateUrl: './inplace-input-demo.html'
})
export class InplaceInputDemo {}`
    };
}
