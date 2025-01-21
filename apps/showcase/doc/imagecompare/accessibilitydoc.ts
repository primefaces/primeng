import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'image-compare-accessibility-doc',
    standalone: false,
    template: ` <div>
        <app-docsectiontext id="accessibility" label="Accessibility">
            <h3>Screen Reader</h3>
            <p>ImageComponent component uses a native range <i>slider</i> internally. Value to describe the component can be defined using <i>aria-labelledby</i> and <i>aria-label</i> props.</p>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
            <h3>Keyboard Support</h3>
            <div class="doc-tablewrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><i>tab</i></td>
                            <td>Moves focus to the component.</td>
                        </tr>
                        <tr>
                            <td>
                                <span class="inline-flex flex-col">
                                    <i class="mb-1">left arrow</i>
                                    <i>up arrow</i>
                                </span>
                            </td>
                            <td>Decrements the value.</td>
                        </tr>
                        <tr>
                            <td>
                                <span class="inline-flex flex-col">
                                    <i class="mb-1">right arrow</i>
                                    <i>down arrow</i>
                                </span>
                            </td>
                            <td>Increments the value.</td>
                        </tr>
                        <tr>
                            <td><i>home</i></td>
                            <td>Set the minimum value.</td>
                        </tr>
                        <tr>
                            <td><i>end</i></td>
                            <td>Set the maximum value.</td>
                        </tr>
                        <tr>
                            <td><i>page up</i></td>
                            <td>Increments the value by 10 steps.</td>
                        </tr>
                        <tr>
                            <td><i>page down</i></td>
                            <td>Decrements the value by 10 steps.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </div>`
})
export class AccessibilityDoc {
    code: Code = {
        html: `<span id="image_label">Compare Images</span>
<p-imagecompare class="shadow-lg rounded-2xl" aria-labelledby="image-label">
    ...
</p-imagecompare>

<p-imagecompare class="shadow-lg rounded-2xl" aria-label="Compare Images">
    ...
</p-imagecompare>`
    };
}
