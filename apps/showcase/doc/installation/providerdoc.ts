import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'provider-doc',
    template: `
        <app-docsectiontext>
            <p>Add <i>providePrimeNG</i> and <i>provideAnimationsAsync</i> to the list of providers in your <i>app.config.ts</i>.</p>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class ProviderDoc {
    code: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({ /* options */ })
    ]
};`
    };
}
