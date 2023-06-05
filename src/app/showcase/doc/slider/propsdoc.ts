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
                        <td>animate</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, displays an animation on click of the slider bar.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that the element should be disabled.</td>
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
                        <td>orientation</td>
                        <td>string</td>
                        <td>horizontal</td>
                        <td>Orientation of the slider, valid values are horizontal and vertical.</td>
                    </tr>
                    <tr>
                        <td>step</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Step factor to increment/decrement the value.</td>
                    </tr>
                    <tr>
                        <td>range</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, allows two boundary values to be picked.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
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
                        <td>tabindex</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Index of the element in tabbing order.</td>
                    </tr>
                    <tr>
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Establishes relationships between the component and label(s) where its value should be one or more element IDs.</td>
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
