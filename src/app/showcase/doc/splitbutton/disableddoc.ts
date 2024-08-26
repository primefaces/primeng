import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>
                When the <i>disabled</i> attribute is present, the element is uneditable and unfocused. Additionally, the disabled states of the button and menu button can be handled independently. The button is disabled when <i>buttonDisabled</i> is
                present, and the menu button is disabled when <i>menuButtonDisabled</i> is present.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="split-button-disabled-demo"></app-code>
    `,
    providers: [MessageService]
})
export class DisabledDoc {
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
        basic: `<p-splitButton 
    label="Save" 
    icon="pi pi-plus" 
    (onClick)="save('info')" 
    [model]="items" 
    [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-splitButton 
        label="Save" 
        icon="pi pi-plus" 
        (onClick)="save('info')" 
        [model]="items" 
        [disabled]="true" />
</div>

<div class="card flex justify-center">
    <p-toast />
    <p-splitButton 
        label="Save" 
        icon="pi pi-plus" 
        (onClick)="save('info')" 
        [model]="items" 
        [menuButtonDisabled]="true" />
</div>

<div class="card flex justify-center">
    <p-toast />
    <p-splitButton 
        label="Save"
        icon="pi pi-plus"
        (onClick)="save('info')" 
        [model]="items" 
        [buttonDisabled]="true" />
</div>
`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-disabled-demo',
    templateUrl: './split-button-disabled-demo.html',
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitButtonDisabledDemo {
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
