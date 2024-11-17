import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>severity</i> property defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="secondary" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="success" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="info" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="warn" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="help" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="danger" />
            <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="contrast" />
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
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                command: () => {
                    this.delete();
                }
            },
            { label: 'Angular Website', url: 'http://angular.io' },
            { separator: true },
            { label: 'Upload', routerLink: ['/fileupload'] }
        ];
    }

    save() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

    code: Code = {
        basic: `<p-splitbutton label="Save" (onClick)="save()" [model]="items" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="secondary" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="success" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="info" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="warn" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="help" />
<p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="danger" />`,

        html: `<div class="card flex justify-center flex-wrap gap-4">
    <p-toast />
    <p-splitbutton label="Save" (onClick)="save()" [model]="items" />
    <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="secondary" />
    <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="success" />
    <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="info" />
    <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="warn" />
    <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="help" />
    <p-splitbutton label="Save" (onClick)="save()" [model]="items" severity="danger" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-severity-demo',
    templateUrl: './split-button-severity-demo.html',
    standalone: true,
    imports: [SplitButton, ToastModule],
    providers: [MessageService]
})
export class SplitButtonSeverityDemo {
    items: MenuItem[];

    constructor(private messageService: MessageService) {
        this.items = [
            {
                label: 'Update',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                command: () => {
                    this.delete();
                }
            },
            { label: 'Angular Website', url: 'http://angular.io' },
            { separator: true },
            { label: 'Upload', routerLink: ['/fileupload'] }
        ];
    }

    save() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }
}`
    };
}
