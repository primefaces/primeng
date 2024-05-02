import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-checkbox [disabled]="true" [(ngModel)]="checked" />
        </div>
        <app-code [code]="code" selector="checkbox-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-checkbox 
    [disabled]="true" 
    [(ngModel)]="checked" />`,

        html: `<div class="card flex justify-content-center">
    <p-checkbox 
        [disabled]="true" 
        [(ngModel)]="checked" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-disabled-demo',
    templateUrl: './checkbox-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, CheckboxModule]
})
export class CheckboxDisabledDemo {
    checked: boolean = false;
}`
    };
}
