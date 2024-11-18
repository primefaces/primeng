import { Code } from '@/domain/code';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
            <p>Multiple messages can be displayed using the standard <i>for</i> block.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center justify-center gap-4">
            <div class="flex gap-2">
                <p-button label="Show" (onClick)="addMessages()" />
                <p-button label="Clear" severity="secondary" (onClick)="clearMessages()" />
            </div>
            <div class="flex flex-col">
                @for (message of messages(); track message; let first = $first) {
                    <p-message [severity]="message.severity" [text]="message.content" [ngClass]="{ 'mt-4': !first }" [closable]="message?.closable" />
                }
            </div>
        </div>
        <app-code [code]="code" selector="message-dynamic-demo"></app-code>
    `
})
export class DynamicDoc {
    messages = signal<any[]>([]);

    code: Code = {
        basic: `<div class="flex gap-2">
    <p-button label="Show" (onClick)="addMessages()" />
    <p-button label="Clear" severity="secondary" (onClick)="clearMessages()" />
</div>
<div class="flex flex-col">
    @for (message of messages(); track message; let first = $first) {
        <p-message [severity]="message.severity" [text]="message.content" [ngClass]="{ 'mt-4': !first }" />
    }
</div>`,

        html: `<div class="card flex flex-col items-center justify-center gap-4">
    <div class="flex gap-2">
        <p-button label="Show" (onClick)="addMessages()" />
        <p-button label="Clear" severity="secondary" (onClick)="clearMessages()" />
    </div>
    <div class="flex flex-col">
        @for (message of messages(); track message; let first = $first) {
            <p-message [severity]="message.severity" [text]="message.content" [ngClass]="{ 'mt-4': !first }" />
        }
    </div>
</div>`,

        typescript: `import { Component, signal } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'message-dynamic-demo',
    templateUrl: './message-dynamic-demo.html',
    standalone: true,
    imports: [Message, ButtonModule]
})
export class MessageDynamicDemo {
    messages = signal<any[]>([]);

    addMessages() {
        this.messages.set([
            { severity: 'info', content: 'Dynamic Info Message' },
            { severity: 'success', content: 'Dynamic Success Message' },
            { severity: 'warn', content: 'Dynamic Warn Message' },
        ]);
    }

    clearMessages() {
        this.messages.set([]);
    }
}`
    };

    clearMessages() {
        this.messages.set([]);
    }

    addMessages() {
        this.messages.set([
            { severity: 'info', content: 'Dynamic Info Message' },
            { severity: 'success', content: 'Dynamic Success Message' },
            { severity: 'warn', content: 'Dynamic Warn Message' }
        ]);
    }
}
