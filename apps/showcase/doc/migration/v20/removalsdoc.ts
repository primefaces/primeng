import { AppDocModule } from '@/components/doc/app.doc.module';
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'v20-breaking-doc',
    imports: [AppDocModule, TagModule],
    template: `
        <app-docsectiontext>
            <p>The list of items that were deprecated in previous releases and removed in this iteration.</p>
            <div class="doc-tablewrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Deprecated Since</th>
                            <th>Replacement</th>
                            <th>Status in v20</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Calendar</td>
                            <td>v18</td>
                            <td>DatePicker</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Dropdown</td>
                            <td>v18</td>
                            <td>Select</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>InputSwitch</td>
                            <td>v18</td>
                            <td>ToggleSwitch</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>OverlayPanel</td>
                            <td>v18</td>
                            <td>Popover</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Sidebar</td>
                            <td>v18</td>
                            <td>Drawer</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Chips</td>
                            <td>v18</td>
                            <td>AutoComplete in multiple mode without typehead option</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>TabMenu</td>
                            <td>v18</td>
                            <td>Tabs without panels</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Steps</td>
                            <td>v18</td>
                            <td>Stepper without panels</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Messages</td>
                            <td>v18</td>
                            <td>Message</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>InlineMessage</td>
                            <td>v18</td>
                            <td>Message</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>TabView</td>
                            <td>v18</td>
                            <td>Tabs</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>AccordionTab</td>
                            <td>v18</td>
                            <td>AccordionPanel, AccordionHeader, AccordionContent</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>pDefer</td>
                            <td>v18</td>
                            <td>Angular deferred views</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    `
})
export class RemovalsDoc {}
