import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <h3>Screen Reader</h3>
                <p>
                    Dialog component uses <i>dialog</i> role along with <i>aria-labelledby</i> referring to the header element however any attribute is passed to the root element so you may use <i>aria-labelledby</i> to override this default
                    behavior. In addition <i>aria-modal</i> is added since focus is kept within the popup.
                </p>
                <p>It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding <i>tabIndex</i> would be necessary.</p>
                <p>Trigger element also requires <i>aria-expanded</i> and <i>aria-controls</i> to be handled explicitly.</p>
                <p>
                    Close element is a <i>button</i> with an <i>aria-label</i> that refers to the <i>aria.close</i> property of the <a href="/configuration/#locale">locale</a> API by default, you may use<i>closeButtonProps</i> to customize the
                    element and override the default <i>aria-label</i>.
                </p>

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
                                <td>Moves focus to the next the focusable element within the dialog.</td>
                            </tr>
                            <tr>
                                <td><i>shift</i> + <i>tab</i></td>
                                <td>Moves focus to the previous the focusable element within the dialog.</td>
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
                                <td>Closes the dialog.</td>
                            </tr>
                            <tr>
                                <td><i>space</i></td>
                                <td>Closes the dialog.</td>
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
    icon="pi pi-external-link" 
    (click)="visible = true" 
    aria-controls="{{visible ? 'dialog' : null}}" 
    aria-expanded="{{visible ? true : false}}"
></p-button>
<p-dialog id="dialog" header="Header" [(visible)]="visible" [style]="{ width: '50vw' }" (onHide)="visible = false">
    <p>Content</p>
</p-dialog>`
    };
}
