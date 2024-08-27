import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Header and Footers sections can be customized using <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-panel [toggleable]="true">
                <ng-template pTemplate="header">
                    <div class="flex items-center gap-2">
                        <p-avatar
                            image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                            size="large"
                            shape="circle"
                        />
                        <span class="font-bold">Amy Elsner</span>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-2">
                            <p-button icon="pi pi-user" [rounded]="true" [text]="true" />
                            <p-button icon="pi pi-bookmark" severity="secondary" [rounded]="true" [text]="true" />
                        </div>
                        <span class="p-text-secondary">Updated 2 hours ago</span>
                    </div>
                </ng-template>
                <ng-template pTemplate="icons">
                    <p-button icon="pi pi-cog" severity="secondary" rounded text (click)="menu.toggle($event)" />
                    <p-menu #menu id="config_menu" [model]="items" [popup]="true" />
                </ng-template>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
        <app-code [code]="code" selector="panel-template-demo"></app-code>
    `,
})
export class TemplateDoc implements OnInit {
    items: { label?: string; icon?: string; separator?: boolean }[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh',
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
            },
            {
                separator: true,
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
            },
        ];
    }

    code: Code = {
        basic: `<p-panel [toggleable]="true">
    <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                size="large" 
                shape="circle" />
            <span class="font-bold">
                Amy Elsner
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="footer">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
               <p-button icon="pi pi-user" [rounded]="true" [text]="true" />
                <p-button icon="pi pi-bookmark" severity="secondary" [rounded]="true" [text]="true" />
            </div>
            <span class="p-text-secondary">
                Updated 2 hours ago
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="icons">
        <p-button icon="pi pi-cog" severity="secondary" rounded text (click)="menu.toggle($event)"/>
        <p-menu #menu id="config_menu" [model]="items" [popup]="true" />
    </ng-template>
    <p class="m-0">
        Lorem ipsum dolor sit amet...
    </p>
</p-panel>`,

        html: `<div class="card">
    <p-panel [toggleable]="true">
    <ng-template pTemplate="header">
        <div class="flex items-center gap-2">
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                size="large" 
                shape="circle" />
            <span class="font-bold">
                Amy Elsner
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="footer">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <p-button icon="pi pi-user" [rounded]="true" [text]="true" />
                <p-button icon="pi pi-bookmark" severity="secondary" [rounded]="true" [text]="true" />
            </div>
            <span class="p-text-secondary">
                Updated 2 hours ago
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="icons">
        <p-button icon="pi pi-cog" severity="secondary" rounded text (click)="menu.toggle($event)"/>
        <p-menu #menu id="config_menu" [model]="items" [popup]="true" />
    </ng-template>
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    </p-panel>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'panel-template-demo',
    templateUrl: './panel-template-demo.html',
    standalone: true,
    imports: [PanelModule, AvatarModule, ButtonModule]
})
export class PanelTemplateDemo implements OnInit {
    items: { label?: string; icon?: string; separator?: boolean }[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }
}`,
    };
}
