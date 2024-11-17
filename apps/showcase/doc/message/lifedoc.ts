import { Code } from '@/domain/code';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'life-doc',
    template: `
        <app-docsectiontext>
            <p>Messages can disappear automatically by defined the <i>life</i> in milliseconds.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center justify-center gap-4">
            <p-button label="Show" (onClick)="showMessage()" [disabled]="visible()" />
            @if (visible()) {
                <p-message [life]="3000" severity="success">Auto disappear message</p-message>
            }
        </div>
        <app-code [code]="code" selector="message-life-demo"></app-code>
    `
})
export class LifeDoc {
    visible = signal(false);

    showMessage() {
        this.visible.set(true);

        setTimeout(() => {
            this.visible.set(false);
        }, 3500);
    }

    code: Code = {
        basic: `<p-message [life]="3000" severity="success">Auto disappear message</p-message>`,

        html: `<div class="card flex flex-col items-center justify-center gap-4">
    <p-button label="Show" (onClick)="showMessage()" [disabled]="visible()" />
    @if (visible()) {
        <p-message [life]="3000" severity="success">Auto disappear message</p-message>
    }
</div>`,

        typescript: `import { Component, signal } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'message-life-demo',
    templateUrl: './message-life-demo.html',
    standalone: true,
    imports: [Message, ButtonModule]
})
export class MessageLifeDemo {
    visible = signal(false);

    showMessage() {
        this.visible.set(true);

        setTimeout(() => {
            this.visible.set(false);
        }, 3500);
    }
}`
    };
}
