import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Templating allows customizing the content where the message instance is available as the implicit variable.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
                <ng-template let-message pTemplate="message">
                    <div class="flex flex-column" style="flex: 1">
                        <div class="text-center">
                            <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
                            <h4>{{ message.summary }}</h4>
                            <p>{{ message.detail }}</p>
                        </div>
                        <div class="grid p-fluid">
                            <div class="col-6">
                                <button type="button" pButton (click)="onConfirm()" label="Yes" class="p-button-success"></button>
                            </div>
                            <div class="col-6">
                                <button type="button" pButton (click)="onReject()" label="No" class="p-button-secondary"></button>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-toast>
            <button type="button" pButton pRipple (click)="showConfirm()" label="Confirm"></button>
        </div>
        <app-code [code]="code" selector="toast-template-demo"></app-code>
    `,
    providers: [MessageService]
})
export class TemplateDoc {

    visible: boolean = false;

    constructor(private messageService: MessageService) {}

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
            this.visible = true;
        }
    }

    onConfirm() {
        this.messageService.clear('confirm');
        this.visible = false;
    }

    onReject() {
        this.messageService.clear('confirm');
        this.visible = false;
    }

    code: Code = {
        basic: `
<p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
<ng-template let-message pTemplate="message">
    <div class="flex flex-column" style="flex: 1">
        <div class="text-center">
            <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
            <h4>{{message.summary}}</h4>
            <p>{{message.detail}}</p>
        </div>
        <div class="grid p-fluid">
            <div class="col-6">
                <button type="button" pButton (click)="onConfirm()" label="Yes" class="p-button-success"></button>
            </div>
            <div class="col-6">
                <button type="button" pButton (click)="onReject()" label="No" class="p-button-secondary"></button>
            </div>
        </div>
    </div>
</ng-template>
</p-toast>
<button type="button" pButton pRipple (click)="showConfirm()" label="Confirm"></button>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
        <ng-template let-message pTemplate="message">
            <div class="flex flex-column" style="flex: 1">
                <div class="text-center">
                    <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
                    <h4>{{message.summary}}</h4>
                    <p>{{message.detail}}</p>
                </div>
                <div class="grid p-fluid">
                    <div class="col-6">
                        <button type="button" pButton (click)="onConfirm()" label="Yes" class="p-button-success"></button>
                    </div>
                    <div class="col-6">
                        <button type="button" pButton (click)="onReject()" label="No" class="p-button-secondary"></button>
                    </div>
                </div>
            </div>
        </ng-template>
    </p-toast>
    <button type="button" pButton pRipple (click)="showConfirm()" label="Confirm"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-template-demo',
    templateUrl: './toast-template-demo.html',
    providers: [MessageService]
})
export class ToastTemplateDemo {
    constructor(private messageService: MessageService) {}

    visible: boolean = false;

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
            this.visible = true;
        }
    }

    onConfirm() {
        this.messageService.clear('confirm');
        this.visible = false;
    }

    onReject() {
        this.messageService.clear('confirm');
        this.visible = false;
    }
}`
    };
}
