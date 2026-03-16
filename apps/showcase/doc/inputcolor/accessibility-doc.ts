import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'accessibility-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <div>
        <app-docsectiontext>
            <h3>InputColorArea</h3>

            <h4>Screen Reader Support</h4>
            <p>
                <i>aria-label</i> is used to describe the component. <i>aria-roledescription</i> is used to describe the role of the component. <i>aria-valuemin</i>, <i>aria-valuemax</i>, <i>aria-valuenow</i>, <i>aria-valuetext</i> are used to
                describe the value of the component.
            </p>

            <h4>Keyboard Support</h4>
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
                            <td>Moves focus to the area thumb.</td>
                        </tr>
                        <tr>
                            <td><i>right arrow</i></td>
                            <td>Moves the area thumb to the right.</td>
                        </tr>
                        <tr>
                            <td><i>left arrow</i></td>
                            <td>Moves the area thumb to the left.</td>
                        </tr>
                        <tr>
                            <td><i>up arrow</i></td>
                            <td>Moves the area thumb to the up.</td>
                        </tr>
                        <tr>
                            <td><i>down arrow</i></td>
                            <td>Moves the area thumb to the down.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>InputColorSlider</h3>

            <h4>Screen Reader Support</h4>
            <p><i>aria-label</i> is used to describe the component. <i>aria-valuemin</i>, <i>aria-valuemax</i>, <i>aria-valuenow</i>, <i>aria-valuetext</i> are used to describe the value of the component.</p>

            <h4>Keyboard Support</h4>
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
                            <td>Moves focus to the slider thumb.</td>
                        </tr>
                        <tr>
                            <td><i>up arrow</i> || <i>left arrow</i></td>
                            <td>Decrements the slider thumb.</td>
                        </tr>
                        <tr>
                            <td><i>down arrow</i> || <i>right arrow</i></td>
                            <td>Increments the slider thumb.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </div>`
})
export class AccessibilityDoc {}
