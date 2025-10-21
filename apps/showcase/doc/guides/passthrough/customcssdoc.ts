import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'custom-css-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                The <i>global</i> property has a <i>css</i> option to define custom css that belongs to a global <i>pt</i> configuration. Common use case of this feature is defining global styles and animations related to the pass through
                configuration.
            </p>
        </app-docsectiontext>

        <app-code [code]="code" hideToggleCode importCode hideStackBlitz />
    `
})
export class CustomCssDoc {
    code: Code = {
        typescript: `import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        ...
        providePrimeNG({
            pt: {
                global: {
                    css: \`
                    .my-button {
                        border-width: 2px;
                    }
                    \`
                },
                button: {
                    root: 'my-button'
                }
            }
        }),
        ...
    ]
};`
    };
}
