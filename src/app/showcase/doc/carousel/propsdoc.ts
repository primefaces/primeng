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
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to display.</td>
                    </tr>
                    <tr>
                        <td>page</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Index of the first item.</td>
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
                        <td>Style class of the viewport container.</td>
                    </tr>
                    <tr>
                        <td>circular</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if scrolling would be infinite.</td>
                    </tr>
                    <tr>
                        <td>showIndicators</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to display indicator container.</td>
                    </tr>
                    <tr>
                        <td>showNavigators</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to display navigation buttons in container.</td>
                    </tr>
                    <tr>
                        <td>autoplayInterval</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Time in milliseconds to scroll items automatically.</td>
                    </tr>
                    <tr>
                        <td>numVisible</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Number of items per page.</td>
                    </tr>
                    <tr>
                        <td>numScroll</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Number of items to scroll.</td>
                    </tr>
                    <tr>
                        <td>responsiveOptions</td>
                        <td>any</td>
                        <td>null</td>
                        <td>An array of options for responsive design.</td>
                    </tr>
                    <tr>
                        <td>orientation</td>
                        <td>string</td>
                        <td>horizontal</td>
                        <td>Specifies the layout of the component, valid values are "horizontal" and "vertical".</td>
                    </tr>
                    <tr>
                        <td>verticalViewPortHeight</td>
                        <td>string</td>
                        <td>300px</td>
                        <td>Height of the viewport in vertical layout.</td>
                    </tr>
                    <tr>
                        <td>contentClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of main content.</td>
                    </tr>
                    <tr>
                        <td>indicatorsContentClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the paginator items.</td>
                    </tr>
                    <tr>
                        <td>indicatorsContentStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Style of the paginator items.</td>
                    </tr>
                    <tr>
                        <td>indicatorStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the indicators.</td>
                    </tr>
                    <tr>
                        <td>indicatorStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style of the indicators.</td>
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
