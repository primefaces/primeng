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
                        <td>size</td>
                        <td>number</td>
                        <td>100</td>
                        <td>Size of the component in pixels.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component should be disabled.</td>
                    </tr>
                    <tr>
                        <td>readonly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the component value cannot be edited.</td>
                    </tr>
                    <tr>
                        <td>step</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Step factor to increment/decrement the value.</td>
                    </tr>
                    <tr>
                        <td>min</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Mininum boundary value.</td>
                    </tr>
                    <tr>
                        <td>max</td>
                        <td>number</td>
                        <td>100</td>
                        <td>Maximum boundary value.</td>
                    </tr>
                    <tr>
                        <td>valueColor</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Background of the value.</td>
                    </tr>
                    <tr>
                        <td>rangeColor</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Background color of the range.</td>
                    </tr>
                    <tr>
                        <td>textColor</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Color of the value text.</td>
                    </tr>
                    <tr>
                        <td>strokeWidth</td>
                        <td>number</td>
                        <td>14</td>
                        <td>Width of the knob stroke.</td>
                    </tr>
                    <tr>
                        <td>showValue</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether the show the value inside the knob.</td>
                    </tr>
                    <tr>
                        <td>valueTemplate</td>
                        <td>string</td>
                        <td>&#123;value&#125;</td>
                        <td>Template string of the value.</td>
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
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}
