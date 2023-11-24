import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Content can also be placed using the <i>start</i>, <i>center</i> and <i>end</i> templates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toolbar>
                <ng-template pTemplate="start">
                    <p-button label="New" icon="pi pi-plus" class="mr-2"></p-button>
                    <p-button label="Upload" icon="pi pi-upload" styleClass="p-button-success"></p-button>
                    <i class="p-toolbar-separator pi pi-bars mr-2" style="vertical-align: middle"></i>
                    <p-splitButton label="Save" icon="pi pi-check" [model]="items" styleClass="p-button-warning"></p-splitButton>
                </ng-template>
                <ng-template pTemplate="center">
                    <span class="text-primary font-semibold text-xl">Center</span>
                </ng-template>
                <ng-template pTemplate="end">
                    <p-button icon="pi pi-search" class="mr-2"></p-button>
                    <p-button icon="pi pi-calendar" styleClass="p-button-success mr-2"></p-button>
                    <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
                </ng-template>
            </p-toolbar>
        </div>
        <app-code [code]="code" selector="toolbar-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {

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
            },
            {
                label: 'Angular',
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                routerLink: '/fileupload'
            }
        ];
    }

    code: Code = {
        basic: `
<p-toolbar>
    <ng-template pTemplate="start">
        <p-button label="New" icon="pi pi-plus" class="mr-2"></p-button>
        <p-button label="Upload" icon="pi pi-upload" styleClass="p-button-success"></p-button>
        <i class="p-toolbar-separator pi pi-bars mr-2" style="vertical-align: middle"></i>
        <p-splitButton label="Save" icon="pi pi-check" [model]="items" styleClass="p-button-warning"></p-splitButton>
    </ng-template>
    <ng-template pTemplate="center">
        <span class="text-primary font-semibold text-xl">Center</span>
    </ng-template>
    <ng-template pTemplate="end">
        <p-button icon="pi pi-search" class="mr-2"></p-button>
        <p-button icon="pi pi-calendar" styleClass="p-button-success mr-2"></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
    </ng-template>
</p-toolbar>`,

        html: `
<div class="card">
    <p-toolbar>
        <ng-template pTemplate="start">
            <p-button label="New" icon="pi pi-plus" class="mr-2"></p-button>
            <p-button label="Upload" icon="pi pi-upload" styleClass="p-button-success"></p-button>
            <i class="p-toolbar-separator pi pi-bars mr-2" style="vertical-align: middle"></i>
            <p-splitButton label="Save" icon="pi pi-check" [model]="items" styleClass="p-button-warning"></p-splitButton>
        </ng-template>
        <ng-template pTemplate="center">
            <span class="text-primary font-semibold text-xl">Center</span>
        </ng-template>
        <ng-template pTemplate="end">
            <p-button icon="pi pi-search" class="mr-2"></p-button>
            <p-button icon="pi pi-calendar" styleClass="p-button-success mr-2"></p-button>
            <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
        </ng-template>
    </p-toolbar>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'toolbar-template-demo',
    templateUrl: './toolbar-template-demo.html'
})
export class ToolbarTemplateDemo implements OnInit {
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
            },
            {
                label: 'Angular',
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                routerLink: '/fileupload'
            }
        ];
    }
}`
    };
}
