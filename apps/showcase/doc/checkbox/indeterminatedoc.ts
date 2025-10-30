import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-indeterminate-demo',
    standalone: true,
    imports: [FormsModule, CheckboxModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>indeterminate</i> state indicates that a checkbox is neither "on" or "off".</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" [ariaLabel]="'indeterminate checkbox with true or false value'" />
        </div>
        <app-code [code]="code" selector="checkbox-indeterminate-demo"></app-code>
    `
})
export class IndeterminateDoc {
    checked: any = null;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" />`,

        html: `<div class="card flex justify-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" [ariaLabel]="'indeterminate checkbox with true and false value'"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-indeterminate-demo',
    templateUrl: './checkbox-indeterminate-demo.html',
    standalone: true,
    imports: [FormsModule, Checkbox]
})
export class CheckboxIndeterminateDemo {
    checked: boolean = false;
}`
    };
}
