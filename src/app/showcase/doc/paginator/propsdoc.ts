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
                        <td>totalRecords</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Number of total records.</td>
                    </tr>
                    <tr>
                        <td>rows</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Data count to display per page.</td>
                    </tr>
                    <tr>
                        <td>first</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Zero-relative number of the first row to be displayed.</td>
                    </tr>
                    <tr>
                        <td>pageLinkSize</td>
                        <td>number</td>
                        <td>5</td>
                        <td>Number of page links to display.</td>
                    </tr>
                    <tr>
                        <td>rowsPerPageOptions</td>
                        <td>array</td>
                        <td>null</td>
                        <td>Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,&#123;showAll:'All'&#125;]</td>
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
                        <td>alwaysShow</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show it even there is only one page.</td>
                    </tr>
                    <tr>
                        <td>showFirstLastIcon</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, icons are displayed on paginator to go first and last page.</td>
                    </tr>
                    <tr>
                        <td>templateLeft</td>
                        <td>TemplateRef</td>
                        <td>null</td>
                        <td>Template instance to inject into the left side of the paginator.</td>
                    </tr>
                    <tr>
                        <td>templateRight</td>
                        <td>TemplateRef</td>
                        <td>null</td>
                        <td>Template instance to inject into the right side of the paginator.</td>
                    </tr>
                    <tr>
                        <td>dropdownItemTemplate</td>
                        <td>TemplateRef</td>
                        <td>null</td>
                        <td>Template instance to inject into the dropdown item inside in the paginator.</td>
                    </tr>
                    <tr>
                        <td>dropdownAppendTo</td>
                        <td>any</td>
                        <td>null</td>
                        <td>
                            Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element
                            having #mydiv as variable name).
                        </td>
                    </tr>
                    <tr>
                        <td>dropdownScrollHeight</td>
                        <td>string</td>
                        <td>200px</td>
                        <td>Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.</td>
                    </tr>
                    <tr>
                        <td>currentPageReportTemplate</td>
                        <td>string</td>
                        <td>(&#123;currentPage&#125; of &#123;totalPages&#125;)</td>
                        <td>Template of the current page report element. Available placeholders are &#123;currentPage&#125;,&#123;totalPages&#125;,&#123;rows&#125;,&#123;first&#125;,&#123;last&#125; and &#123;totalRecords&#125;</td>
                    </tr>
                    <tr>
                        <td>showCurrentPageReport</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display current page report.</td>
                    </tr>
                    <tr>
                        <td>showJumpToPageDropdown</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display a dropdown to navigate to any page.</td>
                    </tr>
                    <tr>
                        <td>showJumpToPageInput</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display a input to navigate to any page.</td>
                    </tr>
                    <tr>
                        <td>showPageLinks</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to show page links.</td>
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
