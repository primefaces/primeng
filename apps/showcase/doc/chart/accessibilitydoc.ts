import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'chart-accessibility-doc',
    standalone: false,
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
