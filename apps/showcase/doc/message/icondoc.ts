import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'icon-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>severity</i> option specifies the type of the message.</p>
        </app-docsectiontext>
        <div class="card flex justify-center align-center gap-4">
            <p-message severity="info" icon="pi pi-send" text="Info Message" styleClass="h-full" />
            <p-message severity="success">
                <ng-template pTemplate="icon">
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                </ng-template>
                <span class="ml-2">How may I help you?</span>
            </p-message>
        </div>
        <app-code [code]="code" selector="message-icon-demo"></app-code>
    `
})
export class IconDoc implements OnInit {
    ngOnInit() {}

    code: Code = {
        basic: `<p-message severity="info" icon="pi pi-send" text="Info Message" styleClass="h-full" />
<p-message severity="success">
    <ng-template pTemplate="icon">
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
    </ng-template>
    <span class="ml-2">How may I help you?</span>
</p-message>`,
        html: `<div class="card flex justify-center align-center gap-4">
    <p-message severity="info" icon="pi pi-send" text="Info Message" styleClass="h-full" />
    <p-message severity="success">
        <ng-template pTemplate="icon">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
        </ng-template>
        <span class="ml-2">How may I help you?</span>
    </p-message>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'message-icon-demo',
    templateUrl: './message-icon-demo.html',
    standalone: true,
    imports: [MessageModule, AvatarModule]
})
export class MessageIconDemo {}`
    };
}
