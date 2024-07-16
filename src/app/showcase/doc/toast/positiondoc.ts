import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'position-doc',
    template: `
        <app-docsectiontext>
            <p>Location of the toast is customized with the <i>position</i> property. Valid values are <i>top-left</i>, <i>top-center</i>, <i>top-right</i>, <i>bottom-left</i>, <i>bottom-center</i>, <i>bottom-right</i> and <i>center</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast position="top-left" key="tl" />
            <p-toast position="bottom-left" key="bl" />
            <p-toast position="bottom-right" key="br" />

            <p-button (onClick)="showTopLeft()" label="Top Left" />
            <p-button (onClick)="showBottomLeft()" label="Bottom Left" severity="warning" />
            <p-button (onClick)="showBottomRight()" label="Bottom Right" severity="help" />
        </div>
        <app-code [code]="code" selector="toast-position-demo"></app-code>
    `,
    providers: [MessageService]
})
export class PositionDoc {
    constructor(private messageService: MessageService) {}

    showTopLeft() {
        this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', key: 'tl', life: 3000 });
    }

    showBottomLeft() {
        this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', key: 'bl', life: 3000 });
    }

    showBottomRight() {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', key: 'br', life: 3000 });
    }

    code: Code = {
        basic: `<p-toast position="top-left" key="tl" />
<p-toast position="bottom-left" key="bl" />
<p-toast position="bottom-right" key="br" />

<p-button 
    (onClick)="showTopLeft()" 
    label="Top Left" />
<p-button 
    (onClick)="showBottomLeft()" 
    label="Bottom Left" 
    severity="warning" />
<p-button 
    (onClick)="showBottomRight()" 
    label="Bottom Right" 
    severity="help" />`,

        html: `<div class="card flex justify-content-center gap-2">
    <p-toast position="top-left" key="tl" />
    <p-toast position="bottom-left" key="bl" />
    <p-toast position="bottom-right" key="br" />

    <p-button 
        (onClick)="showTopLeft()" 
        label="Top Left" />
    <p-button 
        (onClick)="showBottomLeft()" 
        label="Bottom Left" 
        severity="warning" />
    <p-button 
        (onClick)="showBottomRight()" 
        label="Bottom Right" 
        severity="help" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'toast-position-demo',
    templateUrl: './toast-position-demo.html',
    standalone: true,
    imports: [ToastModule, ButtonModule, RippleModule],
    providers: [MessageService]
})
export class ToastPositionDemo {
    constructor(private messageService: MessageService) {}

    showTopLeft() {
        this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', key: 'tl', life: 3000 });
    }

    showBottomLeft() {
        this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', key: 'bl', life: 3000 });
    }

    showBottomRight() {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', key: 'br', life: 3000 });
    }
}`
    };
}
