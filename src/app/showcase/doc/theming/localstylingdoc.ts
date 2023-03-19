import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'local-styling-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Theming styles the components globally, in case you required to change the style of a certain component for a specific use case use the class property and override the defaults. Example below changes the background of the panel. Note
                that this is only for local styling, if you require to change the background color of all the panels, a custom theme is a far better choice.
            </p>
        </app-docsectiontext>
        <app-code [code]="code1" [hideToggleCode]="true"></app-code>
        <app-code [code]="code2" [hideToggleCode]="true"></app-code>

        <p class="doc-section-description">If the style does not apply due to view encapsulation, try ng-deep scoping.</p>
        <app-code [code]="code3" [hideToggleCode]="true"></app-code>
    </section>`
})
export class LocalStylingDoc {
    @Input() id: string;

    @Input() title: string;

    code1: Code = {
        basic: `
<p-panel header="Custom Header" styleClass="dark-panel"/>`
    };

    code2: Code = {
        basic: `
.dark-panel.p-panel {
    .p-panel-header {
        background: #212121;
    }
}`
    };

    code3: Code = {
        basic: `
:host ::ng-deep .dark-panel.p-panel {
    .p-panel-header {
        background: #212121;
    }
}`
    };
}
