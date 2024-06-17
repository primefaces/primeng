import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'rounded-doc',
    template: `
        <app-docsectiontext>
            <p>Rounded buttons have a circular border radius.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center flex-wrap gap-3">
            <p-toast />
            <p-splitButton label="Primary" [model]="items" (onClick)="save('info')" rounded />
            <p-splitButton label="Secondary" [model]="items" (onClick)="save('info')" rounded severity="secondary" />
            <p-splitButton label="Success" [model]="items" (onClick)="save('info')" rounded severity="success" />
            <p-splitButton label="Info" [model]="items" (onClick)="save('info')" rounded severity="info" />
            <p-splitButton label="Warning" [model]="items" (onClick)="save('info')" rounded severity="warning" />
            <p-splitButton label="Help" [model]="items" (onClick)="save('info')" rounded severity="help" />
            <p-splitButton label="Danger" [model]="items" (onClick)="save('info')" rounded severity="danger" />
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
        basic: `<p-splitButton 
    label="Primary" 
    [model]="items" 
    (onClick)="save('info')" 
    rounded />
<p-splitButton 
    label="Secondary" 
    [model]="items" 
    (onClick)="save('info')" 
    rounded 
    severity="secondary" />
<p-splitButton 
    label="Success" 
    [model]="items" 
    (onClick)="save('info')" 
    rounded 
    severity="success" />
<p-splitButton 
    label="Info" 
    [model]="items" 
    (onClick)="save('info')" 
    rounded 
    severity="info" />
<p-splitButton 
    label="Warning" 
    [model]="items" 
    (onClick)="save('info')" 
    rounded 
    severity="warning" />
<p-splitButton 
    label="Help" 
    [model]="items" 
    (onClick)="save('info')" 
    rounded 
    severity="help" />
<p-splitButton 
    label="Danger" 
    [model]="items" 
    (onClick)="save('info')" 
    rounded 
    severity="danger" />`,

        html: `<div class="card flex justify-content-center flex-wrap gap-3">
    <p-toast />
    <p-splitButton 
        label="Primary" 
        [model]="items" 
        (onClick)="save('info')" 
        rounded />
    <p-splitButton 
        label="Secondary" 
        [model]="items" 
        (onClick)="save('info')" 
        rounded 
        severity="secondary" />
    <p-splitButton 
        label="Success" 
        [model]="items" 
        (onClick)="save('info')"
        rounded 
        severity="success" />
    <p-splitButton 
        label="Info" 
        [model]="items" 
        (onClick)="save('info')" 
        rounded 
        severity="info" />
    <p-splitButton 
        label="Warning" 
        [model]="items" 
        (onClick)="save('info')" 
        rounded 
        severity="warning" />
    <p-splitButton 
        label="Help" 
        [model]="items" 
        (onClick)="save('info')"
        rounded 
        severity="help" />
    <p-splitButton 
        label="Danger" 
        [model]="items" 
        (onClick)="save('info')" 
        rounded 
        severity="danger" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-rounded-demo',
    templateUrl: './split-button-rounded-demo.html',
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
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
