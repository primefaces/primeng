import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'interactive-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>In order to add interactivity to the component, disable <i>readonly</i> and use a binding to <i>activeIndex</i> along with <i>activeIndexChange</i> to control the Steps.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast></p-toast>
            <p-steps [model]="items" [readonly]="false" [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)"></p-steps>
        </div>
        <app-code [code]="code" selector="steps-interactive-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class InteractiveDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[] | undefined;

    activeIndex: number = 0;

    constructor(public messageService: MessageService) {}

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label })
            },
            {
                label: 'Seat',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Second Step', detail: event.item.label })
            },
            {
                label: 'Payment',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Third Step', detail: event.item.label })
            },
            {
                label: 'Confirmation',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Last Step', detail: event.item.label })
            }
        ];
    }

    code: Code = {
        basic: `
<p-toast></p-toast>
<p-steps [model]="items" [readonly]="false" [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)"></p-steps>`,

        html: `
<div class="card">
    <p-toast></p-toast>
    <p-steps [model]="items" [readonly]="false" [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)"></p-steps>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'steps-interactive-demo',
    templateUrl: './steps-interactive-demo.html',
    providers: [MessageService]
})
export class StepsInteractiveDemo implements OnInit {
    items: MenuItem[] | undefined;

    activeIndex: number = 0;

    constructor(public messageService: MessageService) {}

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
            },
            {
                label: 'Seat',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
            },
            {
                label: 'Payment',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
            },
            {
                label: 'Confirmation',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
            }
        ];
    }
}`
    };
}
