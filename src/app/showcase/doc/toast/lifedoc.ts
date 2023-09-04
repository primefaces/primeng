import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'life-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>A toast disappears after 3000ms by default, set the <i>life</i> option on either the message or toast to override this.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast [life]="10000"></p-toast>
            <button type="button" pButton pRipple (click)="showLife()" label="Show Life"></button>
            <button type="button" pButton pRipple (click)="showLifeLong()" label="Show Life Long"></button>
        </div>
        <app-code [code]="code" selector="toast-life-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class LifeDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {}

    showLife() {
        this.messageService.add({ severity: 'info', summary: 'Life', detail: 'I show for 10000ms' });
    }

    showLifeLong() {
        this.messageService.add({ severity: 'info', summary: 'Life', detail: 'I show for 20000ms', life: 20000 });
    }

    code: Code = {
        basic: `
<p-toast [life]="10000"></p-toast>
<button type="button" pButton pRipple (click)="showLife()" label="Show Life Default"></button>
<button type="button" pButton pRipple (click)="showLifeLong()" label="Show Life Long"></button>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast [life]="10000"></p-toast>
    <button type="button" pButton pRipple (click)="showLife()" label="Show Life Default"></button>
    <button type="button" pButton pRipple (click)="showLifeLong()" label="Show Life Long"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-life-demo',
    templateUrl: './toast-life-demo.html',
    providers: [MessageService]
})
export class ToastLifeDemo {
    constructor(private messageService: MessageService) {}

    showLifeDefault() {
        this.messageService.add({ severity: 'info', summary: 'Life', detail: 'I show for 10000ms' });
    }

    showLifeLong() {
        this.messageService.add({ severity: 'info', summary: 'Life', detail: 'I show for 20000ms', life: 20000 });
    }
}`
    };
}
