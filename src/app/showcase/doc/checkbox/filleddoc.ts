import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'checkbox-filled-demo',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-checkbox [(ngModel)]="checked" [binary]="true" variant="filled" inputId="binary" />
        </div>
        <app-code [code]="code" selector="checkbox-filled-demo"></app-code>
    `
})
export class FilledDoc {
    checked: boolean = false;

    code: Code = {
        basic: `<p-checkbox 
    [(ngModel)]="checked" 
    [binary]="true" 
    variant="filled"
    inputId="binary"/>`,

        html: `<div class="card flex justify-content-center">
    <p-checkbox 
        [(ngModel)]="checked" 
        [binary]="true" 
        variant="filled"
        inputId="binary"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-filled-demo',
    templateUrl: './checkbox-filled-demo.html',
    standalone: true,
    imports: [FormsModule, CheckboxModule]
})
export class CheckboxFilledDemo {
    checked: boolean = false;
}`
    };
}
