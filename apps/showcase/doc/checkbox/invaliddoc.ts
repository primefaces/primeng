import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-invalid-demo',
    standalone: true,
    imports: [FormsModule, CheckboxModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" [invalid]="!checked" [ariaLabel]="'checkbox with true or false value'" />
        </div>
        <app-code [code]="code" selector="checkbox-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked" [binary]="true" [invalid]="!checked" />`,

        html: `<div class="card flex justify-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" [invalid]="!checked" [ariaLabel]="'checkbox with true or false value'"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-invalid-demo',
    templateUrl: './checkbox-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, Checkbox]
})
export class CheckboxInvalidDemo {
    checked: boolean = false;
}`
    };
}
