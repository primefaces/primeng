import { AppDocModule } from '@/components/doc/app.doc.module';
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'v20-deprecations-doc',
    imports: [AppDocModule, TagModule],
    template: `
        <app-docsectiontext>
            <p>The following items are marked as deprecated. These are subject to soft deprecation, which means they are no longer recommended for use, but will remain available and will not be removed in future releases.</p>
            <div class="doc-tablewrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>API</th>
                            <th class="whitespace-nowrap">Deprecated Since</th>
                            <th>Replacement</th>
                            <th>Removal</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>pTemplate</td>
                            <td>v20</td>
                            <td>ng-template with a template reference variable</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>styleClass *(for host enabled components)</td>
                            <td>v20</td>
                            <td>class</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Global inputVariant</td>
                            <td>v20</td>
                            <td>inputVariant</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>CamelCase Selectors</td>
                            <td>v20</td>
                            <td>Kebab case</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>pButton iconPos, loadingIcon, icon and label properties</td>
                            <td>v20</td>
                            <td><i>pButtonIcon</i> and <i>pButtonLabel</i> directives</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Button plain property</td>
                            <td>v20</td>
                            <td><i>pButtonIcon</i> and <i>pButtonLabel</i> directives</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>pButton buttonProps property</td>
                            <td>v20</td>
                            <td>Use button properties directly on the element</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>p-button badgeClass property</td>
                            <td>v20</td>
                            <td><i>badgeSeverity</i> property</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>AutoComplete minLength property</td>
                            <td>v20</td>
                            <td>minQueryLength</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>OrganizationChart preserveSpace property</td>
                            <td>v20</td>
                            <td>Obselete property, had no use</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Paginator dropdownAppendTo property</td>
                            <td>v20</td>
                            <td>appendTo</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Message text and escape properties</td>
                            <td>v20</td>
                            <td>Content projection</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Password maxLength property</td>
                            <td>v20</td>
                            <td><i>maxlength</i> property</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>TreeSelect containerStyle/containerStyleClass properties</td>
                            <td>v20</td>
                            <td>style and class</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Table responsiveLayout property</td>
                            <td>v20</td>
                            <td>Always defaults to scroll, stack mode needs custom implementation</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>TreeSelect default template</td>
                            <td>v20</td>
                            <td><i>value</i> template</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>pBadge directive</td>
                            <td>v20</td>
                            <td><i>OverlayBadge</i> component</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>clearFilterIcon template of Table</td>
                            <td>v20</td>
                            <td>Obsolete, not utilized.</td>
                            <td>None</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    `
})
export class DeprecationsDoc {}
