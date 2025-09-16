import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'chart-accessibility-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: ` <div>
        <app-docsectiontext>
            <div class="doc-section-description">
                <h3>Screen Reader</h3>
                <p>
                    Chart components internally use <i>canvas</i> element, refer to the
                    <a class="text-primary font-medium hover:underline" href="https://www.chartjs.org/docs/latest/general/accessibility.html">Chart.js accessibility</a>
                    guide for more information.
                </p>
            </div>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        html: `<p-chart type="line" [data]="data" ariaLabel="Data" />`
    };
}
