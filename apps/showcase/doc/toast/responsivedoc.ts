import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
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
        <app-code [code]="code" selector="toast-responsive-demo"></app-code>
    `,
    providers: [MessageService]
})
export class ResponsiveDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Message Content' });
    }

    code: Code = {
        basic: `<p-toast [breakpoints]="{ '920px': { width: '50%', right: 'auto' } }" />
<p-button (click)="show()" label="Show" />`,
        html: `<div class="card flex justify-center">
    <p-toast [breakpoints]="{ '920px': { width: '50%', right: 'auto' } }" />
    <p-button (click)="show()" label="Show" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'toast-responsive-demo',
    templateUrl: './toast-responsive-demo.html',
    standalone: true,
    imports: [Toast, ButtonModule, Ripple],
    providers: [MessageService]
})
export class ToastResponsiveDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'contrast', summary: 'Success', detail: 'Message Content' });
    }
}`
    };
}
