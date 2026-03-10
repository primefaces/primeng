import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'target-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ToastModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                A page may have multiple toast components, in case you'd like to target a specific message to a particular toast, use the
                <i>key</i> property so that toast and the message can match.
            </p>
        </app-docsectiontext>
        <p-toast key="toast1" />
        <p-toast key="toast2" />
        <app-demo-wrapper>
            <div class="flex justify-center gap-2">
                <p-button (click)="showToast1()" label="Show Success" />
                <p-button (click)="showToast2()" label="Show Warning" severity="warn" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [MessageService]
})
export class TargetDoc {
    constructor(private messageService: MessageService) {}

    showToast1() {
        this.messageService.clear();
        this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Success', detail: 'key: toast1' });
    }

    showToast2() {
        this.messageService.clear();
        this.messageService.add({ key: 'toast2', severity: 'warn', summary: 'Warning', detail: 'key: toast2' });
    }
}
