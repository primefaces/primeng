import { Component, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'raised-text-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Text buttons can be displayed as raised as well for elevation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-toast></p-toast>
            <p-splitButton label="Primary" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-text mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Secondary" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-secondary p-button-text mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Success" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-success p-button-text mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Info" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-info p-button-text mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Warning" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-warning p-button-text mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Help" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-help p-button-text mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Danger" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-danger p-button-text mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Plain" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-plain p-button-text mr-2 mb-2"></p-splitButton>
        </div>
        <app-code [code]="code" selector="split-button-raised-text-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class RaisedTextDoc {
    @Input() id: string;

    @Input() title: string;

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

    code: Code = {
        basic: `
<p-splitButton label="Primary" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-text mr-2 mb-2"></p-splitButton>
<p-splitButton label="Secondary" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-secondary p-button-text mr-2 mb-2"></p-splitButton>
<p-splitButton label="Success" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-success p-button-text mr-2 mb-2"></p-splitButton>
<p-splitButton label="Info" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-info p-button-text mr-2 mb-2"></p-splitButton>
<p-splitButton label="Warning" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-warning p-button-text mr-2 mb-2"></p-splitButton>
<p-splitButton label="Help" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-help p-button-text mr-2 mb-2"></p-splitButton>
<p-splitButton label="Danger" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-danger p-button-text mr-2 mb-2"></p-splitButton>
<p-splitButton label="Plain" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-plain p-button-text mr-2 mb-2"></p-splitButton>`,

        html: `
<div class="card flex justify-content-center flex-wrap gap-3">
    <p-toast></p-toast>
    <p-splitButton label="Primary" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-text mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Secondary" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-secondary p-button-text mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Success" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-success p-button-text mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Info" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-info p-button-text mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Warning" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-warning p-button-text mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Help" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-help p-button-text mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Danger" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-danger p-button-text mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Plain" [model]="this.items" (onClick)="save('info')" styleClass="p-button-raised p-button-plain p-button-text mr-2 mb-2"></p-splitButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'split-button-raised-text-demo',
    templateUrl: './split-button-raised-text-demo.html',
    providers: [ MessageService ]
})
export class SplitButtonRaisedTextDemo {
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
