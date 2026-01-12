import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'tooltip-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, SpeedDialModule, ToastModule, RouterModule],
    template: `
        <app-docsectiontext>
            <p>Items display a tooltip on hover when a standalone <a href="#" [routerLink]="['/tooltip']">Tooltip</a> is present with a target that matches the items.</p>
        </app-docsectiontext>
        <div class="card">
            <div [style]="{ position: 'relative', height: '350px' }">
                <p-toast />
                <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', right: 0, bottom: 0 }" [buttonProps]="{ severity: 'help', rounded: true }" [tooltipOptions]="{ tooltipPosition: 'left' }" />
                <p-speeddial [model]="items" direction="up" [style]="{ position: 'absolute', left: 0, bottom: 0 }" [buttonProps]="{ severity: 'danger', rounded: true }" [tooltipOptions]="{ tooltipPosition: 'right' }" />
            </div>
        </div>
        <app-code></app-code>
    `,
    providers: [MessageService]
})
export class TooltipDoc implements OnInit {
    items: MenuItem[] | undefined;

    constructor(
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Add',
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                label: 'Upload',
                icon: 'pi pi-upload',
                command: () => {
                    this.router.navigate(['/fileupload']);
                }
            },
            {
                label: 'Angular.dev',
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
