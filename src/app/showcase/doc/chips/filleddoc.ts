import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chips-filled-demo',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="value" variant="filled" />
        </div>
        <app-code [code]="code" selector="chips-filled-demo"></app-code>
    `
})
export class FilledDoc {
    value: string[] | undefined;

    code: Code = {
        basic: `<p-chips [(ngModel)]="value" variant="filled" />`,

        html: `<div class="card p-fluid">
    <p-chips [(ngModel)]="value" variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'chips-filled-demo',
    templateUrl: './chips-filled-demo.html',
    standalone: true,
    imports: [FormsModule, ChipsModule]
})
export class ChipsFilledDemo {
    value: string[] | undefined;
}`
    };
}
