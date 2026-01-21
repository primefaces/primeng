import { CspDoc } from '@/doc/configuration/csp-doc';
import { DynamicDoc } from '@/doc/configuration/dynamic-doc';
import { FilterModeDoc } from '@/doc/configuration/filtermode-doc';
import { InputVariantDoc } from '@/doc/configuration/inputvariant-doc';
import { ApiDoc } from '@/doc/configuration/locale/apidoc';
import { RepositoryDoc } from '@/doc/configuration/locale/repositorydoc';
import { RuntimeDoc } from '@/doc/configuration/locale/runtimedoc';
import { TranslationDoc } from '@/doc/configuration/locale/translationdoc';
import { ProviderDoc } from '@/doc/configuration/provider-doc';
import { RippleDoc } from '@/doc/configuration/ripple-doc';
import { OverlayAppendToDoc } from '@/doc/configuration/overlayappendto-doc';
import { ThemeDoc } from '@/doc/configuration/theme-doc';
import { ZIndexDoc } from '@/doc/configuration/zindex-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    selector: 'configuration',
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc docTitle="Configuration - PrimeNG" header="Configuration" description="Application wide configuration for PrimeNG." [docs]="docs" docType="page"></app-doc>`
})
export class ConfigurationDemo {
    docs = [
        {
            id: 'provider',
            label: 'Provider',
            component: ProviderDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'theme',
            label: 'Theme',
            component: ThemeDoc
        },
        {
            id: 'ripple',
            label: 'Ripple',
            component: RippleDoc
        },
        {
            id: 'inputvariant',
            label: 'InputVariant',
            component: InputVariantDoc
        },
        {
            id: 'overlayappendto',
            label: 'OverlayAppendTo',
            component: OverlayAppendToDoc
        },
        {
            id: 'zIndex',
            label: 'ZIndex',
            component: ZIndexDoc
        },
        {
            id: 'csp',
            label: 'CSP',
            children: [
                {
                    id: 'csp-nonce',
                    label: 'Nonce',
                    component: CspDoc
                }
            ]
        },
        {
            id: 'filter-mode',
            label: 'Filter Mode',
            component: FilterModeDoc
        },
        {
            id: 'locale',
            label: 'Locale',
            children: [
                {
                    id: 'translation',
                    label: 'Translation',
                    component: TranslationDoc
                },
                {
                    id: 'Runtime',
                    label: 'Runtime',
                    component: RuntimeDoc
                },
                {
                    id: 'repository',
                    label: 'Repository',
                    component: RepositoryDoc
                },
                {
                    id: 'api',
                    label: 'API',
                    component: ApiDoc
                }
            ]
        }
    ];
}
