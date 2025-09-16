import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'cla-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When a community member is offered the Contributor role, they are expected to sign a Contributor License Agreement (CLA) for legal purposes. This helps protect both the contributor and PrimeTek.</p>
        </app-docsectiontext>
    `
})
export class ClaDoc {}
