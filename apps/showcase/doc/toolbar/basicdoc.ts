import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                Toolbar is a grouping component for buttons and other content. Its content can be placed inside the
                <i>start</i>, <i>center</i> and <i>end</i> sections.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-toolbar>
                <ng-template #start>
                    <p-button icon="pi pi-plus" class="mr-2" text severity="secondary" />
                    <p-button icon="pi pi-print" class="mr-2" text severity="secondary" />
                    <p-button icon="pi pi-upload" text severity="secondary" />
                </ng-template>
                <ng-template #center>
                    <p-iconfield iconPosition="left">
                        <p-inputicon styleClass="pi pi-search" />
                        <input type="text" pInputText placeholder="Search" />
                    </p-iconfield>
                </ng-template>
                <ng-template #end>
                    <p-splitbutton label="Save" [model]="items" />
                </ng-template>
            </p-toolbar>
        </div>
        <app-code [code]="code" selector="toolbar-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }

    code: Code = {
        basic: `<p-toolbar>
    <ng-template #start>
        <p-button icon="pi pi-plus" class="mr-2" text severity="secondary" />
        <p-button icon="pi pi-print" class="mr-2" text severity="secondary" />
        <p-button icon="pi pi-upload" text severity="secondary" />
    </ng-template>
    <ng-template #center>
        <p-iconfield iconPosition="left">
            <p-inputicon styleClass="pi pi-search" />
            <input type="text" pInputText placeholder="Search" />
        </p-iconfield>
    </ng-template>
    <ng-template #end>
        <p-splitbutton label="Save" [model]="items" />
    </ng-template>
</p-toolbar>`,

        html: `<div class="card">
    <p-toolbar>
        <ng-template #start>
            <p-button icon="pi pi-plus" class="mr-2" text severity="secondary" />
            <p-button icon="pi pi-print" class="mr-2" text severity="secondary" />
            <p-button icon="pi pi-upload" text severity="secondary" />
        </ng-template>
        <ng-template #center>
            <p-iconfield iconPosition="left">
                <p-inputicon styleClass="pi pi-search" />
                <input type="text" pInputText placeholder="Search" />
            </p-iconfield>
        </ng-template>
        <ng-template #end>
            <p-splitbutton label="Save" [model]="items" />
        </ng-template>
    </p-toolbar>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
    selector: 'toolbar-basic-demo',
    templateUrl: './toolbar-basic-demo.html',
    standalone: true,
    imports: [Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon]
})
export class ToolbarBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }
}`
    };
}
