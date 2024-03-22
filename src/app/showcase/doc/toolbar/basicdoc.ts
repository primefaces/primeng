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
                    <button pButton icon="pi pi-plus" class="mr-2"></button>
                    <button pButton icon="pi pi-print" class="mr-2"></button>
                    <button pButton icon="pi pi-upload"></button>
                </div>
                <div class="p-toolbar-group-center">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search"></i>
                        <input pInputText placeholder="Search" />
                    </span>
                </div>
                <div class="p-toolbar-group-end">
                    <p-splitButton label="Save" icon="pi pi-check" [model]="items"></p-splitButton>
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
            }
        ];
    }

    code: Code = {
        basic: `<p-toolbar>
    <div class="p-toolbar-group-start">
        <button pButton icon="pi pi-plus" class="mr-2"></button>
        <button pButton icon="pi pi-print" class="mr-2"></button>
        <button pButton icon="pi pi-upload"></button>
    </div>
    <div class="p-toolbar-group-center">
        <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <input pInputText placeholder="Search" />
        </span>
    </div>
    <div class="p-toolbar-group-end">
        <p-splitButton label="Save" icon="pi pi-check" [model]="items"></p-splitButton>
    </div>
</p-toolbar>`,

        html: `<div class="card">
<p-toolbar>
<div class="p-toolbar-group-start">
    <button pButton icon="pi pi-plus" class="mr-2"></button>
    <button pButton icon="pi pi-print" class="mr-2"></button>
    <button pButton icon="pi pi-upload"></button>
</div>
<div class="p-toolbar-group-center">
    <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <input pInputText placeholder="Search" />
    </span>
</div>
<div class="p-toolbar-group-end">
    <p-splitButton label="Save" icon="pi pi-check" [model]="items"></p-splitButton>
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
            }
        ];
    }
}`
    };
}
