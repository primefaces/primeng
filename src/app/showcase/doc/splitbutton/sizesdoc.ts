import { Component, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'sizes-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>SplitButton provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-splitButton label="Small" [model]="this.items" (onClick)="save('info')" styleClass="p-button-sm mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Normal" [model]="this.items" (onClick)="save('info')" styleClass="mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Large" [model]="this.items" (onClick)="save('info')" styleClass="p-button-lg mr-2 mb-2"></p-splitButton>
        </div>
        <app-code [code]="code" selector="split-button-sizes-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class SizesDoc {
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
<p-splitButton label="Small" [model]="this.items" (onClick)="save('info')" styleClass="p-button-sm mr-2 mb-2"></p-splitButton>
<p-splitButton label="Normal" [model]="this.items" (onClick)="save('info')" styleClass="mr-2 mb-2"></p-splitButton>
<p-splitButton label="Large" [model]="this.items" (onClick)="save('info')" styleClass="p-button-lg mr-2 mb-2"></p-splitButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-splitButton label="Small" [model]="this.items" (onClick)="save('info')" styleClass="p-button-sm mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Normal" [model]="this.items" (onClick)="save('info')" styleClass="mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Large" [model]="this.items" (onClick)="save('info')" styleClass="p-button-lg mr-2 mb-2"></p-splitButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'split-button-sizes-demo',
    templateUrl: './split-button-sizes-demo.html',
    providers: [ MessageService ]
})
export class SplitButtonSizesDemo {
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
