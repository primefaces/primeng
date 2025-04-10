import { Code } from '@/domain/code';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'block-ui-document-demo',
    template: `
        <app-docsectiontext>
            <p>If the target element is not specified, BlockUI blocks the document by default.</p>
        </app-docsectiontext>
        <div class="card">
            <p-blockui [blocked]="blockedDocument" />
            <p-button label="Block" (click)="blockDocument()" />
        </div>
        <app-code [code]="code" selector="block-ui-document-demo"></app-code>
    `
})
export class DocumentDoc {
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
        basic: `<p-blockui [blocked]="blockedDocument" />`,
        html: `<div class="card">
    <p-blockui [blocked]="blockedDocument" />
    <p-button label="Block" (click)="blockDocument()" />
</div>`,
        typescript: `import { Component, ChangeDetectorRef } from '@angular/core';
import { BlockUI } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'block-ui-document-demo',
    templateUrl: './block-ui-document-demo.html',
    standalone: true,
    imports: [BlockUI, ButtonModule, Ripple]
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
