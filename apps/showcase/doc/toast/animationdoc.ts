import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'animation-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, ToastModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Transition of the animations can be customized using the <i>enterAnimation</i>, <i>leaveAnimation</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast enterAnimation="custom-enter-animation" leaveAnimation="custom-leave-animation" />
            <p-button (click)="show()" label="Show" />
        </div>
        <app-code [code]="code" selector="toast-animation-demo"></app-code>
    `,
    styles: `
        :host ::ng-deep .custom-enter-animation {
            animation: custom-enter-animation 450ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host ::ng-deep .custom-leave-animation {
            animation: custom-leave-animation 250ms cubic-bezier(0.4, 0, 1, 1);
        }

        @keyframes custom-enter-animation {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(-50%);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes custom-leave-animation {
            from {
                max-height: 1000px;
                opacity: 1;
                transform: scale(1);
            }
            to {
                max-height: 0;
                opacity: 0;
                transform: scale(0.8);
                margin-bottom: 0;
                overflow: hidden;
            }
        }
    `,
    providers: [MessageService]
})
export class AnimationDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    code: Code = {
        basic: `<p-toast enterAnimation="custom-enter-animation" leaveAnimation="custom-leave-animation" />
<p-button (click)="show()" label="Show" />`,
        html: `<div class="card flex justify-center">
    <p-toast enterAnimation="custom-enter-animation" leaveAnimation="custom-leave-animation" />
    <p-button (click)="show()" label="Show" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'toast-animation-demo',
    templateUrl: './toast-animation-demo.html',
    standalone: true,
    imports: [ToastModule, ButtonModule],
    providers: [MessageService]
})
export class ToastAnimationDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
}`,
        scss: `
:host ::ng-deep .custom-enter-animation {
    animation: custom-enter-animation 450ms cubic-bezier(0.4, 0, 0.2, 1);
}

:host ::ng-deep .custom-leave-animation {
    animation: custom-leave-animation 250ms cubic-bezier(0.4, 0, 1, 1);
}

@keyframes custom-enter-animation {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(-50%);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes custom-leave-animation {
    from {
        max-height: 1000px;
        opacity: 1;
        transform: scale(1);
    }
    to {
        max-height: 0;
        opacity: 0;
        transform: scale(0.8);
        margin-bottom: 0;
        overflow: hidden;
    }
}
        `
    };
}
