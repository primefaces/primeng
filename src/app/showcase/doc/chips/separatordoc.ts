import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'chips-separator-demo',
    template: ` <app-docsectiontext>
            <p>A new chip is added when <i>enter</i> key is pressed, <i>separator</i> property allows definining an additional key. Currently only valid value is <i>,</i> to create a new item when comma key is pressed.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values" separator="," />
        </div>
        <app-code [code]="code" selector="chips-separator-demo"></app-code>`
})
export class SeparatorDoc {
    values: string[] | undefined;

    code: Code = {
        basic: `<p-chips [(ngModel)]="values" separator=","/>`,

        html: `<div class="card p-fluid">
    <p-chips [(ngModel)]="values" separator=","/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'chips-basic-demo',
    templateUrl: './chips-basic-demo.html',
    standalone: true,
    imports: [FormsModule, ChipsModule]
})
export class ChipsSeparatorDemo {
    values: string[] | undefined;
}`
    };
}
