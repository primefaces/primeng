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
                        <td>An array of treenodes.</td>
                    </tr>
                    <tr>
                        <td>selectionMode</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines the selection mode, valid values "single", "multiple", and "checkbox".</td>
                    </tr>
                    <tr>
                        <td>selection</td>
                        <td>any</td>
                        <td>null</td>
                        <td>A single treenode instance or an array to refer to the selections.</td>
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
                        <td>contextMenu</td>
                        <td>ContextMenu</td>
                        <td>null</td>
                        <td>Context menu instance.</td>
                    </tr>
                    <tr>
                        <td>layout</td>
                        <td>string</td>
                        <td>vertical</td>
                        <td>Defines the orientation of the tree, valid values are 'vertical' and 'horizontal'.</td>
                    </tr>
                    <tr>
                        <td>draggableScope</td>
                        <td>string/array</td>
                        <td>null</td>
                        <td>Scope of the draggable nodes to match a droppableScope.</td>
                    </tr>
                    <tr>
                        <td>droppableScope</td>
                        <td>string/array</td>
                        <td>null</td>
                        <td>Scope of the droppable nodes to match a draggableScope.</td>
                    </tr>
                    <tr>
                        <td>draggableNodes</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the nodes are draggable.</td>
                    </tr>
                    <tr>
                        <td>droppableNodes</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the nodes are droppable.</td>
                    </tr>
                    <tr>
                        <td>metaKeySelection</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>
                            Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices,
                            metaKeySelection is turned off automatically.
                        </td>
                    </tr>
                    <tr>
                        <td>propagateSelectionUp</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether checkbox selections propagate to ancestor nodes.</td>
                    </tr>
                    <tr>
                        <td>propagateSelectionDown</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether checkbox selections propagate to descendant nodes.</td>
                    </tr>
                    <tr>
                        <td>loading</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays a loader to indicate data load is in progress.</td>
                    </tr>
                    <tr>
                        <td>loadingIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>The icon to show while indicating data load is in progress.</td>
                    </tr>
                    <tr>
                        <td>emptyMessage</td>
                        <td>string</td>
                        <td>No records found</td>
                        <td>Text to display when there is no data.</td>
                    </tr>
                    <tr>
                        <td>ariaLabel</td>
                        <td>string</td>
                        <td></td>
                        <td>Used to define a string that labels the tree.</td>
                    </tr>
                    <tr>
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Establishes relationships between the component and label(s) where its value should be one or more element IDs.</td>
                    </tr>
                    <tr>
                        <td>togglerAriaLabel</td>
                        <td>string</td>
                        <td></td>
                        <td>Defines a string that labels the toggler icon for accessibility.</td>
                    </tr>
                    <tr>
                        <td>validateDrop</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, drop can be accepted or rejected based on condition defined at onNodeDrop.</td>
                    </tr>
                    <tr>
                        <td>filter</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, displays an input field to filter the items.</td>
                    </tr>
                    <tr>
                        <td>filterBy</td>
                        <td>string</td>
                        <td>label</td>
                        <td>When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.</td>
                    </tr>
                    <tr>
                        <td>filterMode</td>
                        <td>string</td>
                        <td>lenient</td>
                        <td>Mode for filtering valid values are "lenient" and "strict". Default is lenient.</td>
                    </tr>
                    <tr>
                        <td>filterPlaceholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Placeholder text to show when filter input is empty.</td>
                    </tr>
                    <tr>
                        <td>filterLocale</td>
                        <td>string</td>
                        <td>undefined</td>
                        <td>Locale to use in filtering. The default locale is the host environment's current locale.</td>
                    </tr>
                    <tr>
                        <td>scrollHeight</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Height of the scrollable viewport.</td>
                    </tr>
                    <tr>
                        <td>virtualScroll</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether the data should be loaded on demand during scroll.</td>
                    </tr>
                    <tr>
                        <td>virtualScrollItemSize</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Height of an item in the list for VirtualScrolling.</td>
                    </tr>
                    <tr>
                        <td>virtualScrollOptions</td>
                        <td>ScrollerOptions</td>
                        <td>null</td>
                        <td>Whether to use the scroller feature. The properties of <a href="#" [routerLink]="['/scroller']">scroller</a> component can be used like an object in it.</td>
                    </tr>
                    <tr>
                        <td>lazy</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Defines if data is loaded and interacted with in lazy manner.</td>
                    </tr>
                    <tr>
                        <td>trackBy</td>
                        <td>Function</td>
                        <td>null</td>
                        <td>Function to optimize the node list rendering, default algorithm checks for object identity.</td>
                    </tr>
                    <tr>
                        <td>indentation</td>
                        <td>number</td>
                        <td>1.5</td>
                        <td>Indentation factor for spacing of the nested node when virtual scrolling is enabled.</td>
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
