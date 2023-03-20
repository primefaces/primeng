import { Component, Input } from '@angular/core';

@Component({
    selector: 'methods-doc',
    template: ` <section>
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
                        <td>scrollTo</td>
                        <td>
                            left: Left position of scroll. <br />
                            top: Top position of scroll <br />
                            behavior: Behavior of scroll, valid values are 'auto' and 'smooth'
                        </td>
                        <td>Scroll to move to a specific position.</td>
                    </tr>
                    <tr>
                        <td>scrollToIndex</td>
                        <td>
                            index: Index of item according to orientation mode. <br />
                            behavior: Behavior of scroll, valid values are 'auto' and 'smooth'
                        </td>
                        <td>Scroll to move to a specific item.</td>
                    </tr>
                    <tr>
                        <td>scrollInView</td>
                        <td>
                            index: Index of item according to orientation mode. <br />
                            to: Defines the location of the item in view, valid values are 'to-start' and 'to-end'. <br />
                            behavior: Behavior of scroll, valid values are 'auto' and 'smooth'
                        </td>
                        <td>It is used to move the specified index into the view. It is a method that will usually be needed when keyboard support is added to the scroller component.</td>
                    </tr>
                    <tr>
                        <td>getRenderedRange</td>
                        <td>-</td>
                        <td>Returns the range of items added to the DOM.</td>
                    </tr>
                    <tr>
                        <td>getElementRef</td>
                        <td>-</td>
                        <td>Returns the reference of scroller container.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class MethodsDoc {
    @Input() id: string;

    @Input() title: string;
}
