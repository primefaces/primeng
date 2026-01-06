import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'dynamic-doc',
    standalone: true,
    imports: [CommonModule, MessageModule, ButtonModule, AppCodeModule, AppDocSectionText],
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
                @for (message of messages(); track message.severity; let first = $first) {
                    <p-message [severity]="message.severity" [text]="message.content" [ngClass]="{ 'mt-4': !first }" [closable]="message?.closable" />
                }
            </div>
        </div>
        <app-code></app-code>
    `
})
export class DynamicDoc {
    messages = signal<any[]>([]);

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
