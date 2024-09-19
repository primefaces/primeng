import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'responsive-doc',
    template: `
        <app-docsectiontext>
            <p>
                Toast styling can be adjusted per screen size with the <i>breakpoints</i> option. The value of <i>breakpoints</i> should be an object literal whose keys are the maximum screen sizes and values are the styles per screen. In example
                below, width of the toast messages cover the whole page on screens whose widths is smaller than 921px.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }" />
            <p-button (onClick)="show()" label="Show" />
        </div>
        <app-code [code]="code" selector="toast-responsive-demo"></app-code>
    `,
    providers: [MessageService]
})
export class ResponsiveDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    code: Code = {
        basic: `<p-toast [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }" />
<p-button (onClick)="show()" label="Show" />`,
        html: `<div class="card flex justify-content-center">
    <p-toast [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }" />
    <p-button (onClick)="show()" label="Show" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'toast-responsive-demo',
    templateUrl: './toast-responsive-demo.html',
    standalone: true,
    imports: [ToastModule, ButtonModule, RippleModule],
    providers: [MessageService]
})
export class ToastResponsiveDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
}`
    };
}
