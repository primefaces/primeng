import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Templating allows customizing the content where the message instance is available as the implicit variable.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast position="bottom-center" key="confirm" (onClose)="onReject()" [baseZIndex]="5000">
                <ng-template let-message #message>
                    <div class="flex flex-col items-start flex-auto">
                        <div class="flex items-center gap-2">
                            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold">Amy Elsner</span>
                        </div>
                        <div class="font-medium text-lg my-4">{{ message.summary }}</div>
                        <p-button severity="success" size="small" label="Reply" (click)="onConfirm()" />
                    </div>
                </ng-template>
            </p-toast>
            <p-button (click)="showConfirm()" label="View" />
        </div>
        <app-code [code]="code" selector="toast-template-demo"></app-code>
    `,
    providers: [MessageService]
})
export class TemplateDoc {
    constructor(private messageService: MessageService) {}

    visible: boolean = false;

    code: Code = {
        basic: `<p-toast
    position="bottom-center"
    key="confirm"
    (onClose)="onReject()"
    [baseZIndex]="5000">
        <ng-template let-message #message>
            <div class="flex flex-col items-start flex-auto">
                <div class="flex items-center gap-2">
                    <p-avatar
                        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                        shape="circle" />
                    <span class="font-bold">
                        Amy Elsner
                    </span>
                </div>
                <div class="font-medium text-lg my-4">
                    {{ message.summary }}
                </div>
                <p-button severity="success" size="small" label="Reply" (click)="onConfirm()" />
            </div>
        </ng-template>
</p-toast>
<p-button (click)="showConfirm()" label="View" />`,
        html: `<div class="card flex justify-center">
    <p-toast
        position="bottom-center"
        key="confirm"
        (onClose)="onReject()"
        [baseZIndex]="5000">
            <ng-template let-message #message>
                <div class="flex flex-col items-start flex-auto">
                    <div class="flex items-center gap-2">
                        <p-avatar
                            image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                            shape="circle" />
                        <span class="font-bold">
                            Amy Elsner
                        </span>
                    </div>
                    <div class="font-medium text-lg my-4">
                        {{ message.summary }}
                    </div>
                    <p-button severity="success" size="small" label="Reply" (click)="onConfirm()" />
                </div>
            </ng-template>
    </p-toast>
    <p-button (click)="showConfirm()" label="View" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'toast-template-demo',
    templateUrl: './toast-template-demo.html',
    standalone: true,
    imports: [Toast, ButtonModule, Ripple, AvatarModule],
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

    onConfirm() {
        this.messageService.clear('confirm');
        this.visible = false;
    }

    onReject() {
        this.messageService.clear('confirm');
        this.visible = false;
    }

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({
                key: 'confirm',
                sticky: true,
                severity: 'success',
                summary: 'Can you send me the report?'
            });
            this.visible = true;
        }
    }
}
