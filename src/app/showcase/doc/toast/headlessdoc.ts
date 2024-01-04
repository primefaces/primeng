import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'headless-doc',
    template: `
        <app-docsectiontext>
            <p><i>Headless</i> mode allows you to customize the entire user interface instead of the default elements.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast position="top-center" key="confirm" (onClose)="onClose()" [baseZIndex]="5000">
                <ng-template let-message pTemplate="headless" let-closeFn="closeFn">
                    <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2" style="border-radius: 10px">
                        <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
                        <div class="flex flex-column gap-3 w-full">
                            <p class="m-0 font-semibold text-base text-white">{{ message.summary }}</p>
                            <p class="m-0 text-base text-700">{{ message.detail }}</p>
                            <div class="flex flex-column gap-2">
                                <p-progressBar [value]="progress" [showValue]="false" [style]="{ height: '4px' }"></p-progressBar>
                                <label class="text-right text-xs text-white">{{ progress }}% uploaded...</label>
                            </div>
                            <div class="flex gap-3 mb-3">
                                <p-button label="Another Upload?" text="true" styleClass="p-0" (click)="closeFn($event)"></p-button>
                                <p-button label="Cancel" text="true" styleClass="text-white p-0" (click)="closeFn($event)"></p-button>
                            </div>
                        </div>
                    </section>
                </ng-template>
            </p-toast>
            <button type="button" pButton pRipple (click)="showConfirm()" label="Confirm"></button>
        </div>
        <app-code [code]="code" selector="toast-headless-demo"></app-code>
    `,
    providers: [MessageService]
})
export class HeadlessDoc {
    constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) {}

    visible: boolean = false;

    progress: number = 0;

    interval = null;

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({ key: 'confirm', sticky: true, severity: 'custom', summary: 'Uploading your files.' });
            this.visible = true;
            this.progress = 0;

            if (this.interval) {
                clearInterval(this.interval);
            }

            this.interval = setInterval(() => {
                if (this.progress <= 100) {
                    this.progress = this.progress + 20;
                }

                if (this.progress >= 100) {
                    this.progress = 100;
                    clearInterval(this.interval);
                }
                this.cdr.markForCheck();
            }, 1000);
        }
    }

    onClose() {
        this.visible = false;
    }

    code: Code = {
        basic: `<p-toast position="top-center" key="confirm" (onClose)="onClose()" [baseZIndex]="5000">
 <ng-template let-message pTemplate="headless" let-closeFn="closeFn">
     <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2" style="border-radius: 10px">
         <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
         <div class="flex flex-column gap-3 w-full">
             <p class="m-0 font-semibold text-base text-white">{{ message.summary }}</p>
             <p class="m-0 text-base text-700">{{ message.detail }}</p>
             <div class="flex flex-column gap-2">
                 <p-progressBar [value]="progress" [showValue]="false" [style]="{ height: '4px' }"></p-progressBar>
                 <label class="text-right text-xs text-white">{{ progress }}% uploaded...</label>
             </div>
             <div class="flex gap-3 mb-3">
                 <p-button label="Another Upload?" text="true" styleClass="p-0" (click)="closeFn($event)"></p-button>
                 <p-button label="Cancel" text="true" styleClass="text-white p-0" (click)="closeFn($event)"></p-button>
             </div>
         </div>
     </section>
 </ng-template>
</p-toast>
<button type="button" pButton pRipple (click)="showConfirm()" label="Confirm"></button>`,
        html: `<div class="card flex justify-content-center">
    <p-toast position="top-center" key="confirm" (onClose)="onClose()" [baseZIndex]="5000">
    <ng-template let-message pTemplate="headless" let-closeFn="closeFn">
        <section class="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2" style="border-radius: 10px">
            <i class="pi pi-cloud-upload text-primary-500 text-2xl"></i>
            <div class="flex flex-column gap-3 w-full">
                <p class="m-0 font-semibold text-base text-white">{{ message.summary }}</p>
                <p class="m-0 text-base text-700">{{ message.detail }}</p>
                <div class="flex flex-column gap-2">
                    <p-progressBar [value]="progress" [showValue]="false" [style]="{ height: '4px' }"></p-progressBar>
                    <label class="text-right text-xs text-white">{{ progress }}% uploaded...</label>
                </div>
                <div class="flex gap-3 mb-3">
                    <p-button label="Another Upload?" text="true" styleClass="p-0" (click)="closeFn($event)"></p-button>
                    <p-button label="Cancel" text="true" styleClass="text-white p-0" (click)="closeFn($event)"></p-button>
                </div>
            </div>
        </section>
    </ng-template>
    </p-toast>
    <button type="button" pButton pRipple (click)="showConfirm()" label="Confirm"></button>
</div>`,
        typescript: `
import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'toast-headless-demo',
    templateUrl: './toast-headless-demo.html',
    providers: [MessageService]
})
export class ToastHeadlessDemo {
    constructor(private messageService: MessageService,private cdr:ChangeDetectorRef) {}

    visible: boolean = false;

    progress: number = 0;

    interval = null;

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({ key: 'confirm', sticky: true, severity: 'custom', summary: 'Uploading your files.' });
            this.visible = true;
            this.progress = 0;

            if (this.interval) {
                clearInterval(this.interval);
            }

            this.interval = setInterval(() => {
                if (this.progress <= 100) {
                    this.progress = this.progress + 20;
                }

                if (this.progress >= 100) {
                    this.progress = 100;
                    clearInterval(this.interval);
                }
                this.cdr.detectChanges()
            }, 1000);
        }
    }

    onClose() {
        this.visible = false;
    }
}`
    };
}
