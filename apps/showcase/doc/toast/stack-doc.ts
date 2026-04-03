import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'stack-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ToastModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                Setting <i>mode</i> to <i>stack</i> displays toasts in a stacked layout. Toasts visually overlap with a subtle scale effect and expand on hover to reveal all messages. Use <i>stackGap</i> to control spacing and
                <i>stackVisibleLimit</i> to set the maximum number of visible toasts.
            </p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-toast key="stack" mode="stack" />
            <div class="flex justify-center gap-2">
                <p-button (onClick)="show()" label="Show" />
                <p-button (onClick)="showMultiple()" label="Multiple" severity="secondary" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [MessageService]
})
export class StackDoc {
    private messageService = inject(MessageService);
    private counter = 0;
    private severities = ['info', 'success', 'warn', 'error'];

    show() {
        const sev = this.severities[this.counter++ % this.severities.length];
        this.messageService.add({
            severity: sev,
            summary: sev.charAt(0).toUpperCase() + sev.slice(1),
            detail: 'Toast message content',
            key: 'stack',
            life: 10000
        });
    }

    showMultiple() {
        this.messageService.addAll([
            { severity: 'info', summary: 'Info', detail: 'Message 1', key: 'stack', life: 10000 },
            { severity: 'success', summary: 'Success', detail: 'Message 2', key: 'stack', life: 10000 },
            { severity: 'warn', summary: 'Warning', detail: 'Message 3', key: 'stack', life: 10000 }
        ]);
    }
}
