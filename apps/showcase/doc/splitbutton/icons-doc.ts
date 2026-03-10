import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'icons-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, SplitButtonModule, ToastModule],
    template: `
        <app-docsectiontext>
            <p>The buttons and menuitems have support to display icons.</p>
        </app-docsectiontext>
        <p-toast />
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [MessageService]
})
export class IconsDoc {
    items: MenuItem[];

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
