import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'raised-doc',
    template: `
        <app-docsectiontext>
            <p>Raised buttons display a shadow to indicate elevation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised severity="danger" />
            <p-splitbutton label="Contrast" (onClick)="save('info')" [model]="items" severity="contrast" />
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
        basic: `<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised />
<p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised severity="danger" />
<p-splitbutton label="Contrast" (onClick)="save('info')" [model]="items" severity="contrast" />`,

        html: `<div class="card flex justify-center flex-wrap gap-4">
    <p-toast />
    <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" raised />
    <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" raised severity="secondary" />
    <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" raised severity="success" />
    <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" raised severity="info" />
    <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" raised severity="warn" />
    <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" raised severity="help" />
    <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" raised severity="danger" />
    <p-splitbutton label="Contrast" (onClick)="save('info')" [model]="items" severity="contrast" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-raised-demo',
    templateUrl: './split-button-raised-demo.html',
    standalone: true,
    imports: [SplitButton, ToastModule],
    providers: [MessageService]
})
export class SplitButtonRaisedDemo {
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
