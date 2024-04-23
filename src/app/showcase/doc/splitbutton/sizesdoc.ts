import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'sizes-doc',
    template: `
        <app-docsectiontext>
            <p>SplitButton provides <i>small</i> and <i>large</i> sizes as alternatives to the standard.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-content-center gap-3">
            <p-toast></p-toast>
            <p-splitButton label="Small" [model]="this.items" (onClick)="save('info')" size="sm"></p-splitButton>
            <p-splitButton label="Normal" [model]="this.items" (onClick)="save('info')"></p-splitButton>
            <p-splitButton label="Large" [model]="this.items" (onClick)="save('info')" size="lg"></p-splitButton>
        </div>
        <app-code [code]="code" selector="split-button-sizes-demo"></app-code>
    `,
    providers: [MessageService]
})
export class SizesDoc {
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
        basic: `<p-splitButton label="Small" [model]="this.items" (onClick)="save('info')" size="sm"></p-splitButton>
<p-splitButton label="Normal" [model]="this.items" (onClick)="save('info')"></p-splitButton>
<p-splitButton label="Large" [model]="this.items" (onClick)="save('info')" size="lg"></p-splitButton>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <p-toast></p-toast>
    <p-splitButton label="Small" [model]="this.items" (onClick)="save('info')" size="sm"></p-splitButton>
    <p-splitButton label="Normal" [model]="this.items" (onClick)="save('info')"></p-splitButton>
    <p-splitButton label="Large" [model]="this.items" (onClick)="save('info')" size="lg"></p-splitButton>
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
