import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-checkbox [(ngModel)]="checked1" [binary]="true" [disabled]="true" />
            <p-checkbox [(ngModel)]="checked2" [binary]="true" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="checkbox-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    checked1: boolean = false;

    checked2: boolean = true;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked1" [binary]="true" [disabled]="true" />
<p-checkbox [(ngModel)]="checked2" [binary]="true" [disabled]="true" />`,

        html: `<div class="card flex justify-center gap-2">
    <p-checkbox [(ngModel)]="checked1" [binary]="true" [disabled]="true" />
    <p-checkbox [(ngModel)]="checked2" [binary]="true" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-disabled-demo',
    templateUrl: './checkbox-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, Checkbox]
})
export class CheckboxDisabledDemo {
    checked1: boolean = false;

    checked2: boolean = true;
}`
    };
}
