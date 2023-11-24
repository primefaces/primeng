import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Defer is applied to a container element with pDefer directive where content needs to be placed inside an ng-template.</p>
        </app-docsectiontext>
        <div class="card">
            <p style="margin-bottom: 70rem;">Content is not loaded yet, scroll down to initialize it.</p>
            <p-toast></p-toast>
            <div pDefer (onLoad)="onLoad()">
                <ng-template>
                    <img class="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primeng/images/demo/nature/nature1.jpg" alt="Prime" />
                </ng-template>
            </div>
        </div>
        <app-code [code]="code" selector="defer-basic-demo"></app-code>
    `,
    providers: [MessageService]
})
export class BasicDoc {
    constructor(private messageService: MessageService) {}

    onLoad() {
        this.messageService.add({ severity: 'success', summary: 'Data Initialized', detail: 'Render Completed' });
    }

    code: Code = {
        basic: `
<div pDefer (onLoad)="onLoad()">
    <ng-template>
        <img class="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primeng/images/demo/nature/nature1.jpg" alt="Prime" />
    </ng-template>
</div>`,
        html: `
<div class="card">
    <p style="margin-bottom: 70rem;">
        Content is not loaded yet, scroll down to initialize it.
    </p>
    <p-toast></p-toast>
    <div pDefer (onLoad)="onLoad()">
        <ng-template>
            <img class="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primeng/images/demo/nature/nature1.jpg" alt="Prime" />
        </ng-template>
    </div>
</div>`,
        typescript: `
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'defer-basic-demo',
    templateUrl: './defer-basic-demo.html',
    providers: [MessageService]
})
export class DeferBasicDemo {
    constructor(private messageService: MessageService) {}

    onLoad() {
        this.messageService.add({ severity: 'success', summary: 'Data Initialized', detail: 'Render Completed' });
    }
}`
    };
}
