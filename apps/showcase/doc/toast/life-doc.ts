import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'life-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, ToastModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>A toast disappears after 3000ms by default, set the <i>life</i> option on either the message or toast to override this.</p>
        </app-docsectiontext>
        <p-toast [life]="10000" />
        <app-demo-wrapper>
            <div class="flex justify-center gap-2">
                <p-button (click)="showLife()" label="Show Life" />
                <p-button (click)="showLifeLong()" label="Show Life Long" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [MessageService]
})
export class LifeDoc {
    constructor(private messageService: MessageService) {}

    showLife() {
        this.messageService.add({ severity: 'info', summary: 'Life', detail: 'I show for 10000ms' });
    }

    showLifeLong() {
        this.messageService.add({ severity: 'info', summary: 'Life', detail: 'I show for 20000ms', life: 20000 });
    }
}
