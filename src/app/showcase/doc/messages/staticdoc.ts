import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'static-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Alternative way to provide the content for the messages is templating. In this case value property and message service is ignored and only static is displayed.</p>
        </app-docsectiontext>
        <div class="card">
            <p-messages severity="info">
                <ng-template pTemplate>
                    <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" width="32" />
                    <div class="ml-2">Always bet on Prime.</div>
                </ng-template>
            </p-messages>
        </div>
        <app-code [code]="code" selector="messages-static-demo"></app-code>
    </section>`
})
export class StaticDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-messages severity="info">
    <ng-template pTemplate>
        <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" width="32" />
        <div class="ml-2">Always bet on Prime.</div>
    </ng-template>
</p-messages>`,
        html: `
<div class="card">
    <p-messages severity="info">
        <ng-template pTemplate>
            <img src="https://primefaces.org/cdn/primeng/images/primeng.svg" width="32" />
            <div class="ml-2">Always bet on Prime.</div>
        </ng-template>
    </p-messages>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'messages-static-demo',
    templateUrl: './messages-static-demo.html'
})
export class MessagesStaticDemo { }`
    };
}
