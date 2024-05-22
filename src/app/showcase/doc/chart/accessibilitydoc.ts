import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <div class="doc-section-description">
                <h3>Screen Reader</h3>
                <p>
                    Chart components internally use <i>canvas</i> element, refer to the <a class="text-primary font-medium hover:underline" href="https://www.chartjs.org/docs/latest/general/accessibility.html">Chart.js accessibility</a> guide for
                    more information. The canvas element can be customized with <i>canvasProps</i> property to define aria roles and properties, in addition any content inside the component is directly passed as a child of the canvas to be able to
                    provide fallback content like a table.
                </p>
            </div>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        html: `<p-chart type="line" [data]="data" ariaLabbel="Data" />`
    };
}
