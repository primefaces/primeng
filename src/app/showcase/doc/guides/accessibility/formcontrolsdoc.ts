import { Component } from '@angular/core';
import { Code } from '../../../domain/code';

@Component({
    selector: 'form-controls-doc',
    template: `
        <app-docsectiontext>
            <p>
                Native form elements should be preferred instead of elements that are meant for other purposes like presentation. As an example, button below is rendered as a form control by the browser, can receive focus via tabbing and can be used
                with space key as well to trigger.
            </p>
            <app-code [code]="code1" [hideToggleCode]="true"></app-code>
            <p class="doc-section-description mt-3">On the other hand, a fancy css based button using a div has no keyboard or screen reader support.</p>
            <app-code [code]="code2" [hideToggleCode]="true"></app-code>
            <p class="doc-section-description mt-3">
                <i>tabindex</i> is required to make a div element accessible in addition to use a keydown to bring the keyboard support back. To avoid the overload and implementing functionality that is already provided by the browser, native form
                controls should be preferred.
            </p>
            <app-code [code]="code3" [hideToggleCode]="true"></app-code>
            <h3>Relations</h3>
            <p class="doc-section-description">Form components must be related to another element that describes what the form element is used for. This is usually achieved with the <i>label</i> element.</p>
            <app-code [code]="code4" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class FormControlsDoc {
    code1: Code = {
        html: `<button (click)="onButtonClick($event)">Click></button>`
    };

    code2: Code = {
        html: `<div class="fancy-button" (click)="onButtonClick($event)">Click</div>`
    };

    code3: Code = {
        html: `<div class="fancy-button" (click)="onButtonClick($event)" (keydown)="onKeyDown($event)" tabIndex="0">Click</div>`
    };

    code4: Code = {
        html: `<label for="myinput">Username:</label>
<input id="myinput" type="text" name="username" />`
    };
}
