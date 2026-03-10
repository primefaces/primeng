import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'toggleclass-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, StyleClassModule, ButtonModule, InputTextModule],
    template: `
        <app-docsectiontext>
            <p>
                <i>StyleClass</i> has two modes, <i>toggleClass</i> to simply add-remove a class and enter/leave animations. The target element to change the styling is defined with the <i>selector</i> property that accepts any valid CSS selector or
                keywords including <i>&#64;next</i>, <i>prev</i>, <i>parent</i>, <i>grandparent</i>
            </p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-col items-center">
                <p-button label="Toggle Display" pStyleClass="@next" toggleClass="hidden" />
                <input type="text" pInputText class="hidden mt-4" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ToggleClassDoc {}
