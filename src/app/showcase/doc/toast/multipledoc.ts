import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'toast-multiple-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Multiple toasts are displayed by passing an array to the <i>showAll</i> method of the <i>messageService</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <button type="button" pButton pRipple (click)="showMultiple()" label="Show Multiple"></button>
        </div>
        <app-code [code]="code" selector="toast-multiple-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class MultipleDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {}

    showMultiple() {
        this.messageService.addAll([
            { severity: 'success', summary: 'Message 1', detail: 'Message Content' },
            { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
            { severity: 'warn', summary: 'Message 3', detail: 'Message Content' }
        ]);
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<button type="button" pButton pRipple (click)="showMultiple()" label="Show Multiple"></button>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <button type="button" pButton pRipple (click)="showMultiple()" label="Show Multiple"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-multiple-demo',
    templateUrl: './toast-multiple-demo.html',
    providers: [MessageService]
})
export class ToastMultipleDemo {
    constructor(private messageService: MessageService) {}

    showMultiple() {
        this.messageService.addAll([
            { severity: 'success', summary: 'Message 1', detail: 'Message Content' },
            { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
            { severity: 'warn', summary: 'Message 3', detail: 'Message Content' }
        ]);
    }
}`
    };
}
