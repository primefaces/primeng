import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Sidebar component uses <i>complementary</i> role by default, since any attribute is passed to the root element aria role can be changed depending on your use case and additional attributes like <i>aria-labelledby</i> can be added.
                    In addition <i>aria-modal</i> is added since focus is kept within the sidebar when opened.
                </p>
                <p>It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding <i>tabIndex</i> would be necessary.</p>
                <p>Trigger element also requires <i>aria-expanded</i> and <i>aria-controls</i> to be handled explicitly.</p>

                <app-code [code]="code" [hideToggleCode]="true"></app-code>

                <h3>Overlay Keyboard Support</h3>
                <div class="doc-tablewrapper">
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><i>tab</i></td>
                                <td>Moves focus to the next the focusable element within the sidebar.</td>
                            </tr>
                            <tr>
                                <td><i>shift</i> + <i>tab</i></td>
                                <td>Moves focus to the previous the focusable element within the sidebar.</td>
                            </tr>
                            <tr>
                                <td><i>escape</i></td>
                                <td>Closes the dialog if <i>closeOnEscape</i> is true.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>Close Button Keyboard Support</h3>
                <div class="doc-tablewrapper">
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><i>enter</i></td>
                                <td>Closes the sidebar.</td>
                            </tr>
                            <tr>
                                <td><i>space</i></td>
                                <td>Closes the sidebar.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </app-docsectiontext>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        html: `<p-button 
    icon="pi pi-arrow-right" 
    (click)="sidebarVisible = true" 
    aria-controls="{{sidebarVisible ? 'sidebar' : null}}" 
    aria-expanded="{{sidebarVisible ? true : false}}"
></p-button>
<p-sidebar 
    [(visible)]="sidebarVisible" 
    id="sidebar"
    (onHide)="sidebarVisible = false"
    role="region"
>
    content
</p-sidebar>`
    };
}
