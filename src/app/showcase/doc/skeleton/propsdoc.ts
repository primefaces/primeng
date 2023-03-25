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
                        <td>shape</td>
                        <td>string</td>
                        <td>rectangle</td>
                        <td>Shape of the element, options are "rectangle" and "circle".</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Size of the Circle or Square.</td>
                    </tr>
                    <tr>
                        <td>width</td>
                        <td>string</td>
                        <td>100%</td>
                        <td>Width of the element.</td>
                    </tr>
                    <tr>
                        <td>height</td>
                        <td>string</td>
                        <td>1rem</td>
                        <td>Height of the element.</td>
                    </tr>
                    <tr>
                        <td>borderRadius</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Border radius of the element, defaults to value from theme.</td>
                    </tr>
                    <tr>
                        <td>animation</td>
                        <td>string</td>
                        <td>wave</td>
                        <td>Type of the animation, valid options are "wave" and "none".</td>
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
