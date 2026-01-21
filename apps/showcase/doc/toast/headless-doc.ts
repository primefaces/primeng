import { Component, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'headless-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, ToastModule, ButtonModule, ProgressBar],
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
                            <p-progressbar [value]="progress()" [showValue]="false" [style]="{ height: '4px' }" class="!bg-primary/80" />
                            <label class="text-sm font-bold text-white dark:text-black">{{ progress() }}% uploaded</label>
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
        <app-code></app-code>
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
    private messageService = inject(MessageService);

    visible: boolean = false;

    progress = signal(0);

    interval = null;

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
            this.progress.set(0);

            if (this.interval) {
                clearInterval(this.interval);
            }

            this.interval = setInterval(() => {
                if (this.progress() <= 100) {
                    this.progress.update((v) => v + 20);
                }

                if (this.progress() >= 100) {
                    this.progress.set(100);
                    clearInterval(this.interval);
                }
            }, 1000);
        }
    }

    onClose() {
        this.visible = false;
    }
}
