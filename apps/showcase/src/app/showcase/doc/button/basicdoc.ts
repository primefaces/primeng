import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Text to display on a button is defined with the <i>label</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button label="Submit" />
        </div>
        <app-code [code]="code" selector="button-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-button label="Submit" />`,

        html: `<div class="card flex justify-center">
    <p-button label="Submit" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-basic-demo',
    templateUrl: './button-basic-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonBasicDemo { }`
    };
}
