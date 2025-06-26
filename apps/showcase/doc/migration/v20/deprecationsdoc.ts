import { AppDocModule } from '@/components/doc/app.doc.module';
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'v20-deprecations-doc',
    imports: [AppDocModule, TagModule],
    template: `
        <app-docsectiontext>
            <p>The list of items that are deprecated.</p>
            <div class="doc-tablewrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>API</th>
                            <th>Deprecated Since</th>
                            <th>Replacement</th>
                            <th>Removal</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>styleClass</td>
                            <td>v20</td>
                            <td>class</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Global inputVariant</td>
                            <td>v20</td>
                            <td>inputVariant</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>CamelCase Selectors</td>
                            <td>v20</td>
                            <td>Kebab case</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>AutoComplete minLength property</td>
                            <td>v20</td>
                            <td>minQueryLength</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>OrganizationChart preserveSpace property</td>
                            <td>v20</td>
                            <td>Obselete property, had no use</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Paginator dropdownAppendTo property</td>
                            <td>v20</td>
                            <td>appendTo</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Message escape property</td>
                            <td>v20</td>
                            <td>Content projection</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>TreeSelect containerStyle/containerStyleClass properties</td>
                            <td>v20</td>
                            <td>style and class</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    `
})
export class DeprecationsDoc {}
