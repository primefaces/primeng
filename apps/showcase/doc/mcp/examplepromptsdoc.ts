import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'example-prompts-doc',
    standalone: true,
    imports: [AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Once installed, try asking your AI assistant:</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ExamplePromptsDoc {
    code: Code = {
        basic: `"Show me how to use the Table component with sorting and filtering"
"What props does the Button component have?"
"How do I customize the Dialog component styling with Pass Through?"
"Compare the Select and Listbox components"
"What's the best component for a date picker?"
"How do I migrate from PrimeNG v20 to v21?"`
    };
}
