import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'global-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                PassThrough object can also be defined at a global level to apply all components in an application using the <i>providePrimeNG</i> provider. For example, with the configuration here all panel headers have the <i>bg-primary</i> style
                class and all autocomplete components have a fixed width. These settings can be overridden by a particular component as components <i>pt</i> property has higher precedence over global <i>pt</i> by default.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" hideToggleCode importCode hideStackBlitz />
    `
})
export class GlobalDoc {
    code: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            pt: {
                panel: {
                    header: {
                        class: 'bg-primary text-primary-contrast'
                    }
                },
                autocomplete: {
                    pcInputText: {
                        root: 'w-64' // OR { class: 'w-64' }
                    }
                }
            }
        })
    ]
};`
    };
}
