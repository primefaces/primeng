import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'clear-doc',
    template: `
        <app-docsectiontext>
            <p>
                Clicking the close icon on the toast, removes it manually. Same can also be achieved programmatically using the clear function of the <i>messageService</i>. Calling it without any arguments, removes all displayed messages whereas
                calling it with a key, removes the messages displayed on a toast having the same key.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-toast key="myKey" />
            <p-button pRipple (click)="show()" label="Show" />
            <p-button pRipple (click)="clear()" label="Clear" severity="secondary" />
        </div>
        <app-code [code]="code" selector="toast-clear-demo"></app-code>
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

    code: Code = {
        basic: `<p-toast key="myKey" />
<p-button 
    pRipple 
    (click)="show()" 
    label="Show" />
<p-button 
    pRipple 
    (click)="clear()" 
    label="Clear" 
    severity="secondary" />`,
        html: `<div class="card flex justify-content-center gap-2">
    <p-toast key="myKey" />
    <p-button 
        pRipple 
        (click)="show()" 
        label="Show" />
    <p-button 
        pRipple 
        (click)="clear()" 
        label="Clear" 
        severity="secondary" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'toast-clear-demo',
    templateUrl: './toast-clear-demo.html',
    standalone: true,
    imports: [ToastModule, ButtonModule, RippleModule],
    providers: [MessageService]
})
export class ToastClearDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ key:'myKey', severity: 'success', summary: 'Message 1', detail: 'Message Content' });
    }

    clear() {
        this.messageService.clear();
    }
}`
    };
}
