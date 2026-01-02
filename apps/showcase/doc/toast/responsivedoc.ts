import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'responsive-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, ToastModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                Toast styling can be adjusted per screen size with the <i>breakpoints</i> option. The value of <i>breakpoints</i>
                should be an object literal whose keys are the maximum screen sizes and values are the styles per screen.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast [breakpoints]="{ '920px': { width: '50%', right: 'auto' } }" />
            <p-button (click)="show()" label="Show" />
        </div>
        <app-code selector="toast-responsive-demo"></app-code>
    `,
    providers: [MessageService]
})
export class ResponsiveDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Message Content' });
    }
}
