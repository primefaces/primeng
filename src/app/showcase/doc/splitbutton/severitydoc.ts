import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>Severity defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-toast></p-toast>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items"></p-splitButton>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-secondary mb-2"></p-splitButton>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('success')" [model]="items" styleClass="p-button-success mb-2"></p-splitButton>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-info mb-2"></p-splitButton>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('warn')" [model]="items" styleClass="p-button-warning mb-2"></p-splitButton>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-help mb-2"></p-splitButton>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('error')" [model]="items" styleClass="p-button-danger mb-2"></p-splitButton>
        </div>
        <app-code [code]="code" selector="split-button-severity-demo"></app-code>
    `,
    providers: [MessageService]
})
export class SeverityDoc {
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
        basic: `<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items"></p-splitButton>
<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-secondary mb-2"></p-splitButton>
<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('success')" [model]="items" styleClass="p-button-success mb-2"></p-splitButton>
<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-info mb-2"></p-splitButton>
<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('warn')" [model]="items" styleClass="p-button-warning mb-2"></p-splitButton>
<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-help mb-2"></p-splitButton>
<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('error')" [model]="items" styleClass="p-button-danger mb-2"></p-splitButton>`,

        html: `
<div class="card flex justify-content-center flex-wrap gap-3">
    <p-toast></p-toast>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items"></p-splitButton>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-secondary mb-2"></p-splitButton>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('success')" [model]="items" styleClass="p-button-success mb-2"></p-splitButton>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-info mb-2"></p-splitButton>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('warn')" [model]="items" styleClass="p-button-warning mb-2"></p-splitButton>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" styleClass="p-button-help mb-2"></p-splitButton>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('error')" [model]="items" styleClass="p-button-danger mb-2"></p-splitButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'split-button-severity-demo',
    templateUrl: './split-button-severity-demo.html',
    providers: [ MessageService ]
})
export class SplitButtonSeverityDemo {
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
