import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'inputtext-helptext-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>An advisory text can be defined with the semantic <i>small</i> tag.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <div class="flex flex-column gap-2">
                <label htmlFor="username">Username</label>
                <input pInputText id="username" aria-describedby="username-help" [(ngModel)]="value" />
                <small id="username-help">Enter your username to reset your password.</small>
            </div>
        </div>
        <app-code [code]="code" selector="inputtext-helptext-demo"></app-code>
    </div>`
})
export class HelpTextDoc {
    value: string;

    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<div class="flex flex-column gap-2">
    <label htmlFor="username">Username</label>
    <input pInputText id="username" aria-describedby="username-help" [(ngModel)]="value" />
    <small id="username-help">Enter your username to reset your password.</small>
</div>`,

        html: `
<div class="card flex justify-content-center">
    <div class="flex flex-column gap-2">
        <label htmlFor="username">Username</label>
        <input pInputText id="username" aria-describedby="username-help" [(ngModel)]="value" />
        <small id="username-help">Enter your username to reset your password.</small>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'inputtext-helptext-demo',
    templateUrl: './inputtext-helptext-demo.html',
    styleUrls: ['./inputtext-helptext-demo.scss']
})
export class InputtextHelptextDemo {
    value: string;
}`
    };
}
