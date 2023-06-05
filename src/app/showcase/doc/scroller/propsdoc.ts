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
                        <td>style</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>any</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Index of the element in tabbing order.</td>
                    </tr>
                    <tr>
                        <td>items</td>
                        <td>array</td>
                        <td>null</td>
                        <td>An array of objects to display.</td>
                    </tr>
                    <tr>
                        <td>itemSize</td>
                        <td>number / [number, number]</td>
                        <td>null</td>
                        <td>The height/width of item according to orientation.</td>
                    </tr>
                    <tr>
                        <td>scrollHeight</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Height of the scroll viewport.</td>
                    </tr>
                    <tr>
                        <td>scrollWidth</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Width of the scroll viewport.</td>
                    </tr>
                    <tr>
                        <td>orientation</td>
                        <td>string</td>
                        <td>'vertical'</td>
                        <td>The orientation of scrollbar, valid values are 'vertical', 'horizontal' and 'both'.</td>
                    </tr>
                    <tr>
                        <td>step</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Used to specify how many items to load in each load method in lazy mode.</td>
                    </tr>
                    <tr>
                        <td>delay</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Delay in scroll before new data is loaded.</td>
                    </tr>
                    <tr>
                        <td>resizeDelay</td>
                        <td>number</td>
                        <td>10</td>
                        <td>Delay after window's resize finishes.</td>
                    </tr>
                    <tr>
                        <td>appendOnly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.</td>
                    </tr>
                    <tr>
                        <td>lazy</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if data is loaded and interacted with in lazy manner.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>If disabled, the scroller feature is eliminated and the content is displayed directly.</td>
                    </tr>
                    <tr>
                        <td>loaderDisabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Used to implement a custom loader instead of using the loader feature in the scroller.</td>
                    </tr>
                    <tr>
                        <td>loading</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the data is loaded.</td>
                    </tr>
                    <tr>
                        <td>showSpacer</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Used to implement a custom spacer instead of using the spacer feature in the scroller.</td>
                    </tr>
                    <tr>
                        <td>showLoader</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to show loader.</td>
                    </tr>
                    <tr>
                        <td>numToleratedItems</td>
                        <td>number</td>
                        <td>null</td>
                        <td>
                            Determines how many additional elements to add to the DOM outside of the view. <br />
                            According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. <br />
                            Default value is half the number of items shown in the view.
                        </td>
                    </tr>
                    <tr>
                        <td>autoSize</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to dynamically change the height or width of scrollable container.</td>
                    </tr>
                    <tr>
                        <td>trackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.</td>
                    </tr>
                    <tr>
                        <td>options</td>
                        <td>ScrollerOptions</td>
                        <td>false</td>
                        <td>Whether to use the scroller feature. The properties of scroller component can be used like an object in it.</td>
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
