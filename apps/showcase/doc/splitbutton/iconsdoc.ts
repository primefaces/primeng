import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'icons-doc',
    template: `
        <app-docsectiontext>
            <p>The buttons and menuitems have support to display icons.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />
        </div>
        <app-code [code]="code" selector="split-button-icons-demo"></app-code>
    `,
    providers: [MessageService]
})
export class IconsDoc {
    items: MenuItem[];
    code: Code = {
        basic: `<p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'split-button-icons-demo',
    templateUrl: './split-button-icons-demo.html',
    standalone: true,
    imports: [SplitButtonModule, ToastModule],
    providers: [MessageService]
})
export class SplitButtonIconsDemo {
    constructor(private messageService: MessageService) {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                },
            },
            {
                separator: true,
            },
            {
                label: 'Quit',
                icon: 'pi pi-power-off',
                command: () => {
                    window.open('https://angular.io/', '_blank');
                },
            },
        ];
    }
}`
    };

    constructor(private messageService: MessageService) {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                }
            },
            {
                separator: true
            },
            {
                label: 'Quit',
                icon: 'pi pi-power-off',
                command: () => {
                    window.open('https://angular.io/', '_blank');
                }
            }
        ];
    }
}
