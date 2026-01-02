import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'clear-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, Toast, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                Clicking the close icon on the toast, removes it manually. Same can also be achieved programmatically using the clear function of the <i>messageService</i>. Calling it without any arguments, removes all displayed messages whereas
                calling it with a key, removes the messages displayed on a toast having the same key.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-toast key="myKey" />
            <p-button (click)="show()" label="Show" />
            <p-button (click)="clear()" label="Clear" severity="secondary" />
        </div>
        <app-code selector="toast-clear-demo"></app-code>
    `,
    providers: [MessageService]
})
export class ClearDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ key: 'myKey', severity: 'success', summary: 'Message 1', detail: 'Message Content' });
    }

    clear() {
        this.messageService.clear();
    }
}
