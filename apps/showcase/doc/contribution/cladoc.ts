import { Component } from '@angular/core';

@Component({
    selector: 'cla-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>When a community member is offered the Contributor role, they are expected to sign a Contributor License Agreement (CLA) for legal purposes. This helps protect both the contributor and PrimeTek.</p>
        </app-docsectiontext>
    `
})
export class ClaDoc {}
