import { ConfigurationDocModule } from '@/doc/configuration/configurationdoc.module';
import { CspDoc } from '@/doc/configuration/cspdoc';
import { FilterModeDoc } from '@/doc/configuration/filtermodedoc';
import { ImportDoc } from '@/doc/configuration/importdoc';
import { ApiDoc } from '@/doc/configuration/locale/apidoc';
import { NgxTranslateDoc } from '@/doc/configuration/locale/ngx-translatedoc';
import { RepositoryDoc } from '@/doc/configuration/locale/repositorydoc';
import { SetLocaleDoc } from '@/doc/configuration/locale/setlocaledoc';
import { RippleDoc } from '@/doc/configuration/rippledoc';
import { ThemingDoc } from '@/doc/configuration/themingdoc';
import { ZIndexDoc } from '@/doc/configuration/zindexdoc';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'configuration',
    standalone: true,
    imports: [CommonModule, ConfigurationDocModule],
    template: `<app-doc docTitle="Configuration - PrimeNG" header="Configuration" description="Global configuration options of the components." [docs]="docs"></app-doc>`
})
export class ConfigurationDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'theming',
            label: 'Theming',
            component: ThemingDoc
        },
        {
            id: 'ripple',
            label: 'Ripple',
            component: RippleDoc
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
                    id: 'set-locale',
                    label: 'Set Locale',
                    component: SetLocaleDoc
                },
                {
                    id: 'ngx-translate',
                    label: 'Ngx-translate',
                    component: NgxTranslateDoc
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
