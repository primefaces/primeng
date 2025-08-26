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
                            <th>API</th>
                            <th class="whitespace-nowrap">Deprecated Since</th>
                            <th>Replacement</th>
                            <th class="whitespace-nowrap">Status in v20</th>
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
                            <td>Accordion activeIndex property</td>
                            <td>v18</td>
                            <td><i>value</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Accordion headerAriaLevel property</td>
                            <td>v18</td>
                            <td>AccordionHeader <i>aria-level</i> attribute</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>AccordionTab</td>
                            <td>v18</td>
                            <td>AccordionPanel, AccordionHeader, AccordionContent</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>AutoComplete field property</td>
                            <td>v18</td>
                            <td><i>optionLabel</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>AutoComplete itemSize property</td>
                            <td>v18</td>
                            <td><i>virtualScrollItemSize</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>pDefer</td>
                            <td>v18</td>
                            <td>Angular deferred views</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>pAutoFocus autofocus property</td>
                            <td>v18</td>
                            <td>
                                Default attribute directive <i>{{ '[pAutoFocus]="true|false"' }}</i>
                            </td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Badge size property</td>
                            <td>v18</td>
                            <td><i>badgeSize</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>DatePicker monthNavigator, yearNavigator, yearRange, locale properties</td>
                            <td>v18</td>
                            <td>Obsolete, not utilized.</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Dialog positionLeft, responsive, breakpoint properties</td>
                            <td>v18</td>
                            <td>Obsolete, not utilized.</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>InputMask autoFocus property</td>
                            <td>v18</td>
                            <td><i>autofocus</i> property.</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>MultiSelect checkicon template</td>
                            <td>v18</td>
                            <td><i>headercheckboxicon</i> and <i>itemcheckboxicon</i>.</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>MultiSelect/Select baseZIndex, autoZIndex, showTransitionOptions, hideTransitionOptions</td>
                            <td>v14</td>
                            <td><i>overlayOptions</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Rating onCancel event and cancelIcon template</td>
                            <td>v18</td>
                            <td>Obsolete, not utilized.</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>MultiSelect defaultLabel property</td>
                            <td>v18</td>
                            <td><i>placeholder</i> property.</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>MultiSelect/Select itemSize property</td>
                            <td>v18</td>
                            <td><i>virtualScrollItemSize</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Select autoDisplayFirst property</td>
                            <td>v17</td>
                            <td>Set initial value by model instead</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>TreeSelect showTransitionOptions, hideTransitionOptions</td>
                            <td>v14</td>
                            <td><i>overlayOptions</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Panel expandIcon and collapseIcon properties</td>
                            <td>v18</td>
                            <td><i>headericons</i> template</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>StyleClass enterClass/leaveClass properties</td>
                            <td>v18</td>
                            <td><i>enterFromClass</i> and <i>leaveFromClass</i> properties</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Table scrollDirection property</td>
                            <td>14</td>
                            <td>Obsolete, not utilized.</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Table responsive property</td>
                            <td>14</td>
                            <td>An horizontal scroll is displayed for smaller screens</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Table/TreeTable virtualRowHeight property</td>
                            <td>v18</td>
                            <td><i>virtualScrollItemSize</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Table autoLayout property</td>
                            <td>v18</td>
                            <td>Table always uses autoLayout as implementation requirement</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                        <tr>
                            <td>Tree virtualNodeHeight property</td>
                            <td>v18</td>
                            <td><i>virtualScrollItemSize</i> property</td>
                            <td><p-tag value="removed" severity="danger" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    `
})
export class RemovalsDoc {}
