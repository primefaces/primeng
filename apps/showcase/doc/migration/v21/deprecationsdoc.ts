import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'v21-deprecations-doc',
    standalone: true,
    imports: [TagModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The following items are marked as deprecated.</p>
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
                            <td>showTransitionOptions</td>
                            <td>v21</td>
                            <td>Native CSS animatons</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>hideTransitionOptions</td>
                            <td>v21</td>
                            <td>Native CSS animatons</td>
                            <td>v22</td>
                            <td><p-tag value="deprecated" severity="warn" /></td>
                        </tr>
                        <tr>
                            <td>Directive PT attribute names e.g. ptInputText</td>
                            <td>v21</td>
                            <td>PT suffix at the end e.g. pInputTextPT</td>
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
