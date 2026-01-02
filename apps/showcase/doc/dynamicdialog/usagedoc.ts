import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'usage-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>To use dynamic dialog, a reference should be declared as <i>DynamicDialogRef</i> after the <i>DialogService</i> injected into the component.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>
    `,
    providers: [DialogService]
})
export class UsageDoc {
    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}
}
