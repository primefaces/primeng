import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'icons-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, SplitButtonModule, ToastModule, RouterModule],
    template: `
        <app-docsectiontext>
            <p>The buttons and menuitems have support to display icons with CSS classes such as PrimeIcons.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-splitbutton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" [model]="items" />
        </div>
        <app-code></app-code>

        <app-docsectiontext>
            <p>
                Custom icons from any library are supported through the <i>icon</i>, <i>dropdownicon</i>, and <i>item</i> templates, for example inline SVG, Font Awesome, Material Icons, or images. When using a template, omit the corresponding
                <i>icon</i> or <i>dropdownIcon</i> property. Visit the <a routerLink="/customicons">custom icons</a> documentation for more examples.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-splitbutton label="Save" [model]="templateItems" (onClick)="save()">
                <ng-template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem" aria-hidden="true">
                        <path fill="currentColor" d="M9,16.17,4.83,12,3.41,13.41,9,19,21,7,19.59,5.59Z" />
                    </svg>
                </ng-template>
                <ng-template #dropdownicon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem" aria-hidden="true">
                        <path fill="currentColor" d="M12,15.25a.74.74,0,0,1-.53-.22l-5-5A.75.75,0,0,1,7.53,9L12,13.44,16.47,9A.75.75,0,0,1,17.53,10l-5,5A.74.74,0,0,1,12,15.25Z" />
                    </svg>
                </ng-template>
                <ng-template #item let-item>
                    <span class="flex items-center gap-2 px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem" aria-hidden="true">
                            <path fill="currentColor" [attr.d]="itemIcons[item.label]" />
                        </svg>
                        <span>{{ item.label }}</span>
                    </span>
                </ng-template>
            </p-splitbutton>
        </div>
        <app-code></app-code>
    `,
    providers: [MessageService]
})
export class IconsDoc {
    items: MenuItem[];
    templateItems: MenuItem[];
    itemIcons: Record<string, string> = {
        Update: 'M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12H1L4.96,16.03L9,12H6A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L17.65,6.35M12,20A8,8 0 0,0 20,12H23L19.04,7.97L15,12H18A6,6 0 0,1 12,18C10.34,18 8.86,17.31 7.78,16.22L6.35,17.65C7.8,19.1 9.79,20 12,20Z',
        Delete: 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
        Quit: 'M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z'
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

        this.templateItems = [
            {
                label: 'Update',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                }
            },
            {
                label: 'Delete',
                command: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                }
            },
            { separator: true },
            {
                label: 'Quit',
                command: () => {
                    window.open('https://angular.io/', '_blank');
                }
            }
        ];
    }

    save() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
    }
}
