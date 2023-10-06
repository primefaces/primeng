import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'block-ui-document-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>If the target element is not specified, BlockUI blocks the document by default.</p>
        </app-docsectiontext>
        <div class="card">
            <p-blockUI [blocked]="blockedDocument"></p-blockUI>
            <button type="button" pButton pRipple label="Block" (click)="blockDocument()"></button>
        </div>
        <app-code [code]="code" selector="block-ui-document-demo"></app-code>
    </section>`
})
export class DocumentDoc {
    @Input() id: string;

    @Input() title: string;

    blockedDocument: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    blockDocument() {
        this.blockedDocument = true;
        setTimeout(() => {
            this.blockedDocument = false;
            this.cd.markForCheck();
        }, 3000);
    }

    code: Code = {
        basic: `
<p-blockUI [blocked]="blockedDocument"></p-blockUI>`,
        html: `
<div class="card">
    <p-blockUI [blocked]="blockedDocument"></p-blockUI>
    <button type="button" pButton pRipple label="Block" (click)="blockDocument()"></button>
</div>`,
        typescript: `
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'block-ui-document-demo',
    templateUrl: './block-ui-document-demo.html'
})
export class BlockUiDocumentDemo {
    blockedDocument: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    blockDocument() {
        this.blockedDocument = true;
        setTimeout(() => {
            this.blockedDocument = false;
            this.cd.markForCheck();
        }, 3000);
    }

}`
    };
}
