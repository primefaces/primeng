import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Templating allows customizing the content where the message instance is available as the implicit variable.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
                <ng-template let-message pTemplate="message">
                    <div class="flex flex-column align-items-start" style="flex: 1">
                        <div class="flex align-items-center gap-2">
                            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold text-900">Amy Elsner</span>
                        </div>
                        <div class="font-medium text-lg my-3 text-900">{{ message.summary }}</div>
                        <p-button class="p-button-sm" label="Reply" (click)="onConfirm()"></p-button>
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
    constructor(private messageService: MessageService) {}

    visible: boolean = false;

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: 'Can you send me the report?' });
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
        basic: `   <p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
        <ng-template let-message pTemplate="message">
            <div class="flex flex-column align-items-start" style="flex: 1">
                <div class="flex align-items-center gap-2">
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/avatar/amyelsner.png" shape="circle" />
                    <span class="font-bold text-900">Amy Elsner</span>
                </div>
                <div class="font-medium text-lg my-3 text-900">{{ message.summary }}</div>
                <p-button class="p-button-sm" label="Reply" (click)="onConfirm()"></p-button>
            </div>
        </ng-template>
    </p-toast>
<button type="button" pButton pRipple (click)="showConfirm()" label="Confirm"></button>`,
        html: `<div class="card flex justify-content-center">
        <p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
        <ng-template let-message pTemplate="message">
            <div class="flex flex-column align-items-start" style="flex: 1">
                <div class="flex align-items-center gap-2">
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/avatar/amyelsner.png" shape="circle" />
                    <span class="font-bold text-900">Amy Elsner</span>
                </div>
                <div class="font-medium text-lg my-3 text-900">{{ message.summary }}</div>
                <p-button class="p-button-sm" label="Reply" (click)="onConfirm()"></p-button>
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
            this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: 'Can you send me the report?' });
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
