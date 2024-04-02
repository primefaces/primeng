import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way binding to a boolean property is defined using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toggleButton [(ngModel)]="checked" onLabel="Yes" offLabel="No"></p-toggleButton>
        </div>
        <app-code [code]="code" selector="toggle-button-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-toggleButton [(ngModel)]="checked" onLabel="Yes" offLabel="No"></p-toggleButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-toggleButton [(ngModel)]="checked" onLabel="Yes" offLabel="No"></p-toggleButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'toggle-button-basic-demo',
    templateUrl: './toggle-button-basic-demo.html'
})
export class ToggleButtonBasicDemo {
    checked: boolean = false;
}`
    };
}
