import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'service-doc',
    template: `
        <app-docsectiontext>
            <p>
                MessageService alternative does not require a value binding to an array. In order to use this service, import the class and define it as a provider in a component higher up in the component tree such as application instance itself so
                that descandant components can have it injected. If there are multiple message components having the same message service, you may use key property of the component to match the key of the message to implement scoping.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-content-center gap-2">
                <p-button (click)="addSingle()" label="Show Single" />
                <p-button severity="success" (click)="addMultiple()" label="Show Multiple" />
                <p-button severity="secondary" (click)="clear()" label="Clear All" />
            </div>
            <p-messages />
        </div>
        <app-code [code]="code" selector="messages-service-demo"></app-code>
    `,
    providers: [MessageService]
})
export class ServiceDoc {
    constructor(private messageService: MessageService) {}

    addSingle() {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    }

    addMultiple() {
        this.messageService.addAll([
            { severity: 'success', summary: 'Service Message', detail: 'Via MessageService' },
            { severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }
        ]);
    }

    clear() {
        this.messageService.clear();
    }

    code: Code = {
        basic: `<div class="flex justify-content-center gap-2">
    <p-button (click)="addSingle()" label="Show Single" />
    <p-button severity="success" (click)="addMultiple()" label="Show Multiple" />
    <p-button severity="secondary" (click)="clear()" label="Clear All" />
</div>
<p-messages />`,
        html: `<div class="card">
    <div class="flex justify-content-center gap-2">
        <p-button (click)="addSingle()" label="Show Single" />
        <p-button severity="success" (click)="addMultiple()" label="Show Multiple" />
        <p-button severity="secondary" (click)="clear()" label="Clear All" />
    </div>
    <p-messages />
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'messages-service-demo',
    templateUrl: './messages-service-demo.html',
    standalone: true,
    imports: [MessagesModule, ButtonModule],
    providers: [MessageService]
})
export class MessagesServiceDemo {
    constructor(private messageService: MessageService) {}

    addSingle() {
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    }

    addMultiple() {
        this.messageService.addAll([
            {severity:'success', summary:'Service Message', detail:'Via MessageService'},
            {severity:'info', summary:'Info Message', detail:'Via MessageService'}
        ]);
    }
    
    clear() {
        this.messageService.clear();
    }
}`
    };
}
