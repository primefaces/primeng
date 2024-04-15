import { Component } from '@angular/core';
import { MenuItem, MessageService } from '@alamote/primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>severity</i> property defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-toast></p-toast>
            <p-splitButton label="Save" (onClick)="save('info')" [model]="items"></p-splitButton>
            <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="secondary"></p-splitButton>
            <p-splitButton label="Save" (onClick)="save('success')" [model]="items" severity="success"></p-splitButton>
            <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="info"></p-splitButton>
            <p-splitButton label="Save" (onClick)="save('warn')" [model]="items" severity="warning"></p-splitButton>
            <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="help"></p-splitButton>
            <p-splitButton label="Save" (onClick)="save('error')" [model]="items" severity="danger"></p-splitButton>
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
            { label: 'Installation', icon: 'pi pi-cog', routerLink: ['/installation'] }
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
        basic: `<p-splitButton label="Save" (onClick)="save('info')" [model]="items"></p-splitButton>
        <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="secondary"></p-splitButton>
        <p-splitButton label="Save" (onClick)="save('success')" [model]="items" severity="success"></p-splitButton>
        <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="info"></p-splitButton>
        <p-splitButton label="Save" (onClick)="save('warn')" [model]="items" severity="warning"></p-splitButton>
        <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="help"></p-splitButton>
        <p-splitButton label="Save" (onClick)="save('error')" [model]="items" severity="danger"></p-splitButton>`,

        html: `
<div class="card flex justify-content-center flex-wrap gap-3">
    <p-toast></p-toast>
    <p-splitButton label="Save" (onClick)="save('info')" [model]="items"></p-splitButton>
    <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="secondary"></p-splitButton>
    <p-splitButton label="Save" (onClick)="save('success')" [model]="items" severity="success"></p-splitButton>
    <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="info"></p-splitButton>
    <p-splitButton label="Save" (onClick)="save('warn')" [model]="items" severity="warning"></p-splitButton>
    <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="help"></p-splitButton>
    <p-splitButton label="Save" (onClick)="save('error')" [model]="items" severity="danger"></p-splitButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MenuItem, MessageService } from '@alamote/primeng/api';

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
            { label: 'Installation', icon: 'pi pi-cog', routerLink: ['/installation'] }
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
