import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-indeterminate-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>indeterminate</i> is present, the checkbox masks the actual value visually.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" />
        </div>
        <app-code [code]="code" selector="checkbox-indeterminate-demo"></app-code>
    `
})
export class IndeterminateDoc {
    checked: any = null;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" />`,

        html: `<div class="card flex justify-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" />
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
