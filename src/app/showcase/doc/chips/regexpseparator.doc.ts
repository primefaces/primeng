import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'chips-reg-exp-separator-demo',
    template: ` <app-docsectiontext>
            <p>A new chip is added when <i>enter</i> key is pressed, <i>separator</i> property allows definining an additional key. Currently only valid value is , to create a new item when comma key is pressed.</p>
        </app-docsectiontext>
        <div class="card p-fluid">
            <p-chips [(ngModel)]="values" [separator]="separatorExp" placeholder="Hint: a, b c"></p-chips>
        </div>
        <app-code [code]="code" selector="chips-reg-exp-separator-demo"></app-code>`
})
export class RegexpSeparatorDoc {
    separatorExp: RegExp = /,| /;

    values: string[] | undefined;

    code: Code = {
        basic: `<p-chips [(ngModel)]="values" [separator]="separatorExp" placeholder="Hint: a, b c"></p-chips>`,

        html: `
<div class="card p-fluid">
    <p-chips [(ngModel)]="values" [separator]="separatorExp" placeholder="Hint: a, b c"></p-chips>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'chips-reg-exp-separator-demo',
    templateUrl: './chips-reg-exp-separator-demo.html'
})
export class ChipsRegExpSeparatorDemo {
    values: string[] | undefined;

    separatorExp: RegExp = /,| /;
}`
    };
}
