import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'responsive-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ToastModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                Toast styling can be adjusted per screen size with the <i>breakpoints</i> option. The value of <i>breakpoints</i>
                should be an object literal whose keys are the maximum screen sizes and values are the styles per screen.
            </p>
        </app-docsectiontext>
        <p-toast [breakpoints]="{ '920px': { width: '50%', right: 'auto' } }" />
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-button (click)="show()" label="Show" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [MessageService]
})
export class ResponsiveDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Message Content' });
    }
}
