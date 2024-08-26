import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>SplitButton has a default action button and a collection of additional options defined by the <i>model</i> property based on MenuModel API.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-splitButton label="Save" (onClick)="save('info')" severity="contrast" [model]="items">
                <ng-template pTemplate="content">
                    <span class="flex items-center font-bold">
                        <img alt="logo" src="https://primefaces.org/cdn/primeng/images/logo.svg" style="height: 1rem; margin-right: 0.5rem" />
                        <span>PrimeNG</span>
                    </span>
                </ng-template>
            </p-splitButton>
        </div>
        <app-code [code]="code" selector="split-button-template-demo"></app-code>
    `,
    providers: [MessageService]
})
export class TemplateDoc {
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
    severity="contrast" 
    [model]="items">
        <ng-template pTemplate="content">
            <span class="flex items-center font-bold">
                <img 
                    alt="logo" 
                    src="https://primefaces.org/cdn/primeng/images/logo.svg" 
                    style="height: 1rem; margin-right: 0.5rem" />
                <span>PrimeNG</span>
            </span>
        </ng-template>
</p-splitButton>`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-splitButton 
        label="Save" 
        (onClick)="save('info')" 
        severity="contrast" 
        [model]="items">
            <ng-template pTemplate="content">
                <span class="flex items-center font-bold">
                    <img 
                        alt="logo" 
                        src="https://primefaces.org/cdn/primeng/images/logo.svg" 
                        style="height: 1rem; margin-right: 0.5rem" />
                    <span>PrimeNG</span>
                </span>
            </ng-template>
    </p-splitButton>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-template-demo',
    templateUrl: './split-button-template-demo.html',
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitButtonTemplateDemo {
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
