import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'toggle-class-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, StyleClassModule, ButtonModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>
                <i>StyleClass</i> has two modes, <i>toggleClass</i> to simply add-remove a class and enter/leave animations. The target element to change the styling is defined with the <i>selector</i> property that accepts any valid CSS selector or
                keywords including <i>&#64;next</i>, <i>prev</i>, <i>parent</i>, <i>grandparent</i>
            </p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center">
            <p-button label="Toggle Display" pStyleClass="@next" toggleClass="hidden" />
            <input type="text" pInputText class="hidden mt-4" />
        </div>
        <app-code selector="style-class-toggle-class-demo"></app-code>
    `
})
export class ToggleClassDoc {}
