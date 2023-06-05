import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    ProgressBar components uses <i>progressbar</i> role along with <i>aria-valuemin</i>, <i>aria-valuemax</i> and <i>aria-valuenow</i> attributes. Value to describe the component can be defined using<i>aria-labelledby</i> and
                    <i>aria-label</i> props.
                </p>
            </app-docsectiontext>

            <app-code [code]="code" [hideToggleCode]="true"></app-code>

            <h3>Keyboard Support</h3>
            <p>Not applicable.</p>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        html: `<span id="label_status">Status</span>
<p-progressBar aria-labelledby="label_status"></p-progressBar>

<p-progressBar aria-label="Status"></p-progressBar>`
    };
}
