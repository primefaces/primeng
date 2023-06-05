import { Component, Input, ViewChild } from '@angular/core';
import { AppDocSectionTextComponent } from 'src/app/showcase/layout/doc/docsectiontext/app.docsectiontext.component';

@Component({
    selector: 'api-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
            <p>Configuration is managed by the Locale API imported from <i>primeng/config</i>.</p>

            <h3>Locale Options</h3>
        </app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>startsWith</td>
                        <td>Starts with</td>
                    </tr>
                    <tr>
                        <td>contains</td>
                        <td>Contains</td>
                    </tr>
                    <tr>
                        <td>notContains</td>
                        <td>Not contains</td>
                    </tr>
                    <tr>
                        <td>endsWith</td>
                        <td>Ends with</td>
                    </tr>
                    <tr>
                        <td>equals</td>
                        <td>Equals</td>
                    </tr>
                    <tr>
                        <td>notEquals</td>
                        <td>Not equals</td>
                    </tr>
                    <tr>
                        <td>noFilter</td>
                        <td>No Filter</td>
                    </tr>
                    <tr>
                        <td>lt</td>
                        <td>Less than</td>
                    </tr>
                    <tr>
                        <td>lte</td>
                        <td>Less than or equal to</td>
                    </tr>
                    <tr>
                        <td>gt</td>
                        <td>Greater than</td>
                    </tr>
                    <tr>
                        <td>gte</td>
                        <td>Greater than or equal to</td>
                    </tr>
                    <tr>
                        <td>is</td>
                        <td>Is</td>
                    </tr>
                    <tr>
                        <td>isNot</td>
                        <td>Is not</td>
                    </tr>
                    <tr>
                        <td>before</td>
                        <td>Before</td>
                    </tr>
                    <tr>
                        <td>after</td>
                        <td>After</td>
                    </tr>
                    <tr>
                        <td>dateIs</td>
                        <td>Date is</td>
                    </tr>
                    <tr>
                        <td>dateIsNot</td>
                        <td>Date is not</td>
                    </tr>
                    <tr>
                        <td>dateBefore</td>
                        <td>Date is before</td>
                    </tr>
                    <tr>
                        <td>dateAfter</td>
                        <td>Date is after</td>
                    </tr>
                    <tr>
                        <td>clear</td>
                        <td>Clear</td>
                    </tr>
                    <tr>
                        <td>apply</td>
                        <td>Apply</td>
                    </tr>
                    <tr>
                        <td>matchAll</td>
                        <td>Match All</td>
                    </tr>
                    <tr>
                        <td>matchAny</td>
                        <td>Match Any</td>
                    </tr>
                    <tr>
                        <td>addRule</td>
                        <td>Add Rule</td>
                    </tr>
                    <tr>
                        <td>removeRule</td>
                        <td>Remove Rule</td>
                    </tr>
                    <tr>
                        <td>accept</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>reject</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>choose</td>
                        <td>Choose</td>
                    </tr>
                    <tr>
                        <td>upload</td>
                        <td>Upload</td>
                    </tr>
                    <tr>
                        <td>cancel</td>
                        <td>Cancel</td>
                    </tr>
                    <tr>
                        <td>dayNames</td>
                        <td>["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]</td>
                    </tr>
                    <tr>
                        <td>dayNamesShort</td>
                        <td>["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]</td>
                    </tr>
                    <tr>
                        <td>dayNamesMin</td>
                        <td>["Su","Mo","Tu","We","Th","Fr","Sa"]</td>
                    </tr>
                    <tr>
                        <td>monthNames</td>
                        <td>["January","February","March","April","May","June","July","August","September","October","November","December"]</td>
                    </tr>
                    <tr>
                        <td>monthNamesShort</td>
                        <td>["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]</td>
                    </tr>
                    <tr>
                        <td>dateFormat</td>
                        <td>mm/dd/yy</td>
                    </tr>
                    <tr>
                        <td>firstDayOfWeek</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>today</td>
                        <td>Today</td>
                    </tr>
                    <tr>
                        <td>weekHeader</td>
                        <td>Wk</td>
                    </tr>
                    <tr>
                        <td>weak</td>
                        <td>Weak</td>
                    </tr>
                    <tr>
                        <td>medium</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td>strong</td>
                        <td>Strong</td>
                    </tr>
                    <tr>
                        <td>passwordPrompt</td>
                        <td>Enter a password</td>
                    </tr>
                    <tr>
                        <td>emptyMessage</td>
                        <td>No results found</td>
                    </tr>
                    <tr>
                        <td>emptyFilterMessage</td>
                        <td>No results found</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class ApiDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;
}
