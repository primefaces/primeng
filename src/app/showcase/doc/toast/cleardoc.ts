import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'clear-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Clicking the close icon on the toast, removes it manually. Same can also be achieved programmatically using the clear function of the <i>messageService</i>. Calling it without any arguments, removes all displayed messages whereas
                calling it with a key, removes the messages displayed on a toast having the same key.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast key="myKey"></p-toast>
            <button type="button" pButton pRipple (click)="show()" label="Show"></button>
            <button type="button" pButton pRipple (click)="clear()" label="Clear" class="p-button-secondary"></button>
        </div>
        <app-code [code]="code" selector="toast-clear-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class ClearDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ key: 'myKey', severity: 'success', summary: 'Message 1', detail: 'Message Content' });
    }

    clear() {
        this.messageService.clear();
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<button type="button" pButton pRipple (click)="show()" label="Show"></button>
<button type="button" pButton pRipple (click)="clear()" label="Clear" class="p-button-secondary"></button>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-toast></p-toast>
    <button type="button" pButton pRipple (click)="show()" label="Show"></button>
    <button type="button" pButton pRipple (click)="clear()" label="Clear" class="p-button-secondary"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-clear-demo',
    templateUrl: './toast-clear-demo.html',
    providers: [MessageService]
})
export class ToastClearDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ key:'myKey', severity: 'success', summary: 'Message 1', detail: 'Message Content' });
    }

    clear() {
        this.messageService.clear();
    }
}`
    };
}
