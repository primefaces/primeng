import { Component, signal } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'life-doc',
    standalone: true,
    imports: [MessageModule, ButtonModule, AppCode, AppDemoWrapper, AppDocSectionText, CommonModule],
    template: `
        <app-docsectiontext>
            <p>Messages can disappear automatically by defined the <i>life</i> in milliseconds.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center justify-center">
                <p-button label="Show" (onClick)="showMessage()" [disabled]="visible()" styleClass="mb-4" />
                @if (visible()) {
                    <p-message [life]="3000" severity="success">Auto disappear message</p-message>
                }
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
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
