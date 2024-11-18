import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'raised-text-doc',
    template: `
        <app-docsectiontext>
            <p>Text buttons can be displayed as raised as well for elevation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised text />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised text severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised text severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised text severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised text severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised text severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised text severity="danger" />
            <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" raised text severity="contrast" />
        </div>
        <app-code [code]="code" selector="split-button-raised-text-demo"></app-code>
    `,
    providers: [MessageService]
})
export class RaisedTextDoc {
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
        basic: `<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised text />
<p-spliButton label="Secondary" [model]="items" (onClick)="save('info')" raised text severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised text severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised text severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised text severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised text severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised text severity="danger" />
<p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" raised text severity="contrast" />`,

        html: `<div class="card flex justify-center flex-wrap gap-4">
    <p-toast />
    <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised text />
    <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised text severity="secondary" />
    <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised text severity="success" />
    <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised text severity="info" />
    <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised text severity="warn" />
    <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised text severity="help" />
    <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised text severity="danger" />
    <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" raised text severity="contrast" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-raised-text-demo',
    templateUrl: './split-button-raised-text-demo.html',
    standalone: true,
    imports: [SplitButton, ToastModule],
    providers: [MessageService]
})
export class SplitButtonRaisedTextDemo {
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
