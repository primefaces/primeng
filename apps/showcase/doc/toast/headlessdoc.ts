import { Code } from '@/domain/code';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'headless-doc',
    template: `
        <app-docsectiontext>
            <p><i>Headless</i> mode allows you to customize the entire user interface instead of the default elements.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast position="top-center" key="confirm" (onClose)="onClose()" [baseZIndex]="5000">
                <ng-template let-message #headless let-closeFn="closeFn">
                    <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
                        <div class="flex items-center gap-5">
                            <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
                            <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p-progressbar [value]="progress" [showValue]="false" [style]="{ height: '4px' }" styleClass="!bg-primary/80" />
                            <label class="text-sm font-bold text-white dark:text-black">{{ progress }}% uploaded</label>
                        </div>
                        <div class="flex gap-4 mb-4 justify-end">
                            <p-button label="Another Upload?" (click)="closeFn($event)" size="small" />
                            <p-button label="Cancel" (click)="closeFn($event)" size="small" />
                        </div>
                    </section>
                </ng-template>
            </p-toast>
            <p-button (click)="showConfirm()" label="Confirm" />
        </div>
        <app-code [code]="code" selector="toast-headless-demo"></app-code>
    `,
    styles: [
        `
            :host ::ng-deep {
                .p-progressbar-value {
                    --tw-bg-opacity: 1 !important;
                    background-color: color-mix(in srgb, var(--p-primary-50) calc(100% * var(--tw-bg-opacity)), transparent) !important;
                }
            }
        `
    ],
    providers: [MessageService]
})
export class HeadlessDoc {
    visible: boolean = false;

    progress: number = 0;

    interval = null;

    constructor(
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) {}

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({
                key: 'confirm',
                sticky: true,
                severity: 'custom',
                summary: 'Uploading your files.',
                styleClass: 'backdrop-blur-lg rounded-2xl'
            });
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
    <ng-template let-message #headless let-closeFn="closeFn">
        <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
            <div class="flex items-center gap-5">
                <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
                <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
            </div>
            <div class="flex flex-col gap-2">
                <p-progressbar
                    [value]="progress"
                    [showValue]="false"
                    [style]="{ height: '4px' }"
                    styleClass="!bg-primary/80"
                />
                <label class="text-sm font-bold text-white dark:text-black">{{ progress }}% uploaded</label>
            </div>
            <div class="flex gap-4 mb-4 justify-end">
                <p-button label="Another Upload?" (click)="closeFn($event)" size="small" />
                <p-button label="Cancel" (click)="closeFn($event)" size="small" />
            </div>
        </section>
    </ng-template>
</p-toast>
<p-button (click)="showConfirm()" label="Confirm" />`,
        html: `<div class="card flex justify-center">
    <p-toast position="top-center" key="confirm" (onClose)="onClose()" [baseZIndex]="5000">
        <ng-template let-message #headless let-closeFn="closeFn">
            <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
                <div class="flex items-center gap-5">
                    <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
                    <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
                </div>
                <div class="flex flex-col gap-2">
                    <p-progressbar
                        [value]="progress"
                        [showValue]="false"
                        [style]="{ height: '4px' }"
                        styleClass="!bg-primary/80"
                    />
                    <label class="text-sm font-bold text-white dark:text-black">{{ progress }}% uploaded</label>
                </div>
                <div class="flex gap-4 mb-4 justify-end">
                    <p-button label="Another Upload?" (click)="closeFn($event)" size="small" />
                    <p-button label="Cancel" (click)="closeFn($event)" size="small" />
                </div>
            </section>
        </ng-template>
    </p-toast>
    <p-button (click)="showConfirm()" label="Confirm" />
</div>`,
        typescript: `import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'toast-headless-demo',
    templateUrl: './toast-headless-demo.html',
    standalone: true,
    imports: [Toast, ButtonModule, Ripple, ProgressBar],
    providers: [MessageService]
})
export class ToastHeadlessDemo {

    visible: boolean = false;

    progress: number = 0;

    interval = null;

    constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) {}

    showConfirm() {
        if (!this.visible) {
            this.messageService.add({
                key: 'confirm',
                sticky: true,
                severity: 'custom',
                summary: 'Uploading your files.',
                styleClass: 'backdrop-blur-lg rounded-2xl',
            });
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
}`
    };
}
