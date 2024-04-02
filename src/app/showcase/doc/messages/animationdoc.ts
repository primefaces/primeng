import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'animation-doc',
    template: `
        <app-docsectiontext>
            <p>Transition of the open and hide animations can be customized using the <i>showTransitionOptions</i> and <i>hideTransitionOptions</i> properties, example below disables the animations altogether.</p>
        </app-docsectiontext>
        <div class="card">
            <p-messages [(value)]="messages" [showTransitionOptions]="'500ms'" [hideTransitionOptions]="'500ms'" [enableService]="false"></p-messages>
        </div>
        <app-code [code]="code" selector="messages-animation-demo"></app-code>
    `
})
export class AnimationDoc implements OnInit {
    messages: Message[] | undefined;

    ngOnInit() {
        this.messages = [
            { severity: 'success', summary: 'Success', detail: 'Message Content' },
            { severity: 'info', summary: 'Info', detail: 'Message Content' }
        ];
    }

    code: Code = {
        basic: `<p-messages [(value)]="messages" [showTransitionOptions]="'500ms'" [hideTransitionOptions]="'500ms'" [enableService]="false"></p-messages>`,
        html: `
<div class="card">
    <p-messages [(value)]="messages" [showTransitionOptions]="'500ms'" [hideTransitionOptions]="'500ms'" [enableService]="false"></p-messages>
</div>`,
        typescript: `
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
    selector: 'messages-animation-demo',
    templateUrl: './messages-animation-demo.html'
})
export class MessagesAnimationDemo implements OnInit {
    messages: Message[] | undefined;

    ngOnInit(){
        this.messages = [
            { severity: 'success', summary: 'Success', detail: 'Message Content' },
            { severity: 'info', summary: 'Info', detail: 'Message Content' },
        ];
    }
}`
    };
}
