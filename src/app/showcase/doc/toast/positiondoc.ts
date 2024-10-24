import { Component } from '@angular/core';
import { MessageService } from 'primengrtl/api';
import { Code } from '@domain/code';

@Component({
    selector: 'position-doc',
    template: `
        <app-docsectiontext>
            <p>Location of the toast is customized with the <i>position</i> property. Valid values are <i>top-start</i>, <i>top-center</i>, <i>top-end</i>, <i>bottom-start</i>, <i>bottom-center</i>, <i>bottom-end</i> and <i>center</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast position="top-start" key="tl" />
            <p-toast position="bottom-start" key="bl" />
            <p-toast position="bottom-end" key="br" />

            <p-button (onClick)="showTopStart()" label="Top Start" />
            <p-button (onClick)="showBottomStart()" label="Bottom Start" severity="warning" />
            <p-button (onClick)="showBottomEnd()" label="Bottom End" severity="help" />
        </div>
        <app-code [code]="code" selector="toast-position-demo"></app-code>
    `,
    providers: [MessageService]
})
export class PositionDoc {
    constructor(private messageService: MessageService) {}

    showTopStart() {
        this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', key: 'tl', life: 3000 });
    }

    showBottomStart() {
        this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', key: 'bl', life: 3000 });
    }

    showBottomEnd() {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', key: 'br', life: 3000 });
    }

    code: Code = {
        basic: `<p-toast position="top-start" key="tl" />
<p-toast position="bottom-start" key="bl" />
<p-toast position="bottom-end" key="br" />

<p-button
    (onClick)="showTopStart()"
    label="Top Start" />
<p-button
    (onClick)="showBottomStart()"
    label="Bottom Start"
    severity="warning" />
<p-button
    (onClick)="showBottomEnd()"
    label="Bottom End"
    severity="help" />`,

        html: `<div class="card flex justify-content-center gap-2">
    <p-toast position="top-start" key="tl" />
    <p-toast position="bottom-start" key="bl" />
    <p-toast position="bottom-end" key="br" />

    <p-button
        (onClick)="showTopStart()"
        label="Top Start" />
    <p-button
        (onClick)="showBottomStart()"
        label="Bottom Start"
        severity="warning" />
    <p-button
        (onClick)="showBottomEnd()"
        label="Bottom End"
        severity="help" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primengrtl/api';
import { ToastModule } from 'primengrtl/toast';
import { ButtonModule } from 'primengrtl/button';
import { RippleModule } from 'primengrtl/ripple';

@Component({
    selector: 'toast-position-demo',
    templateUrl: './toast-position-demo.html',
    standalone: true,
    imports: [ToastModule, ButtonModule, RippleModule],
    providers: [MessageService]
})
export class ToastPositionDemo {
    constructor(private messageService: MessageService) {}

    showTopStart() {
        this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', key: 'tl', life: 3000 });
    }

    showBottomStart() {
        this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', key: 'bl', life: 3000 });
    }

    showBottomEnd() {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', key: 'br', life: 3000 });
    }
}`
    };
}
