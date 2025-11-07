import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'setup-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Unstyled mode is enabled for the whole suite by enabling <i>unstyled</i> option during PrimeNG installation.</p>
            <app-code [code]="code1" hideToggleCode importCode hideStackBlitz />
            <p class="mt-4">Alternatively even in the default styled mode, a particular component can still be used as unstyled by adding the <i>unstyled</i> prop of the component.</p>
            <div class="card flex justify-center">
                <p-button label="Check" icon="pi pi-check" [unstyled]="true" />
            </div>
            <app-code [code]="code2" hideToggleCode hideStackBlitz />
        </app-docsectiontext>
    `
})
export class SetupDoc {
    code1: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            unstyled: true
        })
    ]
};`
    };

    code2: Code = {
        basic: `<p-button label="Check" icon="pi pi-check" [unstyled]="true" />`
    };
}
