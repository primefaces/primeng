import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>severity</i> property defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-toast />
            <p-splitButton label="Save" (onClick)="save('info')" [model]="items" />
            <p-splitButton label="Save" (onClick)="save('secondary')" [model]="items" severity="secondary" />
            <p-splitButton label="Save" (onClick)="save('success')" [model]="items" severity="success" />
            <p-splitButton label="Save" (onClick)="save('info')" [model]="items" severity="info" />
            <p-splitButton label="Save" (onClick)="save('warn')" [model]="items" severity="warn" />
            <p-splitButton label="Save" (onClick)="save('help')" [model]="items" severity="help" />
            <p-splitButton label="Save" (onClick)="save('danger')" [model]="items" severity="danger" />
            <p-splitButton label="Save" (onClick)="save('contrast')" [model]="items" severity="contrast" />
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
        basic: `<p-splitButton 
    label="Save" 
    (onClick)="save('info')" 
    [model]="items" />
<p-splitButton 
    label="Save" 
    (onClick)="save('info')" 
    [model]="items" 
    severity="secondary" />
<p-splitButton 
    label="Save" 
    (onClick)="save('success')" 
    [model]="items" 
    severity="success" />
<p-splitButton 
    label="Save" 
    (onClick)="save('info')" 
    [model]="items" 
    severity="info" />
<p-splitButton 
    label="Save" 
    (onClick)="save('warn')" 
    [model]="items" 
    severity="warn" />
<p-splitButton 
    label="Save" 
    (onClick)="save('info')" 
    [model]="items" 
    severity="help" />
<p-splitButton 
    label="Save" 
    (onClick)="save('error')" 
    [model]="items" 
    severity="danger" />`,

        html: `<div class="card flex justify-content-center flex-wrap gap-3">
    <p-toast />
    <p-splitButton 
        label="Save" 
        (onClick)="save('info')" 
        [model]="items" />
    <p-splitButton 
        label="Save" 
        (onClick)="save('info')" 
        [model]="items" 
        severity="secondary" />
    <p-splitButton 
        label="Save" 
        (onClick)="save('success')" 
        [model]="items" 
        severity="success" />
    <p-splitButton 
        label="Save" 
        (onClick)="save('info')" 
        [model]="items" 
        severity="info" />
    <p-splitButton 
        label="Save" 
        (onClick)="save('warn')" 
        [model]="items" 
        severity="warn" />
    <p-splitButton 
        label="Save" 
        (onClick)="save('info')" 
        [model]="items" 
        severity="help" />
    <p-splitButton 
        label="Save" 
        (onClick)="save('error')" 
        [model]="items"
        severity="danger" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-severity-demo',
    templateUrl: './split-button-severity-demo.html',
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
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
