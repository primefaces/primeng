import { Component, signal } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'life-doc',
    standalone: true,
    imports: [MessageModule, ButtonModule, AppCodeModule, AppDocSectionText, CommonModule],
    template: `
        <app-docsectiontext>
            <p>Messages can disappear automatically by defined the <i>life</i> in milliseconds.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center justify-center">
            <p-button label="Show" (onClick)="showMessage()" [disabled]="visible()" styleClass="mb-4" />
            @if (visible()) {
                <p-message [life]="3000" severity="success">Auto disappear message</p-message>
            }
        </div>
        <app-code selector="message-life-demo"></app-code>
    `
})
export class LifeDoc {
    visible = signal(false);

    showMessage() {
        this.visible.set(true);

        setTimeout(() => {
            this.visible.set(false);
        }, 3000);
    }
}
