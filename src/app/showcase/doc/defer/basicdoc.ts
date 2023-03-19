import { Component, Input } from '@angular/core';
import { MessageService } from 'src/app/components/api/messageservice';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
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
        <app-code [code]="code"></app-code>
    </section>`,
    providers: [MessageService]
})
export class BasicDoc {
    @Input() id: string;

    @Input() title: string;

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
    <div pDefer (onLoad)="initData()">
        <ng-template>
            <img class="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primeng/images/demo/nature/nature1.jpg" alt="Prime" />
        </ng-template>
    </div>
</div>`,
        typescript: `
import { Component, Input } from '@angular/core';
import { MessageService } from 'src/app/components/api/messageservice';

@Component({
    templateUrl: './deferdemo.html',
    providers: [MessageService]
})
export class DeferDemo {

    constructor(private messageService: MessageService) {}

    onLoad() {
        this.messageService.add({ severity: 'success', summary: 'Data Initialized', detail: 'Render Completed' });
    }
}`,

        module: `
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeferModule } from 'primeng/defer';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, DeferModule, ToastModule],
    declarations: [DeferDemo]
})
export class DeferDemoModule {}`
    };
}
