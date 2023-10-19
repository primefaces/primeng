import { Component, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true"></p-splitButton>
        </div>
        <app-code [code]="code" selector="split-button-disabled-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class DisabledDoc {
    @Input() id: string;

    @Input() title: string;

    constructor(private messageService: MessageService) {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.delete();
                }
            },
            { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
            { separator: true },
            { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
        ];
    }

    items: MenuItem[];

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }

    code: Code = {
        basic: `
<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true"></p-splitButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true"></p-splitButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'split-button-disabled-demo',
    templateUrl: './split-button-disabled-demo.html',
    providers: [ MessageService ]
})
export class SplitButtonDisabledDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.delete();
                }
            },
            { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
            { separator: true },
            { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
        ];
    }

    save(severity: string) {
        this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
    }
}`
    };
}
