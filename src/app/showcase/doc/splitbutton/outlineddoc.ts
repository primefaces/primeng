import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'outlined-doc',
    template: `
        <app-docsectiontext>
            <p>Outlined buttons display a border without a background initially.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-toast />
            <p-splitButton label="Primary" [model]="items" (onClick)="save('info')" outlined />
            <p-splitButton label="Secondary" [model]="items" (onClick)="save('info')" outlined severity="secondary" />
            <p-splitButton label="Success" [model]="items" (onClick)="save('info')" outlined severity="success" />
            <p-splitButton label="Info" [model]="items" (onClick)="save('info')" outlined severity="info" />
            <p-splitButton label="Warning" [model]="items" (onClick)="save('info')" outlined severity="warning" />
            <p-splitButton label="Help" [model]="items" (onClick)="save('info')" outlined severity="help" />
            <p-splitButton label="Danger" [model]="items" (onClick)="save('info')" outlined severity="danger" />
        </div>
        <app-code [code]="code" selector="split-button-outlined-demo"></app-code>
    `,
    providers: [MessageService]
})
export class OutlinedDoc {
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
    label="Primary" 
    [model]="items" 
    (onClick)="save('info')" 
    outlined />
<p-splitButton 
    label="Secondary" 
    [model]="items" 
    (onClick)="save('info')" 
    outlined 
    severity="secondary" />
<p-splitButton 
    label="Success" 
    [model]="items" 
    (onClick)="save('info')" 
    outlined 
    severity="success" />
<p-splitButton 
    label="Info" 
    [model]="items" 
    (onClick)="save('info')" 
    outlined 
    severity="info" />
<p-splitButton 
    label="Warning" 
    [model]="items" 
    (onClick)="save('info')" 
    outlined 
    severity="warning" />
<p-splitButton 
    label="Help" 
    [model]="items" 
    (onClick)="save('info')" 
    outlined 
    severity="help" />
<p-splitButton 
    label="Danger" 
    [model]="items" 
    (onClick)="save('info')" 
    outlined 
    severity="danger" />`,

        html: `<div class="card flex justify-content-center flex-wrap gap-3">
    <p-toast />
    <p-splitButton 
        label="Primary" 
        [model]="items" 
        (onClick)="save('info')" 
        outlined />
    <p-splitButton 
        label="Secondary" 
        [model]="items" 
        (onClick)="save('info')" 
        outlined 
        severity="secondary" />
    <p-splitButton 
        label="Success" 
        [model]="items" 
        (onClick)="save('info')" 
        outlined 
        severity="success" />
    <p-splitButton 
        label="Info" 
        [model]="items" 
        (onClick)="save('info')" 
        outlined 
        severity="info" />
    <p-splitButton 
        label="Warning" 
        [model]="items" 
        (onClick)="save('info')" 
        outlined 
        severity="warning" />
    <p-splitButton 
        label="Help" 
        [model]="items" 
        (onClick)="save('info')" 
        outlined 
        severity="help" />
    <p-splitButton 
        label="Danger" 
        [model]="items" 
        (onClick)="save('info')" 
        outlined 
        severity="danger" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-outlined-demo',
    templateUrl: './split-button-outlined-demo.html',
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitButtonOutlinedDemo {
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
