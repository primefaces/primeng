import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Binary checkbox is used as a controlled input with <i>ngModel</i> and <i>binary</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-checkbox [(ngModel)]="checked" [binary]="true" />
        </div>
        <app-code [code]="code" selector="checkbox-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: any = null;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked" [binary]="true" />`,

        html: `<div class="card flex justify-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-basic-demo',
    templateUrl: './checkbox-basic-demo.html',
    standalone: true,
    imports: [FormsModule, Checkbox]
})
export class CheckboxBasicDemo {
    checked: boolean = false;
}`
    };
}
