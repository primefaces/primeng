import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'accessibility-doc',
    template: ` <div>
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                ConfirmDialog component uses <i>alertdialog</i> role along with <i>aria-labelledby</i> referring to the header element however any attribute is passed to the root element so you may use <i>aria-labelledby</i> to override this default
                behavior. In addition <i>aria-modal</i> is added since focus is kept within the popup.
            </p>
            <p>It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding <i>tabIndex</i> would be necessary.</p>
            <p>
                When <i>confirm</i> function is used and a trigger is passed as a parameter, ConfirmDialog adds <i>aria-expanded</i> state attribute and <i>aria-controls</i> to the trigger so that the relation between the trigger and the popup is
                defined.
            </p>

            <app-code [code]="code1" [hideToggleCode]="true"></app-code>

            <p>If the dialog is controlled with the <i>visible</i> property <i>aria-expanded</i> and <i>aria-controls</i> need to be handled explicitly.</p>

            <app-code [code]="code2" [hideToggleCode]="true"></app-code>

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
                            <td>Moves focus to the next the focusable element within the popup.</td>
                        </tr>
                        <tr>
                            <td><i>shift</i> + <i>tab</i></td>
                            <td>Moves focus to the previous the focusable element within the popup.</td>
                        </tr>
                        <tr>
                            <td><i>escape</i></td>
                            <td>Closes the popup and moves focus to the trigger.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>Buttons Keyboard Support</h3>
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
                            <td>Triggers the action, closes the popup and moves focus to the trigger.</td>
                        </tr>
                        <tr>
                            <td><i>space</i></td>
                            <td>Triggers the action, closes the popup and moves focus to the trigger.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </app-docsectiontext>
    </div>`
})
export class AccessibilityDoc {
    code1: Code = {
        typescript: `confirm1() {
this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => acceptFunc(),
    reject: () => rejectFunc()
});

<p-button (click)="confirm1()" icon="pi pi-check" label="Confirm"></p-button>

<p-confirmDialog></p-confirmDialog>
        `
    };

    code2: Code = {
        html: `<p-confirmDialog 
    id="dialog" 
    [visible]="visible" 
    (onHide)="visible = false" 
    message="Are you sure you want to proceed?" 
    header="Confirmation" 
    icon="pi pi-exclamation-triangle"
></p-confirmDialog>

<p-button 
    (click)="visible = true" 
    icon="pi pi-check" 
    label="Confirm" 
    aria-controls="{{visible ? 'dialog' : null}} 
    aria-expanded="{{visible ? true : false}}"
></p-button>`
    };
}
