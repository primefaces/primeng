import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Toolbar is a grouping component for buttons and other content. Its content can be placed inside the <i>start</i>, <i>center</i> and <i>end</i> sections.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toolbar>
                <div class="p-toolbar-group-start">
                    <p-button label="New" icon="pi pi-plus" class="mr-2"></p-button>
                    <p-button label="Upload" icon="pi pi-upload" styleClass="p-button-success"></p-button>
                    <i class="p-toolbar-separator pi pi-bars mr-2" style="vertical-align: middle"></i>
                    <p-splitButton label="Save" icon="pi pi-check" [model]="items" styleClass="p-button-warning"></p-splitButton>
                </div>
                <div class="p-toolbar-group-end">
                    <p-button icon="pi pi-search" class="mr-2"></p-button>
                    <p-button icon="pi pi-calendar" styleClass="p-button-success mr-2"></p-button>
                    <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
                </div>
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
    <div class="p-toolbar-group-start">
        <p-button label="New" icon="pi pi-plus" class="mr-2"></p-button>
        <p-button label="Upload" icon="pi pi-upload" styleClass="p-button-success"></p-button>
        <i class="p-toolbar-separator pi pi-bars mr-2" style="vertical-align: middle"></i>
        <p-splitButton label="Save" icon="pi pi-check" [model]="items" styleClass="p-button-warning"></p-splitButton>
    </div>
    <div class="p-toolbar-group-end">
        <p-button icon="pi pi-search" class="mr-2"></p-button>
        <p-button icon="pi pi-calendar" styleClass="p-button-success mr-2"></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
    </div>
</p-toolbar>`,

        html: `
<div class="card">
    <p-toolbar>
        <div class="p-toolbar-group-start">
            <p-button label="New" icon="pi pi-plus" class="mr-2"></p-button>
            <p-button label="Upload" icon="pi pi-upload" styleClass="p-button-success"></p-button>
            <i class="p-toolbar-separator pi pi-bars mr-2" style="vertical-align: middle"></i>
            <p-splitButton label="Save" icon="pi pi-check" [model]="items" styleClass="p-button-warning"></p-splitButton>
        </div>
        <div class="p-toolbar-group-end">
            <p-button icon="pi pi-search" class="mr-2"></p-button>
            <p-button icon="pi pi-calendar" styleClass="p-button-success mr-2"></p-button>
            <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
        </div>
    </p-toolbar>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'toolbar-basic-demo',
    templateUrl: './toolbar-basic-demo.html'
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
