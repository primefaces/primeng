import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'interactive-doc',
    template: `
        <app-docsectiontext>
            <p>In order to add interactivity to the component, disable <i>readonly</i> and use a binding to <i>activeIndex</i> along with <i>activeIndexChange</i> to control the Steps.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast />
            <p-steps [model]="items" [readonly]="false" [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)" />
        </div>
        <app-code [code]="code" selector="steps-interactive-demo"></app-code>
    `,
    providers: [MessageService]
})
export class InteractiveDoc implements OnInit {
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
        basic: `<p-toast />
<p-steps 
    [model]="items" 
    [readonly]="false" 
    [activeIndex]="activeIndex" 
    (activeIndexChange)="onActiveIndexChange($event)" />`,

        html: `<div class="card">
    <p-toast />
    <p-steps 
        [model]="items" 
        [readonly]="false" 
        [activeIndex]="activeIndex" 
        (activeIndexChange)="onActiveIndexChange($event)" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'steps-interactive-demo',
    templateUrl: './steps-interactive-demo.html',
    standalone: true,
    imports: [StepsModule, ToastModule],
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
