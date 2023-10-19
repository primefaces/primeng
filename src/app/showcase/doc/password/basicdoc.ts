import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Two-way value binding is defined using <i>ngModel</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-password [(ngModel)]="value" [feedback]="false"></p-password>
        </div>
        <app-code [code]="code" selector="password-basic-demo"></app-code>
    </section>`
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

    value!: string;

    code: Code = {
        basic: `
<p-password [(ngModel)]="value" [feedback]="false"></p-password>`,

        html: `
<div class="card flex justify-content-center">
    <p-password [(ngModel)]="value" [feedback]="false"></p-password>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'password-basic-demo',
    templateUrl: './password-basic-demo.html'
})
export class PasswordBasicDemo {
    value!: string;
}`
    };
}
