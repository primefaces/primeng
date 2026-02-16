import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'waiaria-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCodeModule, CheckboxModule],
    template: `
        <app-docsectiontext>
            <p>
                ARIA refers to "Accessible Rich Internet Applications" is a suite to fill the gap where semantic HTML is inadequate. These cases are mainly related to rich UI components/widgets. Although browser support for rich UI components such as
                a datepicker or colorpicker has been improved over the past years many web developers still utilize UI components derived from standard HTML elements created by them or by other projects like PrimeNG. These types of components must
                provide keyboard and screen reader support, the latter case is where the WAI-ARIA is utilized.
            </p>
            <p>
                ARIA consists of roles, properties and attributes. <b>Roles</b> define what the element is mainly used for e.g. <i>checkbox</i>, <i>dialog</i>, <i>tablist</i> whereas <b>States</b> and <b>Properties</b> define the metadata of the
                element like <i>aria-checked</i>, <i>aria-disabled</i>.
            </p>
            <p>Consider the following case of a native checkbox. It has built-in keyboard and screen reader support.</p>
            <app-code [code]="code1" [hideToggleCode]="true"></app-code>
            <p class="doc-section-description mt-4">
                A fancy checkbox with css animations might look more appealing but accessibility might be lacking. Checkbox below may display a checked font icon with animations however it is not tabbable, cannot be checked with space key and cannot
                be read by a reader.
            </p>
            <app-code [code]="code2" [hideToggleCode]="true"></app-code>
            <p class="doc-section-description mt-4">
                One alternative is using ARIA roles for readers and use javascript for keyboard support. Notice the usage of
                <i>aria-labelledby</i> as a replacement of the <i>label</i> tag with for.
            </p>
            <app-code [code]="code3" [hideToggleCode]="true"></app-code>
            <p class="doc-section-description mt-4">
                However the best practice is combining semantic HTML for accessibility while keeping the design for UX. This approach involves hiding a native checkbox for accessibility and using javascript events to update its state. Notice the
                usage of
                <i>p-hidden-accessible</i>
                that hides the elements from the user but not from the screen reader.
            </p>
            <app-code [code]="code4" [hideToggleCode]="true"></app-code>
            <p class="doc-section-description mt-4">A working sample is the PrimeNG checkbox that is tabbable, keyboard accessible and is compliant with a screen reader. Instead of ARIA roles it relies on a hidden native checkbox.</p>
            <div class="card flex items-center">
                <label for="binary" class="mr-2">Remember Me</label>
                <p-checkbox inputId="binary" [binary]="true"></p-checkbox>
            </div>
        </app-docsectiontext>
    `
})
export class WAIARIADoc {
    code1: Code = {
        typescript: `<input type="checkbox" value="Prime" name="ui" checked/>`
    };

    code2: Code = {
        typescript: `<div class="fancy-checkbox">
    <i *ngIf="checked" class="checked-icon"></i>
</div>`
    };

    code3: Code = {
        typescript: `<span id="chk-label">Remember Me></span>
<div class="fancy-checkbox" role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="chk-label" (click)="toggle()" (keydown)="onKeyDown($event)">
    <i *ngIf="checked" class="checked-icon"></i>
</div>`
    };

    code4: Code = {
        typescript: `<label for="chkbox">Remember Me></label>
<div class="fancy-checkbox" (click)="toggle()">
    <input class="p-hidden-accessible" type="checkbox" id="chkbox" (focus)="updateParentVisuals()" (blur)="updateParentVisuals()" (keydown)="$event.keyCode === 32 && updateParentVisuals()">
    <i *ngIf="checked" class="checked-icon"></i>
</div>`
    };
}
