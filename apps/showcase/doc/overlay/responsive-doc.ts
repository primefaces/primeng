import { Component, Input } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'responsive-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: ` <app-docsectiontext>
            <p>It is the option used to determine in which mode it should appear according to the given <i>media</i> or <i>breakpoint</i>.</p>
        </app-docsectiontext>
        <app-code [hideToggleCode]="true"></app-code>

        <p class="doc-section-description">Valid values of the <i>direction</i> property would be;</p>
        <div class="card">
            <ul>
                <li>center (default)</li>
                <li>top</li>
                <li>top-start</li>
                <li>top-end</li>
                <li>bottom</li>
                <li>bottom-start</li>
                <li>bottom-end</li>
                <li>left</li>
                <li>left-start</li>
                <li>left-end</li>
                <li>right</li>
                <li>right-start</li>
                <li>right-end</li>
            </ul>
        </div>`
})
export class ResponsiveDoc {
    @Input() id: string;

    @Input() title: string;
}
