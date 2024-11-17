import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { AppConfigService } from '@/service/appconfigservice';
import { Component, inject } from '@angular/core';

@Component({
    standalone: true,
    selector: 'apollo-separator',
    imports: [TemplateSeparatorModule],
    template: `
        <template-separator>
            <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.3576 34.2499L19.6471 28.2974L17.2754 34.2499H22.3576Z" [attr.fill]="fillColor" />
                <path d="M27.8454 28.2974L30.5559 34.2499H25.4736L27.8454 28.2974Z" [attr.fill]="fillColor" />
                <path d="M24.0043 10.25L12.001 34.187H16.0501L24.0048 17.1962L31.7995 34.187H36.009L24.0043 10.25Z" [attr.fill]="fillColor" />
            </svg>
        </template-separator>
    `
})
export class ApolloSeparator {
    configService = inject(AppConfigService);

    get fillColor() {
        return this.configService.appState().darkTheme ? 'var(--p-surface-0)' : 'var(--p-surface-900)';
    }
}
