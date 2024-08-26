import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'filled-doc',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <input type="text" pInputText [(ngModel)]="value" variant="filled" />
        </div>
        <app-code [code]="code" selector="input-text-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value: string;

    code: Code = {
        basic: `<input 
    type="text" 
    pInputText 
    [(ngModel)]="value" 
    variant="filled" />`,

        html: `<div class="card flex justify-center">
    <input 
        type="text" 
        pInputText 
        [(ngModel)]="value" 
        variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-filled-demo',
    templateUrl: './input-text-filled-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule]
})
export class InputTextFilledDemo {
    value: string;
}`
    };
}
