import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'router-doc',
    template: `
        <app-docsectiontext>
            <p>Items with navigation are defined with templating to be able to use a routerLink directive, an external link or programmatic navigation.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true" [hideStackBlitz]="true"></app-code>
    `
})
export class RouterDoc {
    code: Code = {
        basic: `<p-megaMenu [model]="items">
    <ng-template pTemplate="item" let-item>
        <ng-container *ngIf="item.route; else elseBlock">
            <a [routerLink]="item.route" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </ng-container>
        <ng-template #elseBlock>
            <a [href]="item.url" class="p-menuitem-link">
                <span [class]="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </ng-template>
    </ng-template>
</p-megaMenu>`
    };
}
