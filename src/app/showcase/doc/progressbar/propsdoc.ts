import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>value</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Current value of the progress.</td>
                    </tr>
                    <tr>
                        <td>showValue</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Show or hide progress bar value.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>color</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Color for the background of the progress.</td>
                    </tr>
                    <tr>
                        <td>unit</td>
                        <td>string</td>
                        <td>%</td>
                        <td>Unit sign appended to the value.</td>
                    </tr>
                    <tr>
                        <td>mode</td>
                        <td>string</td>
                        <td>determinate</td>
                        <td>Defines the mode of the progress, valid values are "determinate" and "indeterminate".</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}
