import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
    selector: 'breadcrumb-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, BreadcrumbModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-breadcrumb [model]="items" [home]="home" />
        </app-docptviewer>
    `
})
export class PTViewer implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];

        this.home = { icon: 'pi pi-home' };
    }

    docs = [
        {
            data: getPTOptions('Breadcrumb'),
            key: 'Breadcrumb'
        }
    ];
}
