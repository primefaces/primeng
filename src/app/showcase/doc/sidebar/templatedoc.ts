import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Sidebar is customizable by <i>header</i>, <i>content</i>, <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-sidebar [(visible)]="sidebarVisible">
                <ng-template pTemplate="header">Header Content</ng-template>
                <ng-template pTemplate="content">Body Content</ng-template>
                <ng-template pTemplate="footer">Footer Content</ng-template>
            </p-sidebar>
            <p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right"></p-button>
        </div>
        <app-code [code]="code" selector="sidebar-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    sidebarVisible: boolean = false;

    code: Code = {
        basic: `
<p-sidebar [(visible)]="sidebarVisible">
    <ng-template pTemplate="header">Header Content</ng-template>
    <ng-template pTemplate="content">Body Content</ng-template>
    <ng-template pTemplate="footer">Footer Content</ng-template>
</p-sidebar>
<p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-sidebar [(visible)]="sidebarVisible">
        <ng-template pTemplate="header">Header Content</ng-template>
        <ng-template pTemplate="content">Body Content</ng-template>
        <ng-template pTemplate="footer">Footer Content</ng-template>
    </p-sidebar>
    <p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'sidebar-template-demo',
    templateUrl: './sidebar-template-demo.html'
})
export class SidebarTemplateDemo {
    sidebarVisible: boolean = false;
}`
    };
}
