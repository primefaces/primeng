import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'checkbox-filled-demo',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" variant="filled" />
        </div>
        <app-code [code]="code" selector="checkbox-filled-demo"></app-code>
    `
})
export class FilledDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-checkbox [(ngModel)]="checked" [binary]="true" variant="filled" />`,

        html: `<div class="card flex justify-center">
    <p-checkbox [(ngModel)]="checked" [binary]="true" variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-filled-demo',
    templateUrl: './checkbox-filled-demo.html',
    standalone: true,
    imports: [FormsModule, Checkbox]
})
export class CheckboxFilledDemo {
    checked: boolean = false;
}`
    };
}
