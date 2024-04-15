import { Component } from '@angular/core';
import { MenuItem, MessageService } from '@alamote/primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>
                When the <i>disabled</i> attribute is present, the element is uneditable and unfocused. Additionally, the disabled states of the button and menu button can be handled independently. The button is disabled when <i>buttonDisabled</i> is
                present, and the menu button is disabled when <i>menuButtonDisabled</i> is present.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-toast></p-toast>
            <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true"></p-splitButton>
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
        basic: `<p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true"></p-splitButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [disabled]="true"></p-splitButton>

</div>

<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [menuButtonDisabled]="true"></p-splitButton>

</div>
<div class="card flex justify-content-center">
    <p-toast></p-toast>
    <p-splitButton label="Save" icon="pi pi-plus" (onClick)="save('info')" [model]="items" [buttonDisabled]="true"></p-splitButton>

</div>
`,

        typescript: `
import { Component } from '@angular/core';
import { MenuItem, MessageService } from '@alamote/primeng/api';

@Component({
    selector: 'split-button-disabled-demo',
    templateUrl: './split-button-disabled-demo.html',
    providers: [ MessageService ]
})
export class SplitButtonDisabledDemo {
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
