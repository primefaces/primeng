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
                            <th class="whitespace-nowrap">Deprecated Since</th>
                            <th>Replacement</th>
                            <th>Removal</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>pTemplate</td>
                            <td>20</td>
                            <td>ng-template with a template reference variable</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>styleClass</td>
                            <td>v20</td>
                            <td>class</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Global inputVariant</td>
                            <td>v20</td>
                            <td>inputVariant</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>CamelCase Selectors</td>
                            <td>v20</td>
                            <td>Kebab case</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>pButton iconPos, loadingIcon, icon and label properties</td>
                            <td>20</td>
                            <td><i>pButtonIcon</i> and <i>pButtonLabel</i> directives</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Button plain property</td>
                            <td>20</td>
                            <td><i>pButtonIcon</i> and <i>pButtonLabel</i> directives</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>pButton buttonProps property</td>
                            <td>20</td>
                            <td>Use button properties directly on the element</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>p-button badgeClass property</td>
                            <td>20</td>
                            <td><i>badgeSeverity</i> property</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>AutoComplete minLength property</td>
                            <td>v20</td>
                            <td>minQueryLength</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>OrganizationChart preserveSpace property</td>
                            <td>v20</td>
                            <td>Obselete property, had no use</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Paginator dropdownAppendTo property</td>
                            <td>v20</td>
                            <td>appendTo</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Message text and escape properties</td>
                            <td>v20</td>
                            <td>Content projection</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Password maxLength property</td>
                            <td>v20</td>
                            <td><i>maxlength</i> property</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>TreeSelect containerStyle/containerStyleClass properties</td>
                            <td>v20</td>
                            <td>style and class</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Table responsiveLayout property</td>
                            <td>20</td>
                            <td>Always defaults to scroll, stack mode needs custom implementation</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>TreeSelect default template</td>
                            <td>20</td>
                            <td><i>value</i> template</td>
                            <td>v21</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    `
})
export class DeprecationsDoc {}
