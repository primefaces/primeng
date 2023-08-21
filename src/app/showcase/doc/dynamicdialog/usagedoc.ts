import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Code } from '../../domain/code';

@Component({
    selector: 'usage-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>To use dynamic dialog, a reference should be declared as <i>DynamicDialogRef</i> after the <i>DialogService</i> injected into the component.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`,
    providers: [DialogService]
})
export class UsageDoc {
    @Input() id: string;

    @Input() title: string;

    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}

    code: Code = {
        typescript: `
import { Component, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../domain/product';
import { ProductListDemo } from './productlistdemo';

@Component({
    templateUrl: './dynamicdialogdemo.html',
    providers: [DialogService]
})
export class DynamicDialogDemo implements OnDestroy {
    
    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}
}`
    };
}
