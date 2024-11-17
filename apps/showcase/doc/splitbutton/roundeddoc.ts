import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'rounded-doc',
    template: `
        <app-docsectiontext>
            <p>Rounded buttons have a circular border radius.</p>
        </app-docsectiontext>
        <div class="card flex justify-center flex-wrap gap-4">
            <p-toast />
            <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" rounded />
            <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" rounded severity="secondary" />
            <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" rounded severity="success" />
            <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" rounded severity="info" />
            <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" rounded severity="warn" />
            <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" rounded severity="help" />
            <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" rounded severity="danger" />
            <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" rounded severity="contrast" />
        </div>
        <app-code [code]="code" selector="split-button-rounded-demo"></app-code>
    `,
    providers: [MessageService]
})
export class RoundedDoc {
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
        basic: `<p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" rounded />
<p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" rounded severity="secondary" />
<p-splitbutton label="Success" [model]="items" (onClick)="save('info')" rounded severity="success" />
<p-splitbutton label="Info" [model]="items" (onClick)="save('info')" rounded severity="info" />
<p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" rounded severity="warn" />
<p-splitbutton label="Help" [model]="items" (onClick)="save('info')" rounded severity="help" />
<p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" rounded severity="danger" />
<p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" rounded severity="contrast" />`,

        html: `<div class="card flex justify-center flex-wrap gap-4">
    <p-toast />
    <p-splitbutton label="Primary" [model]="items" (onClick)="save('info')" rounded />
    <p-splitbutton label="Secondary" [model]="items" (onClick)="save('info')" rounded severity="secondary" />
    <p-splitbutton label="Success" [model]="items" (onClick)="save('info')" rounded severity="success" />
    <p-splitbutton label="Info" [model]="items" (onClick)="save('info')" rounded severity="info" />
    <p-splitbutton label="Warning" [model]="items" (onClick)="save('info')" rounded severity="warn" />
    <p-splitbutton label="Help" [model]="items" (onClick)="save('info')" rounded severity="help" />
    <p-splitbutton label="Danger" [model]="items" (onClick)="save('info')" rounded severity="danger" />
    <p-splitbutton label="Contrast" [model]="items" (onClick)="save('info')" rounded severity="contrast" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-rounded-demo',
    templateUrl: './split-button-rounded-demo.html',
    standalone: true,
    imports: [SplitButton, ToastModule],
    providers: [MessageService]
})
export class SplitButtonRoundedDemo {
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
