import { Component } from '@angular/core';
import { MessageService } from '@alamote/primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'animation-doc',
    template: `
        <app-docsectiontext>
            <p>Transition of the animations can be customized using the <i>showTransitionOptions</i>, <i>hideTransitionOptions</i>, <i>showTransformOptions</i> and <i>hideTransformOptions</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast [showTransformOptions]="'translateY(100%)'" [showTransitionOptions]="'1000ms'" [hideTransitionOptions]="'1000ms'" [showTransformOptions]="'translateX(100%)'"></p-toast>
            <button type="button" pButton pRipple (click)="show()" label="Show"></button>
        </div>
        <app-code [code]="code" selector="toast-animation-demo"></app-code>
    `,
    providers: [MessageService]
})
export class AnimationDoc {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    code: Code = {
        basic: `<p-toast [showTransformOptions]="'translateY(100%)'" [showTransitionOptions]="'1000ms'" [hideTransitionOptions]="'1000ms'" [showTransformOptions]="'translateX(100%)'"></p-toast>
<button type="button" pButton pRipple (click)="show()" label="Show"></button>`,
        html: `
<div class="card flex justify-content-center">
    <p-toast [showTransformOptions]="'translateY(100%)'" [showTransitionOptions]="'1000ms'" [hideTransitionOptions]="'1000ms'" [showTransformOptions]="'translateX(100%)'"></p-toast>
    <button type="button" pButton pRipple (click)="show()" label="Show"></button>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from '@alamote/primeng/api';

@Component({
    selector: 'toast-animation-demo',
    templateUrl: './toast-animation-demo.html',
    providers: [MessageService]
})
export class ToastAnimationDemo {
    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
}`
    };
}
