import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'position-doc',
    template: `
        <app-docsectiontext>
            <p>Location of the toast is customized with the <i>position</i> property. Valid values are <i>top-left</i>, <i>top-center</i>, <i>top-right</i>, <i>bottom-left</i>, <i>bottom-center</i>, <i>bottom-right</i> and <i>center</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast position="top-left" key="tl"></p-toast>
            <p-toast position="top-center" key="tc"></p-toast>
            <p-toast position="bottom-center" key="bc"></p-toast>
            <button type="button" pButton pRipple (click)="showTopLeft()" label="Top Left"></button>
            <button type="button" pButton pRipple (click)="showTopCenter()" label="Top Center" class="p-button-warning"></button>
            <button type="button" pButton pRipple (click)="showBottomCenter()" label="Bottom Center" class="p-button-success"></button>
        </div>
        <app-code [code]="code" selector="toast-position-demo"></app-code>
    `,
    providers: [MessageService]
})
export class PositionDoc {
    constructor(private messageService: MessageService) {}

    showTopLeft() {
        this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showTopCenter() {
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    }

    showBottomCenter() {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    code: Code = {
        basic: `<p-toast position="top-left" key="tl"></p-toast>
<p-toast position="top-center" key="tc"></p-toast>
<p-toast position="bottom-center" key="bc"></p-toast>
<button type="button" pButton pRipple (click)="showTopLeft()" label="Top Left"></button>
<button type="button" pButton pRipple (click)="showTopCenter()" label="Top Center" class="p-button-warning"></button>
<button type="button" pButton pRipple (click)="showBottomCenter()" label="Bottom Center" class="p-button-success"></button>`,

        html: `
<div class="card flex justify-content-center gap-2">
    <p-toast position="top-left" key="tl"></p-toast>
    <p-toast position="top-center" key="tc"></p-toast>
    <p-toast position="bottom-center" key="bc"></p-toast>
    <button type="button" pButton pRipple (click)="showTopLeft()" label="Top Left"></button>
    <button type="button" pButton pRipple (click)="showTopCenter()" label="Top Center" class="p-button-warning"></button>
    <button type="button" pButton pRipple (click)="showBottomCenter()" label="Bottom Center" class="p-button-success"></button>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-position-demo',
    templateUrl: './toast-position-demo.html',
    providers: [MessageService]
})
export class ToastPositionDemo {
    constructor(private messageService: MessageService) {}

    showTopLeft() {
        this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
    }

    showTopCenter() {
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
    }

    showBottomCenter() {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
}`
    };
}
