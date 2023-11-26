import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'auto-focus-basic-demo',
    template: `
        <app-docsectiontext>
            <p>AutoFocus is applied to any focusable input element on initial load. It's disabled by default and needs to be enabled manually.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <input type="text" pInputText pAutoFocus [autofocus]="true" placeholder="Automatically focused" />
        </div>
        <app-code [code]="code" selector="auto-focus-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `
<input type="text" pInputText pAutoFocus [autofocus]="true" placeholder="Automatically focused" />`,
        html: `
<div class="card flex justify-content-center">
    <input type="text" pInputText pAutoFocus [autofocus]="true" placeholder="Automatically focused" /> 
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'auto-focus-basic-demo',
    templateUrl: './auto-focus-basic-demo.html'
})
export class AutoFocusBasicDemo {}`
    };
}
