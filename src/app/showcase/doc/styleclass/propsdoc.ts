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
                        <td>pStyleClass</td>
                        <td>string</td>
                        <td>selector</td>
                        <td>Selector to define the target element.</td>
                    </tr>
                    <tr>
                        <td>enterClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Class to add when item begins to get displayed.</td>
                    </tr>
                    <tr>
                        <td>enterActiveClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Class to add during enter animation.</td>
                    </tr>
                    <tr>
                        <td>enterToClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Class to add when enter animation is completed.</td>
                    </tr>
                    <tr>
                        <td>leaveClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Class to add when item begins to get hidden.</td>
                    </tr>
                    <tr>
                        <td>leaveActiveClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Class to add during leave animation</td>
                    </tr>
                    <tr>
                        <td>leaveToClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Class to add when leave animation is completed.</td>
                    </tr>
                    <tr>
                        <td>hideOnOutsideClick</td>
                        <td>boolean</td>
                        <td>null</td>
                        <td>Whether to trigger leave animation when outside of the element is clicked.</td>
                    </tr>
                    <tr>
                        <td>hideOnEscape</td>
                        <td>boolean</td>
                        <td>null</td>
                        <td>Whether to trigger leave animation when escape key pressed.</td>
                    </tr>
                    <tr>
                        <td>toggleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Adds or removes a class when no enter-leave animation is required.</td>
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
