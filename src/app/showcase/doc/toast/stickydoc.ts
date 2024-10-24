import { Component } from '@angular/core';
import { MessageService } from 'primengrtl/api';
import { Code } from '@domain/code';

@Component({
    selector: 'sticky-doc',
    template: `
        <app-docsectiontext>
            <p>A toast disappears after the time defined by the <i>life</i> option, set <i>sticky</i> option <i>true</i> on the message to override this and not hide the toast automatically.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast />
            <div class="flex flex-wrap gap-2">
                <p-button (onClick)="show()" severity="success" label="Sticky" />
                <p-button (onClick)="clear()" label="Clear" />
            </div>
        </div>
        <app-code [code]="code" selector="toast-sticky-demo"></app-code>
    `,
    providers: [MessageService]
})
export class StickyDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    }

    clear() {
        this.messageService.clear();
    }

    code: Code = {
        basic: `<p-toast />
<div class="flex flex-wrap gap-2">
    <p-button
        (onClick)="show()"
        severity="success"
        label="Sticky" />
    <p-button
        (onClick)="clear()"
        label="Clear" />
</div>`,
        html: `<div class="card flex justify-content-center">
    <p-toast />
    <div class="flex flex-wrap gap-2">
        <p-button
            (onClick)="show()"
            severity="success"
            label="Sticky" />
        <p-button
            (onClick)="clear()"
            label="Clear" />
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primengrtl/api';
import { ToastModule } from 'primengrtl/toast';
import { ButtonModule } from 'primengrtl/button';
import { RippleModule } from 'primengrtl/ripple';

@Component({
    selector: 'toast-sticky-demo',
    templateUrl: './toast-sticky-demo.html',
    standalone: true,
    imports: [ToastModule, ButtonModule, RippleModule],
    providers: [MessageService]
})
export class ToastStickyDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
    }

    clear() {
        this.messageService.clear();
    }
}`
    };
}
