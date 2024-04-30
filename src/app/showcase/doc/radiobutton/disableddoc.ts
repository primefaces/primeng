import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-radioButton [disabled]="true" [(ngModel)]="checked" />
        </div>
        <app-code [code]="code" selector="radio-button-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    checked: any;

    code: Code = {
        basic: `<p-radioButton [disabled]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-radioButton [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'radio-button-disabled-demo',
    templateUrl: './radio-button-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, RadioButtonModule]
})
export class RadioButtonDisabledDemo { }`
    };
}
