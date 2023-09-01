import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'remove-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                A toast may be removed programmatically by its <i>id</i>.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast key="myKey"></p-toast>
            <button type="button" pButton pRipple (click)="show()" label="Show"></button>
            <button type="button" pButton pRipple (click)="remove(1)" label="Remove" class="p-button-secondary"></button>
        </div>
        <app-code [code]="code" selector="toast-remove-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class RemoveDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.addAll([
            { id: 1, key: 'myKey', severity: 'success', summary: 'Message 1', detail: 'Message Content', life: 60000 },
            { id: 2, key: 'myKey', severity: 'success', summary: 'Message 2', detail: 'Message Content', life: 60000 }
        ]);
    }

    remove(id: any) {
        this.messageService.remove(id);
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<button type="button" pButton pRipple (click)="show()" label="Show"></button>
<button type="button" pButton pRipple (click)="remove(1)" label="Remove" class="p-button-secondary"></button>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-toast></p-toast>
    <button type="button" pButton pRipple (click)="show()" label="Show"></button>
    <button type="button" pButton pRipple (click)="remove(1)" label="Remove" class="p-button-secondary"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-remove-demo',
    templateUrl: './toast-remove-demo.html',
    providers: [MessageService]
})
export class ToastRemoveDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.addAll([
            { id: 1, key: 'myKey', severity: 'success', summary: 'Message 1', detail: 'Message Content', life: 60000 },
            { id: 2, key: 'myKey', severity: 'success', summary: 'Message 2', detail: 'Message Content', life: 60000 }
        ]);
    }

    remove(id: any) {
        this.messageService.remove(id);
    }
}`
    };
}
