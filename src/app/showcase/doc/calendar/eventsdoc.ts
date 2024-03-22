import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>onSelect</td>
                        <td>value: Selected value</td>
                        <td>Callback to invoke when a date is selected. Note that this event is not called when the value is entered from the input manually.</td>
                    </tr>
                    <tr>
                        <td>onBlur</td>
                        <td>event: Blur event</td>
                        <td>Callback to invoke on blur of input field.</td>
                    </tr>
                    <tr>
                        <td>onFocus</td>
                        <td>event: Focus event</td>
                        <td>Callback to invoke on focus of input field.</td>
                    </tr>
                    <tr>
                        <td>onClose</td>
                        <td>event: Close event</td>
                        <td>Callback to invoke when datepicker panel is closed.</td>
                    </tr>
                    <tr>
                        <td>onShow</td>
                        <td>event: Animation event</td>
                        <td>Callback to invoke when datepicker panel is visible.</td>
                    </tr>
                    <tr>
                        <td>onClickOutside</td>
                        <td>event: Click event</td>
                        <td>Callback to invoke when click outside of datepicker panel.</td>
                    </tr>
                    <tr>
                        <td>onInput</td>
                        <td>event: Input event</td>
                        <td>Callback to invoke when input field is being typed.</td>
                    </tr>
                    <tr>
                        <td>onTodayClick</td>
                        <td>event: Click event</td>
                        <td>Callback to invoke when today button is clicked.</td>
                    </tr>
                    <tr>
                        <td>onClearClick</td>
                        <td>event: Click event</td>
                        <td>Callback to invoke when clear button is clicked.</td>
                    </tr>
                    <tr>
                        <td>onMonthChange</td>
                        <td>
                            event.month: New month <br />
                            event.year: New year
                        </td>
                        <td>Callback to invoke when a month is changed using the navigators.</td>
                    </tr>
                    <tr>
                        <td>onYearChange</td>
                        <td>
                            event.month: New month <br />
                            event.year: New year
                        </td>
                        <td>Callback to invoke when a year is changed using the navigators.</td>
                    </tr>
                    <tr>
                        <td>onClear</td>
                        <td>-</td>
                        <td>Callback to invoke when input field is cleared.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class EventsDoc {
    @Input() id: string;

    @Input() title: string;
}
