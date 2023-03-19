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
                        <td>id</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Unique identifier of the element.</td>
                    </tr>
                    <tr>
                        <td>value</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to display.</td>
                    </tr>
                    <tr>
                        <td>activeIndex</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Index of the first item.</td>
                    </tr>
                    <tr>
                        <td>fullScreen</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display the component on fullscreen.</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Specifies the visibility of the mask on fullscreen mode.</td>
                    </tr>
                    <tr>
                        <td>numVisible</td>
                        <td>number</td>
                        <td>3</td>
                        <td>Number of items per page.</td>
                    </tr>
                    <tr>
                        <td>responsiveOptions</td>
                        <td>any</td>
                        <td>null</td>
                        <td>An array of options for responsive design.</td>
                    </tr>
                    <tr>
                        <td>showItemNavigators</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display navigation buttons in preview container.</td>
                    </tr>
                    <tr>
                        <td>showThumbnailNavigators</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to display navigation buttons in thumbnail container.</td>
                    </tr>
                    <tr>
                        <td>showItemNavigatorsOnHover</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display navigation buttons on preview container's hover.</td>
                    </tr>
                    <tr>
                        <td>changeItemOnIndicatorHover</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, preview item is changed on indicator item's hover.</td>
                    </tr>
                    <tr>
                        <td>circular</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if scrolling would be infinite.</td>
                    </tr>
                    <tr>
                        <td>autoPlay</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Items are displayed with a slideshow in autoPlay mode.</td>
                    </tr>
                    <tr>
                        <td>transitionInterval</td>
                        <td>number</td>
                        <td>4000</td>
                        <td>Time in milliseconds to scroll items.</td>
                    </tr>
                    <tr>
                        <td>showThumbnails</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to display thumbnail container.</td>
                    </tr>
                    <tr>
                        <td>thumbnailsPosition</td>
                        <td>string</td>
                        <td>bottom</td>
                        <td>Position of thumbnails. Valid values are "bottom", "top", "left" and "right".</td>
                    </tr>
                    <tr>
                        <td>verticalThumbnailViewPortHeight</td>
                        <td>string</td>
                        <td>300px</td>
                        <td>Height of the viewport in vertical thumbnail.</td>
                    </tr>
                    <tr>
                        <td>showIndicators</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display indicator container.</td>
                    </tr>
                    <tr>
                        <td>showIndicatorsOnItem</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, indicator container is displayed on preview container.</td>
                    </tr>
                    <tr>
                        <td>indicatorsPosition</td>
                        <td>string</td>
                        <td>bottom</td>
                        <td>Position of indicators. Valid values are "bottom", "top", "left" and "right".</td>
                    </tr>
                    <tr>
                        <td>baseZIndex</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Base zIndex value to use in layering.</td>
                    </tr>
                    <tr>
                        <td>maskClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the mask on fullscreen mode.</td>
                    </tr>
                    <tr>
                        <td>containerStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used.</td>
                    </tr>
                    <tr>
                        <td>galleriaClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used.</td>
                    </tr>
                    <tr>
                        <td>showTransitionOptions</td>
                        <td>string</td>
                        <td>150ms cubic-bezier(0, 0, 0.2, 1)/td></td>
                        <td>Transition options of the show animation.</td>
                    </tr>
                    <tr>
                        <td>hideTransitionOptions</td>
                        <td>string</td>
                        <td>150ms cubic-bezier(0, 0, 0.2, 1)</td>
                        <td>Transition options of the hide animation.</td>
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
