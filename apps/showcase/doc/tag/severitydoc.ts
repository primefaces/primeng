import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'severity-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, TagModule],
    template: `
        <app-docsectiontext>
            <p>Severity defines the color of the tag, possible values are <i>success</i>, <i>info</i>, <i>warn</i> and <i>danger</i> in addition to the default theme color.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-tag value="Primary" />
            <p-tag severity="secondary" value="Secondary" />
            <p-tag severity="success" value="Success" />
            <p-tag severity="info" value="Info" />
            <p-tag severity="warn" value="Warn" />
            <p-tag severity="danger" value="Danger" />
            <p-tag severity="contrast" value="Contrast" />
        </div>
        <app-code selector="tag-severity-demo"></app-code>
    `
})
export class SeverityDoc {}
