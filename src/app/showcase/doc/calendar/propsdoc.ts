import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section class="py-4">
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
                        <td>defaultDate</td>
                        <td>Date</td>
                        <td>null</td>
                        <td>Set the date to highlight on first opening if the field is blank.</td>
                    </tr>
                    <tr>
                        <td>selectionMode</td>
                        <td>string</td>
                        <td>single</td>
                        <td>Defines the quantity of the selection, valid values are "single", "multiple" and "range".</td>
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
                        <td>inputStyle</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the input field.</td>
                    </tr>
                    <tr>
                        <td>inputStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the input field.</td>
                    </tr>
                    <tr>
                        <td>inputId</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Identifier of the focus input to match a label defined for the component.</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the input element.</td>
                    </tr>
                    <tr>
                        <td>placeholder</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Placeholder text for the input.</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When specified, disables the component.</td>
                    </tr>
                    <tr>
                        <td>dateFormat</td>
                        <td>string</td>
                        <td>mm/dd/yy</td>
                        <td>Format of the date which can also be defined at locale settings.</td>
                    </tr>
                    <tr>
                        <td>inline</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, displays the calendar as inline. Default is false for popup mode.</td>
                    </tr>
                    <tr>
                        <td>showOtherMonths</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.</td>
                    </tr>
                    <tr>
                        <td>selectOtherMonths</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.</td>
                    </tr>
                    <tr>
                        <td>showIcon</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, displays a button with icon next to input.</td>
                    </tr>
                    <tr>
                        <td>showOnFocus</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When disabled, datepicker will not be visible with input focus.</td>
                    </tr>
                    <tr>
                        <td>showWeek</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, calendar will show week numbers.</td>
                    </tr>
                    <tr>
                        <td>icon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the calendar button.</td>
                    </tr>
                    <tr>
                        <td>appendTo</td>
                        <td>any</td>
                        <td>null</td>
                        <td>
                            Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having
                            #mydiv as variable name).
                        </td>
                    </tr>
                    <tr>
                        <td>readonlyInput</td>
                        <td>boolean</td>
                        <td>null</td>
                        <td>When specified, prevents entering the date manually with keyboard.</td>
                    </tr>
                    <tr>
                        <td>shortYearCutoff</td>
                        <td>string</td>
                        <td>+10</td>
                        <td>The cutoff year for determining the century for a date.</td>
                    </tr>
                    <tr>
                        <td>minDate</td>
                        <td>Date</td>
                        <td>null</td>
                        <td>The minimum selectable date.</td>
                    </tr>
                    <tr>
                        <td>maxDate</td>
                        <td>Date</td>
                        <td>null</td>
                        <td>The maximum selectable date.</td>
                    </tr>
                    <tr>
                        <td>disabledDates</td>
                        <td>Array&lt;Date&gt;</td>
                        <td>null</td>
                        <td>Array with dates that should be disabled (not selectable).</td>
                    </tr>
                    <tr>
                        <td>disabledDays</td>
                        <td>Array&lt;number&gt;</td>
                        <td>null</td>
                        <td>Array with weekday numbers that should be disabled (not selectable).</td>
                    </tr>
                    <tr>
                        <td style="text-decoration: line-through">monthNavigator</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>
                            Whether the month should be rendered as a dropdown instead of text. <br />
                            <br />
                            <b> Deprecated: </b> Navigator is always on
                        </td>
                    </tr>
                    <tr>
                        <td style="text-decoration: line-through">yearNavigator</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>
                            Whether the year should be rendered as a dropdown instead of text. <br />
                            <br />
                            <b> Deprecated: </b> Navigator is always on.
                        </td>
                    </tr>
                    <tr>
                        <td style="text-decoration: line-through">yearRange</td>
                        <td>string</td>
                        <td>null</td>
                        <td>
                            The range of years displayed in the year drop-down in (nnnn:nnnn) format such as (2000:2020). <br /><br />
                            <b> Deprecated: </b> Years are based on decades by default.
                        </td>
                    </tr>
                    <tr>
                        <td>showTime</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display timepicker.</td>
                    </tr>
                    <tr>
                        <td>hourFormat</td>
                        <td>string</td>
                        <td>24</td>
                        <td>Specifies 12 or 24 hour format.</td>
                    </tr>
                    <tr>
                        <td>timeOnly</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display timepicker only.</td>
                    </tr>
                    <tr>
                        <td>timeSeparator</td>
                        <td>string</td>
                        <td>:</td>
                        <td>Separator of time selector.</td>
                    </tr>
                    <tr>
                        <td>dataType</td>
                        <td>string</td>
                        <td>date</td>
                        <td>Type of the value to write back to ngModel, default is date and alternative is string.</td>
                    </tr>
                    <tr>
                        <td>required</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When present, it specifies that an input field must be filled out before submitting the form.</td>
                    </tr>
                    <tr>
                        <td>tabindex</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Index of the element in tabbing order.</td>
                    </tr>
                    <tr>
                        <td>ariaLabelledBy</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Establishes relationships between the component and label(s) where its value should be one or more element IDs.</td>
                    </tr>
                    <tr>
                        <td>iconAriaLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Defines a string that labels the icon button for accessibility.</td>
                    </tr>
                    <tr>
                        <td>showSeconds</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to show the seconds in time picker.</td>
                    </tr>
                    <tr>
                        <td>stepHour</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Hours to change per step.</td>
                    </tr>
                    <tr>
                        <td>stepMinute</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Minutes to change per step.</td>
                    </tr>
                    <tr>
                        <td>stepSecond</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Seconds to change per step.</td>
                    </tr>
                    <tr>
                        <td>maxDateCount</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum number of selectable dates in multiple mode.</td>
                    </tr>
                    <tr>
                        <td>showButtonBar</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to display today and clear buttons at the footer</td>
                    </tr>
                    <tr>
                        <td>todayButtonStyleClass</td>
                        <td>string</td>
                        <td>p-secondary-button</td>
                        <td>Style class of the today button.</td>
                    </tr>
                    <tr>
                        <td>clearButtonStyleClass</td>
                        <td>string</td>
                        <td>p-secondary-button</td>
                        <td>Style class of the clear button.</td>
                    </tr>
                    <tr>
                        <td>baseZIndex</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Base zIndex value to use in layering.</td>
                    </tr>
                    <tr>
                        <td>autoZIndex</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to automatically manage layering.</td>
                    </tr>
                    <tr>
                        <td>panelStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the datetimepicker container element.</td>
                    </tr>
                    <tr>
                        <td>panelStyle</td>
                        <td>object</td>
                        <td>null</td>
                        <td>Inline style of the datetimepicker container element.</td>
                    </tr>
                    <tr>
                        <td>keepInvalid</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Keep invalid value when input blur.</td>
                    </tr>
                    <tr>
                        <td>hideOnDateTimeSelect</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Whether to hide the overlay on date selection.</td>
                    </tr>
                    <tr>
                        <td>numberOfMonths</td>
                        <td>number</td>
                        <td>1</td>
                        <td>Number of months to display.</td>
                    </tr>
                    <tr>
                        <td>view</td>
                        <td>'date' | 'month' | 'year'</td>
                        <td>date</td>
                        <td>Type of view to display, valid values are "date" for datepicker and "month" for month picker.</td>
                    </tr>
                    <tr>
                        <td>multipleSeparator</td>
                        <td>string</td>
                        <td>,</td>
                        <td>Separator for multiple selection mode.</td>
                    </tr>
                    <tr>
                        <td>rangeSeparator</td>
                        <td>string</td>
                        <td>-</td>
                        <td>Separator for joining start and end dates on range selection mode.</td>
                    </tr>
                    <tr>
                        <td>touchUI</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, calendar overlay is displayed as optimized for touch devices.</td>
                    </tr>
                    <tr>
                        <td>focusTrap</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>When enabled, can only focus on elements inside the calendar.</td>
                    </tr>
                    <tr>
                        <td>showTransitionOptions</td>
                        <td>string</td>
                        <td>.12s cubic-bezier(0, 0, 0.2, 1)</td>
                        <td>Transition options of the show animation.</td>
                    </tr>
                    <tr>
                        <td>hideTransitionOptions</td>
                        <td>string</td>
                        <td>.1s linear</td>
                        <td>Transition options of the hide animation.</td>
                    </tr>
                    <tr>
                        <td>firstDayOfWeek</td>
                        <td>number</td>
                        <td>0</td>
                        <td>Defines the first of the week for various date calculations.</td>
                    </tr>
                    <tr>
                        <td>showClear</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, a clear icon is displayed to clear the value.</td>
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
