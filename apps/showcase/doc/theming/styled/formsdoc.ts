import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'forms-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                The design tokens of the form input components are derived from the <i>form.field</i> token group. This customization example changes border color to primary on hover. Any component that depends on this semantic token such as
                <i>dropdown.hover.border.color</i> and <i>textarea.hover.border.color</i> would receive the change.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" selector="forms-demo" [hideToggleCode]="true"></app-code>
    `
})
export class FormsDoc {
    code = {
        typescript: `const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            },
            dark: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            }
        }
    }
});`
    };
}
