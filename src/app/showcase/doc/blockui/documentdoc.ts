import { ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'block-ui-document-demo',
    template: `
        <app-docsectiontext>
            <p>If the target element is not specified, BlockUI blocks the document by default.</p>
        </app-docsectiontext>
        <div class="card">
            <p-blockUI [blocked]="blockedDocument" />
            <p-button pRipple label="Block" (click)="blockDocument()" />
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
        basic: `<p-blockUI [blocked]="blockedDocument" />`,
        html: `<div class="card">
    <p-blockUI [blocked]="blockedDocument" />
    <p-button pRipple label="Block" (click)="blockDocument()" />
</div>`,
        typescript: `import { Component, ChangeDetectorRef } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
        
@Component({
    selector: 'block-ui-document-demo',
    templateUrl: './block-ui-document-demo.html',
    standalone: true,
    imports: [BlockUIModule, ButtonModule, RippleModule]
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
