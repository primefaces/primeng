import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Binary checkbox is used as a controlled input with <i>ngModel</i> and <i>binary</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary" />
        </div>
        <app-code [code]="code" selector="checkbox-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-checkbox 
    [(ngModel)]="checked" 
    [binary]="true" 
    inputId="binary" />`,

        html: `<div class="card flex justify-content-center">
    <p-checkbox 
        [(ngModel)]="checked" 
        [binary]="true" 
        inputId="binary" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-basic-demo',
    templateUrl: './checkbox-basic-demo.html',
    standalone: true,
    imports: [FormsModule, CheckboxModule]
})
export class CheckboxBasicDemo {
    checked: boolean = false;
}`
    };
}
