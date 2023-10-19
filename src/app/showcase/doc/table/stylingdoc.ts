import { Component, Input } from '@angular/core';

@Component({
    selector: 'styling-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>p-datatable</td>
                        <td>Container element.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-header</td>
                        <td>Header section.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-footer</td>
                        <td>Footer section.</td>
                    </tr>
                    <tr>
                        <td>p-sortable-column</td>
                        <td>Sortable column header.</td>
                    </tr>
                    <tr>
                        <td>p-editable-column</td>
                        <td>Editable column cell.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-thead</td>
                        <td>Thead element of header columns.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-tbody</td>
                        <td>Tbody element of body rows.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-tfoot</td>
                        <td>Tfoot element of footer columns.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-scrollable</td>
                        <td>Container element when scrolling is enabled.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-resizable</td>
                        <td>Container element when column resizing is enabled.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-resizable-fit</td>
                        <td>Container element when column resizing is enabled and set to fit mode.</td>
                    </tr>
                    <tr>
                        <td>p-column-resizer-helper</td>
                        <td>Vertical resizer indicator bar.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-reorderablerow-handle</td>
                        <td>Handle element of a reorderable row.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-reorder-indicator-up</td>
                        <td>Up indicator to display during column reordering.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-reorder-indicator-up</td>
                        <td>Down indicator to display during column reordering.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-loading-overlay</td>
                        <td>Overlay to display when table is loading.</td>
                    </tr>
                    <tr>
                        <td>p-datatable-loading-icon</td>
                        <td>Icon to display when table is loading.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class StylingDoc {
    @Input() id: string;

    @Input() title: string;
}
