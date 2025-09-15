import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-disabled-demo',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button label="Submit" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="button-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    code: Code = {
        basic: `<p-button label="Submit" [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-button label="Submit" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-disabled-demo',
    templateUrl: './button-disabled-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonDisabledDemo { }`
    };
}
