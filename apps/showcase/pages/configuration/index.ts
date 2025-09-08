import { ConfigurationDocModule } from '@/doc/configuration/configurationdoc.module';
import { CspDoc } from '@/doc/configuration/cspdoc';
import { DynamicDoc } from '@/doc/configuration/dynamicdoc';
import { FilterModeDoc } from '@/doc/configuration/filtermodedoc';
import { InputVariantDoc } from '@/doc/configuration/inputvariantdoc';
import { ApiDoc } from '@/doc/configuration/locale/apidoc';
import { RepositoryDoc } from '@/doc/configuration/locale/repositorydoc';
import { RuntimeDoc } from '@/doc/configuration/locale/runtimedoc';
import { TranslationDoc } from '@/doc/configuration/locale/translationdoc';
import { ProviderDoc } from '@/doc/configuration/providerdoc';
import { RippleDoc } from '@/doc/configuration/rippledoc';
import { ThemeDoc } from '@/doc/configuration/themedoc';
import { ZIndexDoc } from '@/doc/configuration/zindexdoc';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'configuration',
    standalone: true,
    imports: [CommonModule, ConfigurationDocModule],
    template: `<app-doc docTitle="Configuration - PrimeNG" header="Configuration" description="Application wide configuration for PrimeNG." [docs]="docs"></app-doc>`
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
