import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'mask-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, SpeedDialModule, ToastModule, RouterModule],
    template: `
        <app-docsectiontext>
            <p>Adding <i>mask</i> property displays a modal layer behind the popup items.</p>
        </app-docsectiontext>
        <p-toast />
        <app-demo-wrapper>
            <div class="p-4">
                <div [style]="{ position: 'relative', height: '350px' }">
                    <p-speeddial [model]="items" direction="up" mask [style]="{ position: 'absolute', right: '1rem', bottom: '1rem' }" />
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `,
    providers: [MessageService]
})
export class MaskDoc implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                target: '_blank',
                url: 'https://angular.dev'
            }
        ];
    }
}
