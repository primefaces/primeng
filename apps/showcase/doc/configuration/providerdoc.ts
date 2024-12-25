import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'provider-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The initial configuration is defined by the <i>providePrimeNG</i> provider during application startup.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
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
