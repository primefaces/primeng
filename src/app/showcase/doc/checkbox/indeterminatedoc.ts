import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-indeterminate-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>indeterminate</i> is present, the checkbox masks the actual value visually.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-checkbox [(ngModel)]="checked" [binary]="true" [indeterminate]="true" inputId="binary" />
        </div>
        <app-code [code]="code" selector="checkbox-indeterminate-demo"></app-code>
    `
})
export class IndeterminateDoc {
    checked: any = null;

    code: Code = {
        basic: `<p-checkbox 
    [(ngModel)]="checked" 
    [binary]="true"
    [indeterminate]="true"
    inputId="binary" />`,

        html: `<div class="card flex justify-center">
    <p-checkbox 
        [(ngModel)]="checked" 
        [binary]="true"
        [indeterminate]="true"
        inputId="binary" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-indeterminate-demo',
    templateUrl: './checkbox-indeterminate-demo.html',
    standalone: true,
    imports: [FormsModule, CheckboxModule]
})
export class CheckboxIndeterminateDemo {
    checked: boolean = false;
}`
    };
}
