import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'command-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>command</i> property of a menuitem defines the callback to run when an item is activated by click or a key event.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true" [hideStackBlitz]="true" importCode></app-code>
    `
})
export class CommandDoc {
    code: Code = {
        basic: `{
    label: 'Log out',
    icon: 'pi pi-signout',
    command: () => {
        // Callback to run
    }
}`
    };
}
