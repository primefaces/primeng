import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'raised-doc',
    template: `
        <app-docsectiontext>
            <p>Raised buttons display a shadow to indicate elevation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-toast></p-toast>
            <p-splitButton label="Primary" [model]="items" (onClick)="save('info')" styleClass="p-button-raised mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Secondary" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-secondary mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Success" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-success mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Info" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-info mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Warning" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-warning mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Help" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-help mr-2 mb-2"></p-splitButton>
            <p-splitButton label="Danger" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-danger mr-2 mb-2"></p-splitButton>
        </div>
        <app-code [code]="code" selector="split-button-raised-demo"></app-code>
    `,
    providers: [MessageService]
})
export class RaisedDoc {
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
        basic: `<p-splitButton label="Primary" [model]="items" (onClick)="save('info')" styleClass="p-button-raised mr-2 mb-2"></p-splitButton>
<p-splitButton label="Secondary" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-secondary mr-2 mb-2"></p-splitButton>
<p-splitButton label="Success" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-success mr-2 mb-2"></p-splitButton>
<p-splitButton label="Info" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-info mr-2 mb-2"></p-splitButton>
<p-splitButton label="Warning" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-warning mr-2 mb-2"></p-splitButton>
<p-splitButton label="Help" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-help mr-2 mb-2"></p-splitButton>
<p-splitButton label="Danger" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-danger mr-2 mb-2"></p-splitButton>`,

        html: `
<div class="card flex justify-content-center flex-wrap gap-3">
    <p-toast></p-toast>
    <p-splitButton label="Primary" [model]="items" (onClick)="save('info')" styleClass="p-button-raised mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Secondary" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-secondary mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Success" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-success mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Info" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-info mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Warning" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-warning mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Help" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-help mr-2 mb-2"></p-splitButton>
    <p-splitButton label="Danger" [model]="items" (onClick)="save('info')" styleClass="p-button-raised p-button-danger mr-2 mb-2"></p-splitButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'split-button-raised-demo',
    templateUrl: './split-button-raised-demo.html',
    providers: [ MessageService ]
})
export class SplitButtonRaisedDemo {
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
