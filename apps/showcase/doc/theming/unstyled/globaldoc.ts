import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'global-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                A global configuration can be created at application level to avoid repetition via the global <i>pt</i> option so that the styles can be shared from a single location. A particular component can still override a global configuration
                with its own <i>pt</i> property.
            </p>
            <app-code [code]="code" hideToggleCode importCode hideStackBlitz />
        </app-docsectiontext>
    `
})
export class GlobalDoc {
    code: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            unstyled: true,
            pt: {
                button: {
                    root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2',
                    label: 'text-white font-bold text-lg',
                    icon: 'text-white text-xl'
                },
                panel: {
                    header: 'bg-primary text-primary-contrast border-primary',
                    content: 'border-primary text-lg text-primary-700',
                    title: 'bg-primary text-primary-contrast text-xl',
                    toggler: 'bg-primary text-primary-contrast hover:text-primary hover:bg-primary-contrast'
                }
            }
        })
    ]
};`
    };
}
